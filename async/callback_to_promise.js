class UserStorage {
    loginUser(id, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (
                    (id === 'ellie' && password === 'dream') ||
                    (id === 'abel' && password === 'rules')
                ) {
                    resolve(id);
                } else {
                    reject(new Error('not found'));
                }
            }, 2000);
        });
    }

    getRoles(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (user === 'ellie') {
                    resolve({ name: 'ellie', role: 'admin'});
                } else {
                    reject(new Error('no access'));
                }
            }, 1000);
        })
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');

userStorage.loginUser('ellie', 'dream')
.then((user) => userStorage.getRoles(user))
.then()