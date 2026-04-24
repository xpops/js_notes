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


// Inheritance
class Shape {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}

class Rectangle extends Shape {
    toString() {
        return `A ${this.width} * ${this.height} rectangle.`
    }
}

class Triangle extends Shape {
    getArea() { // override
        return super.getArea() / 2;
    }
}
// instanceof

const rectangle = new Rectangle(20, 20);
const triangle = new Triangle(20, 20);

console.log(rectangle.getArea()); // 400
console.log(triangle.getArea()); // 200

console.log(`${rectangle.toString()}`); // A 20 * 20 rectangle.