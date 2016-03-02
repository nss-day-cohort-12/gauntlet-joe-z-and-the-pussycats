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

  report(`Player ${playerAttacking} wins the coin flip and will go first.`);

  var doAnotherAttack = true;
  while (doAnotherAttack) {
    if (playerAttacking === 1) {
      doAnotherAttack = attack(P1,P2);
      playerAttacking = 2;
    } else {
      doAnotherAttack = attack(P2,P1);
      playerAttacking = 1;
    }
  }

  // battle complete
}

function coinFlip() {
  return Math.floor(Math.random() * 2);  // 0 or 1
}

function attack(attacker,defender) {
  report(`${attacker.playerName} is attacking ${defender.playerName}.`);

  if (attacker.class.magical) {
    report(`${attacker.playerName} casts a ${attacker.weapon.name} of ${attacker.weapon.type}...`);
  } else {
    report(`${attacker.playerName} lunges with ${attacker.possessivePronoun} ${attacker.weapon.name}...`);
  }

  // does defender successfully evade?
  if (rollDice() <= defender.agility) {
    report(`${defender.playerName} evades the attack!  Zero damage.`);
    return true;  // doAnotherAttack = true
  }

  // defender takes damage
  var damage = Math.floor(Math.random() * attacker.weapon.damage + 1);  // base damage
  if (attacker.class.magical) {
    damage += Math.round(damage * attacker.intelligence / 50);  // damage adjustment
    report(`and does ${damage} points of damage!`);
  } else {
    damage += Math.round(damage * attacker.strength / 50);  // damage adjustment
    // Get a random index from the limbs array
    var random = Math.floor(Math.random() * defender.limbs.length);
    // Get the string at the index
    var randomLimb = defender.limbs[random];
    report(`and strikes ${defender.playerName} in the ${randomLimb} for ${damage} points of damage!`);
  }
  report(`${defender.playerName} goes from ${defender.health} health to ${defender.health - damage} health.`);
  defender.health -= damage;

  // did defender die?
  if (defender.health <= 0) {
    report(`${attacker.playerName} has defeated ${defender.playerName}!`);
    return false;  // don't do another attack -- it's over!
  } else {
    return true;  // doAnotherAttack = true
  }
}

function rollDice() {
  return Math.floor(Math.random() * 100);  // 0 to 99
}

function report(text) {
  // in final version, supplement this ffunction with output to DOM element
  console.log(text);
}

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