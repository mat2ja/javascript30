const triggers = document.querySelectorAll('.cool > li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');

function handleEnter() {
    this.classList.add('trigger-enter'); // display:block;
    // first make it visible, then animate the rest

    // prevents adding class active when we mouseout before it is applied and content shown
    setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 100); // opacity:1;
    background.classList.add('open'); // opacity:1;

    const dropdown = this.querySelector('.dropdown');
    const dropdownCoords = dropdown.getBoundingClientRect();
    const navCoords = nav.getBoundingClientRect();

    // coords are off a bit if theres an element before nav, aka its not exactly at the top of the page
    // thats we offset it by nav distance
    const coords = {
        width: dropdownCoords.width,
        height: dropdownCoords.height,
        top: dropdownCoords.top - navCoords.top,
        left: dropdownCoords.left - navCoords.left,
    }

    background.style.setProperty('width', `${coords.width}px`)
    background.style.setProperty('height', `${coords.height}px`)
    background.style.setProperty('transform', `translate(${coords.left}px,${coords.top}px)`)

}

function handleLeave() {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    // this.classList.remove('trigger-enter-active'); // opacity:0;
    // run after animation ends
    // setTimeout(() => this.classList.remove('trigger-enter'), 500); // display:none;
    background.classList.remove('open'); // opacity:0;
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter))
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave))