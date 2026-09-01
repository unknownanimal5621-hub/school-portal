const role=sessionStorage.getItem("schoolRole");
if(role!=="student"){window.location.href="login.html?redirect=result-view.html";}

const number=sessionStorage.getItem("schoolUser")||"";
const name=sessionStorage.getItem("studentName")||"વિદ્યાર્થી";
const standard=sessionStorage.getItem("studentStandard")||"-";
const section=sessionStorage.getItem("studentSection")||"-";
document.getElementById("studentTop").textContent=number||"વિદ્યાર્થી";
document.getElementById("studentName").textContent=name;
document.getElementById("studentNumber").textContent=number;
document.getElementById("studentStandard").textContent=`ધોરણ ${standard}`;
document.getElementById("studentSection").textContent=section;

const read=(key,fallback=[])=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}catch{return fallback;}};
const esc=v=>String(v??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
const manual=read("manualResults",[]).filter(r=>String(r.studentNumber)===String(number)&&["mid","final"].includes(r.examType));

const subjectMap={};
manual.forEach(r=>{
  const subject=r.subject||"અન્ય";
  if(!subjectMap[subject])subjectMap[subject]={midScore:0,midTotal:0,finalScore:0,finalTotal:0};
  if(r.examType==="mid"){subjectMap[subject].midScore=Number(r.score)||0;subjectMap[subject].midTotal=Number(r.total)||0;}
  else{subjectMap[subject].finalScore=Number(r.score)||0;subjectMap[subject].finalTotal=Number(r.total)||0;}
});
const entries=Object.entries(subjectMap);
let midScore=0,midTotal=0,finalScore=0,finalTotal=0;
entries.forEach(([,v])=>{midScore+=v.midScore;midTotal+=v.midTotal;finalScore+=v.finalScore;finalTotal+=v.finalTotal;});
const grandScore=midScore+finalScore,grandTotal=midTotal+finalTotal,pct=grandTotal?Math.round(grandScore/grandTotal*100):0;
document.getElementById("midSummary").textContent=`${midScore} / ${midTotal}`;
document.getElementById("finalSummary").textContent=`${finalScore} / ${finalTotal}`;
document.getElementById("grandSummary").textContent=`${grandScore} / ${grandTotal}`;
document.getElementById("percentage").textContent=`${pct}%`;

document.getElementById("subjectTable").innerHTML=entries.length?entries.map(([subject,v])=>{
 const s=v.midScore+v.finalScore,t=v.midTotal+v.finalTotal;
 return `<tr><td><b>${esc(subject)}</b></td><td>${v.midTotal?v.midScore:"—"}</td><td>${v.midTotal||"—"}</td><td>${v.finalTotal?v.finalScore:"—"}</td><td>${v.finalTotal||"—"}</td><td><b>${s}</b></td><td>${t||"—"}</td></tr>`;
}).join(""):`<tr><td colspan="7" class="empty-cell">હજી કોઈ મધ્યસત્ર અથવા વાર્ષિક ગુણ દાખલ થયા નથી.</td></tr>`;

document.getElementById("historyTable").innerHTML=manual.length?manual.map(r=>{
 const p=r.total?Math.round(Number(r.score)/Number(r.total)*100):0;
 const label=r.examType==="mid"?"મધ્યસત્ર પરીક્ષા":"વાર્ષિક પરીક્ષા";
 return `<tr><td>${label}</td><td>${esc(r.subject||"-")}</td><td>${Number(r.score)||0}</td><td>${Number(r.total)||0}</td><td><b>${p}%</b></td><td>${esc(r.date||"-")}</td></tr>`;
}).join(""):`<tr><td colspan="6" class="empty-cell">હજી કોઈ પરીક્ષા ગુણ નથી.</td></tr>`;
document.getElementById("noResults").style.display=manual.length?"none":"block";

document.getElementById("printBtn").addEventListener("click",()=>window.print());
document.getElementById("logoutBtn").addEventListener("click",()=>{sessionStorage.clear();location.href="login.html";});
