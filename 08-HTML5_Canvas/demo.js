// Rectangles
ctx.fillStyle = 'rgb(200, 0, 0)';
ctx.fillRect(100, 100, 100, 100);

ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
ctx.fillRect(130, 130, 100, 100);

ctx.clearRect(110, 110, 30, 30);

ctx.strokeStyle = 'white'
ctx.strokeRect(180, 180, 100, 100);

// Paths
// Create a new path
ctx.fillStyle = 'yellow';

ctx.beginPath();
ctx.moveTo(375, 50);
ctx.lineTo(420, 95);
ctx.lineTo(420, 25);
// ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
ctx.moveTo(110, 75);
ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
// remove moveTo to see connecting lines
ctx.moveTo(65, 65);
ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
ctx.moveTo(95, 65);
ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
ctx.stroke();

// Filled triangle
ctx.beginPath();
ctx.moveTo(325, 325);
ctx.lineTo(405, 325);
ctx.lineTo(325, 405);
ctx.fill();

// Stroked triangle
ctx.beginPath();
ctx.moveTo(425, 425);
ctx.lineTo(425, 345);
ctx.lineTo(345, 425);
ctx.closePath();
ctx.stroke();