'use strict';

// 1. Declaration
const arr1 = new Array();
const arr2 = [1, 2, 3, 4, 5];

// 2. forEach()
// 함수를 파라미터로 받고 loop을 돌면서 각 element에 대해 그 함수를 호출한다.
arr2.forEach(function(num, index) {
    console.log(num, index);
});

const forEachHelper = (elem) => console.log(elem);
arr2.forEach(forEachHelper);

arr2.forEach((elem) => console.log(elem));

arr2.forEach((elem, index) => console.log(`Index ${index}: ${elem}`));

// 3. Add/Delete

arr2.push(6); // add to back
console.log(arr2);
arr2.pop(); // remove from back
console.log(arr2);
arr2.unshift(-1, 0); // add to front (shifts everything backward)
console.log(arr2);
arr2.shift(); // remove from front (shifts everything forward)
console.log(arr2);

arr2.splice(2, 2, 'two', 'three'); // start index, 거기로부터 몇개 지울건지, 뭐 더할지
console.log(arr2);

// 4. Searching
arr2.indexOf(3);
arr2.includes(5);
arr2.lastIndexOf();

