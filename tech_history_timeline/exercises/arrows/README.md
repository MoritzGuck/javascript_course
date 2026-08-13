# Mission: The Arrow Refactor

## Objective

A maintenance droid wrote a data-processing pod using only verbose `function () {}` syntax. Refactor it to use **arrow functions** wherever it makes sense — but don't break the output.

## Your Tasks

1. Read `data_pod.js` and predict what it prints.
2. Run it (`node data_pod.js`).
3. Refactor every callback to an **arrow function**. Convert the standalone functions too **if it makes sense** — but leave them as regular `function` if there's a good reason.
4. Run it again — the output must be **identical**.
5. Tell Chrono:
   - Which functions you converted to arrows and why.
   - Whether any you left as regular functions — and why.

## Hints

- Single-expression callbacks can use **implicit return** (drop the `{}` and `return`).
- Watch out for functions that need `this` or hoisting — those stay as declarations!
