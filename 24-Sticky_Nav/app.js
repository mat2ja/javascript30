const nav = document.querySelector('#main');
let topOfNav = nav.offsetTop; // from the top of page
// const topOfNav = nav.getBoundingClientRect().top; // from the top of visible page

function fixNav() {
    // window.scrollY - how much scrolled from top of page

    // if scrolled past the top of nav
    if (window.scrollY >= topOfNav) {
        //* OFFSET THE BODY SO THAT WE DONT GET JERKY JUMP OF 
        //* CONTENT BELOW WHEN NAV IS TAKEN OUT OF FLOW
        document.body.style.paddingTop = `${nav.offsetHeight}px`;
        document.body.classList.add('fixed-nav');
    } else {
        document.body.style.paddingTop = 0;

        document.body.classList.remove('fixed-nav');
    }
}


const calculateTopOfNav = () => topOfNav = nav.offsetTop;
window.addEventListener('resize', calculateTopOfNav);

window.addEventListener('scroll', fixNav);