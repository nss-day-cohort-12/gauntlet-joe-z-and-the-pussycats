'use strict';

let Gauntlet = {};
Gauntlet.GuildHall = {};

module.exports = Gauntlet.GuildHall;

/*
  Base function for a player, or enemy, class (profession)
 */
Gauntlet.GuildHall.PlayerClass = function() {
  this.name = "Beggar";
  this.healthBonus = 0;
  this.strengthBonus = 0;
  this.intelligenceBonus = 0;
  this.agilityBonus = 0;
  this.magical = false;

  this.toString = function() {
    return this.name;
  };
};

Gauntlet.GuildHall.Fighter = function() {
  this.healthBonus = 20;
  this.strengthBonus = 10;
};
Gauntlet.GuildHall.Fighter.prototype = new Gauntlet.GuildHall.PlayerClass();


Gauntlet.GuildHall.Warrior = function() {
  this.name = "Warrior";
  this.healthBonus = this.healthBonus + 25;
  this.strengthBonus = this.strengthBonus + 30;
};
Gauntlet.GuildHall.Warrior.prototype = new Gauntlet.GuildHall.Fighter();


Gauntlet.GuildHall.Valkyrie = function() {
  this.name = "Valkyrie";
  this.healthBonus = this.healthBonus + 20;
  this.strengthBonus = this.strengthBonus + 10;
};
Gauntlet.GuildHall.Valkyrie.prototype = new Gauntlet.GuildHall.Fighter();


Gauntlet.GuildHall.Berserker = function() {
  this.name = "Berserker";
  this.healthBonus = this.healthBonus + 35;
  this.strengthBonus = this.strengthBonus + 20;
};
Gauntlet.GuildHall.Berserker.prototype = new Gauntlet.GuildHall.Fighter();


Gauntlet.GuildHall.Monk = function() {
  this.name = "Monk";
  this.healthBonus = this.healthBonus + 10;
  this.strengthBonus = this.strengthBonus + 40;
};
Gauntlet.GuildHall.Monk.prototype = new Gauntlet.GuildHall.Fighter();

Gauntlet.GuildHall.Mage = function() {
  this.name = "Mage";
  this.magical = true;
  this.healthBonus = this.healthBonus - 10;
  this.strengthBonus = this.strengthBonus - 20;
  this.intelligenceBonus = this.intelligenceBonus + 20;
};
Gauntlet.GuildHall.Mage.prototype = new Gauntlet.GuildHall.PlayerClass();


Gauntlet.GuildHall.Shaman = function() {
  this.name = "Shaman";
  this.healthBonus = this.healthBonus + 5;
  this.strengthBonus = this.strengthBonus - 10;
  this.intelligenceBonus = this.intelligenceBonus + 20;
};
Gauntlet.GuildHall.Shaman.prototype = new Gauntlet.GuildHall.Mage();


Gauntlet.GuildHall.Wizard = function() {
  this.name = "Wizard";
  this.healthBonus = this.healthBonus - 15;
  this.strengthBonus = this.strengthBonus - 25;
  this.intelligenceBonus = this.intelligenceBonus + 40;
};
Gauntlet.GuildHall.Wizard.prototype = new Gauntlet.GuildHall.Mage();


Gauntlet.GuildHall.Conjurer = function() {
  this.name = "Conjurer";
  this.strengthBonus = this.strengthBonus - 10;
  this.intelligenceBonus = this.intelligenceBonus + 10;
};
Gauntlet.GuildHall.Conjurer.prototype = new Gauntlet.GuildHall.Mage();


Gauntlet.GuildHall.Sorcerer = function() {
  this.name = "Sorcerer";
  this.healthBonus = this.healthBonus - 5;
  this.strengthBonus = this.strengthBonus - 20;
  this.intelligenceBonus = this.intelligenceBonus + 30;
};
Gauntlet.GuildHall.Sorcerer.prototype = new Gauntlet.GuildHall.Mage();

Gauntlet.GuildHall.Eluder = function() {
  this.name = "Eluder";
  this.magical = false;
  this.agilityBonus = this.agilityBonus + 10;
  this.intelligenceBonus = this.intelligenceBonus + 35;
};

Gauntlet.GuildHall.Eluder.prototype = new Gauntlet.GuildHall.PlayerClass();

Gauntlet.GuildHall.Thief = function() {
  this.name = "Thief";
  this.agilityBonus = this.agilityBonus + 5;
  this.intelligenceBonus = this.intelligenceBonus + 10;
};
Gauntlet.GuildHall.Thief.prototype = new Gauntlet.GuildHall.Eluder();


Gauntlet.GuildHall.Ninja = function() {
  this.name = "Ninja";
  this.agilityBonus = this.agilityBonus + 20;
  this.intelligenceBonus = this.intelligenceBonus + 5;
};
Gauntlet.GuildHall.Ninja.prototype = new Gauntlet.GuildHall.Eluder();


Gauntlet.GuildHall.Assassin = function() {
  this.name = "Assassin";
  this.agilityBonus = this.agilityBonus + 10;
  this.healthBonus = this.healthBonus - 5;
  this.intelligenceBonus = this.intelligenceBonus + 5;
};
Gauntlet.GuildHall.Assassin.prototype = new Gauntlet.GuildHall.Eluder();


