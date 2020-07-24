// https://2-clock.vercel.app

const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');



function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const mins = now.getMinutes();
    const hours = now.getHours();

    const secondsDegrees = ((seconds / 60) * 360) + 90; // we off-setted it 90deg by default
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const minsDegrees = ((mins / 60) * 360) + 90;
    minHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hoursDegrees = ((hours / 60) * 360) + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;


    console.log(`${hours}:${mins}:${seconds}`);

    //TODO bug when passing 360degrees

}

setInterval(setDate, 1000)
