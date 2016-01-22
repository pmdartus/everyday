## High-order functions & First-order functions (01-17-16)

**High-order** functions are functions that does one of the following:
* take one or more functions as parameter
* returns a function as results
For instance the `map` method is a high-order function, because `map` takes a list of element and function and return a new list of elements on which the function has been applied.

**First-order** functions is a language feature allowing functions to be treated as objects.

First-order functions is specific to programming language compared to the high-order function notion that can be also applied to math. But even if those notions are completely different, it's hard to imagine a language that provides first-order functions support without any high-order functions.


## Functions (01-18-16)

ES 2015 came up with a new syntax for function declaration: fat arrow function. It now time to review how to declare function in javascript

**Function declaration**
```javascript
function square(a) {
  return a * a;
}
```
Functions declaration are always prefixed with the keyword function. They are named, because they are declarations they are hoisted as any variable declarations.

**Function expression**
```javascript
const square = function() {
  return a * a;
};
```
Functions expression is assigning a function to a variable. Because only declarations are hoisted, the `square` variable can be accessible about it declaration, however it value is set to `undefined` until the declaration is reached. Those functions can also be named but it's not mandatory. However providing a name to function expression is a good practice in the case of closure in order to avoid the `Anonymous function` label in the debugger;

**Fat Arrow function**
```javascript
const square = a => a * a;
```
Fat arrow function a new syntax sugar introduced with ES 2015. Those functions are necessarily anonymous. This syntax is mainly used for one-liner / short functions: because they offer for free the lexical binding of `this` and don't need curly braces and return statements.


## Private members and ES6 classes (01-22-16)

* **[Prefix with _](private-members-es6/underscore.js)** More than a techniques, it's a javascript coding convention to declare private variables prefixed with `_`. For developers new to javascript, the underscore in front of the variable name will discourage most of them in manipulating it. For more experimented developers this way of declaring private members offer the advantage to be really light-weight, easy to inspect object state. But it doesn't provide any real privacy.

* **[Constructor closure](private-members-es6/constructor.js)** This method ensure a real privacy because of the closure created in the constructor. However, every methods accessing to the private member should be defined in the constructor it self (which is not the purpose of the new ES6 syntax). We can also notice that this method don't benefit from the prototypal inheritance because those functions are attached to the `this` object itself.

* **[Symbol](private-members-es6/symbol.js)** Each `Symbol` object are unique, which means that we can't access an property of an object defined by a `Symbol` if we don't have a reference to the `Symbol` it self. Applying that to class we can theoricaly ensure private members by referencing them via `Symbol`.  

* **[Weak Map](private-members-es6/weak-map.js)**

TODO: http://sravi-kiran.blogspot.fr/2015/01/PrivateMembersInES6Classes.html
