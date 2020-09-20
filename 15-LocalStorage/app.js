const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');

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
    localStorage.setItem('items', JSON.stringify(items))

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

function toggleDone(e) {
    // skip this unless its an input in .plates list
    if (!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;

    // find clicked input and toggle checkbox on/off
    items[index].done = !items[index].done;

    // update list of items
    localStorage.setItem('items', JSON.stringify(items))
}


addItems.addEventListener('submit', addItem);
// event delegation
// we listen on a clik on something higher, and then we check which element it is with e.target
itemsList.addEventListener('click', toggleDone);

// on page load
populateList(items, itemsList);