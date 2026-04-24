# Async Notes

Separate note dedicated to JavaScript async programming.

## Sync vs Async

JS is synchronous by default. Executes code in order (after hoisting). But...

```js
console.log("1");

// async: 1초 뒤에 이 callback function을 실행하라고 브라우저에 요청
setTimeout(() => console.log("2"), 1000);

console.log("3"); // 1, 3, 2
```

## Callback

Function takes in another function as a parameter.

### Sync Callback

```js
function printImmediately(print) {
  print(); // 함수 인자를 받아서 즉시 실행
}
printImmediately(() => console.log("hello"));
```

### Async Callback

```js
function printWithDelay(print, timeout) {
  setTimeout(print, timeout); // 정해진 시간 후에 실행
}
printWithDelay(() => console.log("async callback"), 2000);
```

### Bad Example: Callback Hell

```js
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === "ellie" && password === "dream") ||
        (id === "abel" && password === "rules")
      ) {
        onSuccess(id);
      } else {
        onError(new Error("not found"));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "ellie") {
        onSuccess({ name: "ellie", role: "admin" });
      } else {
        onError(new Error("no access"));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");

// Callback Chain
userStorage.loginUser(
  id,
  password,
  (user) => {
    userStorage.getRoles(
      user,
      (userWithRole) => {
        console.log(userWithRole);
      },
      (error) => {
        console.log(error);
      },
    );
  },
  (error) => {
    console.log(error);
  },
);
```

## Promise

Promise is a JS object for async operation.

State: pending -> fulfilled or rejected

Producer vs Consumer

**Important:** When new promise is created, the executor runs **immediately**.

### Object vs Function

- `const getHen = new Promise(...)`: 선언 즉시 비동기 작업 시작.
- `const getHen = () => new Promise(...)`: 함수를 호출할 때마다 새로운 프로미스를 생성 (지연 실행, Lazy evaluation).

### Why Promise? (vs Callback)

1. **주도권의 차이**: 콜백은 함수를 넘겨주고 "나중에 실행해줘"라고 부탁하는 방식이라면, 프로미스는 "결과가 담길 상자(Promise 객체)"를 먼저 반환받고 내가 원할 때 `.then()`으로 결과를 꺼내는 방식.
2. **비동기 작업의 분리**: 비동기 로직과 그 결과를 처리하는 로직을 명확히 분리할 수 있음.
3. **Chaining**: 콜백 지옥 없이 `.then()`을 기차처럼 연결하여 순차적 처리가 가능.

### Producer (resolve, reject)

- `resolve(value)`: 비동기 작업이 성공했을 때 알람을 울리는 스위치. 이 스위치가 눌려야 밖에서 기다리던 `.then()`이 실행됨.
- `reject(error)`: 실패를 알리는 스위치. `.catch()`가 실행됨.

```js
const fetchUser = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("abel"); // 1초 뒤 성공 신호와 함께 값을 전달
  }, 1000);
});
```

---

## Async & Await

Syntactic sugar over Promise. 비동기 코드를 마치 동기 코드(위에서 아래로 한 줄씩)처럼 읽히게 만들어줌.

### 1. async

- 함수 앞에 `async`를 붙이면 해당 함수는 **무조건 Promise를 반환**함.
- `return 'value'`는 `resolve('value')`와 같은 의미로 상자 안에 담겨서 반환됨.

### 2. await

- `async` 함수 내부에서만 사용 가능.
- Promise 상자를 까서 **알맹이가 나올 때까지 그 줄에서 기다리게** 만듬 (함수의 실행/리턴을 일시 정지).
- 전체 시스템이 멈추는 것이 아니라, 해당 `async` 함수만 대기 상태가 됨.

### 왜 `await`이 필요한가?

비동기 작업(API 호출 등)이 끝나기 전에 다음 줄이 실행되어 `undefined`를 참조하는 문제를 해결하기 위해. "데이터가 올 때까지 여기서 멈춰!"라고 명령하는 것.

```js
// callback hell...
function callbackPickFruits() {
  return getApple().then((apple) => {
    return getBanana().then((banana) => `${apple} + ${banana}`);
  });
}

// ...to await heaven!
async function asyncPickFruits() {
  // getApple이 비동기 함수라면, 밖에서도 await를 해줘야 진짜 사과를 받을 수 있음
  const apple = await getApple();
  const banana = await getBanana();
  return `${apple} + ${banana}`; // 사과와 바나나가 다 준비된 후 리턴됨
}
```

### Common Mistakes

1. **함수 실행 vs 함수 그 자체**:
   - `setTimeout(resolve('abel'), 1000)` (X): `resolve`가 즉시 실행되어 1초를 기다리지 않음.
   - `setTimeout(() => resolve('abel'), 1000)` (O): 1초 뒤에 실행될 '함수'를 전달해야 함.
2. **중첩된 await**:
   - `const apple = getApple().then(val => val)` 처럼 쓰면 `apple` 변수에는 사과가 아니라 '또 다른 Promise 상자'가 담김. 진짜 값을 변수에 담고 싶다면 `const apple = await getApple()`을 써야 함.
