let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const formatToggle = document.querySelector('.format-toggle');
let timeFormat = 24;

function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then, { timeFormat });

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        // display it
        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp, { timeFormat = 24 }) {
    const end = new Date(timestamp);
    let hour = end.getHours();
    const minutes = end.getMinutes();

    if (timeFormat === 12) {
        hour = hour > 12 ? hour - 12 : hour;
    }

    endTime.innerHTML = `Be Back At <span class='hl'>${hour}:${minutes < 10 ? '0' : ''}${minutes}</span>`
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    console.log(seconds);
    timer(seconds);
}

function showErrorMsg(msg, emoji) {
    document.customForm.reset();
    clearInterval(countdown);
    timerDisplay.textContent = '';
    document.title = emoji;
    endTime.innerHTML = `<span class='error'>${emoji} ${msg} ${emoji}</span>`;
}

buttons.forEach(button => button.addEventListener('click', startTimer));

// if element has a name property, we can selecting it like that
// even nest names inside names > document.customForm.minutes
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = parseFloat(this.minutes.value);
    if (!mins) {
        showErrorMsg('How about a number tho?', '❌');
        throw new Error('Not a number');
    }
    if (mins > 1440) {
        showErrorMsg('You\'re planning too far ahead', '🪂');
        throw new Error('Number out of range');
    }
    timer(mins * 60);
    this.reset();
    console.log(mins);
})

formatToggle.addEventListener('click', () => {
    timeFormat = timeFormat === 24 ? 12 : 24;
    formatToggle.innerHTML = `${timeFormat}<span>hr</span>`;
})