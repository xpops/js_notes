// Constructor Function
function Person1(name, age) {
    this.name = name;
    this.age = age;
}
const person1 = new Person1('Abel', 23);
console.log(person1);

// vs Class
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
const person2 = new Person('Greg', 19);
console.log(person2);

// cloning
const user = {name: 'Abel', age: 20};
const user2 = user;
++user2.age;
console.log(user.age); // 21

const user3 = {};
Object.assign(user3, user); // deep copy
// or we can do
// const user3 = Object.assign({}, user);
user3.age = 30;
console.log(user.age); // 21
console.log(user3.age); // 30

const user4 = {name: 'Greg', age: 40};
console.log(Object.assign(user4, user));

