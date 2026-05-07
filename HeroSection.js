let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.addEventListener("scroll", () => {
  let top = window.scrollY;

  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {

      // alisin lahat ng active
      navLinks.forEach(link => {
        link.classList.remove("active");
      });

      // lagay sa current section lang
      let activeLink = document.querySelector(`header nav a[href="#${id}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggleTheme");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    toggleBtn.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
});