(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// declare global variables that will be used in player constructor
var playerName;
var playerClass;
var playerWeapon;
var P1,P2;

var Gauntlet = {};

Gauntlet.Armory = require('./weapons');
console.log(`Armory Test: `, Gauntlet.Armory);
Gauntlet.SpellBook = require('./spells');
console.log(`SpellBook Test: `, Gauntlet.SpellBook);
Gauntlet.GuildHall = require('./classes');
console.log(`GuildHall Test: `, Gauntlet.GuildHall);

Gauntlet.Combatants = require('./enemies');
console.log(`Combatants Test: `, Gauntlet.Combatants);

var createMonster = require('./createMonster');
var doBattle = require('./doBattle');

console.log(`Gauntlet on app.js : `, Gauntlet);

module.exports = Gauntlet;

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
        currClass = P1.allowedClasses[i].toLowerCase();
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
  });
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
},{"./classes":2,"./createMonster":3,"./doBattle":4,"./enemies":5,"./spells":7,"./weapons":8}],2:[function(require,module,exports){
/*
  TODO: Modularize this code with IIFE or Browserify
 */
var Gauntlet = Gauntlet || {};
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

/*
    FIGHTER CLASSES
      - Warrior
      - Valkyrie
      - Berserker
      - Monk
 */
Gauntlet.GuildHall.Fighter = function() {
  this.healthBonus = 20;
  this.strengthBonus = 10;
};
Gauntlet.GuildHall.Fighter.prototype = new Gauntlet.GuildHall.PlayerClass();


Gauntlet.GuildHall.Warrior = function() {
  console.log(`test warrior created`);
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


/*
    MAGICAL CLASSES
      - Shaman
      - Wizard
      - Conujurer
      - Sorcerer
 */
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


/*
    STEALTH CLASSES
      - Thief
      - Ninja
      - Assassin
 */

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



},{}],3:[function(require,module,exports){
// createMonster()

var Gauntlet = require("./app");
Gauntlet.Armory = require('./weapons');
Gauntlet.SpellBook = require('./spells');
Gauntlet.GuildHall = require('./classes');
Gauntlet.Combatants = require('./enemies');

console.log(`Gauntlet createMonster: `, Gauntlet);

module.exports = createMonster;

function createMonster() {
  // create P2, a monster, randomly
  var monsters = ["Orc", "Hobgoblin", "Ogre"];
  // Create a new random monster from the monsters array
  var P2 = new Gauntlet.Combatants[monsters[randomNumber(monsters)]]();
  var monsterNames = [{name:"Pauly Shore",       possessivePronoun:"his"},
                      {name:"Elvira",            possessivePronoun:"her"},
                      {name:"Stephen Baldwin",   possessivePronoun:"his"},
                      {name:"Gary Busey",        possessivePronoun:"his"},
                      {name:"Dolph Lundgren",    possessivePronoun:"his"},
                      {name:"Dennis Rodman",     possessivePronoun:"his"},
                      {name:"Snooki",            possessivePronoun:"her"},
                      {name:"Amy Winehouse",     possessivePronoun:"her"},
                      {name:"William Shatner",   possessivePronoun:"his"} ];
  // Get the string at the index
  var monsterNum = randomNumber(monsterNames);
  P2.playerName = monsterNames[monsterNum].name;
  P2.possessivePronoun = monsterNames[monsterNum].possessivePronoun;
  P2.class = P2.generateClass();

  var weapons, randomWeapon;

  // assign P2 a random weapon or spell
  if (P2.class.magical) {
    weapons = ["Sphere", "Cube", "Tetrahedron", "Cloud"];
    // Select a random weapon from the magic weapons array
    randomWeapon = weapons[randomNumber(weapons)];
    P2.setWeapon(new Gauntlet.SpellBook[randomWeapon]());
  } else {
    weapons = ["Dagger", "BroadSword", "WarAxe"];
    // Select a random weapon from the melee weapons array
    randomWeapon = weapons[randomNumber(weapons)];
    P2.setWeapon(new Gauntlet.Armory[randomWeapon]());
  }

  return P2;
}

// Returns random number between 0 and the length of the passed array
function randomNumber (array) {
  return  Math.floor(Math.random() * array.length);
}
},{"./app":1,"./classes":2,"./enemies":5,"./spells":7,"./weapons":8}],4:[function(require,module,exports){
module.exports = doBattle;

function doBattle(P1,P2) {
  // P1 is the player's character
  report(`You are ${P1.playerName}, a ${P1.skinColor} skinned ${P1.species} ${P1.class.name} with ${P1.health} health.`);
  if (P1.class.magical) {
    report(`${P1.playerName} is able to cast ${P1.weapon.name} of ${P1.weapon.type}!`);
  } else {
    report(`${P1.playerName} is wielding a nasty ${P1.weapon.name}!`);
  }
  // P2 is the monster
  report(`Your opponent is ${P2.playerName}, a ${P2.skinColor} skinned ${P2.species} ${P2.class.name} with ${P2.health} health.`);
  if (P2.class.magical) {
    report(`${P2.playerName} is able to cast ${P2.weapon.name} of ${P2.weapon.type}!`);
  } else {
    report(`${P2.playerName} is wielding a nasty ${P2.weapon.name}!`);
  }

  report("It's on!!!");

  var playerAttacking = coinFlip() + 1;  // 1 or 2
  var goesFirst = playerAttacking === 1 ? P1.playerName : P2.playerName;

  report(`${goesFirst} wins the coin flip and will go first.`);
  report(". . .","center");

  if (playerAttacking === 2) {
    doAnotherAttack = attack(P2,P1);
    if (!doAnotherAttack) {
      gameOver();
    }
  }

  // activate listener on "Attack" button
  $("#attackBtn").on("click",function(){
    doAnotherAttack = attack(P1,P2);  // player attacks monster
    if(!doAnotherAttack) {
      gameOver();
    } else {
      doAnotherAttack = attack(P2,P1);  // monster attacks player
      if(!doAnotherAttack) {
        gameOver();
      }
    }
  });
}

function gameOver() {
  report(" * * * GAME OVER * * *","center");
  $("#attackBtn").prop("disabled",true);  // disable Attack button
  $("#attackBtn").off("click");  // turn off event listener
}

function coinFlip() {
  return Math.floor(Math.random() * 2);  // 0 or 1
}

function attack(attacker,defender) {
  var justification = attacker.playerNum === 1 ? "left" : "right";
  report(`${attacker.playerName} is attacking ${defender.playerName}.`,justification);

  if (attacker.class.magical) {
    report(`${attacker.playerName} casts a ${attacker.weapon.name} of ${attacker.weapon.type}...`,justification);
  } else {
    report(`${attacker.playerName} lunges with ${attacker.possessivePronoun} ${attacker.weapon.name}...`,justification);
  }

  // does defender successfully evade?
  if (rollDice() <= defender.agility) {
    report(`${defender.playerName} evades the attack!  Zero damage.`,justification);
    report(". . .","center");  // blank line
    return true;  // doAnotherAttack = true
  }

  // defender takes damage
  var damage = Math.floor(Math.random() * attacker.weapon.damage + 1);  // base damage
  if (attacker.class.magical) {
    damage += Math.round(damage * attacker.intelligence / 50);  // damage adjustment
    report(`and does ${damage} points of damage!`,justification);
  } else {
    damage += Math.round(damage * attacker.strength / 50);  // damage adjustment
    // Get a random index from the limbs array
    var random = Math.floor(Math.random() * defender.limbs.length);
    // Get the string at the index
    var randomLimb = defender.limbs[random];
    report(`and strikes ${defender.playerName} in the ${randomLimb} for ${damage} points of damage!`,justification);
  }
  report(`${defender.playerName} goes from ${defender.health} health to ${defender.health - damage} health.`,justification);
  report(". . .","center");  // blank line
  defender.health -= damage;
  var pct = Math.round(100 * (defender.health / defender.originalHealth));
  if (pct < 0) {
    pct = 0;
  }
  if (defender.playerNum == 2) {  // defender is monster?
    $(".monster .bar").css("width",`${pct}%`);
  } else {
    $(".human .bar").css("width",`${pct}%`);
  }

  // did defender die?
  if (defender.health <= 0) {
    report(`${attacker.playerName} has defeated ${defender.playerName}!`,"center");
    return false;  // don't do another attack -- it's over!
  } else {
    return true;  // doAnotherAttack = true
  }
}

function rollDice() {
  return Math.floor(Math.random() * 100);  // 0 to 99
}

function report(text,justification) {
  if (!justification) {
    justification = "left";
  }
  var oldTxt = $(".combat-log-text").html();
  $(".combat-log-text").html(oldTxt + `<p style='text-align:${justification}'>${text}</p>`);
  $(".combat-log").scrollTop($(".combat-log-text").height());
  console.log(text);
}
},{}],5:[function(require,module,exports){
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
},{"./player":6}],6:[function(require,module,exports){
var Gauntlet = Gauntlet || {};
Gauntlet.GuildHall = require("./classes");
Gauntlet.Combatants = {};
console.log(`Gauntlet on player: `, Gauntlet);
console.log(`GuildHall on player: `, Gauntlet.GuildHall);

module.exports = Gauntlet;

Gauntlet.Combatants.Player = function(name) {
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
      "!"
    ].join("");
    return output;
  };
};

Gauntlet.Combatants.Player.prototype.setWeapon = function(newWeapon) {
  this.weapon = newWeapon;
};

Gauntlet.Combatants.Player.prototype.generateClass = function() {
  // Get a random index from the allowed classes array
  var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

  // Get the string at the index
  var randomClass = this.allowedClasses[random];

  // Composes the corresponding player class into the player object
  this.class = new Gauntlet.GuildHall[randomClass]();

  // Add the bonuses
  this.health += this.class.healthBonus;
  this.strength += this.class.strengthBonus;
  this.intelligence += this.class.intelligenceBonus;
  this.agility += this.class.agilityBonus;

  return this.class;
};

Gauntlet.Combatants.Human = function() {
  var randomSkin;

  this.species = "Human";
  this.intelligence = this.intelligence + 20;

  this.allowedClasses = ["Warrior", "Berserker", "Wizard", "Monk", "Ninja", "Thief", "Sorcerer"];
};
Gauntlet.Combatants.Human.prototype = new Gauntlet.Combatants.Player();

Gauntlet.Combatants.Monster = function() {
  this.health = this.health - 30;
  this.intelligence = this.intelligence -20;
  this.strength = this.strength + 30;
};

Gauntlet.Combatants.Monster.prototype = new Gauntlet.Combatants.Player();
},{"./classes":2}],7:[function(require,module,exports){
/*
  TODO: Modularize this code with IIFE or Browserify
 */
var Gauntlet = Gauntlet || {};
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

  var random = Math.round(Math.random() * (this.damageTypes.length - 1));
  this.type = this.damageTypes[random];
};
Gauntlet.SpellBook.Sphere.prototype = new Gauntlet.SpellBook.Spell();

/*
  An elemental sphere that can be cast by a magical class
 */
Gauntlet.SpellBook.Cube = function() {
  this.name = "cube";
  this.damage = Math.floor(Math.random() * 11 + 10);

  var random = Math.round(Math.random() * (this.damageTypes.length - 1));
  this.type = this.damageTypes[random];
};
Gauntlet.SpellBook.Cube.prototype = new Gauntlet.SpellBook.Spell();
/*
  An elemental sphere that can be cast by a magical class
 */
Gauntlet.SpellBook.Tetrahedron = function() {
  this.name = "tetrahedron";
  this.damage = Math.floor(Math.random() * 12 + 10);

  var random = Math.round(Math.random() * (this.damageTypes.length - 1));
  this.type = this.damageTypes[random];
};
Gauntlet.SpellBook.Tetrahedron.prototype = new Gauntlet.SpellBook.Spell();

/*
  An elemental cloud that can be cast by a magical class
 */
Gauntlet.SpellBook.Cloud = function() {
  this.name = "cloud";
  this.damage = Math.floor(Math.random() * 13 + 10);

  var random = Math.round(Math.random() * (this.damageTypes.length - 1));
  this.type = this.damageTypes[random];
};
Gauntlet.SpellBook.Cloud.prototype = new Gauntlet.SpellBook.Spell();
},{}],8:[function(require,module,exports){

var Gauntlet = Gauntlet || {};
Gauntlet.Armory = {};

Gauntlet.Armory.Weapon = function() {
  this.name = "bare hands";
  this.damage = 1;
  this.hands = 2;

  this.toString = function() {
    return this.name;
  };
};

Gauntlet.Armory.Dagger = function() {
  this.name = "dagger";
  this.damage = 10;
  this.hands = 1;
};
Gauntlet.Armory.Dagger.prototype = new Gauntlet.Armory.Weapon();

Gauntlet.Armory.BroadSword = function() {
  this.name = "broad sword";
  this.damage = 14;
  this.hands = 2;
};
Gauntlet.Armory.BroadSword.prototype = new Gauntlet.Armory.Weapon();

Gauntlet.Armory.WarAxe = function() {
  this.name = "war axe";
  this.damage = 18;
  this.hands = 2;
};
Gauntlet.Armory.WarAxe.prototype = new Gauntlet.Armory.Weapon();

module.exports = Gauntlet.Armory;

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map
