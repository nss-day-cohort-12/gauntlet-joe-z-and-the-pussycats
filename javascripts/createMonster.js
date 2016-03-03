'use strict';

let Gauntlet = require("./app");
Gauntlet.Armory = require('./weapons');
Gauntlet.SpellBook = require('./spells');
Gauntlet.GuildHall = require('./classes');
Gauntlet.Combatants = require('./enemies');

console.log(`Gauntlet createMonster: `, Gauntlet);

module.exports = createMonster;

function createMonster() {
  // create P2, a monster, randomly
  let monsters = ["Orc", "Hobgoblin", "Ogre"];
  // Create a new random monster from the monsters array
  let P2 = new Gauntlet.Combatants[monsters[randomNumber(monsters)]]();
  let monsterNames = [{name:"Pauly Shore",       possessivePronoun:"his"},
                      {name:"Elvira",            possessivePronoun:"her"},
                      {name:"Stephen Baldwin",   possessivePronoun:"his"},
                      {name:"Gary Busey",        possessivePronoun:"his"},
                      {name:"Dolph Lundgren",    possessivePronoun:"his"},
                      {name:"Dennis Rodman",     possessivePronoun:"his"},
                      {name:"Snooki",            possessivePronoun:"her"},
                      {name:"Amy Winehouse",     possessivePronoun:"her"},
                      {name:"William Shatner",   possessivePronoun:"his"} ];
  // Get the string at the index
  let monsterNum = randomNumber(monsterNames);
  P2.playerName = monsterNames[monsterNum].name;
  P2.possessivePronoun = monsterNames[monsterNum].possessivePronoun;
  P2.class = P2.generateClass();

  let weapons, randomWeapon;

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