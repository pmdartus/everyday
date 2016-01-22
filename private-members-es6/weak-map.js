'use strict';

const ID = new WeakMap();

module.exports = class Person {
  constructor(name, id) {
    this.name = name;
    ID.set(this, id);
  }

  toString() {
    return `${this.name} (id: ${ID.get(this)})`;
  }
}
