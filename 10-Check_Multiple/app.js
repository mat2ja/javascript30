const checkboxes = document.querySelectorAll('input[type="checkbox"]');

let lastChecked; // previosly/first checked

function handleCheck(e) {
    // Check if they had the shift key down
    // And check that they are checking it
    inBetween = false;
    if (e.shiftKey && this.checked) {
        // Loop over every single checkbox
        checkboxes.forEach(checkbox => {
            // check if checbox is lastChecked or currenly checked one
            if (checkbox === this || checkbox === lastChecked) {
                // every checkbox from current till lastChecked will have inBetween=true
                inBetween = !inBetween;
            }

            if (inBetween) {
                checkbox.checked = true;
            }
        })
    }

    lastChecked = this;
}

for (let checkbox of checkboxes) {
    // click event fires even with the keyboard
    checkbox.addEventListener('click', handleCheck);
}
