'use strict';

module.exports = class Person {
  constructor(name, id) {
    this.name = name;
    this._id = id;
  }

  toString() {
    return `${this.name} (id: ${this._id})`;
  }
}
