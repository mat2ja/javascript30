const timeNodes = [...document.querySelectorAll('[data-time]')];

const seconds = timeNodes
    .map(node => node.dataset.time) // [ "5:43", "2:33", "3:45",... ]
    .map(timeCode => {
        const [mins, secs] = timeCode.split(':').map(parseFloat);
        return (mins * 60) + secs;
    }) // [343, 153, 225,...]
    .reduce((total, secs) => total + secs); // 17939



function formatTime(seconds) {
    let secondsLeft = seconds;

    const hours = Math.trunc(secondsLeft / 3600);
    secondsLeft %= 3600; // ostatak nakon dijeljenja sa 3600
    const minutes = Math.trunc(secondsLeft / 60);
    secondsLeft %= 60; // ostatak nakon dijeljenja sa 60

    return (
        `${hours} hours, ${minutes} minutes and ${secondsLeft} seconds`
    )
}

const seconds2 = timeNodes.reduce((total, current) => {
    let timeCode = current.dataset.time;
    const [mins, secs] = timeCode.split(':').map(parseFloat);
    let seconds = (mins * 60) + secs;
    return total + seconds;
}, 0)

console.log(formatTime(seconds));
console.log(formatTime(seconds2));

// function extractNumber(el) {
//     return parseFloat(el.dataset.time.replace(':', '.'));
// }
// let total = timeNodes.reduce((a, b) => a + extractNumber(b), 0)
// 286.18

