document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.querySelector("#studentLoginForm");
  const teacherForm = document.querySelector("#teacherLoginForm");
  if (studentForm && !studentForm.dataset.accountWired) {
    studentForm.dataset.accountWired = "1";
  }
  if (teacherForm && !teacherForm.dataset.accountWired) {
    teacherForm.dataset.accountWired = "1";
  }
});
