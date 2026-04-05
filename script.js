let ball = document.getElementById("ball");
let pos = 0;

function moveBall() {
  pos += 6;
  ball.style.left = pos + "px";

  if (pos > 600) pos = 0;
}

setInterval(moveBall, 30);

function swing() {
  if (pos > 250 && pos < 350) {
    document.getElementById("result").innerText = "💥 HOME RUN!";
  } else {
    document.getElementById("result").innerText = "❌ Miss!";
  }
}