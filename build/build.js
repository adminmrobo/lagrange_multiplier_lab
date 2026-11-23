// 페이지 조립: node build/build.js  →  index.html (단일 파일)
// page.src.html + common.css + 캐릭터 그림 + lagmath.js + common.js
// + 지식 색인(#kg)·온톨로지·서지 꾸러미(#export) (ai-lab-explainer 꼬리표 조립기와 같은 방식)
// 공통 파일(common.*, kgx.js, backbone.json, sprites96.js)은 adminmrobo/optimization_3d_map/build에서 가져온 판이다.
const fs=require('fs'),path=require('path'),vm=require('vm');
const B=__dirname,R=path.join(B,'..');
const rd=f=>fs.readFileSync(path.join(B,f),'utf8');
const kgx=rd('kgx.js'),BB=JSON.parse(rd('backbone.json'));
const ctx={document:{readyState:'loading',addEventListener(){},getElementById(){return null;}},window:{},navigator:{},console};
vm.createContext(ctx);vm.runInContext(kgx+';this.KGX=KGX;',ctx);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const js=o=>JSON.stringify(o).replace(/<\//g,'<\\/');
const sec=(i,t,sub,m)=>'<section class="kgx kgx-sec" id="'+i+'"><div class="kgx-wrap">\n<h2>'+t+'</h2>\n<p class="kgx-sub">'+sub+'</p>\n<div id="'+m+'"></div>\n</div></section>\n';
function attach(H,kg,refs,meta){
  kg=JSON.parse(JSON.stringify(kg));kg.topicLabels={};BB.nodes.forEach(n=>{kg.topicLabels[n.id]=n.label.ko;});
  const ld=ctx.KGX.toJsonLd(kg,meta),t=meta.title||'';
  const head=['<meta name="citation_title" content="'+esc(t)+'">','<meta name="dc.title" content="'+esc(t)+'">','<meta name="dc.date" content="'+esc(meta.date||'')+'">','<meta name="dc.language" content="ko">','<meta name="dc.type" content="InteractiveResource">'];
  (meta.creator||[]).forEach(c=>{if(c.name)head.push('<meta name="citation_author" content="'+esc(c.name)+'">');});
  if(meta.series)head.push('<meta name="dcterms.isPartOf" content="'+esc(meta.series)+'">');
  const body='<!-- lab-kg:body -->\n'+sec('kg','지식 색인 — 이 페이지에서 찾아보기','이 페이지에 나온 개념, 방법, 주장, 비유, 열린 질문을 한곳에 모았다. 검색하고, 항목을 눌러 이웃 관계를 보고, "설명 보러 가기"로 본문에 돌아간다.','kg-mount')+
    sec('export','온톨로지·서지 꾸러미 — 이 페이지의 지식을 가져가기','지식 색인을 출처와 함께 파일로 내려받는다. Zotero(BibTeX·RIS), Protégé(Turtle), Neo4j·Gephi(CSV), 여러 페이지 합치기(kg.json)에 쓴다.','export-mount')+
    '<script type="application/json" id="kg-raw">'+js(kg)+'</'+'script>\n<script type="application/ld+json" id="kg-ld">'+js(ld)+'</'+'script>\n'+
    '<script type="application/json" id="refs-csl">'+js(refs)+'</'+'script>\n<script type="application/json" id="page-meta">'+js(meta)+'</'+'script>\n<!-- /lab-kg:body -->\n';
  H=H.replace('</head>','<!-- lab-kg:head -->\n'+head.join('\n')+'\n<!-- /lab-kg:head -->\n</head>');
  let i=H.lastIndexOf('<footer'),j=H.lastIndexOf('</body>'),p=(i>=0&&i<j)?i:j;H=H.slice(0,p)+body+H.slice(p);
  j=H.lastIndexOf('</body>');return H.slice(0,j)+'<!-- lab-kg:script -->\n<script>\n'+kgx+'\n</'+'script>\n<!-- /lab-kg:script -->\n'+H.slice(j);}
let H=rd('page.src.html').replace('<!--@@CSS@@-->',()=>'<style>\n'+rd('common.css')+'\n</style>')
  .replace('/*@@SPRITES@@*/',()=>rd('sprites96.js')).replace('/*@@SPRITES_EXTRA@@*/',()=>rd('sprites_extra.js'))
  .replace('/*@@LAGMATH@@*/',()=>rd('lagmath.js')).replace('/*@@COMMON@@*/',()=>rd('common.js'));
H=attach(H,JSON.parse(rd('kg.json')),JSON.parse(rd('refs.json')),JSON.parse(rd('meta.json')));
fs.writeFileSync(path.join(R,'index.html'),H);console.log('index.html',(Buffer.byteLength(H)/1024).toFixed(0)+' KB');


// ── 분야 뼈대 다시 걸기 (kg/rehang.json, ai-lab-retrofit 15장) ──
// 빌드가 페이지를 다시 쓴 뒤, 덧씌우기를 kg-raw·kg-ld에 다시 적용한다. 파일이 없으면 아무것도 하지 않는다.
{const _p=require('path'),_f=require('fs');let _r=__dirname;
 for(let i=0;i<3&&!_f.existsSync(_p.join(_r,'kg','rehang.json'));i++)_r=_p.dirname(_r);
 if(_f.existsSync(_p.join(_r,'kg','rehang.json'))){try{require('child_process').execFileSync('python3',[_p.join(_r,'kg','rehang.py'),'apply',_r],{stdio:'inherit'});}
 catch(e){console.log('다시 걸기 적용 실패 — python3 kg/rehang.py apply . 를 따로 실행하세요');}}}
