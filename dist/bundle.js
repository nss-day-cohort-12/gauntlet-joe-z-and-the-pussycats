(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

const Gauntlet = require('./gauntlet');
console.log('Gauntlet', Gauntlet);
// declare global variables that will be used in player constructor
var playerName;
var playerClass;
var playerWeapon;
var P1,P2;

$(document).ready(function() {
  /*
    Show the initial view that accepts player name
   */
  $("#player-setup").show();

  /*
    When any button with card__link class is clicked,
    move on to the next view.
   */
  $(".card__link").click(function(e) {
    var nextCard = $(this).attr("next");
    var moveAlong = false;

    switch (nextCard) {
      case "card--class":
        moveAlong = ($('#player-name').val() !== "");
        break;
      case "card--weapon":
        moveAlong = playerClass;
        break;
      case "card--battleground":
        moveAlong = playerWeapon;
        break;
    }

    if (moveAlong) {
      $(".card").hide();
      $("." + nextCard).show();
    }

    if (nextCard == "card--class") {
      P1 = new Gauntlet.Combatants.Human();
      $(".class").hide();
      $("#surprise").show();
      for (var i = 0; i < P1.allowedClasses.length; i++) {
        let currClass = P1.allowedClasses[i].toLowerCase();
        if ($(`.card__button#${currClass}`)) {
          $(`.card__button#${currClass}`).show();
        }
      }
    }

    if (nextCard == "card--weapon") {
      P1.class = playerClass;
      if (P1.class.magical) {
        $("#weapon-select").hide();
        $("#spell-select").show();
      } else {
        $("#weapon-select").show();
        $("#spell-select").hide();
      }
    }

    if (nextCard == "card--battleground") {
      P1.playerName = playerName;
      P1.possessivePronoun = "his";
      console.log(P1);
      P1.weapon = playerWeapon;
      P2 = createMonster();
      P1.originalHealth = P1.health;
      P2.originalHealth = P2.health;
      P1.playerNum = 1;
      P2.playerNum = 2;
      fillPlayers();
      doBattle(P1,P2);
    }
  });

  /*
    When the back button clicked, move back a view
   */
  $(".card__back").click(function(e) {
    var previousCard = $(this).attr("previous");
    $(".card").hide();
    $("." + previousCard).show();
  });

  // Store player name based on entry, on button click
  $("[next='card--class']").on('click', function(e) {
    playerName = $('#player-name').val();
  });

  // Store player class based on user selection
  $('.class').on('click', function (e) {
    switch (e.currentTarget.id) {
      case 'warrior':
        playerClass = new Gauntlet.GuildHall.Warrior();
        break;
      case 'valkyrie':
        playerClass = new Gauntlet.GuildHall.Valkyrie();
        break;
      case 'berserker':
        playerClass = new Gauntlet.GuildHall.Berserker();
        break;
      case 'monk':
        playerClass = new Gauntlet.GuildHall.Monk();
        break;
      case 'shaman':
        playerClass = new Gauntlet.GuildHall.Shaman();
        break;
      case 'wizard':
        playerClass = new Gauntlet.GuildHall.Wizard();
        break;
      case 'conjurer':
        playerClass = new Gauntlet.GuildHall.Conjurer();
        break;
      case 'sorcerer':
        playerClass = new Gauntlet.GuildHall.Sorcerer();
        break;
      case 'thief':
        playerClass = new Gauntlet.GuildHall.Thief();
        break;
      case 'ninja':
        playerClass = new Gauntlet.GuildHall.Ninja();
        break;
      case 'assassin':
        playerClass = new Gauntlet.GuildHall.Assassin();
        break;
      default:
        break;
    }
  });

  // Store player weapon based on user selection
  $('.weapon').on('click', function (e) {
    switch (e.currentTarget.id) {
      case 'dagger':
        playerWeapon = new Gauntlet.Armory.Dagger();
        break;
      case 'broad-sword':
        playerWeapon = new Gauntlet.Armory.BroadSword();
        break;
      case 'war-axe':
        playerWeapon = new Gauntlet.Armory.WarAxe();
        break;
      case 'sphere':
        playerWeapon = new Gauntlet.SpellBook.Sphere();
        break;
      case 'cube':
        playerWeapon = new Gauntlet.SpellBook.Cube();
        break;
      case 'tetrahedron':
        playerWeapon = new Gauntlet.SpellBook.Tetrahedron();
        break;
      case 'cloud':
        playerWeapon = new Gauntlet.SpellBook.Cloud();
        break;
      default:
        break;
    }
  })
});

function fillPlayers() {
  $(".human h2").html(P1.playerName);
  $(".monster h2").html(P2.playerName);
  var desc = `A ${P1.skinColor} skinned ${P1.species} ${P1.class.name} with ${P1.health} health.`;
  if (P1.class.magical) {
    desc += ` Able to cast ${P1.weapon.name} of ${P1.weapon.type}!`;
  } else {
    desc += ` Wielding a nasty ${P1.weapon.name}!`;
  }
  $(".human .description").html(desc);
  $(".human .stat1").html("Str: " + P1.strength);
  $(".human .stat2").html("Int: " + P1.intelligence);
  $(".human .stat3").html("Agil: " + P1.agility);
  desc = `A ${P2.skinColor} skinned ${P2.species} ${P2.class.name} with ${P2.health} health.`;
  if (P2.class.magical) {
    desc += ` Able to cast ${P2.weapon.name} of ${P2.weapon.type}!`;
  } else {
    desc += ` Wielding a nasty ${P2.weapon.name}!`;
  }
  $(".monster .description").html(desc);
  $(".monster .stat1").html("Str: " + P2.strength);
  $(".monster .stat2").html("Int: " + P2.intelligence);
  $(".monster .stat3").html("Agil: " + P2.agility);
}

function createMonster() {
  // create P2, a monster, randomly
  var monsters = ["Orc", "Hobgoblin", "Ogre"];
  // Get a random index from the monsters array
  var random = Math.floor(Math.random() * monsters.length);
  // Get the string at the index
  var P2 = new Gauntlet.Combatants[monsters[random]];
  var monsterNames = [{name:"Pauly Shore",       possessivePronoun:"his"},
                      {name:"Elvira",            possessivePronoun:"her"},
                      {name:"Stephen Baldwin",   possessivePronoun:"his"},
                      {name:"Gary Busey",        possessivePronoun:"his"},
                      {name:"Dolph Lundgren",    possessivePronoun:"his"},
                      {name:"Dennis Rodman",     possessivePronoun:"his"},
                      {name:"Snooki",            possessivePronoun:"her"},
                      {name:"Amy Winehouse",     possessivePronoun:"her"},
                      {name:"William Shatner",   possessivePronoun:"his"} ];
  // Get a random index from the monsterNames array
  var random = Math.floor(Math.random() * monsterNames.length);
  // Get the string at the index
  P2.playerName = monsterNames[random].name
  P2.possessivePronoun = monsterNames[random].possessivePronoun;
  P2.class = P2.generateClass();

  // assign P2 a random weapon or spell
  if (P2.class.magical) {
    var weapons = ["Sphere", "Cube", "Tetrahedron", "Cloud"];
    // Get a random index from the weapons array
    var random = Math.floor(Math.random() * weapons.length);
    // Get the string at the index
    var randomWeapon = weapons[random];
    P2.setWeapon(new Gauntlet.SpellBook[randomWeapon]);
  } else {
    var weapons = ["Dagger", "BroadSword", "WarAxe"];
    // Get a random index from the weapons array
    var random = Math.floor(Math.random() * weapons.length);
    // Get the string at the index
    var randomWeapon = weapons[random];
    P2.setWeapon(new Gauntlet.Armory[randomWeapon]);
  }

  return P2;
}

},{"./gauntlet":4}],2:[function(require,module,exports){
'use strict';

let GuildHall = {};

/*
  Base function for a player, or enemy, class (profession)
 */
GuildHall.PlayerClass = function() {
  this.name = "Beggar";
  this.healthBonus = 0;
  this.strengthBonus = 0;
  this.intelligenceBonus = 0;
  this.agilityBonus = 0;
  this.magical = false;

  this.toString = function() {
    return this.name;
  }
};

/*
    FIGHTER CLASSES
      - Warrior
      - Valkyrie
      - Berserker
      - Monk
 */
GuildHall.Fighter = function() {
  this.healthBonus = 20;
  this.strengthBonus = 10;
};
GuildHall.Fighter.prototype = new GuildHall.PlayerClass();


GuildHall.Warrior = function() {
  this.name = "Warrior";
  this.healthBonus = this.healthBonus + 25;
  this.strengthBonus = this.strengthBonus + 30;
};
GuildHall.Warrior.prototype = new GuildHall.Fighter();


GuildHall.Valkyrie = function() {
  this.name = "Valkyrie";
  this.healthBonus = this.healthBonus + 20;
  this.strengthBonus = this.strengthBonus + 10;
};
GuildHall.Valkyrie.prototype = new GuildHall.Fighter();


GuildHall.Berserker = function() {
  this.name = "Berserker";
  this.healthBonus = this.healthBonus + 35;
  this.strengthBonus = this.strengthBonus + 20;
};
GuildHall.Berserker.prototype = new GuildHall.Fighter();


GuildHall.Monk = function() {
  this.name = "Monk";
  this.healthBonus = this.healthBonus + 10;
  this.strengthBonus = this.strengthBonus + 40;
};
GuildHall.Monk.prototype = new GuildHall.Fighter();


/*
    MAGICAL CLASSES
      - Shaman
      - Wizard
      - Conujurer
      - Sorcerer
 */
GuildHall.Mage = function() {
  this.name = "Mage";
  this.magical = true;
  this.healthBonus = this.healthBonus - 10;
  this.strengthBonus = this.strengthBonus - 20;
  this.intelligenceBonus = this.intelligenceBonus + 20;
};
GuildHall.Mage.prototype = new GuildHall.PlayerClass();


GuildHall.Shaman = function() {
  this.name = "Shaman";
  this.healthBonus = this.healthBonus + 5;
  this.strengthBonus = this.strengthBonus - 10;
  this.intelligenceBonus = this.intelligenceBonus + 20;
};
GuildHall.Shaman.prototype = new GuildHall.Mage();


GuildHall.Wizard = function() {
  this.name = "Wizard";
  this.healthBonus = this.healthBonus - 15;
  this.strengthBonus = this.strengthBonus - 25;
  this.intelligenceBonus = this.intelligenceBonus + 40;
};
GuildHall.Wizard.prototype = new GuildHall.Mage();


GuildHall.Conjurer = function() {
  this.name = "Conjurer";
  this.strengthBonus = this.strengthBonus - 10;
  this.intelligenceBonus = this.intelligenceBonus + 10;
};
GuildHall.Conjurer.prototype = new GuildHall.Mage();


GuildHall.Sorcerer = function() {
  this.name = "Sorcerer";
  this.healthBonus = this.healthBonus - 5;
  this.strengthBonus = this.strengthBonus - 20;
  this.intelligenceBonus = this.intelligenceBonus + 30;
};
GuildHall.Sorcerer.prototype = new GuildHall.Mage();


/*
    STEALTH CLASSES
      - Thief
      - Ninja
      - Assassin
 */

GuildHall.Eluder = function() {
  this.name = "Eluder";
  this.magical = false;
  this.agilityBonus = this.agilityBonus + 10;
  this.intelligenceBonus = this.intelligenceBonus + 35;
};

GuildHall.Eluder.prototype = new GuildHall.PlayerClass();

GuildHall.Thief = function() {
  this.name = "Thief";
  this.agilityBonus = this.agilityBonus + 5;
  this.intelligenceBonus = this.intelligenceBonus + 10;
};
GuildHall.Thief.prototype = new GuildHall.Eluder();


GuildHall.Ninja = function() {
  this.name = "Ninja";
  this.agilityBonus = this.agilityBonus + 20;
  this.intelligenceBonus = this.intelligenceBonus + 5;
};
GuildHall.Ninja.prototype = new GuildHall.Eluder();


GuildHall.Assassin = function() {
  this.name = "Assassin";
  this.agilityBonus = this.agilityBonus + 10;
  this.healthBonus = this.healthBonus - 5;
  this.intelligenceBonus = this.intelligenceBonus + 5;
};
GuildHall.Assassin.prototype = new GuildHall.Eluder();

module.exports = GuildHall;


},{}],3:[function(require,module,exports){
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

},{"./classes":2}],4:[function(require,module,exports){
'use strict';

const GuildHall = require('./classes');
const Armory = require('./weapons');
const SpellBook = require('./spells');
const Combatants = require('./combatants');

let Gauntlet = {
	GuildHall, Armory, SpellBook, Combatants
};

module.exports = Gauntlet;
},{"./classes":2,"./combatants":3,"./spells":5,"./weapons":6}],5:[function(require,module,exports){
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

module.exports = SpellBook;
},{}],6:[function(require,module,exports){
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
},{}]},{},[1])


//# sourceMappingURL=bundle.js.map
