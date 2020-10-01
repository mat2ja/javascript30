const divs = document.querySelectorAll('div');
const button = document.querySelector('button');

function logText(e) {
    // console.log(this);
    console.log(this.classList.value);

    // stob bubbling event up OR stop capture down, depends on capture; only catch the first
    // e.stopPropagation();
};

divs.forEach(div => div.addEventListener('click', logText, {
    // capture: true,  // gets logged on the capture down, instead of bubbling up
    capture: false, // default, first captures down and stores it, then run it bubbling up
    once: true // undbind event listener after capturing only once; same as removeEventListener
}));

button.addEventListener('click', () => {
    console.log('click!!!')
}, {
    once: true // run only once, i.e for store checkouts
})