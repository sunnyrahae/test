require('dotenv').config();

const express    = require('express');
const path       = require('path');
const { Pool }   = require('pg');
const nodemailer = require('nodemailer');

const app  = express();
const PORT = process.env.PORT || 3000;

// ══════════════════════════════════════════
// PostgreSQL 연결
// ══════════════════════════════════════════
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('railway')
    ? { rejectUnauthorized: false }
    : false,
});

async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(100)  NOT NULL,
        email      VARCHAR(255)  NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

      CREATE TABLE IF NOT EXISTS results (
        id            SERIAL PRIMARY KEY,
        user_id       INTEGER      REFERENCES users(id) ON DELETE CASCADE,
        domain        VARCHAR(20)  NOT NULL,
        type_key      VARCHAR(50)  NOT NULL,
        type_name     VARCHAR(100) NOT NULL,
        type_emoji    VARCHAR(10),
        scores        JSONB        NOT NULL DEFAULT '{}',
        axes_analysis JSONB        NOT NULL DEFAULT '[]',
        email_sent    BOOLEAN      DEFAULT FALSE,
        created_at    TIMESTAMP    DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_results_user_id ON results(user_id);
      CREATE INDEX IF NOT EXISTS idx_results_domain  ON results(domain);
    `);
    console.log('DB 초기화 완료');
  } catch (err) {
    console.error('DB 초기화 실패:', err.message);
  } finally {
    client.release();
  }
}

// ══════════════════════════════════════════
// 이메일 전송 설정
// ══════════════════════════════════════════
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function buildEmailHTML({ userName, domainLabel, typeName, typeEmoji, typeDesc,
                           keywords, strengths, growth, axesAnalysis, gradStart, gradEnd }) {
  const gradient = `linear-gradient(135deg, ${gradStart}, ${gradEnd})`;
  const axesRows = axesAnalysis.map(ax => `
    <tr>
      <td style="padding:6px 0;font-size:13px;color:#555;">
        <strong style="color:${ax.color}">${ax.leftLabel}</strong> vs ${ax.rightLabel}
      </td>
      <td style="padding:6px 0;width:140px;">
        <div style="background:#eee;border-radius:6px;height:8px;overflow:hidden;">
          <div style="background:${ax.color};width:${ax.leftPct}%;height:100%;border-radius:6px;"></div>
        </div>
      </td>
      <td style="padding:6px 0 6px 8px;font-size:12px;color:#888;white-space:nowrap;">
        ${ax.leftPct}% · ${100 - ax.leftPct}%
      </td>
    </tr>
  `).join('');

  const keywordTags = keywords.map(k =>
    `<span style="display:inline-block;background:${gradStart}18;border:1px solid ${gradStart}55;
      color:${gradStart};border-radius:20px;padding:4px 12px;font-size:12px;
      font-weight:700;margin:3px;">#${k}</span>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:32px 0;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);max-width:95vw;">
<tr>
  <td style="background:${gradient};padding:40px 32px;text-align:center;">
    <div style="font-size:60px;line-height:1;">${typeEmoji}</div>
    <div style="color:rgba(255,255,255,.8);font-size:11px;letter-spacing:.15em;margin-top:14px;">✦ 검사 완료 · ${domainLabel} ✦</div>
    <h1 style="color:#fff;font-size:24px;margin:8px 0 4px;font-weight:900;line-height:1.3;">${typeName}</h1>
    <div style="color:rgba(255,255,255,.85);font-size:13px;">${userName}님의 유형</div>
  </td>
</tr>
<tr><td style="padding:28px 32px 0;">
  <p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 24px;">
    안녕하세요, <strong>${userName}</strong>님! 🎉<br>
    <strong>${domainLabel}</strong> 심리검사 결과를 보내드립니다.
  </p>
  <div style="background:#f8f8fc;border-radius:14px;padding:20px;margin-bottom:20px;">
    <div style="font-size:11px;color:#999;letter-spacing:.1em;margin-bottom:10px;font-weight:700;">📋 유형 상세 설명</div>
    <p style="font-size:13px;color:#444;line-height:1.8;margin:0;">${typeDesc.replace(/\*\*(.*?)\*\*/g, '<strong style="color:' + gradStart + '">$1</strong>')}</p>
  </div>
  <div style="background:#f8f8fc;border-radius:14px;padding:20px;margin-bottom:20px;">
    <div style="font-size:11px;color:#999;letter-spacing:.1em;margin-bottom:12px;font-weight:700;">🏷️ 핵심 키워드</div>
    <div>${keywordTags}</div>
  </div>
  <div style="background:#f8f8fc;border-radius:14px;padding:20px;margin-bottom:20px;">
    <div style="font-size:11px;color:#999;letter-spacing:.1em;margin-bottom:12px;font-weight:700;">💪 강점 & 성장 포인트</div>
    <div style="margin-bottom:12px;">
      <div style="font-size:11px;color:${gradStart};margin-bottom:5px;font-weight:700;">✅ 강점</div>
      <div style="font-size:13px;color:#444;line-height:1.7;">${strengths}</div>
    </div>
    <div>
      <div style="font-size:11px;color:#f5a623;margin-bottom:5px;font-weight:700;">🌱 성장 포인트</div>
      <div style="font-size:13px;color:#444;line-height:1.7;">${growth}</div>
    </div>
  </div>
  <div style="background:#f8f8fc;border-radius:14px;padding:20px;margin-bottom:28px;">
    <div style="font-size:11px;color:#999;letter-spacing:.1em;margin-bottom:12px;font-weight:700;">📊 축별 성향 분석</div>
    <table width="100%" cellpadding="0" cellspacing="0">${axesRows}</table>
  </div>
</td></tr>
<tr>
  <td style="background:#f8f8fc;padding:20px 32px;text-align:center;border-top:1px solid #eee;">
    <p style="font-size:12px;color:#aaa;margin:0;line-height:1.8;">
      본 메일은 심리테스트 앱에서 자동 발송된 메일입니다.<br>
      © 2024 나는 어떤 유형의 사람일까?
    </p>
  </td>
</tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

// ══════════════════════════════════════════
// 미들웨어
// ══════════════════════════════════════════
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ══════════════════════════════════════════
// API 라우트
// ══════════════════════════════════════════

// [POST] /api/result — 결과 저장 + 이메일 발송
app.post('/api/result', async (req, res) => {
  const { name, email, domain, domainLabel, typeKey, typeName, typeEmoji,
          typeDesc, keywords, strengths, growth, scores, axesAnalysis,
          gradStart, gradEnd } = req.body;

  if (!name || !email || !domain || !typeKey) {
    return res.status(400).json({ ok: false, message: '필수 값이 누락되었습니다.' });
  }

  const client = await pool.connect();
  let resultId;
  try {
    const userRow = await client.query(
      `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id`,
      [name, email]
    );
    const userId = userRow.rows[0].id;

    const resultRow = await client.query(
      `INSERT INTO results (user_id, domain, type_key, type_name, type_emoji, scores, axes_analysis)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
      [userId, domain, typeKey, typeName, typeEmoji,
       JSON.stringify(scores), JSON.stringify(axesAnalysis)]
    );
    resultId = resultRow.rows[0].id;

    const html = buildEmailHTML({ userName: name, domainLabel, typeName, typeEmoji,
      typeDesc, keywords, strengths, growth, axesAnalysis, gradStart, gradEnd });

    await transporter.sendMail({
      from:    process.env.SMTP_FROM,
      to:      email,
      subject: `[심리검사 결과] ${domainLabel} - ${typeName} ${typeEmoji}`,
      html,
    });

    await client.query(`UPDATE results SET email_sent = TRUE WHERE id = $1`, [resultId]);
    return res.json({ ok: true, resultId });

  } catch (err) {
    console.error('/api/result 오류:', err.message);
    if (resultId) return res.json({ ok: true, resultId, emailError: err.message });
    return res.status(500).json({ ok: false, message: '서버 오류가 발생했습니다.' });
  } finally {
    client.release();
  }
});

// [GET] /api/stats — 통계 (관리용)
app.get('/api/stats', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT domain, COUNT(*) AS total,
        COUNT(CASE WHEN email_sent THEN 1 END) AS email_sent_count,
        MAX(created_at) AS last_at
      FROM results GROUP BY domain ORDER BY domain
    `);
    res.json({ ok: true, stats: rows });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

(async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`🧠 심리테스트 앱 실행 중: http://localhost:${PORT}`);
  });
})();
