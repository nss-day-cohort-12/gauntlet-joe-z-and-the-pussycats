'use strict';

let playerClasses = require('./classes');
let Combatants = {};

/*
  Define the base object for any player of Gauntlet,
  whether a human player or a monster.
 */
Combatants.Player = function(name) {
  this.species = null;
  this.class = null;
  this.weapon = null;

  this.playerName = name || "unknown adventurer";
  this.health = Math.floor(Math.random() * 40 + 1 + 50);  // i.e. 1-40 plus 50
  this.limbs = ["head", "neck", "arm", "leg", "torso"];
  this.skinColors = ["goldenrod", "cornflowerBlue", "chartreuse", "salmon", "lawnGreen", "fuchsia", "azure", "ghostWhite", "honeydew"];
  // Get a random index from the skinColors array
  var random = Math.floor(Math.random() * this.skinColors.length);
  // Get the string at the index
  this.skinColor = this.skinColors[random];
  this.strength = 90;
  this.intelligence = 90;
  this.agility = 50;
  this.toString = function() {
    var output = [this.playerName,
      ": a ",
      this.skinColor,
      " skinned ",
      this.species,
      " ",
      this.class,
      " with ",
      this.health,
      " health. ",
      (this.class.magical) ? "Able to cast " : " Wielding a ",
      // this.weapon.toString(),
      "!"
    ].join("");
    return output;
  };
};

Combatants.Player.prototype.setWeapon = function(newWeapon) {
  this.weapon = newWeapon;
}

Combatants.Player.prototype.generateClass = function() {
  // Get a random index from the allowed classes array
  var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

  // Get the string at the index
  var randomClass = this.allowedClasses[random];

  // Composes the corresponding player class into the player object
  this.class = new playerClasses[randomClass]();

  // Add the bonuses
  this.health += this.class.healthBonus;
  this.strength += this.class.strengthBonus;
  this.intelligence += this.class.intelligenceBonus;
  this.agility += this.class.agilityBonus;

  return this.class;
};

/*
  Define the base properties for a human in a
  constructor function.
 */
Combatants.Human = function() {
  var randomSkin;

  this.species = "Human";
  this.intelligence = this.intelligence + 20;

  // this.skinColors.push("brown", "red", "white", "disease");
  // randomSkin = Math.round(Math.random() * (this.skinColors.length-1));
  // this.skinColor = this.skinColors[randomSkin];

  this.allowedClasses = ["Warrior", "Berserker", "Wizard", "Monk", "Ninja", "Thief", "Sorcerer"];
};
Combatants.Human.prototype = new Combatants.Player();

/*
  Define the base properties for a monster in a
  constructor function.
 */
Combatants.Monster = function() {
  this.health = this.health - 30;
  this.intelligence = this.intelligence -20;
  this.strength = this.strength + 30;
};

Combatants.Monster.prototype = new Combatants.Player();


Combatants.Orc = function() {
  this.health = this.health + 20;
  this.species = "Orc";
  this.allowedClasses = ["Warrior", "Berserker", "Wizard", "Valkyrie"];

  this.generateClass = function() {
    // Get a random index from the allowed classes array
    var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

    // Get the string at the index
    var randomClass = this.allowedClasses[random];

    // Composes the corresponding player class into the player object
    this.class = new playerClasses[randomClass]();
    return this.class;
  }
};
Combatants.Orc.prototype = new Combatants.Monster();

Combatants.Hobgoblin = function() {
  this.health = this.health + 35;
  this.agility = this.agility - 10;
  this.species = "Hobgoblin";
  this.allowedClasses = ["Assassin", "Berserker", "Shaman", "Ninja"];

  this.generateClass = function() {
    // Get a random index from the allowed classes array
    var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

    // Get the string at the index
    var randomClass = this.allowedClasses[random];

    // Composes the corresponding player class into the player object
    this.class = new playerClasses[randomClass]();
    return this.class;
  }
};
Combatants.Hobgoblin.prototype = new Combatants.Monster();

Combatants.Ogre = function() {
  this.health = this.health + 50;
  this.agility = this.agility -20;
  this.species = "Ogre";
  this.allowedClasses = ["Warrior", "Sorcerer", "Monk", "Assassin"];

  this.generateClass = function() {
    // Get a random index from the allowed classes array
    var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

    // Get the string at the index
    var randomClass = this.allowedClasses[random];

    // Composes the corresponding player class into the player object
    this.class = new playerClasses[randomClass]();
    return this.class;
  }
};
Combatants.Ogre.prototype = new Combatants.Monster();

module.exports = Combatants;
