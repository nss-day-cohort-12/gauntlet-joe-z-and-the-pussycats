var Gauntlet = require("./player");

console.log(`enemies Gauntlet test: `, Gauntlet);
module.exports = Gauntlet.Combatants;

Gauntlet.Combatants.Orc = function() {
  this.health = this.health + 20;
  this.species = "Orc";
  this.allowedClasses = ["Warrior", "Berserker", "Wizard", "Valkyrie"];

  this.generateClass = function() {
    // Get a random index from the allowed classes array
    var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

    // Get the string at the index
    var randomClass = this.allowedClasses[random];

    // Composes the corresponding player class into the player object
    this.class = new Gauntlet.GuildHall[randomClass]();
    return this.class;
  };
};
Gauntlet.Combatants.Orc.prototype = new Gauntlet.Combatants.Monster();

Gauntlet.Combatants.Hobgoblin = function() {
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
    this.class = new Gauntlet.GuildHall[randomClass]();
    return this.class;
  };
};
Gauntlet.Combatants.Hobgoblin.prototype = new Gauntlet.Combatants.Monster();

Gauntlet.Combatants.Ogre = function() {
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
    this.class = new Gauntlet.GuildHall[randomClass]();
    return this.class;
  };
};
Gauntlet.Combatants.Ogre.prototype = new Gauntlet.Combatants.Monster();