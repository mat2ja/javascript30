const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const shutter = document.querySelector('#shutter');

function getVideo() {
    // returns a promise
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        // ask permision for caemera access
        .then(localMediaStream => {
            console.log(localMediaStream);
            // video.src = window.URL.createObjectURL(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.log(`YOU DENIED ME`, err);
        })
}

function painToCanvas() {
    // this is actually the resolution dimensions, not our specified
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    // good to return it so we can stop it later 
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
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



getVideo();
shutter.addEventListener('click', takePhoto);

// waits till video can be play
video.addEventListener('canplay', painToCanvas);