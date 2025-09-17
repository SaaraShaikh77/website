/* jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", () => {

  const introScreen = document.getElementById("intro-screen");
  const mainContent = document.getElementById("main-content");
  const bgMusic = document.getElementById("bg-music");

  // ---------- Intro Screen Transition ----------
  setTimeout(() => {
    introScreen.classList.add("fade-out");
    setTimeout(() => {
      introScreen.style.display = "none";
      mainContent.style.display = "block";
      mainContent.classList.add("fade-in");

      // Play background music safely
      bgMusic.play().catch(() => {
        document.body.addEventListener("click", () => bgMusic.play(), { once: true });
      });
    }, 1000);
  }, 5000);

  // ---------- Floating Elements ----------
  function createFloatingElement(type) {
    if (document.querySelectorAll(`.${type}`).length > 30) return;
    const elem = document.createElement("div");
    elem.className = type;
    elem.style.left = Math.random() * window.innerWidth + "px";
    elem.style.top = Math.random() * window.innerHeight + "px";
    document.body.appendChild(elem);
    setTimeout(() => { elem.remove(); }, 8000);
  }

  setInterval(() => { createFloatingElement("star"); }, 500);
  setInterval(() => { createFloatingElement("dew"); }, 1500);
  setInterval(() => { createFloatingElement("heart"); }, 1000);

  // ---------- Snap Modal ----------
  const snapModal = document.getElementById("snap-modal");
  const snapBtn = document.getElementById("play-snap");
  const snapClose = snapModal.querySelector(".close");
  const snapVideo = document.getElementById("snap-video");

  snapBtn.addEventListener("click", () => {
    snapModal.style.display = "flex";
    snapVideo.play();
  });

  snapClose.addEventListener("click", () => {
    snapModal.style.display = "none";
    snapVideo.pause();
    snapVideo.currentTime = 0;
  });

  window.addEventListener("click", (e) => {
    if (e.target === snapModal) {
      snapModal.style.display = "none";
      snapVideo.pause();
      snapVideo.currentTime = 0;
    }
  });

  // ---------- Image Slider ----------
  let slideIndex = 0;
  const slides = document.querySelector(".slides");
  const totalSlides = document.querySelectorAll(".slides img").length;

  function showSlide(index) {
    if (index >= totalSlides) { slideIndex = 0; }
    else if (index < 0) { slideIndex = totalSlides - 1; }
    else { slideIndex = index; }
    slides.style.transform = "translateX(" + (-slideIndex * 100) + "%)";
  }

  document.querySelector(".next").addEventListener("click", () => { showSlide(slideIndex + 1); });
  document.querySelector(".prev").addEventListener("click", () => { showSlide(slideIndex - 1); });

  // Swipe support for mobile
  let startX = 0;
  slides.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; });
  slides.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) { showSlide(slideIndex + 1); }
    if (endX - startX > 50) { showSlide(slideIndex - 1); }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { showSlide(slideIndex - 1); }
    if (e.key === "ArrowRight") { showSlide(slideIndex + 1); }
  });

  showSlide(slideIndex);

});

