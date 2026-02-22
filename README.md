# 🧠 나는 어떤 유형의 사람일까?

4개 분야 심리테스트 앱 (HRD / CS / 자기주도학습 / 강의·교수법)
- ✅ PostgreSQL 검사 결과 누적 저장
- ✅ 검사 전 이름 + 이메일 입력
- ✅ 검사 완료 후 결과지 이메일 자동 발송

## 📁 프로젝트 구조

```
psychology-test/
├── index.html          # HTML 골격 (홈 / 등록 / 퀴즈 / 결과 화면)
├── css/style.css       # 전체 스타일
├── js/script.js        # 클라이언트 로직 (DB·문항·점수·API 연동)
├── server.js           # Express 서버 (PostgreSQL + Nodemailer)
├── db/schema.sql       # DB 스키마 (참고용, 서버가 자동 생성)
├── package.json
├── .env.example        # 환경변수 템플릿
└── .gitignore
```

## ⚙️ 환경변수 설정

`.env.example`을 `.env`로 복사 후 값을 채워주세요.

```bash
cp .env.example .env
```

| 변수명          | 설명                                      |
|----------------|------------------------------------------|
| `DATABASE_URL`  | PostgreSQL 연결 문자열 (Railway 자동 주입) |
| `SMTP_HOST`     | SMTP 서버 호스트 (예: smtp.gmail.com)     |
| `SMTP_PORT`     | SMTP 포트 (587 권장)                      |
| `SMTP_SECURE`   | TLS 사용 여부 (false = STARTTLS)          |
| `SMTP_USER`     | 이메일 계정                               |
| `SMTP_PASS`     | 이메일 앱 비밀번호                         |
| `SMTP_FROM`     | 발신자 표시명 + 주소                       |

### Gmail 앱 비밀번호 발급
1. Google 계정 → 보안 → 2단계 인증 활성화
2. [앱 비밀번호](https://myaccount.google.com/apppasswords) 발급 (16자리)
3. `SMTP_PASS`에 입력

## 🚀 Railway 배포

### 1. GitHub 업로드
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/아이디/레포명.git
git push -u origin main
```

### 2. Railway 설정
1. [railway.app](https://railway.app) → `New Project` → `Deploy from GitHub repo`
2. **PostgreSQL 플러그인 추가**: `New` → `Database` → `PostgreSQL`
   - `DATABASE_URL`이 자동으로 환경변수에 주입됩니다
3. **환경변수 추가**: 프로젝트 설정 → `Variables` 탭에서 아래 항목 입력:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your@gmail.com
   SMTP_PASS=앱비밀번호16자리
   SMTP_FROM=심리테스트 <your@gmail.com>
   ```
4. 배포 완료 후 Railway 제공 도메인으로 접속 ✅

### 3. 로컬 실행
```bash
npm install
cp .env.example .env  # 환경변수 설정 후
npm start
# http://localhost:3000
```

## 📊 API 엔드포인트

| 메서드 | 경로           | 설명                         |
|--------|---------------|------------------------------|
| POST   | `/api/result`  | 결과 저장 + 이메일 발송       |
| GET    | `/api/stats`   | 분야별 누적 통계 (관리용)     |

## 🗄️ DB 테이블

- **users** — id, name, email, created_at
- **results** — id, user_id, domain, type_key, type_name, scores(JSONB), email_sent, created_at
