const select = document.getElementById("standardSelect");
const cards = document.querySelectorAll(".feature-card");
const panel = document.getElementById("contentPanel");
const panelTitle = document.getElementById("panelTitle");
const panelContent = document.getElementById("panelContent");
const closePanel = document.getElementById("closePanel");
const logoutBtn = document.getElementById("logoutBtn");

const role = sessionStorage.getItem("schoolRole");
const user = sessionStorage.getItem("schoolUser");

if (role !== "student") {
  window.location.href = "login.html";
}

if (user) {
  document.getElementById("studentTop").textContent = user;
  try {
    const students=JSON.parse(localStorage.getItem("schoolStudents") || "[]");
    const found=students.find(s=>s.number===user);
    if(found) select.value=found.standard;
  } catch(error) {}
}

const subjects = [
  ["🪔","ગુજરાતી"],["➗","ગણિત"],["🌍","સામાજિક વિજ્ઞાન"],
  ["🔤","હિન્દી"],["🔠","અંગ્રેજી"],["🔬","વિજ્ઞાન"],
  ["🕉️","સંસ્કૃત"],["💻","કમ્પ્યુટર"]
];

const timetable = {
  "3": {
    "સોમવાર": ["ગણિત","ગણિત","પર્યાવરણ","પર્યાવરણ","ગુજરાતી","ગુજરાતી","શારીરિક શિક્ષણ","શારીરિક શિક્ષણ"],
    "મંગળવાર": ["ગણિત","ગણિત","પર્યાવરણ","પર્યાવરણ","ગુજરાતી","ગુજરાતી","ગુજરાતી","ગુજરાતી"],
    "બુધવાર": ["ગણિત","ગણિત","પર્યાવરણ","પર્યાવરણ","ગુજરાતી","ગુજરાતી","ગુજરાતી","સંગીત"],
    "ગુરુવાર": ["ગણિત","ગણિત","પર્યાવરણ","પર્યાવરણ","ગુજરાતી","ગુજરાતી","ચિત્ર","ચિત્ર"],
    "શુક્રવાર": ["ગણિત","ગણિત","પર્યાવરણ","પર્યાવરણ","ગુજરાતી","ગુજરાતી","પર્યાવરણ","ગણિત"],
    "શનિવાર": ["ગણિત","ગણિત","કાર્યાનુભવ","કાર્યાનુભવ","કાર્યાનુભવ"]
  },
  "4": {
    "સોમવાર": ["ગુજરાતી","ગુજરાતી","ગણિત","ગણિત","પર્યાવરણ","પર્યાવરણ","અંગ્રેજી","અંગ્રેજી"],
    "મંગળવાર": ["ગુજરાતી","ગુજરાતી","ગણિત","ગણિત","પર્યાવરણ","પર્યાવરણ","કાર્યાનુભવ","કાર્યાનુભવ"],
    "બુધવાર": ["ગુજરાતી","ગુજરાતી","ગણિત","ગણિત","પર્યાવરણ","પર્યાવરણ","ચિત્ર","ચિત્ર"],
    "ગુરુવાર": ["ગુજરાતી","ગુજરાતી","ગણિત","ગણિત","પર્યાવરણ","પર્યાવરણ","કાર્યાનુભવ","કાર્યાનુભવ"],
    "શુક્રવાર": ["ગુજરાતી","ગુજરાતી","ગણિત","ગણિત","પર્યાવરણ","પર્યાવરણ","અંગ્રેજી","સંગીત"],
    "શનિવાર": ["ગુજરાતી","ગુજરાતી","ગણિત","ગણિત","શારીરિક શિક્ષણ"]
  },
  "5": {
    "સોમવાર": ["પર્યાવરણ","પર્યાવરણ","ગુજરાતી","ગુજરાતી","ગણિત","ગણિત","કાર્યાનુભવ","કાર્યાનુભવ"],
    "મંગળવાર": ["પર્યાવરણ","પર્યાવરણ","ગુજરાતી","ગુજરાતી","ગણિત","ગણિત","હિન્દી","હિન્દી"],
    "બુધવાર": ["પર્યાવરણ","પર્યાવરણ","ગુજરાતી","ગુજરાતી","ગણિત","ગણિત","શારીરિક શિક્ષણ","શારીરિક શિક્ષણ"],
    "ગુરુવાર": ["પર્યાવરણ","પર્યાવરણ","ગુજરાતી","ગુજરાતી","ગણિત","ગણિત","હિન્દી","હિન્દી"],
    "શુક્રવાર": ["અંગ્રેજી","અંગ્રેજી","ગુજરાતી","ગુજરાતી","ગણિત","ગણિત","હિન્દી","અંગ્રેજી"],
    "શનિવાર": ["પર્યાવરણ","પર્યાવરણ","ચિત્ર","ચિત્ર","સંગીત"]
  }
};

const timetable68 = {
  "6": {
    "સોમવાર": ["ગુજરાતી","ગુજરાતી","સામાજિક વિજ્ઞાન","સામાજિક વિજ્ઞાન","ગણિત","ગણિત","ગુજરાતી","ગીતા"],
    "મંગળવાર": ["ગુજરાતી","ગુજરાતી","સામાજિક વિજ્ઞાન","સામાજિક વિજ્ઞાન","ગણિત","ગણિત","સંસ્કૃત","સંસ્કૃત"],
    "બુધવાર": ["ગુજરાતી","ગુજરાતી","સામાજિક વિજ્ઞાન","સામાજિક વિજ્ઞાન","ગણિત","ગણિત","વિજ્ઞાન","વિજ્ઞાન"],
    "ગુરુવાર": ["અંગ્રેજી","અંગ્રેજી","હિન્દી","હિન્દી","વિજ્ઞાન","વિજ્ઞાન","ગણિત","વિજ્ઞાન"],
    "શુક્રવાર": ["અંગ્રેજી","અંગ્રેજી","હિન્દી","હિન્દી","વિજ્ઞાન","વિજ્ઞાન","રમતગમત","રમતગમત"],
    "શનિવાર": ["અંગ્રેજી","અંગ્રેજી","હિન્દી","કમ્પ્યુટર","લાઇબ્રેરી"]
  },
  "7": {
    "સોમવાર": ["ગણિત","ગણિત","ગુજરાતી","ગુજરાતી","સામાજિક વિજ્ઞાન","સામાજિક વિજ્ઞાન","ગણિત","વિજ્ઞાન"],
    "મંગળવાર": ["ગણિત","ગણિત","ગુજરાતી","ગુજરાતી","સામાજિક વિજ્ઞાન","સામાજિક વિજ્ઞાન","લાઇબ્રેરી","હિન્દી"],
    "બુધવાર": ["ગણિત","ગણિત","ગુજરાતી","ગુજરાતી","સામાજિક વિજ્ઞાન","સામાજિક વિજ્ઞાન","લાઇબ્રેરી","કમ્પ્યુટર"],
    "ગુરુવાર": ["વિજ્ઞાન","વિજ્ઞાન","અંગ્રેજી","અંગ્રેજી","હિન્દી","હિન્દી","સંસ્કૃત","સંસ્કૃત"],
    "શુક્રવાર": ["વિજ્ઞાન","વિજ્ઞાન","અંગ્રેજી","અંગ્રેજી","હિન્દી","હિન્દી","ગુજરાતી","ગીતા"],
    "શનિવાર": ["વિજ્ઞાન","વિજ્ઞાન","અંગ્રેજી","અંગ્રેજી","રમતગમત"]
  },
  "8": {
    "સોમવાર": ["સામાજિક વિજ્ઞાન","સામાજિક વિજ્ઞાન","ગણિત","ગણિત","ગુજરાતી","ગુજરાતી","ગીતા","કમ્પ્યુટર"],
    "મંગળવાર": ["સામાજિક વિજ્ઞાન","સામાજિક વિજ્ઞાન","ગણિત","ગણિત","ગુજરાતી","ગુજરાતી","વિજ્ઞાન","ગણિત"],
    "બુધવાર": ["સામાજિક વિજ્ઞાન","સામાજિક વિજ્ઞાન","ગણિત","ગણિત","ગુજરાતી","ગુજરાતી","અંગ્રેજી","અંગ્રેજી"],
    "ગુરુવાર": ["હિન્દી","હિન્દી","વિજ્ઞાન","વિજ્ઞાન","અંગ્રેજી","અંગ્રેજી","લાઇબ્રેરી","રમતગમત"],
    "શુક્રવાર": ["હિન્દી","હિન્દી","વિજ્ઞાન","વિજ્ઞાન","અંગ્રેજી","અંગ્રેજી","સંસ્કૃત","સંસ્કૃત"],
    "શનિવાર": ["હિન્દી","સામાજિક વિજ્ઞાન","વિજ્ઞાન","વિજ્ઞાન","ગુજરાતી"]
  }
};

const icons = ["🪔","➗","🌍","🔤","🔠","🔬","🕉️","💻"];
const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
const safeHref = value => {
  const v=String(value||"").trim();
  return (/^https?:\/\//i.test(v) || /^[^:?#]+\.pdf(?:[?#].*)?$/i.test(v)) ? v : "";
};
const teacherMaterials = () => {
  try { return JSON.parse(localStorage.getItem("studyMaterials") || "[]"); } catch { return []; }
};
const teacherAnnouncements = () => {
  try { return JSON.parse(localStorage.getItem("schoolAnnouncements") || "[]"); } catch { return []; }
};
const currentStudentResults = () => {
  const number=sessionStorage.getItem("schoolUser") || "";
  try {
    const online=JSON.parse(localStorage.getItem("examResults") || "[]")
      .filter(r=>!r.studentNumber || r.studentNumber===number)
      .map(r=>({...r, source:"online", examName:"ઓનલાઈન પરીક્ષા"}));
    const manual=JSON.parse(localStorage.getItem("manualResults") || "[]")
      .filter(r=>r.studentNumber===number)
      .map(r=>({...r, source:"teacher"}));
    return [...online,...manual];
  } catch { return []; }
};


function showSection(section) {
  cards.forEach(card => card.classList.toggle("active", card.dataset.section === section));
  panel.classList.add("open");

  const standard = select.value;

  if (section === "subjects") {
    panelTitle.textContent = `ધોરણ ${standard} — વિષયો`;
    panelContent.innerHTML = `<div class="subject-grid">${subjects.map((s,i) =>
      `<div class="subject"><span>${s[0]}</span>${s[1]}</div>`).join("")}</div>`;
  }

  if (section === "timetable") {
    panelTitle.textContent = `ધોરણ ${standard} — ટાઈમટેબલ`;
    const selectedTimetable = timetable[standard] || timetable68[standard];

    if (!selectedTimetable) {
      panelContent.innerHTML = `<div class="empty">🕐 ધોરણ ${standard}નું ટાઈમટેબલ હજી ઉમેરવામાં આવ્યું નથી.</div>`;
    } else {
      const weekdays = ["સોમવાર","મંગળવાર","બુધવાર","ગુરુવાર","શુક્રવાર"];
      const periods = [
        ["1","11:20 AM – 11:55 AM"],
        ["2","11:55 AM – 12:30 PM"],
        ["3","12:55 PM – 01:30 PM"],
        ["4","01:30 PM – 02:05 PM"],
        ["5","02:30 PM – 03:05 PM"],
        ["6","03:05 PM – 03:40 PM"],
        ["7","03:50 PM – 04:25 PM"],
        ["8","04:25 PM – 05:00 PM"]
      ];

      let rows = weekdays.map(day => {
        const vals = selectedTimetable[day];
        return `<tr><th>${day}</th>${vals.map(v => `<td>${v}</td>`).join("")}</tr>`;
      }).join("");

      const saturday = selectedTimetable["શનિવાર"];
      rows += `<tr class="saturday-row"><th>શનિવાર</th>${saturday.map(v => `<td>${v}</td>`).join("")}<td colspan="3">મધ્યાહન ભોજન 11:00 – 11:20 AM</td></tr>`;

      panelContent.innerHTML = `
        <div class="info-box schedule-note">
          <b>શાળા શરૂ / પ્રાર્થના:</b> સોમવાર–શુક્રવાર 10:30 AM – 11:20 AM &nbsp; • &nbsp;
          <b>મધ્યાહન ભોજન:</b> 12:30 PM – 12:55 PM &nbsp; • &nbsp;
          <b>મોટી રિશેષ:</b> 02:05 PM – 02:30 PM &nbsp; • &nbsp;
          <b>નાની રિશેષ:</b> 03:40 PM – 03:50 PM
          ${["6","7","8"].includes(standard) ? " &nbsp; • &nbsp; <b>શનિવાર:</b> પ્રાર્થના 07:15 AM – 08:00 AM" : ""}
        </div>
        <div class="table-wrap timetable-wrap">
          <table class="school-timetable">
            <thead>
              <tr><th>દિવસ</th>${periods.map(p => `<th>પિરિયડ ${p[0]}<small>${p[1]}</small></th>`).join("")}</tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <div class="info-box saturday-note">
          <b>શનિવાર:</b>
          ${["6","7","8"].includes(standard)
            ? "પ્રાર્થના 07:15 AM – 08:00 AM • પિરિયડ 1: 08:00–08:35 AM • પિરિયડ 2: 08:35–09:05 AM • પિરિયડ 3: 09:05–09:35 AM • રિશેષ 09:35–09:55 AM • પિરિયડ 4: 09:55–10:30 AM • પિરિયડ 5: 10:30–11:00 AM • મધ્યાહન ભોજન 11:00–11:20 AM"
            : "પ્રાર્થના 07:15 AM – 08:00 AM • પિરિયડ 1–5: 08:00 AM – 11:00 AM • મધ્યાહન ભોજન 11:00 AM – 11:20 AM"}
        </div>`;
    }
  }

  if (section === "books") {
    panelTitle.textContent = `ધોરણ ${standard} — ટેક્સ્ટબુક`;
    const materials=teacherMaterials().filter(m=>String(m.standard)===String(standard));
    const teacherHtml=materials.map(m=>{
      const href=safeHref(m.url);
      return `<article class="book"><div class="book-icon">📘</div><h3>${escapeHtml(m.title)}</h3>
        <p>${escapeHtml(m.subject)} • ધોરણ ${escapeHtml(m.standard)}</p>
        ${href ? `<a class="book-link" href="${escapeHtml(href)}" target="_blank" rel="noopener">PDF / લિંક ખોલો →</a>` : `<span class="disabled-btn">લિંક ઉપલબ્ધ નથી</span>`}</article>`;
    }).join("");
    const placeholders=subjects.map((s,i)=>
      `<article class="book"><div class="book-icon">${icons[i]}</div><h3>${escapeHtml(s[1])}</h3>
      <p>ધોરણ ${escapeHtml(standard)} માટેનું પાઠ્યપુસ્તક PDF.</p>
      <span class="disabled-btn">હજી ઉમેરવાનું બાકી</span></article>`
    ).join("");
    panelContent.innerHTML = `<div class="book-grid">${teacherHtml}${materials.length ? "" : placeholders}</div>`;
  }

  if (section === "exam") {
    window.location.href = "exam.html"; return;
  }

  if (section === "result") {
    window.location.href = "result-view.html"; return;
  }

  if (section === "notice") {
    panelTitle.textContent = "શાળાની જાહેરાતો";
    const custom=teacherAnnouncements();
    const defaults=`
      <div class="notice"><strong>📢 વિદ્યાર્થી પોર્ટલ શરૂ</strong><p>ડિજિટલ સ્કૂલ પોર્ટલનું વિદ્યાર્થી વિભાગ તૈયાર કરવામાં આવ્યું છે.</p></div>
      <div class="notice"><strong>📚 અભ્યાસ સામગ્રી</strong><p>શિક્ષક પોર્ટલમાંથી ઉમેરાયેલી સામગ્રી અહીં દેખાશે.</p></div>
      <div class="notice"><strong>📝 ઓનલાઈન પરીક્ષા</strong><p>MCQ પરીક્ષા ઉપલબ્ધ હોય ત્યારે અહીંથી પરીક્ષા આપી શકાશે.</p></div>`;
    const customHtml=custom.map(a=>`<div class="notice"><strong>📢 ${escapeHtml(a.title)}</strong><p>${escapeHtml(a.body)}</p><small>${escapeHtml(a.date||"")}</small></div>`).join("");
    panelContent.innerHTML = defaults + customHtml;
  }

  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

cards.forEach(card => card.addEventListener("click", () => showSection(card.dataset.section)));

select.addEventListener("change", () => {
  localStorage.setItem("selectedStandard", select.value);
  const active = document.querySelector(".feature-card.active");
  if (active) showSection(active.dataset.section);
});

closePanel.addEventListener("click", () => {
  panel.classList.remove("open");
  cards.forEach(card => card.classList.remove("active"));
});

logoutBtn.addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "login.html";
});

showSection("subjects");
