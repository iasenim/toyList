# toyList
*A toy functional list in javascript*

This is a javascript implementation of a small subset of the list related functions found 
in Scheme. `cons`, `car`, and `cdr` are constructed using only functions, for details, go 
[here](http://research.microsoft.com/en-us/um/people/simonpj/papers/slpj-book-1987/).

All the functions assume a given list is proper. A proper list is defined recursively as follows

1. the empty list (represented as `undefined` in js) is a proper list
2. a list constructed from adding one more item to the head of a proper list (using `cons`)

Here are some details:

1. Constructors:
  * `list(x, y, z,...)`: create a list from the arguments.
  * `list([1, 2, 3])`: create a list from an array.
  * `iota(count, start, step)`: create a list with length `count`, 
  where `count` must be non-negative.
   `start` and `step` are optinal, both with a default value `1`. 
   Example: `iota(3, 0, 0.1) //=> (0, 0.1, 0.2)`.
   4. `cons(item, lst)`: construct a new list by adding `item` to `lst`.
2. Selectors:
  * `listRef(lst, n)`: returns the n-th element in `lst`.
  * `car`: returns the first element
  * `cdr`: returns the list with the first element removed
3. Utilities: `length`, `map`, `reduce`, `forEach`, 
   and `listToArray`, etc.

Examples:

```javascript
reduce((x, y) => x + y, 0, map(((x) => x * x), iota(100)))
//=> 328350

forEach((x) => console.log(x), map(Math.sin, iota(6, 0, Math.PI/6)))

/*
0
0.49999999999999994
0.8660254037844386
1
0.8660254037844387
0.5000000000000003
undefined
*/

```

_Disclammer_: I wrote these functions to help me to learn javascript. These functions are not 
meant to be used in productn. Expect some weird behaviors if used outside of their domain, such as

```javascript
cdr(() => 1) 
//=> 1
car(() => 1) 
//=> 1
``` 
