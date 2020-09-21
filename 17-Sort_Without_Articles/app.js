// Sort bands without articles

const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];


function strip(bandName) {
    const regex = /^(the|an|a)\b/i; // https://regexr.com/5cflv
    return bandName.replace(regex, '').trim()
}

const sortedBands = [...bands].sort((a, b) => {
    return strip(a) > strip(b) ? 1 : -1;
})

// console.log(sortedBands.map(band => `<li>${band}</li>`));

document.querySelector('#bands').innerHTML =
    sortedBands
        .map(band => `<li>${band}</li>`)
        .join('')