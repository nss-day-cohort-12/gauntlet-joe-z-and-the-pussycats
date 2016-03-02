// main.js

// in final version,
// create P1 based on user input and random values

// for testing, make P1 from createTestPlayer
var P1 = createTestPlayer("Sluggo");
P1.possessivePronoun = "his";
// assign P1 a random weapon or spell
if (P1.class.magical) {
  var weapons = ["Sphere", "Cube", "Tetrahedron", "Cloud"];
  // Get a random index from the weapons array
  var random = Math.floor(Math.random() * weapons.length);
  // Get the string at the index
  var randomWeapon = weapons[random];
  P1.setWeapon(new Gauntlet.SpellBook[randomWeapon]);
} else {
  var weapons = ["Dagger", "BroadSword", "WarAxe"];
  // Get a random index from the weapons array
  var random = Math.floor(Math.random() * weapons.length);
  // Get the string at the index
  var randomWeapon = weapons[random];
  P1.setWeapon(new Gauntlet.Armory[randomWeapon]);
}

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
                    {name:"Tom Green",         possessivePronoun:"his"},
                    {name:"Snooki",            possessivePronoun:"her"},
                    {name:"Mama June",         possessivePronoun:"her"},
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

doBattle(P1,P2);