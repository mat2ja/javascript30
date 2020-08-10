const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round'; // Create a rounded corner when the two lines meet
ctx.lineCap = 'round';
ctx.lineWidth = 20;

// ctx.globalCompositeOperation = 'xor';
// ctx.globalCompositeOperation = 'hue';
ctx.globalCompositeOperation = 'color';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    // Stop the function from running when they are not moused down
    if (!isDrawing) return;

    hue = hue % 360;
    ctx.strokeStyle = `hsl(${hue}, 90%, 70%)`

    ctx.beginPath();
    // Start from
    ctx.moveTo(lastX, lastY);
    // Go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;

    if (ctx.lineWidth >= 70 || ctx.lineWidth < 20) {
        direction = !direction;
    }

    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
    console.log('line width', ctx.lineWidth);
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    // get new coordinates on each mousedown
    [lastX, lastY] = [e.offsetX, e.offsetY];

});
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);


