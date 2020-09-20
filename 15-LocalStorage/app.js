const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const clearBtn = document.querySelector('.clear-all');
const checkBtn = document.querySelector('.check-all');
const uncheckBtn = document.querySelector('.uncheck-all');

//* grab items from local storage OR start with empty array
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value; // this references addItems form here
    const item = {
        text,
        done: false
    }
    items.push(item);

    // add item to html
    populateList(items, itemsList);

    //* store current items to local storage
    // can only use string as values
    updateLocalStorage(items);

    // form elements have reset method
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        // check if item is already checked, if not, just put ''
        return `
            <li>
                <input type='checkbox' data-index=${i} id='item${i}' ${plate.done ? 'checked' : ''}>
                <label for='item${i}'>${plate.text}</label>
            </li>
        `;
    }).join('');
}

function updateLocalStorage(items) {
    localStorage.setItem('items', JSON.stringify(items))
}

function toggleDone(e) {
    // skip this unless its an input in .plates list
    if (!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;

    // find clicked input and toggle checkbox on/off
    items[index].done = !items[index].done;

    // update list of items
    updateLocalStorage(items);
}

function clearItems() {
    items.length = 0;
    populateList(items, itemsList)
    updateLocalStorage(items);
}

function toggleAllCheckboxes(check) {
    items.map(item => item.done = check);
    populateList(items, itemsList)
    updateLocalStorage(items)
}


addItems.addEventListener('submit', addItem);
// event delegation
// we listen on a clik on something higher, and then we check which element it is with e.target
itemsList.addEventListener('click', toggleDone);

clearBtn.addEventListener('click', clearItems);
checkBtn.addEventListener('click', () => toggleAllCheckboxes(true));
uncheckBtn.addEventListener('click', () => toggleAllCheckboxes(false));


// on page load
populateList(items, itemsList);