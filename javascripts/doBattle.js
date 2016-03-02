function doBattle(P1,P2) {
  // P1 is the player's character
  report(`You are ${P1.playerName}, a ${P1.skinColor} skinned ${P1.species} ${P1.class.name} with ${P1.health} health.`);
  // P2 is the monster
  report(`Your opponent is ${P2.playerName}, a ${P2.skinColor} skinned ${P2.species} ${P2.class.name} with ${P2.health} health.`);

  // function "report" outputs string to the appropriate DOM element
  textOutput = [];

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
    report(`${attacker.playerName} lunges with his ${attacker.weapon.name}...`);
  }

  // does defender successfully evade?
  if (rollDice() <= defender.agility) {
    report(`${defender.playerName} evades the attack!  Zero damage.`);
    return true;  // doAnotherAttack = true
  }

  // defender takes damage
  var damage = attacker.weapon.damage;  // base damage
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
    return false;
  } else {
    return true;
  }
}

function rollDice() {
  return Math.floor(Math.random() * 100);  // 0 to 99
}

function report(text) {
  console.log(text);
}

// in final version,
// create P1 based on user input and random values

// for testing, make P1 from createTestPlayer
var P1 = createTestPlayer("Sluggo");
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
var randomMonster = monsters[random];
var P2 = new Gauntlet.Combatants[randomMonster];
P2.playerName = "Archie";
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



console.log("P2",P2);

doBattle(P1,P2);