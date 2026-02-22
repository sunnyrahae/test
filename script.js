:root{
  --bg:#0d0d1a;--card:#16162a;--card2:#1e1e35;
  --hrd:#ff6b6b;--cs:#ffa552;--study:#4ecdc4;--teach:#a29bfe;
  --text:#f0f0f0;--muted:#8888aa;--border:rgba(255,255,255,0.08);
}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{font-family:'Gowun Dodum',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden}
.bg-orbs{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.orb{position:absolute;border-radius:50%;filter:blur(90px);opacity:.12;animation:drift 14s ease-in-out infinite alternate}
.o1{width:320px;height:320px;background:var(--hrd);top:-80px;left:-80px;animation-delay:0s}
.o2{width:280px;height:280px;background:var(--teach);top:35%;right:-70px;animation-delay:-5s}
.o3{width:240px;height:240px;background:var(--study);bottom:-60px;left:20%;animation-delay:-9s}
.o4{width:200px;height:200px;background:var(--cs);top:60%;left:-50px;animation-delay:-3s}
@keyframes drift{from{transform:translate(0,0)}to{transform:translate(35px,45px)}}

#app{position:relative;z-index:1;min-height:100vh;max-width:480px;margin:0 auto;padding-bottom:60px}

/* ─── 프로그레스 바 ─── */
#prog-wrap{position:sticky;top:0;z-index:100;background:rgba(13,13,26,.93);backdrop-filter:blur(14px);padding:12px 20px 10px;border-bottom:1px solid var(--border);display:none}
.prog-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:7px}
.prog-lbl{font-size:11px;color:var(--muted);letter-spacing:.05em}
.prog-cnt{font-family:'Black Han Sans';font-size:13px}
.prog-track{width:100%;height:6px;background:rgba(255,255,255,.1);border-radius:10px;overflow:hidden}
.prog-fill{height:100%;border-radius:10px;transition:width .5s cubic-bezier(.4,0,.2,1);width:0%}

/* ─── 공통 ─── */
.screen{display:none;padding:0 20px}
.screen.active{display:block;animation:fadeUp .4s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
.btn-main{width:100%;padding:17px;border:none;border-radius:16px;font-family:'Black Han Sans';font-size:18px;cursor:pointer;transition:transform .15s,box-shadow .15s;letter-spacing:.04em}
.btn-main:active{transform:scale(.97)}
.btn-ghost{width:100%;padding:14px;background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--muted);border-radius:14px;font-family:'Black Han Sans';font-size:15px;cursor:pointer;transition:all .2s}
.btn-ghost:active{background:rgba(255,255,255,.1)}

/* ─── 메인 화면 ─── */
#s-home{padding:36px 20px 20px;text-align:center}
.home-logo{font-size:64px;display:block;margin-bottom:14px;animation:bounce 2.2s ease-in-out infinite}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
.home-title{font-family:'Black Han Sans';font-size:28px;line-height:1.35;margin-bottom:10px;background:linear-gradient(135deg,#fff,var(--teach));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.home-sub{font-size:14px;color:var(--muted);line-height:1.7;margin-bottom:32px}
.domain-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:28px}
.domain-card{background:var(--card);border:1.5px solid var(--border);border-radius:20px;padding:22px 14px;cursor:pointer;transition:all .2s;text-align:center;position:relative;overflow:hidden}
.domain-card::before{content:'';position:absolute;inset:0;opacity:0;transition:opacity .2s}
.domain-card:active{transform:scale(.97)}
.domain-card.hrd{border-color:rgba(255,107,107,.25)}
.domain-card.hrd::before{background:rgba(255,107,107,.08)}
.domain-card.hrd:active::before,.domain-card.hrd:hover::before{opacity:1}
.domain-card.cs{border-color:rgba(255,165,82,.25)}
.domain-card.cs::before{background:rgba(255,165,82,.08)}
.domain-card.cs:active::before,.domain-card.cs:hover::before{opacity:1}
.domain-card.study{border-color:rgba(78,205,196,.25)}
.domain-card.study::before{background:rgba(78,205,196,.08)}
.domain-card.study:active::before,.domain-card.study:hover::before{opacity:1}
.domain-card.teach{border-color:rgba(162,155,254,.25)}
.domain-card.teach::before{background:rgba(162,155,254,.08)}
.domain-card.teach:active::before,.domain-card.teach:hover::before{opacity:1}
.domain-icon{font-size:36px;display:block;margin-bottom:10px}
.domain-name{font-family:'Black Han Sans';font-size:15px;margin-bottom:6px}
.domain-desc{font-size:11px;color:var(--muted);line-height:1.5}
.domain-badge{display:inline-block;font-size:10px;padding:2px 8px;border-radius:10px;margin-top:8px;font-weight:700}
.home-info{background:rgba(78,205,196,.07);border:1px solid rgba(78,205,196,.2);border-radius:12px;padding:14px 16px;font-size:13px;color:var(--study);line-height:1.7;text-align:left;margin-bottom:20px}

/* ─── 퀴즈 화면 ─── */
#s-quiz{padding:0 20px}
.q-section-badge{display:inline-block;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;margin:22px 0 14px;letter-spacing:.06em}
.q-card{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:24px 18px;margin-bottom:18px}
.q-num{font-size:11px;color:var(--muted);margin-bottom:10px;letter-spacing:.1em}
.q-text{font-size:16px;line-height:1.7;font-weight:700;margin-bottom:22px;word-break:keep-all}
.opts{display:flex;flex-direction:column;gap:9px}
.opt{background:rgba(255,255,255,.04);border:1.5px solid var(--border);border-radius:14px;padding:13px 14px;cursor:pointer;display:flex;align-items:flex-start;gap:11px;transition:all .2s}
.opt:active{transform:scale(.99)}
.opt.sel{background:rgba(255,255,255,.08)}
.opt-lbl{width:27px;height:27px;flex-shrink:0;border-radius:50%;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--muted);transition:all .2s}
.opt.sel .opt-lbl{color:#fff}
.opt-txt{font-size:13px;line-height:1.6;color:#ddd;padding-top:4px}
.opt.sel .opt-txt{color:#fff}
.nav-btns{display:flex;gap:10px;padding-bottom:24px}
.btn-prev{flex:1;padding:14px;border-radius:14px;border:1px solid var(--border);background:rgba(255,255,255,.05);color:var(--muted);font-family:'Black Han Sans';font-size:15px;cursor:pointer;transition:all .15s}
.btn-next{flex:2;padding:14px;border-radius:14px;border:none;font-family:'Black Han Sans';font-size:15px;cursor:pointer;transition:all .15s;color:#fff}
.btn-next:disabled{opacity:.32;cursor:not-allowed}
.btn-next:active:not(:disabled){transform:scale(.97)}

/* ─── 결과 화면 ─── */
#s-result{padding:20px;display:none}
#s-result.active{display:block}
.res-header{text-align:center;padding:28px 0 22px}
.res-emoji{font-size:70px;display:block;margin-bottom:10px;animation:pop .5s cubic-bezier(.34,1.56,.64,1)}
@keyframes pop{from{transform:scale(0)}to{transform:scale(1)}}
.res-type-lbl{font-size:11px;letter-spacing:.16em;margin-bottom:7px;font-weight:700}
.res-type-name{font-family:'Black Han Sans';font-size:26px;line-height:1.3;margin-bottom:8px;background:linear-gradient(135deg,#fff,var(--teach));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.res-adj{font-size:13px;line-height:1.8;margin-bottom:4px}
.res-sec{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:18px;margin-bottom:12px}
.res-sec-title{font-size:11px;color:var(--muted);letter-spacing:.12em;margin-bottom:12px;text-transform:uppercase;font-weight:700}
.res-desc{font-size:13px;line-height:1.85;color:#ccc;word-break:keep-all}
.axis-row{margin-bottom:14px}
.axis-labels{display:flex;justify-content:space-between;margin-bottom:4px}
.ax-l{font-size:11px;font-weight:700}
.ax-r{font-size:11px;color:var(--muted)}
.axis-track{width:100%;height:9px;background:rgba(255,255,255,.08);border-radius:10px;overflow:hidden;margin-bottom:3px}
.axis-fill{height:100%;border-radius:10px;transition:width 1.1s cubic-bezier(.4,0,.2,1);width:0%}
.ax-score{text-align:right;font-size:10px;color:var(--muted)}
.kw-grid{display:flex;flex-wrap:wrap;gap:7px}
.kw-tag{padding:5px 13px;border-radius:20px;font-size:12px;font-weight:700;animation:tagPop .4s cubic-bezier(.34,1.56,.64,1) both}
@keyframes tagPop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
.type-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:4px}
.type-mini{background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:11px;padding:10px 8px;text-align:center;font-size:11px;color:var(--muted);line-height:1.5}
.type-mini.hl{border-width:1.5px}
.type-mini-ico{font-size:20px;display:block;margin-bottom:3px}
.share-row{display:flex;gap:8px;margin-top:8px}
.btn-share{flex:1;padding:14px;border:none;border-radius:14px;font-family:'Black Han Sans';font-size:14px;cursor:pointer;color:#fff}
.sparkle{position:fixed;pointer-events:none;z-index:999;width:8px;height:8px;border-radius:50%;animation:sp .6s ease-out forwards}
@keyframes sp{0%{transform:scale(1) translate(0,0);opacity:1}100%{transform:scale(0) translate(var(--tx),var(--ty));opacity:0}}