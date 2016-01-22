'use strict';

module.exports = class Person {
  constructor(name, id) {
    this.name = name;

    this.toString = function() {
      return `${this.name} (id: ${id})`;
    }
  }
}
