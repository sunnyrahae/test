<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>나는 어떤 유형의 사람일까? 🧠</title>
  <link href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Black+Han+Sans&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

<!-- ── 배경 오브 ── -->
<div class="bg-orbs">
  <div class="orb o1"></div>
  <div class="orb o2"></div>
  <div class="orb o3"></div>
  <div class="orb o4"></div>
</div>

<!-- ── 상단 진행률 바 ── -->
<div id="prog-wrap">
  <div class="prog-top">
    <span class="prog-lbl">진행률</span>
    <span class="prog-cnt" id="prog-cnt">0 / 30</span>
  </div>
  <div class="prog-track">
    <div class="prog-fill" id="prog-fill"></div>
  </div>
</div>

<!-- ── 앱 컨테이너 ── -->
<div id="app">

  <!-- 홈 화면 -->
  <div id="s-home" class="screen active">
    <span class="home-logo">🧠</span>
    <h1 class="home-title">나는 어떤<br>유형의 사람일까?</h1>
    <p class="home-sub">4개 분야 심리테스트<br>분야를 선택하고 나의 유형을 발견하세요</p>

    <div class="domain-grid">
      <div class="domain-card hrd" onclick="selectDomain('hrd')">
        <span class="domain-icon">💼</span>
        <div class="domain-name" style="color:var(--hrd)">HRD</div>
        <div class="domain-desc">인적자원개발<br>어떤 HRD인일까?</div>
        <span class="domain-badge" style="background:rgba(255,107,107,.15);color:var(--hrd)">30문항</span>
      </div>
      <div class="domain-card cs" onclick="selectDomain('cs')">
        <span class="domain-icon">🎧</span>
        <div class="domain-name" style="color:var(--cs)">CS</div>
        <div class="domain-desc">고객서비스<br>어떤 CS인일까?</div>
        <span class="domain-badge" style="background:rgba(255,165,82,.15);color:var(--cs)">30문항</span>
      </div>
      <div class="domain-card study" onclick="selectDomain('study')">
        <span class="domain-icon">📚</span>
        <div class="domain-name" style="color:var(--study)">자기주도학습</div>
        <div class="domain-desc">청소년 공부법<br>어떤 공부 유형?</div>
        <span class="domain-badge" style="background:rgba(78,205,196,.15);color:var(--study)">30문항</span>
      </div>
      <div class="domain-card teach" onclick="selectDomain('teach')">
        <span class="domain-icon">🎓</span>
        <div class="domain-name" style="color:var(--teach)">강의·교수법</div>
        <div class="domain-desc">어떤 강사<br>유형일까?</div>
        <span class="domain-badge" style="background:rgba(162,155,254,.15);color:var(--teach)">30문항</span>
      </div>
    </div>

    <div class="home-info">
      💡 정답은 없습니다. 가장 솔직한 나를 선택하세요<br>
      🔀 매번 문항·보기 순서가 무작위로 바뀝니다<br>
      ⏱️ 분야당 약 5~8분 소요
    </div>
  </div>


  <!-- 정보 입력 화면 -->
  <div id="s-register" class="screen">
    <div class="reg-wrap">
      <div class="reg-domain-badge" id="reg-domain-badge"></div>
      <h2 class="reg-title">검사 전<br>정보를 입력해 주세요</h2>
      <p class="reg-sub">결과지를 이메일로 발송해 드립니다</p>
      <div class="reg-form">
        <div class="reg-field">
          <label class="reg-label" for="inp-name">이름</label>
          <input class="reg-input" type="text" id="inp-name"
            placeholder="홍길동" autocomplete="name" maxlength="30">
        </div>
        <div class="reg-field">
          <label class="reg-label" for="inp-email">이메일</label>
          <input class="reg-input" type="email" id="inp-email"
            placeholder="example@email.com" autocomplete="email" maxlength="100">
          <span class="reg-hint">검사 완료 후 결과지가 이 주소로 발송됩니다</span>
        </div>
        <div class="reg-err" id="reg-err"></div>
        <button class="btn-main reg-submit" id="btn-reg-submit" onclick="startQuiz()">
          검사 시작하기 →
        </button>
        <button class="btn-ghost" onclick="goHome()" style="margin-top:10px;">← 분야 다시 선택</button>
      </div>
    </div>
  </div>

  <!-- 퀴즈 화면 -->
  <div id="s-quiz" class="screen">
    <div id="q-area"></div>
    <div class="nav-btns">
      <button class="btn-prev" id="btn-prev" onclick="prevQ()">← 이전</button>
      <button class="btn-next" id="btn-next" onclick="nextQ()" disabled>다음 →</button>
    </div>
  </div>

  <!-- 결과 화면 -->
  <div id="s-result" class="screen">
    <div id="res-content"></div>
  </div>

</div><!-- /#app -->

<script src="js/script.js"></script>
</body>
</html>
