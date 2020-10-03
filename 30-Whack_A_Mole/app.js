const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startBtn = document.querySelector('#start-btn');
const durationInput = document.querySelector('.duration');
const highscoreEl = document.querySelector('.highscore-value');

let duration = durationInput.value;
let lastHole;
let timeUp = false;
let score;
let timer;

let highScore = localStorage.getItem('score') || 0;
highscoreEl.textContent = highScore;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length)
    const hole = holes[idx];

    // if we get the same hole as previous, call func till we get a different one
    if (hole === lastHole) {
        return randomHole(holes)
    }

    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000); // ms
    const hole = randomHole(holes);
    hole.classList.add('up');

    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    clearInterval(timer);
    duration = Math.abs(parseInt(durationInput.value) * 1000) || 10 * 1000;
    durationInput.value = duration / 1000;

    updateHighScore(scoreBoard.textContent)
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;

    peep();
    timer = setTimeout(() => {
        timeUp = true;
    }, duration);
}

function bonk(e) {
    console.log(e);
    // check if someone is faking a click
    if (e.isTruested) return;

    score++;
    // remove mole immediately when clicked
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

// todo doenst always work for some reson
function updateHighScore(res) {
    console.log('game over: ', res);
    if (res > highscoreEl.innerText) {
        console.log('new hs');
        highscoreEl.textContent = res;
        localStorage.setItem('score', res);
    }
}


moles.forEach(mole => mole.addEventListener('click', bonk))
