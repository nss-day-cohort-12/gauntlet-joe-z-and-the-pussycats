'use strict';

let Gauntlet = {};
Gauntlet.SpellBook = {};

module.exports = Gauntlet.SpellBook;


/*
  Base spell function that defines name, damage, damage type
 */
Gauntlet.SpellBook.Spell = function() {
  this.name = "";
  this.damage = 0;

  this.damageTypes = ["lightning", "fire", "water", "earth", "mysticism"];
  this.type = "";

  this.toString = function() {
    return this.name + " of " + this.type + " for " + this.damage + " damage!";
  };
};

/*
  An elemental sphere that can be cast by a magical class
 */
Gauntlet.SpellBook.Sphere = function() {
  this.name = "sphere";
  this.damage = Math.floor(Math.random() * 10 + 10);

  let random = Math.round(Math.random() * (this.damageTypes.length - 1));
  this.type = this.damageTypes[random];
};
Gauntlet.SpellBook.Sphere.prototype = new Gauntlet.SpellBook.Spell();

/*
  An elemental sphere that can be cast by a magical class
 */
Gauntlet.SpellBook.Cube = function() {
  this.name = "cube";
  this.damage = Math.floor(Math.random() * 11 + 10);

  let random = Math.round(Math.random() * (this.damageTypes.length - 1));
  this.type = this.damageTypes[random];
};
Gauntlet.SpellBook.Cube.prototype = new Gauntlet.SpellBook.Spell();
/*
  An elemental sphere that can be cast by a magical class
 */
Gauntlet.SpellBook.Tetrahedron = function() {
  this.name = "tetrahedron";
  this.damage = Math.floor(Math.random() * 12 + 10);

  let random = Math.round(Math.random() * (this.damageTypes.length - 1));
  this.type = this.damageTypes[random];
};
Gauntlet.SpellBook.Tetrahedron.prototype = new Gauntlet.SpellBook.Spell();

/*
  An elemental cloud that can be cast by a magical class
 */
Gauntlet.SpellBook.Cloud = function() {
  this.name = "cloud";
  this.damage = Math.floor(Math.random() * 13 + 10);

  let random = Math.round(Math.random() * (this.damageTypes.length - 1));
  this.type = this.damageTypes[random];
};
Gauntlet.SpellBook.Cloud.prototype = new Gauntlet.SpellBook.Spell();