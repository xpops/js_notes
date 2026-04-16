// Use scrict
'use strict';

{
    let myName = 'yukim';
    console.log(myName);
}

{
    console.log(myName);
    var myName = 'yukim';
}

const daysInWeek = 7;
const maxNum = 5;

const name = 'Abel';

console.log(`hello ${name}`); // name not defined.

const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
console.log(symbol1 === symbol2);

let text = 'hello';
console.log(`value: ${text}, type: ${typeof text}`);

const abel = { name: "abel", age: 22 };
console.log(abel);

abel.age = 23;
console.log(abel);

/*
OPERATORS
*/

// 1. String concatenation
console.log('my' + 'cat'); // mycat
console.log('1' + 2); // 12
console.log(`string literals: 1 + 2 = ${1 + 2}`); // 3

// 2. Numeric operators
console.log(2 ** 3); // 8

// 3. Logical Operators

// || (or), find the first true value and STOPS there.
const value1 = true;
const value2 = 4 < 2; // false

console.log(`or: ${value1 || value2 || myFunc()}`);

function myFunc() {
    for (let i = 0; i < 100; i++) { // wasting time
        console.log('aaaaaaa');
    }
    return true;
}

const stringFive = '5';
const numberFive = 5;
console.log(stringFive == numberFive); // true;
console.log(stringFive === numberFive); // false;

const abel1 = {name: 'abel'};
const abel2 = {name: 'abel'};
const abel3 = abel1;
console.log(abel1 == abel2); // false; reference is different
console.log(abel1 === abel2); // false
console.log(abel1 === abel3); // true

console.log(0 == false); // true
console.log(0 === false); // false: int and boolean
console.log('' == false); // true
console.log('' === false); // false: string and boolean
console.log(null == undefined); // true
console.log(null === undefined); // false: null and undefined