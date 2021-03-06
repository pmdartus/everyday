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

* **[Symbol](private-members-es6/symbol.js)** Each `Symbol` object are unique, which means that we can't access an property of an object defined by a `Symbol` if we don't have a reference to the `Symbol` it self. Applying that to class we can in theory ensure private members by referencing them via `Symbol`, but you can list all properties referenced by `Symbols` using `Object.getOwnPropertySymbols`.

* **[Weak Map](private-members-es6/weak-map.js)** Weak-map is also a good option for data privacy, because as all `Map` it offer to use any object as key but allow those keys to be garbage collected. A `Weak-Map` should be created be private members, each instance of the class set itself as a key in order to access the value. In order to ensure the privacy, those `Weak-Maps` should not be exported out of the module.

## Couple of words about Symbols (01-23-16)

**Why symbols?** For instance while designing an animation lib, it's really tempting to store informations on the `DOMElements` and avoid to recompute most of the informations every rendering loop. It's really appealing to store for instance to do something like that:

```javascript
nodes.forEach(domNode => {
  if (domNode.isMoving) {
    ...
  } else {
    ...
  }
})
```

This approach can lead to weird behaviors for function looping on properties using `Object.keys(node)` or `for-in` but worse it can also lead to property key name clash. In order to step over each others, you will have to change the key name to `domNode.__MyIsMovingProp`. Or you can use a randomly generated string has property key. `Symbols` has been introduced in order to solve those issues.

**Symbol on the thumb** Because standards keys and `Symbols` can clash, it can be used to attach meta-data to standards objects.

```javascript
// Create a new symbol
let s1 = Symbol();

// Create a new symbol with a description and NOT a name
let s2 = Symbol('everyday');

// Each symbol is different from another
Symbol() === Symbol() // false
Symbol('everyday') === Symbol('everyday') // false

// But because symbols are registered globally you can ask to create multiple time the same symbol.
// De facto symbol don't need to be exported out of the modules
Symbol.for('everyday') === Symbol.for('everyday') // true

// Object literal usage
const obj = {
  [Symbol('foo')]: 'bar',
  'bar': 'foo'
};

// List all Symbols attached to an object
Object.getOwnPropertySymbols(obj);  // [Symbol(foo)]
Object.keys(obj);                   // ['bar']
```


## Hidden features of chromedriver (02-09-2016)

It's currently impossible to use chromedriver and chrome remote debugging API at the same time. It's mainly due to the fact that chrome allows only a single debugger to be attached to the browser. That been said, there are couple of ways to retrieve informations from chromedriver. The following example use the [webdriver.io](webdriver.io) (webdriver lib for nodejs), but it can be apply to all lib and languages.

You can find all those commands hard-coded in chromedriver [code](https://github.com/scheib/chromium/blob/e17f64a0e2379368cf9fd54109bbee246ca73b4f/chrome/test/chromedriver/window_commands.cc#L292).

### Take an heap snapshot

```javascript
client.execute(':takeHeapSnapshot')
  .then(res => {
    fs.writeFileSync('example.heapsnapshot', res.value);
  });
```

### Retrieve CPU profile

```javascript
client.execute(':startProfile')
  .then(() => {
    /* HAVE FUN */
  })
  .execute(':endProfile')
  .then(res => fs.writeFileSync('example.cpuprofile', res.value));
```

This is what we should expect to happen unfortunately, most of the time webdriver server crash, but you can parse the error message to get the profile informations.


### Retrieve timeline informations

You can retrieve the timeline using chromedriver logs. First you will have to make chromedriver a little more chatty by selecting `tracingCategories`.

```javascript
desiredCapabilities: {
  browserName: 'chrome',

  chromeOptions: {
    perfLoggingPrefs: {
      traceCategories: [
        '-*',
        'v8',
        'blink.console',
        'devtools.timeline',
        'disabled-by-default-devtools.timeline',
        'disabled-by-default-devtools.timeline.frame',
        'toplevel',
      ],
    },
  },

  loggingPrefs: {
    performance: 'ALL',
    browser: 'ALL',
  },
},
```

And then:

```javascript
client.log('performance')
  .then(() => {
    /* HAVE FUN */
  })
  .log('performance')
  .then(res => fs.writeFileSync('example.json', res.value));
```

## Type coercion (03-13-2016)

The operation of converting a value from a type to another is called `type casting` when done explicitly, and `type coercion` when done implicitly by the engine. This leads to different behaviors of `==` and `===`, where the first operator executes a the comparaison after the type conversion. If both operands are the same type, performance of the operators are the same.

```js
var answer = 42;

answer.toString() // Type casting
answer + '' // Type coercion
```

[source](https://github.com/vasanthk/js-bits/blob/master/js/coercion.js)

## NaN

`NaN` value in javascript is an interesting value. For instance, `NaN` occurs when:

* dividing zero by zero
* dividing `Infinity` by `Infinity`
* ...

It represent a results of a number operation which has no representation in the real number. Another property of NaN is that it is not equal to it self.

```js
NaN !== NaN
// ==> true
```

The javascript standard offers the `isNaN(<value>)` to check if the passed parameter is `NaN` or not.   

[source](https://medium.com/javascript-refined/nan-and-typeof-36cd6e2a4e43#.puj3taefa)