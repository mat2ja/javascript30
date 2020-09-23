const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

navigator.geolocation.watchPosition((data) => {
    console.log(data);
    speed.textContent = Math.round(data.coords.speed) || 0;
    arrow.style.transform =`rotate(${data.coords.heading}deg)`
}, (err) => {
    console.log(err);
    alert('HEY! ALLOW LOCATION IMMEDIATELY!')
});
