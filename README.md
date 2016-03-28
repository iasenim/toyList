# toyList
*A toy functional list in javascript*

This is a javascript implementation of a small subset of the list related functions found 
in Scheme. `cons`, `car`, and `cdr` are constructed using only functions, for details, go 
[here](http://research.microsoft.com/en-us/um/people/simonpj/papers/slpj-book-1987/).

All the functions assume a given list is proper. A proper list is defined recursively as follows

1. empty list (represented as `undefined` in js) is a proper list
2. a list constructed from adding one more item to the head of a proper list (using `cons`)

Examples:

```javascript
reduce((x, y) => x + y, 0, map(((x) => x * x), iota(100)))
//=> 328350

forEach((x) => console.log(x), map(Math.sin, iota(6, 0, Math.PI/6)))

0
0.49999999999999994
0.8660254037844386
1
0.8660254037844387
0.5000000000000003
undefined

```

_Disclammer_: I wrote these functions to help me to learn javascript. These functions are not 
meant to be used in productn. Expect some weird behaviors if used outside of their domain, such as

```javascript
cdr(() => 1) 
//=> 1
car(() => 1) 
//=> 1
``` 
