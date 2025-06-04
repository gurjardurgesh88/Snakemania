// Game constants and variables
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio(`music/food.mp3`);
const gameoversound = new Audio(`music/gameover.mp3`);
const movesound = new Audio(`music/move.mp3`);
const musicsound = new Audio(`music/music.mp3`);
let score = 0;
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

// Game functions

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // If snake bumps into itself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // If snake bumps into walls
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  // Part 1: update snake array and score
  if (isCollide(snakeArr)) {
    gameoversound.play();
    musicsound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game over! Press OK or Enter key to play again.");
    snakeArr = [{ x: 13, y: 15 }];
    musicsound.play();
    score = 0;
  }

  // If snake eats the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodsound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "Hi score:" + hiscoreval;
    }
    scoreBox.innerHTML = "SCORE:" + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Move the snake body
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    musicsound.play();
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: display the snake and food
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // Display the food
  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Main logic start here
let hiscore = localStorage.getItem("hiscore");
let hiscoreval;
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "Hi score:" + hiscoreval;
}

window.requestAnimationFrame(main);

// Keyboard arrow keys for desktop
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // start the game
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
  }
});

// Mobile arrow buttons controls
const upBtn = document.getElementById("upBtn");
const downBtn = document.getElementById("downBtn");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

function playMoveSound() {
  movesound.play();
}

upBtn.addEventListener("click", () => {
  inputDir = { x: 0, y: -1 };
  playMoveSound();
});

downBtn.addEventListener("click", () => {
  inputDir = { x: 0, y: 1 };
  playMoveSound();
});

leftBtn.addEventListener("click", () => {
  inputDir = { x: -1, y: 0 };
  playMoveSound();
});

rightBtn.addEventListener("click", () => {
  inputDir = { x: 1, y: 0 };
  playMoveSound();
});
