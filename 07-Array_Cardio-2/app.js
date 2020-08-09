// ## Array Cardio Day 2

const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
];

const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
let someAdults = people.some(person => {
    let currentYear = new Date().getFullYear();
    return currentYear - person.year > 19;
});
console.log('Some are adults:', someAdults);

// Array.prototype.every() // is everyone 19 or older?
let everyoneAdult = people.every(person => {
    let currentYear = new Date().getFullYear();
    return currentYear - person.year > 19;
});
console.log('Everyone is an adult:', everyoneAdult);

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
let text = comments.find(comment => comment.id === 823423);
console.log('Comment: ', text);

// Array.prototype.findIndex()
// Find the comment with this ID
let commentIdx = comments.findIndex(comment => comment.id === 823423);
console.log('Comment index:', commentIdx);

// delete the comment with the ID of 823423
// new comments without modifying original
let newComments = comments.filter(comment => comment.id !== 823423);
console.log(newComments);

let newComments2 = [
    ...comments.slice(0, commentIdx),
    ...comments.slice(commentIdx + 1)
];
console.log(newComments2);

// delete straight from original
comments.splice(commentIdx, 1);
console.table(comments);