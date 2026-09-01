const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const languageBtn = document.getElementById("languageBtn");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

let english = false;

languageBtn.addEventListener("click", () => {
  english = !english;

  document.querySelectorAll("[data-gu]").forEach(el => {
    el.textContent = english ? el.dataset.en : el.dataset.gu;
  });

  languageBtn.textContent = english ? "ગુજરાતી" : "English";
  document.documentElement.lang = english ? "en" : "gu";
});

function comingSoon(event) {
  event.preventDefault();
  alert("આ સુવિધા Step 2/3 માં ચાલુ કરીશું. / We will activate this feature in Step 2/3.");
}

document.getElementById("year").textContent = new Date().getFullYear();
