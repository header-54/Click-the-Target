const gameArea = document.getElementById("gameArea");
const target = document.getElementById("target");

const startScreen = document.getElementById("startScreen");
const gameOver = document.getElementById("gameOver");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const missesDisplay = document.getElementById("misses");
const accuracyDisplay = document.getElementById("accuracy");

const finalScore = document.getElementById("finalScore");


let score = 0;
let misses = 0;
let time = 30;

let gameRunning = false;

let timerInterval;

let totalClicks = 0;


/* =========================
   START GAME
========================= */

function startGame() {

    score = 0;
    misses = 0;
    time = 30;
    totalClicks = 0;

    gameRunning = true;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;
    missesDisplay.textContent = misses;
    accuracyDisplay.textContent = "100%";

    startScreen.classList.add("hidden");
    gameOver.classList.add("hidden");

    target.classList.remove("hidden");

    moveTarget();

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        time--;

        timeDisplay.textContent = time;

        if (time <= 0) {
            endGame();
        }

    }, 1000);
}


/* =========================
   MOVE TARGET
========================= */

function moveTarget() {

    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    const targetSize = target.offsetWidth;

    const x =
        Math.random() *
        (areaWidth - targetSize * 2)
        + targetSize;

    const y =
        Math.random() *
        (areaHeight - targetSize * 2)
        + targetSize;

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}


/* =========================
   TARGET CLICK
========================= */

target.addEventListener("click", function(event) {

    if (!gameRunning) return;

    event.stopPropagation();

    score++;

    totalClicks++;

    scoreDisplay.textContent = score;

    updateAccuracy();

    moveTarget();

    increaseDifficulty();

});


/* =========================
   MISS CLICK
========================= */

gameArea.addEventListener("click", function(event) {

    if (!gameRunning) return;

    if (event.target === target) return;

    misses++;

    totalClicks++;

    missesDisplay.textContent = misses;

    updateAccuracy();

});


/* =========================
   ACCURACY
========================= */

function updateAccuracy() {

    if (totalClicks === 0) {

        accuracyDisplay.textContent = "100%";

        return;
    }

    const accuracy =
        Math.round(
            (score / totalClicks) * 100
        );

    accuracyDisplay.textContent =
        `${accuracy}%`;
}


/* =========================
   DIFFICULTY
========================= */

function increaseDifficulty() {

    if (score >= 10) {

        target.style.width = "64px";
        target.style.height = "64px";

    }

    if (score >= 20) {

        target.style.width = "55px";
        target.style.height = "55px";

    }

    if (score >= 30) {

        target.style.width = "48px";
        target.style.height = "48px";

    }
}


/* =========================
   END GAME
========================= */

function endGame() {

    gameRunning = false;

    clearInterval(timerInterval);

    target.classList.add("hidden");

    gameOver.classList.remove("hidden");

    finalScore.textContent = score;
}


/* =========================
   BUTTONS
========================= */

startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", startGame);