const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
// new instance of speech recognition
const recognition = new speechRecognition();

// live results
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.append(p);

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0].transcript)
        .join('');

    p.textContent = transcript;

    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.append(p);
        console.log(transcript);
    }

    if (transcript.includes('unicorn') && e.results[0].isFinal) {
        // or debounce it
        console.log('🦄🦄🦄🦄🦄🦄 ');
    }
});

// when it ends, start it up again
recognition.addEventListener('end', recognition.start)

recognition.start();