/* lagmath.js — 「좌표로 본 라그랑주 승수」 계산 모듈 (페이지와 code/check_lagrange.js가 함께 씀)
   모든 숫자는 설명용 예시. 단위: 사람 수·기계 대수·만 원·톤 */
var LG=(function(){
'use strict';
var R2=Math.SQRT2,S10=Math.sqrt(10);

/* 단계 1: 좌표평면 읽기 — 그릇 f = x²/4 + y² */
var bowl={f:function(x,y){return x*x/4+y*y;},grad:function(x,y){return [x/2,2*y];}};

/* 단계 2: 원 울타리 x² + y² = 1 위에서 x + y 가장 크게 */
var circ={best:[1/R2,1/R2],fmax:R2,lam:1/R2,
  ftheta:function(t){return Math.cos(t)+Math.sin(t);},dftheta:function(t){return -Math.sin(t)+Math.cos(t);},
  /* 울타리를 1 → 1 + e로 넓힐 때 가장 큰 값 */
  fmaxAt:function(c){return Math.sqrt(2*c);},
  /* 직선 x + y = c가 원과 만나는 점 개수 */
  meets:function(c){var d=Math.abs(c)/R2;return d>1+1e-9?0:Math.abs(d-1)<0.004?1:2;}};

/* 단계 3·4: 공장 Q = 2√(LK), 임금 w = 5, 기계 사용료 r = 10 */
var fac={w:5,r:10,Q:function(L,K){return 2*Math.sqrt(L*K);},
  MPL:function(L,K){return Math.sqrt(K/L);},MPK:function(L,K){return Math.sqrt(L/K);},
  costMin:function(q){var w=this.w,r=this.r,K=q/2*Math.sqrt(w/r),L=q/2*Math.sqrt(r/w);return {L:L,K:K,C:w*L+r*K,lam:Math.sqrt(w*r)};}};

/* 단계 5~8: 회귀 — 매장 4곳, 표준화한 두 입력 (광고 x₁, 할인 x₂) */
var DATA=[[1,1,4],[-1,1,-2],[1,-1,2],[-1,-1,-4]],A=[3,1];
function loss(w1,w2){var s=0;DATA.forEach(function(d){var e=d[2]-w1*d[0]-w2*d[1];s+=e*e;});return s/DATA.length;}
function grad(w1,w2){var g1=0,g2=0;DATA.forEach(function(d){var e=d[2]-w1*d[0]-w2*d[1];g1+=-2*e*d[0];g2+=-2*e*d[1];});return [g1/DATA.length,g2/DATA.length];}
/* 경사하강 경로. mode: free(울타리 없음) · proj(넘으면 원 위로 되돌림) · pen(벌점 λ‖w‖² 더함) */
function path(o){var w=[o.start[0],o.start[1]],P=[[w[0],w[1]]],R=o.R||1,lam=o.lam||0;
  for(var t=0;t<o.steps;t++){var g=grad(w[0],w[1]);if(o.mode==='pen'){g[0]+=2*lam*w[0];g[1]+=2*lam*w[1];}
    w=[w[0]-o.eta*g[0],w[1]-o.eta*g[1]];if(o.mode==='proj'){var n=Math.hypot(w[0],w[1]);if(n>R)w=[w[0]*R/n,w[1]*R/n];}P.push([w[0],w[1]]);}return P;}
/* 릿지(원 울타리 ‖w‖ ≤ R)의 답과 λ */
function ridge(R){var n=Math.hypot(A[0],A[1]);if(R>=n)return {w:[A[0],A[1]],lam:0,loss:0,touch:false};var w=[A[0]*R/n,A[1]*R/n];return {w:w,lam:n/R-1,loss:loss(w[0],w[1]),touch:true};}
/* 라쏘(마름모 울타리 |w₁| + |w₂| ≤ t)의 답과 λ (벌점 꼴 λ(|w₁| + |w₂|)일 때) */
function lasso(t){if(t>=4)return {w:[3,1],lam:0,loss:0,corner:false};if(t>=2){var th=(4-t)/2,w=[3-th,1-th];return {w:w,lam:2*th,loss:loss(w[0],w[1]),corner:false};}
  return {w:[t,0],lam:2*(3-t),loss:loss(t,0),corner:true};}

/* 대결: 길쭉한 그릇 (w₁ − 2)² + 10(w₂ − 1)², 원 울타리 ‖w‖ ≤ 1 */
var D={a:[2,1],B:[1,10],
  f:function(w1,w2){return (w1-2)*(w1-2)+10*(w2-1)*(w2-1);},
  clip:function(){var n=Math.hypot(2,1);return [2/n,1/n];},
  best:function(){var f=this.f,bt=0,bf=1e9,i,t;for(i=0;i<=20000;i++){t=2*Math.PI*i/20000;var v=f(Math.cos(t),Math.sin(t));if(v<bf){bf=v;bt=t;}}
    var lo=bt-1e-3,hi=bt+1e-3;for(i=0;i<80;i++){var m1=lo+(hi-lo)/3,m2=hi-(hi-lo)/3;if(f(Math.cos(m1),Math.sin(m1))<f(Math.cos(m2),Math.sin(m2)))hi=m2;else lo=m1;}
    t=(lo+hi)/2;var w=[Math.cos(t),Math.sin(t)],lam=-((w[0]-2)*w[0]+10*(w[1]-1)*w[1]);return {w:w,loss:f(w[0],w[1]),lam:lam,deg:t*180/Math.PI};}};

/* ── 복습 대시보드용 일반식 (조건을 바꿔 다시 풀기) ── */
var RV={
  /* 복습 1: 타원 그릇 f = x²/a² + y²/b², 점 (x, y)의 화살표 방향(도)과 방향별 높이 변화 */
  grad:function(a,b,x,y){return [2*x/(a*a),2*y/(b*b)];},
  dirDeg:function(v){var d=Math.atan2(v[1],v[0])*180/Math.PI;return (d+360)%360;},
  angGap:function(p,q){var d=Math.abs(((p-q)%360+360)%360);return Math.min(d,360-d);},
  /* 복습 2: 원 위 f = a·x + b·y */
  circBest:function(a,b){return {deg:(Math.atan2(b,a)*180/Math.PI+360)%360,fmax:Math.hypot(a,b),lam:Math.hypot(a,b)/2};},
  /* 복습 3·4: 공장 Q = 2√(LK), 임금 w, 사용료 r, 목표 q */
  fac:function(w,r,q){return {L:q/2*Math.sqrt(r/w),K:q/2*Math.sqrt(w/r),C:q*Math.sqrt(w*r),lam:Math.sqrt(w*r)};},
  /* 복습 5: 둥근 그릇 (w − c)², 경사하강 */
  gd:function(c,s,eta,n){var w=[s[0],s[1]],P=[[w[0],w[1]]];for(var i=0;i<n;i++){w=[w[0]-eta*2*(w[0]-c[0]),w[1]-eta*2*(w[1]-c[1])];P.push([w[0],w[1]]);}return P;},
  /* 복습 6: 바닥 a, 원 울타리 반지름 R */
  ridge:function(a,R){var n=Math.hypot(a[0],a[1]);if(R>=n)return {w:[a[0],a[1]],lam:0,touch:false};return {w:[a[0]*R/n,a[1]*R/n],lam:n/R-1,touch:true};},
  /* 복습 7: 두 길 (바닥 a, 반지름 R, 벌점 lam) */
  two:function(a,R,lam,n){var p=[0,0],q=[0,0],eta=0.1;for(var i=0;i<n;i++){p=[p[0]-eta*2*(p[0]-a[0]),p[1]-eta*2*(p[1]-a[1])];var m=Math.hypot(p[0],p[1]);if(m>R)p=[p[0]*R/m,p[1]*R/m];
      q=[q[0]-eta*(2*(q[0]-a[0])+2*lam*q[0]),q[1]-eta*(2*(q[1]-a[1])+2*lam*q[1])];}return {proj:p,pen:q};},
  /* 복습 8: 바닥 a (a₁ > a₂ > 0), 마름모 울타리 t */
  lasso:function(a,t){var s=a[0]+a[1];if(t>=s)return {w:[a[0],a[1]],lam:0};if(t>=a[0]-a[1]){var th=(s-t)/2;return {w:[a[0]-th,a[1]-th],lam:2*th};}return {w:[t,0],lam:2*(a[0]-t)};},
  /* 복습 대결: 길쭉함 k인 그릇 (w₁ − 2)² + k(w₂ − 1)² */
  duelK:function(k){var f=function(x,y){return (x-2)*(x-2)+k*(y-1)*(y-1);},n=Math.hypot(2,1),cl=[2/n,1/n],bf=1e9,bt=0;
    for(var i=0;i<=7200;i++){var t=2*Math.PI*i/7200,v=f(Math.cos(t),Math.sin(t));if(v<bf){bf=v;bt=t;}}
    var lo=bt-1e-3,hi=bt+1e-3;for(i=0;i<60;i++){var m1=lo+(hi-lo)/3,m2=hi-(hi-lo)/3;if(f(Math.cos(m1),Math.sin(m1))<f(Math.cos(m2),Math.sin(m2)))hi=m2;else lo=m1;}
    var t2=(lo+hi)/2;return {clip:cl,clipLoss:f(cl[0],cl[1]),best:[Math.cos(t2),Math.sin(t2)],bestLoss:f(Math.cos(t2),Math.sin(t2))};}
};

return {bowl:bowl,circ:circ,fac:fac,DATA:DATA,A:A,loss:loss,grad:grad,path:path,ridge:ridge,lasso:lasso,duel:D,S10:S10,RV:RV};
})();
if(typeof module!=='undefined')module.exports=LG;
