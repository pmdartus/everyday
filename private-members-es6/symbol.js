'use strict';

const IDSymbol = Symbol();

module.exports = class Person {
  constructor(name, id) {
    this.name = name;
    this[IDSymbol] = id;
  }

  toString() {
    return `${this.name} (id: ${this[IDSymbol]})`;
  }
}
