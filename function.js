'use strict';
// ONE function does ONE thing

function printHello() {
    console.log('Hello');
}
printHello();

function log(message) {
    console.log(message);
}
log('Hello');
log(123);

/*
First-class function
functions are treated like any other variable
can be assigned as a value to variable
can be passed as an argument to other functions
can be returned by another function
*/

// 1. Function expression
// a function declaration can be called earlier than it is defined. (hoisting)
// a function expression is created when the execution reaches it
const print = function () { // anonymous function
    console.log('print');
};
print(); // print
const printAgain = print;
printAgain(); // print

// Arrow function (always anonymous)
const simplePrint = () => console.log('simpler print!');
const add = (a, b) => {
    // do something more
    return a + b;
};

const calculate = (command, a, b) => {
    switch(command) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'divide':
            return a / b;
        case 'multiply':
            return a * b;
        case 'remainder':
            return a % b;
        default:
            return null;
    }
}