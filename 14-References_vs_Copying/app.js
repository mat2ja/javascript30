// start with strings, numbers and booleans
let age = 100;
let age2 = age;
console.log(age, age2); // 100, 100
age = 200; // it's not going to update the other one
console.log(age, age2); // 200, 100


// Let's say we have an array
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// and we want to make a copy of it.
const team = players;

console.log(players, team); // [ "Wes", "Sarah", "Ryan", "Poppy" ]

// You might think we can just do something like this:
team[3] = 'Lux'

// however what happens when we update that array?
//* it also changes the players

// now here is the problem!
console.log(players, team); // [ "Wes", "Sarah", "Ryan", "Lux" ]
// we have edited the original array too!

//! It's because that is an array reference, not an array copy. 
//! They both point to the same array!

// So, how do we fix this? 
//* We take a copy instead!

// one way
const team2 = players.slice();

const team3 = [].concat(players)
// or create a new array and concat the old one in

// or use the new ES6 Spread
const team4 = [...players];

// now when we update it, the original one isn't changed
team4.push('Heehaw');
console.log(team4, players);

// The same thing goes for objects, let's say we have a person object

// with Objects
const person = {
    name: 'Wes Bos',
    age: 80
};

// and think we make a copy:
const captain = person;
captain.number = 99; // changes both
console.log(person, captain);

// how do we take a copy instead?
const cap2 = Object.assign({}, person, { pretty: false })
const cap3 = { ...person }

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
const wes = {
    name: 'Wes ',
    age: 69,
    social: {
        twitter: '@wesbos',
        facebook: 'wesbos.developer'
    }
};

const wes2 = wes; // reference 
const wes3 = { ...wes }; // clone
const wes4 = Object.assign({}, wes) // clone

wes.surname = 'Bossybitch'
// changes wes2 but NOT wes3



// however, 2 levels deep, it doesnt matter, its always a reference
wes.social.goodreads = 'wesreads'
// changes all 3 social key-value pairs

// poor man's deep clone
const wes5 = JSON.parse(JSON.stringify(wes));
wes5.social.linkedin = 'Wes Bos'
wes.social.snapchat = 'wes69'

// wes5 { twitter: "@wesbos", facebook: "wesbos.developer", goodreads: "wesreads", linkedin: "Wes Bos" }
// wes,wes2,wes3,wes4 { twitter: "@wesbos", facebook: "wesbos.developer", goodreads: "wesreads", linkedin: "Wes Bos", snapchat: "wes69" }
