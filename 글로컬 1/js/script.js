const gb = document.getElementById("gb");
const rb = document.getElementById("rb");
const ljm = document.getElementById("img2");

gb.onclick = function () {
  const overlay = document.getElementById("fade-overlay");
  overlay.classList.add("visible");
  setTimeout(() => {
    window.location.href = "sibal.html";
  }, 800); // transition 시간과 동일하게
};

rb.onclick = function () {
  ljm.style.display = "block";
  setTimeout(() => {
    ljm.classList.add("visible");
  }, 10); // 약간의 딜레이로 transition 작동 보장
};

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
