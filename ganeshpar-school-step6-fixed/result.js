const role = sessionStorage.getItem("schoolRole");
const teacherUser = sessionStorage.getItem("schoolUser") || "teacher01";

// The marksheet maker is intentionally teacher-only.
if (role !== "teacher") {
  window.location.href = "login.html";
}

document.getElementById("teacherTop").textContent = teacherUser;

const read = (key, fallback=[]) => {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
};
const esc = value => String(value ?? "").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));

const students = read("schoolStudents");
const studentSelect = document.getElementById("marksheetStudent");
const params = new URLSearchParams(window.location.search);
const requestedStudent = params.get("student") || localStorage.getItem("marksheetStudent") || (students[0] && students[0].number) || "";

studentSelect.innerHTML = students.length
  ? students.map(s => `<option value="${esc(s.number)}">${esc(s.number)} — ${esc(s.name)} (ધો. ${esc(s.standard)})</option>`).join("")
  : `<option value="">કોઈ વિદ્યાર્થી નથી</option>`;

if (students.some(s => s.number === requestedStudent)) studentSelect.value = requestedStudent;

function gradeFromPercentage(pct){
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B+";
  if (pct >= 60) return "B";
  if (pct >= 50) return "C+";
  if (pct >= 40) return "C";
  return "D";
}

function renderMarksheet(number){
  const student = students.find(s => s.number === number);
  const manual = read("manualResults").filter(r => r.studentNumber === number);
  const valid = manual.filter(r => ["mid","final"].includes(r.examType));

  if (!student) {
    document.getElementById("studentName").textContent = "-";
    document.getElementById("studentNumber").textContent = "-";
    document.getElementById("studentStandard").textContent = "-";
    document.getElementById("studentSection").textContent = "-";
  } else {
    document.getElementById("studentName").textContent = student.name || "-";
    document.getElementById("studentNumber").textContent = student.number || "-";
    document.getElementById("studentStandard").textContent = `ધોરણ ${student.standard || "-"}`;
    document.getElementById("studentSection").textContent = student.section || "-";
  }

  const subjectMap = {};
  valid.forEach(r => {
    const subject = r.subject || "અન્ય";
    if (!subjectMap[subject]) {
      subjectMap[subject] = {
        midScore:0, midTotal:0,
        finalScore:0, finalTotal:0,
        midDate:"-", finalDate:"-"
      };
    }
    const target = r.examType === "mid" ? "mid" : "final";
    subjectMap[subject][`${target}Score`] = Number(r.score || 0);
    subjectMap[subject][`${target}Total`] = Number(r.total || 0);
    subjectMap[subject][`${target}Date`] = r.date || "-";
  });

  const entries = Object.entries(subjectMap);
  let midScore=0, midTotal=0, finalScore=0, finalTotal=0;
  entries.forEach(([,v])=>{
    midScore += v.midScore; midTotal += v.midTotal;
    finalScore += v.finalScore; finalTotal += v.finalTotal;
  });
  const grandScore = midScore + finalScore;
  const grandTotal = midTotal + finalTotal;
  const pct = grandTotal ? Math.round(grandScore / grandTotal * 100) : 0;

  document.getElementById("midSummary").textContent = `${midScore} / ${midTotal}`;
  document.getElementById("finalSummary").textContent = `${finalScore} / ${finalTotal}`;
  document.getElementById("grandSummary").textContent = `${grandScore} / ${grandTotal}`;
  document.getElementById("percentage").textContent = `${pct}%`;

  document.getElementById("subjectTable").innerHTML = entries.length ? entries.map(([subject,v])=>{
    const s=v.midScore+v.finalScore, t=v.midTotal+v.finalTotal;
    const sp=t ? Math.round(s/t*100) : 0;
    return `<tr>
      <td><b>${esc(subject)}</b></td>
      <td>${v.midTotal ? v.midScore : "—"}</td><td>${v.midTotal || "—"}</td>
      <td>${v.finalTotal ? v.finalScore : "—"}</td><td>${v.finalTotal || "—"}</td>
      <td><b>${s}</b></td><td>${t || "—"}</td>
    </tr>`;
  }).join("") : `<tr><td colspan="7" class="empty-cell">હજી કોઈ મધ્યસત્ર અથવા વાર્ષિક ગુણ દાખલ થયા નથી.</td></tr>`;

  const sorted = [...valid].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  document.getElementById("historyTable").innerHTML = sorted.length ? sorted.map(r=>{
    const pct = r.total ? Math.round(Number(r.score)/Number(r.total)*100) : 0;
    const label = r.examType === "mid" ? "મધ્યસત્ર પરીક્ષા" : "વાર્ષિક પરીક્ષા";
    return `<tr><td>${label}</td><td>${esc(r.subject || "-")}</td><td>${Number(r.score)||0}</td><td>${Number(r.total)||0}</td><td><b>${pct}%</b></td><td>${esc(r.date || "-")}</td></tr>`;
  }).join("") : `<tr><td colspan="6" class="empty-cell">હજી કોઈ પરીક્ષા ગુણ નથી.</td></tr>`;

  document.getElementById("noResults").style.display = valid.length ? "none" : "block";
}

studentSelect.addEventListener("change", () => {
  localStorage.setItem("marksheetStudent", studentSelect.value);
  history.replaceState(null, "", `result.html?student=${encodeURIComponent(studentSelect.value)}`);
  renderMarksheet(studentSelect.value);
});

document.getElementById("printBtn").addEventListener("click",()=>window.print());
document.getElementById("logoutBtn").addEventListener("click",()=>{
  sessionStorage.clear();
  window.location.href="login.html";
});

renderMarksheet(studentSelect.value);
