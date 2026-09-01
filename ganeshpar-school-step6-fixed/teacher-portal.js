const teacherRole = sessionStorage.getItem("schoolRole");
const teacherUser = sessionStorage.getItem("schoolUser");

if (teacherRole !== "teacher") {
  window.location.href = "login.html";
}

const SUBJECTS = [
  "ગુજરાતી","ગણિત","સામાજિક વિજ્ઞાન","હિન્દી","અંગ્રેજી","વિજ્ઞાન","સંસ્કૃત","કમ્પ્યુટર",
  "પર્યાવરણ","તાર્કિક ક્ષમતા"
];

const seedStudents = (window.GANESHPAR_REAL_STUDENTS || [
  {id:"student-1001", number:"1001", name:"ડેમો વિદ્યાર્થી", standard:"6", section:"A"}
]);

const $ = id => document.getElementById(id);
const read = (key, fallback=[]) => {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const uid = prefix => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
const esc = value => String(value ?? "").replace(/[&<>'"]/g, c => ({
  "&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"
}[c]));

function ensureSeedData(){
  const students = read("schoolStudents", null);
  if (!students || (students.length === 1 && students[0]?.name === "ડેમો વિદ્યાર્થી")) {
    write("schoolStudents", seedStudents);
  }
  if (!localStorage.getItem("manualResults")) write("manualResults", []);
  if (!localStorage.getItem("studyMaterials")) write("studyMaterials", []);
  if (!localStorage.getItem("schoolAnnouncements")) write("schoolAnnouncements", []);
  if (!localStorage.getItem("teacherQuestions")) write("teacherQuestions", []);
}
ensureSeedData();

$("teacherTop").textContent = teacherUser || "teacher01";

function fillSubjectSelects(){
  ["marksSubject","materialSubject","questionSubject"].forEach(id => {
    const el = $(id);
    if (!el) return;
    el.innerHTML = SUBJECTS.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join("");
  });
}
fillSubjectSelects();

function allResults(){
  const online = read("examResults", []).map((r,i)=>({
    id:r.id || `online-${i}`,
    studentNumber:r.studentNumber || "1001",
    studentName:r.studentName || (r.studentNumber === "1001" ? "ડેમો વિદ્યાર્થી" : "વિદ્યાર્થી"),
    standard:String(r.standard || "6"),
    examName:`ઓનલાઈન પરીક્ષા`,
    subject:r.subject || "-",
    score:Number(r.score || 0),
    total:Number(r.total || 0),
    date:r.date || "-",
    source:"online"
  }));
  const manual = read("manualResults", []).map(r=>({...r, source:"teacher"}));
  return [...online,...manual];
}

function refreshStats(){
  $("studentCount").textContent = read("schoolStudents").length;
  $("resultCount").textContent = allResults().length;
  $("materialCount").textContent = read("studyMaterials").length;
  $("questionCount").textContent = read("teacherQuestions").length;
  $("noticeCount").textContent = read("schoolAnnouncements").length;
}

function showTab(name){
  document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===name));
  document.querySelectorAll(".tab-panel").forEach(p=>p.classList.toggle("active",p.id===`tab-${name}`));
  if(name==="students") renderStudents();
  if(name==="results") { renderStudentOptions(); renderResults(); }
  if(name==="materials") renderMaterials();
  if(name==="questions") renderQuestions();
  if(name==="announcements") renderAnnouncements();
  refreshStats();
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>showTab(b.dataset.tab)));
document.querySelectorAll("[data-open-tab]").forEach(b=>b.addEventListener("click",()=>showTab(b.dataset.openTab)));

function renderStudents(){
  const query = ($("studentSearch").value || "").trim().toLowerCase();
  const students = read("schoolStudents").filter(s =>
    !query || `${s.number} ${s.name} ${s.standard} ${s.section}`.toLowerCase().includes(query)
  );
  $("studentsTable").innerHTML = students.length ? students.map(s=>`
    <tr>
      <td><b>${esc(s.number)}</b></td><td>${esc(s.name)}</td><td>${esc(s.standard)}</td><td>${esc(s.section || "-")}</td>
      <td>
        <button class="action-btn edit" onclick="editStudent('${esc(s.id)}')">સંપાદિત</button>
        <button class="action-btn delete" onclick="deleteStudent('${esc(s.id)}')">કાઢો</button>
      </td>
    </tr>`).join("") : `<tr><td colspan="5"><div class="empty">કોઈ વિદ્યાર્થી મળ્યો નથી.</div></td></tr>`;
}
$("studentSearch").addEventListener("input",renderStudents);

function resetStudentForm(){
  $("studentEditId").value="";
  $("studentFormTitle").textContent="નવો વિદ્યાર્થી ઉમેરો";
  $("studentForm").reset();
  $("studentStandard").value="6";
}
$("clearStudentForm").addEventListener("click",resetStudentForm);

$("studentForm").addEventListener("submit",e=>{
  e.preventDefault();
  const id=$("studentEditId").value;
  const students=read("schoolStudents");
  const record={
    id:id || uid("student"),
    number:$("studentNumber").value.trim(),
    name:$("studentName").value.trim(),
    standard:$("studentStandard").value,
    section:$("studentSection").value.trim() || "A",
    password:$("studentPassword").value
  };
  if(!record.number || !record.name || !record.password) return;
  const duplicate=students.find(s=>s.number===record.number && s.id!==id);
  if(duplicate){
    $("studentMessage").textContent="આ વિદ્યાર્થી નંબર પહેલેથી છે.";
    $("studentMessage").style.color="#b42318";
    return;
  }
  if(id){
    const index=students.findIndex(s=>s.id===id);
    if(index>=0) students[index]=record;
  }else{
    students.push(record);
  }
  write("schoolStudents",students);
  $("studentMessage").textContent="વિદ્યાર્થી સફળતાપૂર્વક સાચવાયો.";
  $("studentMessage").style.color="";
  resetStudentForm();
  renderStudents(); renderStudentOptions(); refreshStats();
});

window.editStudent=id=>{
  const s=read("schoolStudents").find(x=>x.id===id);
  if(!s) return;
  $("studentEditId").value=s.id;
  $("studentFormTitle").textContent="વિદ્યાર્થી માહિતી સંપાદિત કરો";
  $("studentNumber").value=s.number;
  $("studentName").value=s.name;
  $("studentStandard").value=s.standard;
  $("studentSection").value=s.section || "A";
  $("studentPassword").value=s.password || "";
  showTab("students");
};
window.deleteStudent=id=>{
  const students=read("schoolStudents");
  const s=students.find(x=>x.id===id);
  if(!s) return;
  if(s.number==="1001"){
    alert("ડેમો વિદ્યાર્થી 1001ને કાઢી શકાતો નથી.");
    return;
  }
  if(!confirm(`${s.name}ને કાઢી નાખવો છે?`)) return;
  write("schoolStudents",students.filter(x=>x.id!==id));
  renderStudents(); renderStudentOptions(); refreshStats();
};

function renderStudentOptions(){
  const students=read("schoolStudents");
  const select=$("marksStudent");
  select.innerHTML=students.length
    ? students.map(s=>`<option value="${esc(s.number)}">${esc(s.number)} — ${esc(s.name)} (ધો. ${esc(s.standard)})</option>`).join("")
    : `<option value="">કોઈ વિદ્યાર્થી નથી</option>`;
  updateMarksStudentDetails();
}

function updateMarksStudentDetails(){
  const students=read("schoolStudents");
  const student=students.find(s=>s.number===$("marksStudent").value);
  $("marksStandard").value=student ? student.standard : "";
  const btn=$("openMarksheetBtn");
  if(btn){
    const number=student ? student.number : "";
    btn.href=number ? `result.html?student=${encodeURIComponent(number)}` : "result.html";
  }
}

$("marksStudent").addEventListener("change",updateMarksStudentDetails);

$("marksForm").addEventListener("submit",e=>{
  e.preventDefault();
  const students=read("schoolStudents");
  const student=students.find(s=>s.number===$("marksStudent").value);
  const examType=$("marksExamType").value;
  const score=Number($("marksScore").value), total=Number($("marksTotal").value);
  if(!student || !["mid","final"].includes(examType) || total<=0 || score<0 || score>total){
    $("marksMessage").textContent="વિદ્યાર્થી અને ગુણની માહિતી તપાસો.";
    $("marksMessage").style.color="#b42318";
    return;
  }

  const subject=$("marksSubject").value;
  const results=read("manualResults");
  const existingIndex=results.findIndex(r =>
    r.studentNumber===student.number &&
    r.examType===examType &&
    r.subject===subject
  );
  const record={
    id:existingIndex>=0 ? results[existingIndex].id : uid("manual"),
    studentNumber:student.number,
    studentName:student.name,
    standard:student.standard,
    examType,
    examName:examType==="mid" ? "મધ્યસત્ર પરીક્ષા" : "વાર્ષિક પરીક્ષા",
    subject,
    score,
    total,
    date:new Date().toLocaleDateString("gu-IN")
  };

  if(existingIndex>=0) results[existingIndex]=record;
  else results.unshift(record);
  write("manualResults",results.slice(0,500));

  $("marksMessage").textContent=existingIndex>=0 ? "આ વિષયના ગુણ અપડેટ થયા." : "ગુણ સફળતાપૂર્વક સાચવાયા.";
  $("marksMessage").style.color="";
  $("marksScore").value="";
  renderResults(); refreshStats();
});

function renderResults(){
  const filter=$("resultFilter").value;
  const results=allResults().filter(r=>filter==="all" || String(r.standard)===filter);
  $("resultsTable").innerHTML=results.length ? results.map(r=>{
    const pct=r.total ? Math.round(r.score/r.total*100) : 0;
    const examLabel=r.source==="online" ? "ઓનલાઈન MCQ" : (r.examName || "શિક્ષક દ્વારા દાખલ કરેલ");
    return `<tr><td><b>${esc(r.studentNumber)}</b><br>${esc(r.studentName)}</td><td>${esc(r.standard)}</td><td>${esc(examLabel)}</td><td>${esc(r.subject)}</td><td>${r.score} / ${r.total}</td><td><b>${pct}%</b></td><td>${esc(r.date)}</td></tr>`;
  }).join("") : `<tr><td colspan="7"><div class="empty">હજી કોઈ પરિણામ નથી.</div></td></tr>`;
}

$("resultFilter").addEventListener("change",renderResults);

function safeHref(url){
  const value=String(url||"").trim();
  if(/^https?:\/\//i.test(value) || /^[^:?#]+\.pdf(?:[?#].*)?$/i.test(value)) return value;
  return "";
}
$("materialForm").addEventListener("submit",e=>{
  e.preventDefault();
  const url=safeHref($("materialUrl").value);
  if(!url){
    $("materialMessage").textContent="માન્ય https:// લિંક અથવા .pdf path આપો.";
    $("materialMessage").style.color="#b42318";
    return;
  }
  const items=read("studyMaterials");
  items.unshift({
    id:uid("material"),
    title:$("materialTitle").value.trim(),
    standard:$("materialStandard").value,
    subject:$("materialSubject").value,
    url,
    date:new Date().toLocaleDateString("gu-IN")
  });
  write("studyMaterials",items);
  $("materialMessage").textContent="સામગ્રી ઉમેરાઈ ગઈ.";
  $("materialMessage").style.color="";
  $("materialForm").reset();
  renderMaterials(); refreshStats();
});

function renderMaterials(){
  const items=read("studyMaterials");
  $("materialsList").innerHTML=items.length ? items.map(m=>`
    <div class="item"><div class="item-main"><h3>📖 ${esc(m.title)}</h3>
      <p>ધોરણ ${esc(m.standard)} • ${esc(m.subject)}</p>
      <div class="item-meta">${esc(m.url)}</div></div>
      <div class="item-actions"><a class="action-btn" href="${esc(m.url)}" target="_blank" rel="noopener">ખોલો</a>
      <button onclick="deleteMaterial('${esc(m.id)}')">કાઢો</button></div></div>`).join("") :
    `<div class="empty">હજી કોઈ અભ્યાસ સામગ્રી ઉમેરાઈ નથી.</div>`;
}
window.deleteMaterial=id=>{
  if(!confirm("આ સામગ્રી કાઢી નાખવી છે?")) return;
  write("studyMaterials",read("studyMaterials").filter(x=>x.id!==id));
  renderMaterials(); refreshStats();
};

function renderQuestionSubjects(){
  const standard=$("questionStandard").value;
  // Standard 6 starts with the PDF-derived Step 4 subjects; all other standards use the school's general subject list.
  const list=standard==="6"
    ? ["પર્યાવરણ","ગણિત","તાર્કિક ક્ષમતા","ગુજરાતી","હિન્દી","English","સામાજિક વિજ્ઞાન","વિજ્ઞાન","સંસ્કૃત","કમ્પ્યુટર"]
    : ["ગુજરાતી","ગણિત","પર્યાવરણ","સામાજિક વિજ્ઞાન","હિન્દી","અંગ્રેજી","English","વિજ્ઞાન","સંસ્કૃત","કમ્પ્યુટર"];
  $("questionSubject").innerHTML=list.map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join("");
}
$("questionStandard").addEventListener("change",renderQuestionSubjects);
renderQuestionSubjects();

$("questionForm").addEventListener("submit",e=>{
  e.preventDefault();
  const items=read("teacherQuestions");
  items.unshift({
    id:uid("question"),
    standard:$("questionStandard").value,
    subject:$("questionSubject").value,
    question:$("questionText").value.trim(),
    options:[$("optionA").value.trim(),$("optionB").value.trim(),$("optionC").value.trim(),$("optionD").value.trim()],
    answer:Number($("correctAnswer").value),
    date:new Date().toLocaleDateString("gu-IN")
  });
  write("teacherQuestions",items);
  $("questionMessage").textContent="MCQ પ્રશ્ન સફળતાપૂર્વક ઉમેરાયો.";
  $("questionMessage").style.color="";
  $("questionForm").reset();
  $("questionStandard").value="6";
  renderQuestionSubjects();
  renderQuestions(); refreshStats();
});

function renderQuestions(){
  const filter=$("questionFilter").value;
  const items=read("teacherQuestions").filter(q=>filter==="all" || String(q.standard)===filter);
  $("questionsTable").innerHTML=items.length ? items.map(q=>`
    <tr><td>${esc(q.standard)}</td><td>${esc(q.subject)}</td><td>${esc(q.question)}</td>
    <td>${["A","B","C","D"][q.answer] || "-"}</td>
    <td><button class="action-btn delete" onclick="deleteQuestion('${esc(q.id)}')">કાઢો</button></td></tr>`).join("") :
    `<tr><td colspan="5"><div class="empty">કોઈ કસ્ટમ પ્રશ્ન નથી.</div></td></tr>`;
}
$("questionFilter").addEventListener("change",renderQuestions);
window.deleteQuestion=id=>{
  if(!confirm("આ પ્રશ્ન કાઢી નાખવો છે?")) return;
  write("teacherQuestions",read("teacherQuestions").filter(x=>x.id!==id));
  renderQuestions(); refreshStats();
};

$("announcementForm").addEventListener("submit",e=>{
  e.preventDefault();
  const items=read("schoolAnnouncements");
  items.unshift({
    id:uid("notice"),
    title:$("announcementTitle").value.trim(),
    body:$("announcementBody").value.trim(),
    date:new Date().toLocaleDateString("gu-IN")
  });
  write("schoolAnnouncements",items);
  $("announcementMessage").textContent="જાહેરાત પ્રકાશિત થઈ.";
  $("announcementMessage").style.color="";
  $("announcementForm").reset();
  renderAnnouncements(); refreshStats();
});

function renderAnnouncements(){
  const items=read("schoolAnnouncements");
  $("announcementsList").innerHTML=items.length ? items.map(a=>`
    <div class="item"><div class="item-main"><h3>📢 ${esc(a.title)}</h3><p>${esc(a.body)}</p><div class="item-meta">${esc(a.date)}</div></div>
    <div class="item-actions"><button onclick="deleteAnnouncement('${esc(a.id)}')">કાઢો</button></div></div>`).join("") :
    `<div class="empty">હજી કોઈ નવી જાહેરાત નથી.</div>`;
}
window.deleteAnnouncement=id=>{
  if(!confirm("આ જાહેરાત કાઢી નાખવી છે?")) return;
  write("schoolAnnouncements",read("schoolAnnouncements").filter(x=>x.id!==id));
  renderAnnouncements(); refreshStats();
};

$("logoutBtn").addEventListener("click",()=>{
  sessionStorage.clear();
  window.location.href="login.html";
});

renderStudents();
renderStudentOptions();
renderResults();
renderMaterials();
renderQuestions();
renderAnnouncements();
refreshStats();
