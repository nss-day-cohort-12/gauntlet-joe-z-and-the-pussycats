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
  if (playerAttacking === 1) {
    var goesFirst = P1.playerName;
  } else {
    var goesFirst = P2.playerName;
  }
  report(`${goesFirst} wins the coin flip and will go first.`);
  report(". . .","center");

  if (playerAttacking === 2) {
    doAnotherAttack = attack(P2,P1)
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
  if (attacker.playerNum === 1) {
    var justification = "left";
  } else {
    var justification = "right";
  }
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