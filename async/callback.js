'use strict';

// JS is synchronous. Executes code in order after hoisting.

console.log('1');

// async: 1초 뒤에 이 callback function을 실행하라고 브라우저에 요청
setTimeout(() => console.log('2'), 1000);

console.log('3'); // 1, 3, 2


// Sync callback
function printImmediately(print) {
    print(); // 함수 인자를 받아서 즉시 실행
}
printImmediately(() => console.log('hello'));

// Async callback
function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
}
printWithDelay(() => console.log('async callback'), 2000);


// Bad Example: Callback HELL
class UserStorage {
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => {
            if (
                (id === 'ellie' && password === 'dream') ||
                (id === 'abel' && password === 'rules')
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        }, 2000);
    }

    getRoles(user, onSuccess, onError) {
        setTimeout(() => {
            if (user === 'ellie') {
                onSuccess({ name: 'ellie', role: 'admin'});
            } else {
                onError(new Error('no access'));
            }
        }, 1000);
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');

// Callback Chain
userStorage.loginUser(
    id,
    password,
    (user) => {
        userStorage.getRoles(
            user,
            (userWithRole) => {console.log(userWithRole);},
            (error) => {console.log(error);}
        )
    },
    (error) => {console.log(error)}
)