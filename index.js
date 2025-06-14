let inputDir = { x: 0, y: 0 };
const foodsound = new Audio("music/food.mp3");
const gameoversound = new Audio("music/gameover.mp3");
const movesound = new Audio("music/move.mp3");
const musicsound = new Audio("music/music.mp3");

let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

document.body.addEventListener(
  "click",
  () => {
    musicsound.play();
  },
  { once: true }
);

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  return (
    snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0
  );
}

function gameEngine() {
  if (isCollide(snakeArr)) {
    gameoversound.play();
    musicsound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over! Tap or press a key to restart.");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    musicsound.play();
    scoreBox.innerHTML = "SCORE: " + score;
  }

  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodsound.play();
    score++;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "Hi Score: " + hiscoreval;
    }
    scoreBox.innerHTML = "SCORE: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });

    let a = 2,
      b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  board.innerHTML = "";

  snakeArr.forEach((e, i) => {
    let el = document.createElement("div");
    el.style.gridRowStart = e.y;
    el.style.gridColumnStart = e.x;
    el.classList.add(i === 0 ? "head" : "snake");
    board.appendChild(el);
  });

  const foodEl = document.createElement("div");
  foodEl.style.gridRowStart = food.y;
  foodEl.style.gridColumnStart = food.x;
  foodEl.classList.add("food");
  board.appendChild(foodEl);
}

// Hi-score setup
let hiscore = localStorage.getItem("hiscore");
let hiscoreval = hiscore ? JSON.parse(hiscore) : 0;
localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
hiscoreBox.innerHTML = "Hi Score: " + hiscoreval;

window.requestAnimationFrame(main);

// Keyboard
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      inputDir = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      inputDir = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      inputDir = { x: 1, y: 0 };
      break;
  }
});

// Mobile
document.getElementById("upBtn").onclick = () => {
  inputDir = { x: 0, y: -1 };
  movesound.play();
};
document.getElementById("downBtn").onclick = () => {
  inputDir = { x: 0, y: 1 };
  movesound.play();
};
document.getElementById("leftBtn").onclick = () => {
  inputDir = { x: -1, y: 0 };
  movesound.play();
};
document.getElementById("rightBtn").onclick = () => {
  inputDir = { x: 1, y: 0 };
  movesound.play();
};
