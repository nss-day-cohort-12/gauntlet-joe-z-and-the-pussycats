function doBattle(P1,P2) {
  // P1 is the player's character
  // P2 is the monster

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
    report(`${attacker.playerName} casts a ${attacker.weapon} of ${attacker.weapon.type}!`);
  } else {
    report(`${attacker.playerName} lunges with his ${attacker.weapon}...`);
  }

  // does defender successfully evade?
  if (rollDice() <= defender.agility) {
    report(`${defender.playerName} evades the attack!  Zero damage.`);
    return true;  // doAnotherAttack = true
  }

  // defender takes damage
  defender.health -= 15;

  // did defender die?
  if (defender.health <= 0) {
    report(`${defender.playerName} is dead!`);
    return false;
  } else {
    report(`${defender.playerName} loses 15 health.`);
    return true;
  }
}

function rollDice() {
  return Math.floor(Math.random * 100);  // 0 to 99
}

function report(text) {
  console.log(text);
}

var P1 = createTestPlayer("Sluggo");
P1.setWeapon("Dagger");
console.log("P1.weapon",P1.weapon);
var P2 = createTestPlayer("Archie");
P2.setWeapon("BroadSword");
console.log("P2.weapon",P2.weapon);

doBattle(P1,P2);