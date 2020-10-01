const slider = document.querySelector('.items');

let isDown = false;
let startX; // coords of when we clicked
let scrollLeft; // how much we scrolled

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');

    // offsets by possible margin of the slider
    startX = e.pageX - slider.offsetLeft; // coords of where we clicked
    scrollLeft = slider.scrollLeft; // how much we scrolled

})
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');

})
slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
})
slider.addEventListener('mousemove', (e) => {
    e.preventDefault(); // stop selecting text and alike
    if (!isDown) return; // stop the function from running

    const x = e.pageX - slider.offsetLeft
    const walk = (x - startX) * 2; // distance of where we clicked and released
    // move for the distance we walked, we save scrollLeft of when we click so we can continue without resetting the position
    slider.scrollLeft = scrollLeft - walk;
    console.log({ scrollLeft, walk });
})