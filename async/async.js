'use strict';console.clear();
// Syntactic sugar over Promise

// 1. async

// Traditional way:
function fetchUser() {
    return new Promise((resolve, reject) => {
        // network request for 10 sec
        resolve('abel');
     });
}

// with async
async function fetchUser() {
    // network request for 10 sec
    return 'abel';
}

const user = fetchUser();
user.then((param) => console.log(param));
console.log(user);


// 2. await
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
    await delay(1000);
    return '🍎';
}

async function getBanana() {
    await delay(2000);
    return '🍌';
}

function callbackPickFruits() {
    return getApple().then(apple => {
        return getBanana().then(banana => `${apple} + ${banana}`);
    });
}

async function asyncPickFruits() {
    const applePromise = getApple();
    const bananaPromise = getBanana();
    const apple = await applePromise;
    const banana = await bananaPromise;
    return `${apple} + ${banana}`;
}

asyncPickFruits().then(console.log);


// 3. Useful Promise APIs
function pickAllFruits() {
    return Promise.all([getApple(), getBanana()])
    .then(fruits => fruits.join(` + `));
}
pickAllFruits().then(console.log);

function pickOnlyOne() {
    return Promise.race([getApple(), getBanana()]);
}
pickOnlyOne().then(console.log);