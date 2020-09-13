// Look for sequence of keys

const pressed = [];
const secretCode = 'wesbos'

window.addEventListener('keyup', e => {
    console.log(e.key);
    pressed.push(e.key)
    // delete all but last 6
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    // pressed = pressed.slice(-secretCode.length)
    console.log(pressed);

    if(pressed.join('').includes(secretCode)) {
        console.log('DING DING!');
        cornify_add();
    }
})

