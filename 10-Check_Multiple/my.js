// My buggy solution

const checkboxes = [...document.querySelectorAll('input[type="checkbox"]')];

let lastCheckedIdx;
for (let checkbox of checkboxes) {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            lastCheckedIdx = checkboxes.indexOf(checkbox);
        } else {
            lastCheckedIdx = '';
        }
    })
}

let checks = new Set();
document.addEventListener('keydown', e => {
    if (e.shiftKey) {
        if (!e.target.checked) return;
        checks.add(lastCheckedIdx);

        if ([...checks].length === 2) {
            checks.add(lastCheckedIdx);

            let [start, end] = [...checks].sort();
            for (let i = start; i <= end; i++) {
                checkboxes[i].checked = true;
            }
            checks.clear();
        }
    };
});

