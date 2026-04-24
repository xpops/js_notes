# JavaScript Notes

This is my personal JavaScript learning note. Only the important or previously unknown features are organized here.

## async vs defer

Script attributes that control how the browser fetches and executes external JavaScript.

### async

Fetches the script asynchronously while continuing to parse the HTML, but executes it as soon as the download is complete.

- **Pros**: Parallel downloading. Useful for independent scripts (e.g., analytics, ads).
- **Cons**: Pauses HTML parsing during execution. Execution order is NOT guaranteed (it follows download order).

### defer

Fetches the script asynchronously while continuing to parse the HTML, and executes it only after the HTML document has been fully parsed.

- **Pros**: Parallel downloading and zero blocking of HTML parsing. Execution order is guaranteed (follows the order in the HTML). Recommended for most cases.
- **Cons**: Only works for external scripts (src).

## Symbols

Creates unique identifiers for objects.

```js
const symbol1 = Symbol("id");
const symbol2 = Symbol("id");
console.log(symbol1 === symbol2); // false
```

```js
const gSymbol1 = Symbol.for("id");
const gSymbol2 = Symbol.for("id");
console.log(gSymbol1 === gSymbol2); // true
```

When printing symbols, use .description attribute to convert to string

```js
console.log(`symbol1: ${symbol1.description}`);
```

## Hoisting

JavaScript's behavior of moving declarations to the top of their scope during the compilation phase.

### var vs let / const

- **var**: Hoisted and initialized with `undefined`. You can access it before declaration without an error.
- **let / const**: Hoisted but **NOT** initialized. They stay in the **Temporal Dead Zone (TDZ)** until the declaration is reached. Accessing them before declaration results in a `ReferenceError`.

```js
console.log(name); // undefined
var name = "Abel";

console.log(age); // ReferenceError: Cannot access 'age' before initialization
let age = 22;
```

### Why avoid var?

1. **No Block Scope**: `var` only recognizes function scope and global scope. It ignores blocks like `if`, `for`, etc., which can lead to accidental variable overwrites.
2. **Hoisting Confusion**: Being able to use a variable before it's declared makes code harder to read and debug.
3. **Redeclaration**: `var` allows redeclaring the same variable in the same scope, which is a common source of bugs.

## Dynamic Typing

JS is a dynamically typed language. Types can be modified in runtime.
TS solves this.

## Objects

```js
const abel = { name: "abel", age: 22 };
```

`abel` object itself is constant, but attributes can be modified:

```js
abel.age = 23;
console.log(abel); // { name: 'abel', age: 23 }
```

## OR

### Short-circuit evaluation

If a true is found, does **NOT** check further.

```js
const value1 = true;
const value2 = 4 < 2; // false

console.log(`or: ${value1 || value2 || myFunc()}`);

function myFunc() {
  for (let i = 0; i < 100; i++) {
    // wasting time
    console.log("aaaaaaa");
  }
  return true;
}
```

When writing or, keep computation heavy functions on the **back**.

## AND

### Short-circuit evaluation

If a false is found, does **NOT** check further.

```js
const value1 = false;
const value2 = 4 > 2; // true

console.log(`and: ${value1 && value2 && checkUser()}`);

function checkUser() {
  console.log("Checking database...");
  return true;
}
```

When writing and, keep computation heavy functions on the **back**.
Used for null/undefined checks: `user && user.name`.

```js
if (nullableObject != null) {
  nullableObject.something;
}
// nullableObject && nullableObject.something
```

## Equalities

```js
const stringFive = "5";
const numberFive = 5;
```

### Loose equality `==` (w/ type conversion)

```js
console.log(stringFive == numberFive); // true
```

### Strict equality `===` (w/o type conversion)

```js
console.log(stringFive === numberFive); // false
```

## Functions

### First-class function

Functions are treated like any other variable.

- Can be assigned as a value to a variable.
- Can be passed as an argument to other functions (callback).
- Can be returned by another function.

### Declaration vs Expression

- **Function Declaration**: Defined with `function name() {}`. Hoisted to the top, so it can be called **before** the declaration.
- **Function Expression**: Created when execution reaches it (usually assigned to a variable). **NOT** hoisted in the same way; must be defined before calling.

```js
// Declaration (Hoisted)
printHello();
function printHello() {
  console.log("Hello");
}

// Expression (Not Hoisted)
const printBye = function () {
  console.log("Bye");
};
printBye();
```

### Arrow Function

A concise way to write function expressions. Always anonymous.

```js
const simplePrint = () => console.log("simpler print!");
const add = (a, b) => a + b;

const complexAdd = (a, b) => {
  // do something more
  return a + b;
};
```

Note: Arrow function does not have its own `this`. If

## Class

### Getter and Setter

```js
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
```

`get` and `set` keywords in JS acts differently from ordinary getter and setter methods. Once they are defined, `this.age` calls this `get` function and `this.age =` calls the `set` function.

### Inheritance

```js
class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Rectangle extends Shape {}

class Triangle extends Shape {
  getArea() {
    // override
    return super.getArea() / 2;
  }
}

const rectangle = new Rectangle(20, 20);
const triangle = new Triangle(20, 20);

console.log(rectangle.getArea()); // 400
console.log(triangle.getArea()); // 200
```

## Object

> object = { key : value };

Objects are collections of key, value pairs.

### Constructor Function vs. Class

```js
// Constructor Function
function Person1(name, age) {
  this.name = name;
  this.age = age;
}
const person1 = new Person1("Abel", 23);
console.log(person1);

// Class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const person2 = new Person("Greg", 19);
console.log(person2);
```

In most circumstances, use Class.

## JSON

### `JSON.stringify()` : Object -> JSON (serialize)

```js
// 1. Object to JSON (serialize)
// stringify(obj)
let json = JSON.stringify(true);
console.log(json);

json = JSON.stringify(["apple", "banana"]);
console.log(json);

const rabbit = {
  name: "tori",
  color: "white",
  size: null,
  birthDate: new Date(),
  jump: () => {
    console.log(`${this.name} can jump!`);
  },
};
json = JSON.stringify(rabbit);
console.log(json);

// array as replacer
json = JSON.stringify(rabbit, ["name", "color"]);
console.log(json);

// callbackfunction as replacer
json = JSON.stringify(rabbit, (key, value) => {
  console.log(`key: ${key}, value: ${value}`);
  return key === "name" ? "Fiver" : value;
});
console.log(json);
```

### `JSON.parse(json)` JSON -> Object (deserialize)

```js
// 2. JSON to Object (deserialize)
json = JSON.stringify(rabbit);
const obj = JSON.parse(json, (key, value) => {
  // reviver
  console.log(`key: ${key}, value: ${value}`);
  return key === "birthDate" ? new Date(value) : value;
});
console.log(obj);

rabbit.jump();
// obj.jump();

console.log(rabbit.birthDate.getDate());
console.log(obj.birthDate.getDate());
```
