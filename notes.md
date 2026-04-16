# JavaScript Notes

This is my personal JavaScript learning note. Only the important or previously unknown features are organized here.

## Async / Defer

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

## Dynamic Typing

JS is a dynamically typed language. Types can be modified in runtime.
TS solves this.
