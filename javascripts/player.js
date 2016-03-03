'use strict';

let Player = {};
let Human = {};
let Monster = {};

/*
  Define the base object for any player of Gauntlet,
  whether a human player or a monster.
 */
Player = function(name) {
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

Player.prototype.setWeapon = function(newWeapon) {
  this.weapon = newWeapon;
}

Player.prototype.generateClass = function() {
  // Get a random index from the allowed classes array
  var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

  // Get the string at the index
  var randomClass = this.allowedClasses[random];

  // Composes the corresponding player class into the player object
  this.class = new GuildHall[randomClass]();

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
Human = function() {
  var randomSkin;

  this.species = "Human";
  this.intelligence = this.intelligence + 20;

  // this.skinColors.push("brown", "red", "white", "disease");
  // randomSkin = Math.round(Math.random() * (this.skinColors.length-1));
  // this.skinColor = this.skinColors[randomSkin];

  this.allowedClasses = ["Warrior", "Berserker", "Wizard", "Monk", "Ninja", "Thief", "Sorcerer"];
};
Human.prototype = new Player();


/*
  Define the base properties for a monster in a
  constructor function.
 */
Monster = function() {
  this.health = this.health - 30;
  this.intelligence = this.intelligence -20;
  this.strength = this.strength + 30;
};

Monster.prototype = new Player();

module.exports = Player;
module.exports = Human;
module.exports = Monster;
