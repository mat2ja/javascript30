const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const shutter = document.querySelector('#shutter');
const filterElements = document.querySelectorAll('.filter');

function getVideo() {
    // returns a promise
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        // ask permision for caemera access
        .then(localMediaStream => {
            // video.src = window.URL.createObjectURL(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.log(`YOU DENIED ME`, err);
        })
}

function paintToCanvas(effect) {
    // this is actually the resolution dimensions, not our specified
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;


    // good to return it so we can stop it later 
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        // take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);

        // modify pixels
        if (effect) {
            pixels = effect(pixels)
        }


        // pixels = greenScreen(pixels);

        // put pixels back
        ctx.putImageData(pixels, 0, 0)
    }, 16)
}

function takePhoto() {
    // play the sound
    snap.currentTime = 0;
    snap.play();

    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome.jpeg')
    link.innerHTML = `<img src='${data}' alt='Handsome man'>`
    strip.insertBefore(link, strip.firstChild);
}

const filters = {
    redEffect(pixels) {
        for (let i = 0; i < pixels.data.length; i += 4) {
            pixels.data[i + 0] += 100// RED
            pixels.data[i + 1] -= 50 // GREEN
            pixels.data[i + 2] *= 0.5 // BLUE
            // pixels[i + 3] // APLHA
        }
        return pixels;
    },

    rgbSplit(pixels) {
        for (let i = 0; i < pixels.data.length; i += 4) {
            pixels.data[i - 150] = pixels.data[i + 0]// RED
            pixels.data[i + 500] = pixels.data[i + 1] // GREEN
            pixels.data[i - 150] = pixels.data[i + 2]// BLUE
        }
        ctx.globalAlpha = 0.1;
        return pixels;
    },

    blueLight(pixels) {
        for (let i = 0; i < pixels.data.length; i += 4) {
            for (let i = 0; i < pixels.data.length; i += 4) {
                pixels.data[i + 0] *= 0.6 // RED
                pixels.data[i + 1] += 20 // GREEN
                pixels.data[i + 2] += 120 // BLUE

            }
            return pixels;
        }
        return pixels;
    },

    nightVision(pixels) {
        for (let i = 0; i < pixels.data.length; i += 4) {
            for (let i = 0; i < pixels.data.length; i += 4) {
                pixels.data[i + 0] *= 0.299// RED
                pixels.data[i + 1] *= 0.587 // GREEN
                pixels.data[i + 2] *= 0.114 // BLUE

            }
            return pixels;
        }
        return pixels;
    }
}




function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });


    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}



getVideo();
shutter.addEventListener('click', takePhoto);
window.addEventListener('keyup', (e) => {
    console.log(e);
    if (e.code === 'Enter') {
        takePhoto();
    }
})

let intervalId;
// waits till video can be play
video.addEventListener('canplay', () => {
    intervalId = paintToCanvas();
    return;
});

filterElements.forEach(filter => {
    filter.addEventListener('click', () => {
        console.log(filter);
        clearInterval(intervalId);
        if (filter.id === 'filter-reset') {
            intervalId = paintToCanvas(null);
        } else {
            intervalId = paintToCanvas(filters[filter.dataset.effect])
        }
    })
})