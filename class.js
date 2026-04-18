class User {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        // if (value < 0) {
        //     throw Error("age cannot be negative");
        // }
        this._age = value < 0 ? 0 : value;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

const user1 = new User('Steve', 'Jobs', -1);
console.log(user1.age);
console.log(user1.fullName);