const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight);

function higlightLink() {
    // get coords of hovered anchorlink (from visible window area)
    const linkCords = this.getBoundingClientRect();
    // gotta account how much we scrolled the page and add to transform to get distance from top of the page
    // because position:absolute calculates from top left of the entire page, not only visible area
    const coords = {
        width: linkCords.width,
        height: linkCords.height,
        top: linkCords.top + window.scrollY,
        left: linkCords.left + window.scrollX,
    }

    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px,${coords.top}px)`;

}

triggers.forEach(a => a.addEventListener('mouseover', higlightLink));