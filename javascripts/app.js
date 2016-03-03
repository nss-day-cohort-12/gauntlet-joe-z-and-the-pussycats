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