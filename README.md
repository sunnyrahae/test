# 🧠 나는 어떤 유형의 사람일까?

4개 분야 심리테스트 앱 (HRD / CS / 자기주도학습 / 강의·교수법)

## 📁 프로젝트 구조

```
psychology-test/
├── index.html        # HTML 골격
├── css/
│   └── style.css     # 스타일 (UI 디자인, 애니메이션)
├── js/
│   └── script.js     # 로직 (문항 DB, 점수 계산, 결과 렌더링)
├── server.js         # Express 정적 서버 (Railway용)
├── package.json      # Node.js 의존성
└── .gitignore
```

## 🚀 Railway 배포 방법

### 1. GitHub에 업로드
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/psychology-test.git
git push -u origin main
```

### 2. Railway 배포
1. [railway.app](https://railway.app) 접속 후 GitHub 연동
2. `New Project` → `Deploy from GitHub repo` 선택
3. 레포지토리 선택 → 자동 감지로 Node.js 배포
4. **시작 명령어**: `npm start` (자동 설정됨)
5. 배포 완료 후 Railway 제공 도메인으로 접속 ✅

### 3. 로컬 실행
```bash
npm install
npm start
# http://localhost:3000 으로 접속
```

## ✨ 주요 기능
- 4개 분야 각 30문항 (총 120문항)
- 문항·보기 순서 매번 무작위 셔플
- 축별 성향 분석 & 진행률 바
- 모바일 최적화 (max-width 480px)
- 결과 공유 기능
