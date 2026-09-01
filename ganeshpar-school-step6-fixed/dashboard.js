document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("schoolRole") !== "student") {
    window.location.href = "login.html";
    return;
  }
  const num = sessionStorage.getItem("schoolUser") || "";
  const name = sessionStorage.getItem("studentName") || "વિદ્યાર્થી";
  const top = document.getElementById("studentTop");
  const greeting = document.getElementById("studentGreeting");
  if (top) top.textContent = num;
  if (greeting) greeting.textContent = `નમસ્તે ${name}! 👋`;
});
const requiredRole = document.body.dataset.dashboard;
const storedRole = sessionStorage.getItem("schoolRole");
const storedUser = sessionStorage.getItem("schoolUser");

if (storedRole !== requiredRole) {
  window.location.href = "login.html";
}

if (requiredRole === "student" && storedUser) {
  document.getElementById("studentNumber").textContent = storedUser;
}

if (requiredRole === "teacher" && storedUser) {
  document.getElementById("teacherUsername").textContent = storedUser;
}

function logout() {
  sessionStorage.removeItem("schoolRole");
  sessionStorage.removeItem("schoolUser");
  window.location.href = "login.html";
}

function comingSoon(event) {
  event.preventDefault();
  alert("આ સુવિધા આગામી સ્ટેપમાં ચાલુ કરીશું.");
}
