'use strict';

const assert = require('assert');

const PersonUnderscore = require('./underscore');
const PersonConstructor = require('./constructor');
const PersonSymbol = require('./symbol');
const PersonWM = require('./weak-map');

function testPrivacy(type, person) {
  console.log(type, person);
  assert(!person.hasOwnProperty('id'));
  assert.equal(person.toString(), 'bob (id: 1234)');
}

testPrivacy('underscore', new PersonUnderscore('bob', 1234));
testPrivacy('constructor', new PersonConstructor('bob', 1234));
testPrivacy('symbol', new PersonSymbol('bob', 1234));
testPrivacy('weak-map', new PersonWM('bob', 1234));
