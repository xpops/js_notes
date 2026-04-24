'use strict';
console.clear();

// 1. Producer
const promise = new Promise((resolve, reject) => {
    console.log('doing something');
    setTimeout(() => { // simulate doing heavy work
        resolve('done something');
        // reject(new Error('no network'))
    }, 2000)
})


// 2. Consumers: then, catch, finally

// chaining
promise
.then((value) => {
    console.log(value);
})
.catch((error) => {
    console.log(error);
})
.finally(() => {
    console.log('finally');
});


// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber //
    .then((num) => num * 2)
    .then((num) => num * 3)
    .then((num) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(num - 1), 1000);
        });
    })
    .then((num) => console.log(num));


// 4. Error Handling
const getHen = () => // 이런식으로 Promise를 생성하는 함수를 정의하면 초기실행을 안시킬 수 있음
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('🐓'), 1000);
    });
const getEgg = (hen) => // hen 파라미터를 받아서 promise resolve에 씀
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${hen} => 🥚`), 1000);
    });
const cook = (egg) => // egg 파라미터를 받아와서 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => 🍳`), 1000);
    });

getHen()
.then(hen => getEgg(hen))
.then(egg => cook(egg))
.then(meal => console.log(meal));