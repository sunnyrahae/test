const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일 서빙 (index.html, css/, js/)
app.use(express.static(path.join(__dirname)));

// 모든 경로를 index.html로 폴백
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🧠 심리테스트 앱 실행 중: http://localhost:${PORT}`);
});
