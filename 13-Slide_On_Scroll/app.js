//! ALWAYS DEBOUNCE SCROLL
const debounce = (func, wait = 20) => {
    let interval;
    return (...args) => {
        clearTimeout(interval);
        interval = setTimeout(() => {
            func.apply(null, args);
        }, wait);
    };
};

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
    sliderImages.forEach(image => {
        // y coord of top + full height = bottom y coord
        // slide images when half of them is over the bottom
        //* half way through the image
        const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2;
        // how far top of img is from top of window
        //* bottom of the image
        const imageBottom = image.offsetTop;
        const isHalfShown = slideInAt > image.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;

        // TODO SVE MORAM SHVATIT

        if (isHalfShown && isNotScrolledPast) {
            image.classList.add('active');
        } else {
            image.classList.remove('active');
        }
    })
}

window.addEventListener('scroll', debounce(checkSlide));