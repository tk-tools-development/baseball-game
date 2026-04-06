const canvas = document.getElementById("gameCanvas");
  y: 220,
  width: 10,
  height: 60
};

let score = 0;
let swinging = false;

function drawField() {
  ctx.fillStyle = "#0b6623";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function drawBat() {
  ctx.fillStyle = "brown";
  ctx.fillRect(bat.x, bat.y, bat.width, bat.height);
}

function updateBall() {
  if (!ball.active) return;

  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // Reset if missed
  if (ball.x > canvas.width) {
    resetBall();
    statusText.textContent = "Missed! Try again.";
  }

  // Collision with bat
  if (
    ball.x + ball.radius > bat.x &&
    ball.y > bat.y &&
    ball.y < bat.y + bat.height
  ) {
    if (swinging) {
      score++;
      scoreText.textContent = "Score: " + score;
      statusText.textContent = "Nice hit!";
      ball.speedX = -6;
      ball.speedY = (Math.random() - 0.5) * 4;
      ball.active = false;
      setTimeout(resetBall, 1000);
    }
  }
}

function resetBall() {
  ball.x = 100;
  ball.y = 200 + Math.random() * 100;
  ball.speedX = 4;
  ball.speedY = 0;
  ball.active = true;
  swinging = false;
}

swingBtn.addEventListener("click", () => {
  swinging = true;
  statusText.textContent = "Swinging!";
});

function gameLoop() {
  drawField();
  drawBall();
  drawBat();
  updateBall();
  requestAnimationFrame(gameLoop);
}

gameLoop();
