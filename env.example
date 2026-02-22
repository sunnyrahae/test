-- ══════════════════════════════════════════
-- 심리테스트 앱 PostgreSQL 스키마
-- ══════════════════════════════════════════

-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(255)  NOT NULL,
  created_at  TIMESTAMP     DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 검사 결과 테이블
CREATE TABLE IF NOT EXISTS results (
  id            SERIAL PRIMARY KEY,
  user_id       INTEGER       REFERENCES users(id) ON DELETE CASCADE,
  domain        VARCHAR(20)   NOT NULL,  -- 'hrd' | 'cs' | 'study' | 'teach'
  type_key      VARCHAR(50)   NOT NULL,
  type_name     VARCHAR(100)  NOT NULL,
  type_emoji    VARCHAR(10),
  scores        JSONB         NOT NULL DEFAULT '{}',
  axes_analysis JSONB         NOT NULL DEFAULT '[]',
  email_sent    BOOLEAN       DEFAULT FALSE,
  created_at    TIMESTAMP     DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_results_user_id  ON results(user_id);
CREATE INDEX IF NOT EXISTS idx_results_domain   ON results(domain);
CREATE INDEX IF NOT EXISTS idx_results_created  ON results(created_at);
