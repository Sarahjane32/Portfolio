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
/*for dark and light mode*/
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggleTheme");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    toggleBtn.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
});

/*For Skill card animation control*/
const skillCards = document.querySelectorAll(".skill-card");

window.addEventListener("scroll", () => {

  skillCards.forEach((card) => {

    const top = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      card.style.opacity = "1";
      card.style.transform = "scale(1)";
    }

  });
});
/*for reset animation on load*/
window.addEventListener("load", () => {
  document.querySelectorAll(".skill-card").forEach(card => {
    card.style.opacity = "1";
    card.style.transform = "scale(1)";
  });
});

// ito kinukuha nya lahat ng elements na may animation habang nag sscroll
const reveals = document.querySelectorAll(
  ".profile-top, .about-card, .tech-card"
);

// for Function na magti-trigger ng animation kapag nakita sa screen
function revealOnScroll() {

  reveals.forEach((el) => {

    // taas ng viewport ng user
    const windowHeight = window.innerHeight;

    // position ng element sa screen
    const top = el.getBoundingClientRect().top;

    // kapag nasa visible part na ng screen
    if (top < windowHeight - 100) {

      // mag aadd ng class para mag-start ang animation
      el.classList.add("active");

    }
  });
}

// kapag nag scroll, tatakbo yung function
window.addEventListener("scroll", revealOnScroll);

// kapag unang load ng page, check agad kung visible na
window.addEventListener("load", revealOnScroll);