let score = 0;
let time = 30;
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const circle = document.getElementById("circle");

function randomPosition() {
  const x = Math.floor(Math.random() * (window.innerWidth - 60));
  const y = Math.floor(Math.random() * (window.innerHeight - 60));
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}

circle.addEventListener("click", () => {
  score++;
  scoreEl.textContent = score;
  randomPosition();
});

const timer = setInterval(() => {
  time--;
  timeEl.textContent = time;
  if (time === 0) {
    clearInterval(timer);
    alert(`Game Over! Your Score: ${score}`);
    circle.style.display = "none";
  }
}, 1000);

randomPosition();
