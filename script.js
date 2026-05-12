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

const canvas = document.getElementById("bgSketch"); 
const ctx = canvas.getContext("2d");

// resize
function resizeCanvas(){
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// drawing variables
let drawing = false;
let paths = [];
let currentPath = [];

// mouse down
canvas.addEventListener("mousedown", (e)=>{

  drawing = true;

  currentPath = [];

  currentPath.push({
    x:e.offsetX,
    y:e.offsetY
  });

});

// mouse move
canvas.addEventListener("mousemove", (e)=>{

  if(!drawing) return;

  currentPath.push({
    x:e.offsetX,
    y:e.offsetY
  });

});

// mouse up
window.addEventListener("mouseup", ()=>{

  if(currentPath.length > 0){

    paths.push({
      points:[...currentPath],
      time:Date.now()
    });

  }

  drawing = false;

});

// mobile touch start
canvas.addEventListener("touchstart",(e)=>{

  drawing = true;

  currentPath = [];

  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];

  currentPath.push({
    x:touch.clientX - rect.left,
    y:touch.clientY - rect.top
  });

});

// mobile touch move
canvas.addEventListener("touchmove",(e)=>{

  if(!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];

  currentPath.push({
    x:touch.clientX - rect.left,
    y:touch.clientY - rect.top
  });

});

// mobile touch end
canvas.addEventListener("touchend",()=>{

  if(currentPath.length > 0){

    paths.push({
      points:[...currentPath],
      time:Date.now()
    });

  }

  drawing = false;

});

// draw path
function drawPath(path){

  const pts = path.points;

  if(pts.length < 2) return;

  // age
  const age = Date.now() - path.time;

  // fade in 3 sec
  const opacity = 1 - (age / 3000);

  ctx.beginPath();

  ctx.moveTo(pts[0].x, pts[0].y);

  for(let i = 1; i < pts.length; i++){
    ctx.lineTo(pts[i].x, pts[i].y);
  }

  // neon pink glow
  ctx.strokeStyle = `rgba(255, 77, 166, ${opacity})`;

  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.shadowColor = `rgba(255, 77, 166, ${opacity})`;
  ctx.shadowBlur = 20;

  ctx.stroke();
}

// animation loop
function animate(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  const now = Date.now();

  // remove after 3 sec
  paths = paths.filter(path => now - path.time < 3000);

  // draw all
  paths.forEach(drawPath);

  // habang nagddrawing realtime
  if(currentPath.length > 1){

    drawPath({
      points:currentPath,
      time:Date.now()
    });

  }

  requestAnimationFrame(animate);
}

animate();

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let current = 2;
let autoSlide;

/*Upper Slider---------------------*/
function updateSlider(){
    slides.forEach(slide => slide.className = "slide");
    dots.forEach(dot => dot.classList.remove("active-dot"));

    slides[current].classList.add("active");
    dots[current].classList.add("active-dot");

    let left1 = (current - 1 + slides.length) % slides.length;
    let left2 = (current - 2 + slides.length) % slides.length;

    let right1 = (current + 1) % slides.length;
    let right2 = (current + 2) % slides.length;

    slides[left1].classList.add("left-1");
    slides[left2].classList.add("left-2");

    slides[right1].classList.add("right-1");
    slides[right2].classList.add("right-2");
}

/*Function ng NEXT------------------*/
function nextSlide(){
    current++;
    if(current >= slides.length) current = 0;
    updateSlider();
    resetAuto();
}

/*Prev Slide-----------------------------*/
function prevSlide(){
    current--;
    if(current < 0) current=slides.length-1;     
    updateSlider();
    resetAuto();
}

/*Auto Slide-------------*/
function startAuto(){
    autoSlide = setInterval(nextSlide, 3000);
}

function resetAuto(){
    clearInterval(autoSlide);
    startAuto();
}

/*For Buttons-----------------*/
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

updateSlider();
startAuto();
