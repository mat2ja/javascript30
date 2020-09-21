const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');

const walk = 100; //100px, maximum shadow combined, 50/-50 in eather way

function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e;

    // console.log(this, e.target);
    // if it gets triggered on h1, it starts counting from 0 on top left corner of that element, we don't want that
    if (this != e.target) {
        // update coords to always count from top left of hero
        x += e.target.offsetLeft; // distance of element from left of parent
        y += e.target.offsetTop; // distance of element from top of parent
    }

    // -50 and 50 are max
    const xWalk = Math.round((y / width * walk) - (walk / 2));
    const yWalk = Math.round((x / height * walk) - (walk / 2));

    text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 rgba(255,0,255,.7),
        ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,.7),
        ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,.7),
        ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,.7),
        ${xWalk * -1}px ${yWalk * -1}px 0 rgba(255,255,0,.7)
    `
}


hero.addEventListener('mousemove', shadow)