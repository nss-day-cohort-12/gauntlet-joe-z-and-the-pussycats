'use strict';

let SpellBook = {};

/*
  Base spell function that defines name, damage, damage type
 */
SpellBook.Spell = function() {
  this.name = "";
  this.damage = 0;

  this.damageTypes = ["lightning", "fire", "water", "earth", "mysticism"];
  this.type = "";

  this.toString = function() {
    return this.name + " of " + this.type + " for " + this.damage + " damage!";
  }
};

/*
  An elemental sphere that can be cast by a magical class
 */
SpellBook.Sphere = function() {
  this.name = "sphere";
  this.damage = Math.floor(Math.random() * 10 + 10);

  var random = Math.round(Math.random() * (this.damageTypes.length - 1));
  this.type = this.damageTypes[random];
};
SpellBook.Sphere.prototype = new SpellBook.Spell();

/*
  An elemental sphere that can be cast by a magical class
 */
SpellBook.Cube = function() {
  this.name = "cube";
  this.damage = Math.floor(Math.random() * 11 + 10);

  var random = Math.round(Math.random() * (this.damageTypes.length - 1));
  this.type = this.damageTypes[random];
};
SpellBook.Cube.prototype = new SpellBook.Spell();
/*
  An elemental sphere that can be cast by a magical class
 */
SpellBook.Tetrahedron = function() {
  this.name = "tetrahedron";
  this.damage = Math.floor(Math.random() * 12 + 10);

  var random = Math.round(Math.random() * (this.damageTypes.length - 1));
  this.type = this.damageTypes[random];
};
SpellBook.Tetrahedron.prototype = new SpellBook.Spell();

/*
  An elemental cloud that can be cast by a magical class
 */
SpellBook.Cloud = function() {
  this.name = "cloud";
  this.damage = Math.floor(Math.random() * 13 + 10);

  var random = Math.round(Math.random() * (this.damageTypes.length - 1));
  this.type = this.damageTypes[random];
};
SpellBook.Cloud.prototype = new SpellBook.Spell();

module.exports = Spellbook;