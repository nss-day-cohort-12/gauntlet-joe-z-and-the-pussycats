'use strict';

let Armory = {};

Armory.Weapon = function() {
  this.name = "bare hands";
  this.damage = 1;
  this.hands = 2;

  this.toString = function() {
    return this.name;
  }
};

Armory.Dagger = function() {
  this.name = "dagger";
  this.damage = 10;
  this.hands = 1;
};
Armory.Dagger.prototype = new Armory.Weapon();

Armory.BroadSword = function() {
  this.name = "broad sword";
  this.damage = 14;
  this.hands = 2;
};
Armory.BroadSword.prototype = new Armory.Weapon();

Armory.WarAxe = function() {
  this.name = "war axe";
  this.damage = 18;
  this.hands = 2;
};
Armory.WarAxe.prototype = new Armory.Weapon();

module.exports = Armory;