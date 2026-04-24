// 1. Object to JSON (serialize)
// stringify(obj)
let json = JSON.stringify(true);
console.log(json);

json = JSON.stringify(['apple', 'banana']);
console.log(json);

const rabbit = {
    name: 'Hazel',
    color: 'brown',
    size: null,
    birthDate: new Date(),
    jump: function() {
        console.log(`${this.name} can jump!`);
    }
}
json = JSON.stringify(rabbit);
console.log(json);

// array as replacer
json = JSON.stringify(rabbit, ['name', 'color']);
console.log(json);

// callbackfunction as replacer
json = JSON.stringify(rabbit, (key, value) => {
    console.log(`key: ${key}, value: ${value}`);
    return key === 'name' ? 'Fiver' : value;
});
console.log(json);


// 2. JSON to Object (deserialize)
json = JSON.stringify(rabbit);
const obj = JSON.parse(json, (key, value) => { // reviver
    if (key === 'birthDate') {
        return new Date(value);
    }
    return value;
});
console.log(obj);

rabbit.jump();
// obj.jump();

console.log(rabbit.birthDate.getDate());
console.log(obj.birthDate.getDate());