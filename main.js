const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 510;
canvas.height = 500;

//variables globales
const startX = canvas.width / 2;
const startY = 1;
const endY = canvas.height;

const ballRadius = 4;
let x = canvas.width / 2;
let y = canvas.height / 2;

/* VARIABLES DE LA PALETA */
const PADDLE_SENSITIVITY = 8;

const paddleWidth = 10;
const paddleHeight = 60;

let paddleX = canvas.width - 489;
let paddleY = canvas.height / 2 - 30;

let paddleX2 = canvas.width - 35;
let paddleY2 = canvas.height / 2 - 30;

let dx = 4;
let dy = 0.2;

//point
let player1Score = 0;
let player2Score = 0;

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawLine() {
  ctx.beginPath();
  ctx.setLineDash([40, 20]);
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX, endY);
  ctx.strokeStyle = "#fff";
  ctx.stroke();
  ctx.closePath();
}

function drawPoint({ tag, value = 0 }) {
  ctx.fillStyle = "#fff";
  ctx.font = "30px Arial";
  ctx.fillStyle = "#fff";

  if (tag === "player1") {
    ctx.fillText(value.toString(), startX / 2, 40);
  }

  if (tag === "player2") {
    ctx.fillText(value.toString(), (startX + 548) / 2, 40);
  }

  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawPlayer({ tag }) {
  ctx.fillStyle = "#fff";

  if (tag === "player1") {
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
  }

  if (tag === "player2") {
    ctx.fillRect(paddleX2, paddleY2, paddleWidth, paddleHeight);
  }

  ctx.closePath();
}

function resetBall() {
  x = canvas.width / 2;
  y = canvas.height / 2;
  dx = -dx;
}

function moveBall() {
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  const isBallSameXAsPaddle =
    x - ballRadius < paddleX + paddleWidth &&
    x + ballRadius > paddleX &&
    y > paddleY &&
    y < paddleY + paddleHeight;

  const isBallSameXAsPaddle2 =
    x - ballRadius < paddleX2 + paddleWidth &&
    x + ballRadius > paddleX2 &&
    y > paddleY2 &&
    y < paddleY2 + paddleHeight;

  if (isBallSameXAsPaddle || isBallSameXAsPaddle2) {
    dx = -dx;
  } else if (x + dx > canvas.width - ballRadius) {
    player1Score += 1;
    resetBall();
  } else if (x + dx < ballRadius) {
    player2Score += 1;
    resetBall();
  }

  x += dx;
  y += dy;
}

function isEvent() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "w") {
      paddleY -= 1 + PADDLE_SENSITIVITY;
    }

    if (event.key === "s") {
      paddleY += 1 + PADDLE_SENSITIVITY;
    }

    if (event.key === "ArrowUp") {
      paddleY2 -= 1 + PADDLE_SENSITIVITY;
    }

    if (event.key === "ArrowDown") {
      paddleY2 += 1 + PADDLE_SENSITIVITY;
    }
  });
}

function update() {
  window.requestAnimationFrame(update);
  clearCanvas();

  drawBall();
  drawLine();
  drawPlayer({ tag: "player1" });
  drawPlayer({ tag: "player2" });
  drawPoint({ tag: "player1", value: player1Score });
  drawPoint({ tag: "player2", value: player2Score });

  moveBall();
}

update();
isEvent();
