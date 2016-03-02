// /*
//   Test code to generate a human player and an orc player
//  */
// var warrior = new Gauntlet.Combatants.Human();
// warrior.setWeapon(new Gauntlet.Armory.WarAxe());
// warrior.generateClass();  // This will be used for "Surprise me" option
// console.log(warrior.toString());

// var orc = new Gauntlet.Combatants.Orc();
// orc.generateClass();
// orc.setWeapon(new Gauntlet.Armory.BroadSword());
// console.log(orc.toString());

// /*
//   Test code to generate a spell
//  */
// var spell = new Gauntlet.SpellBook.Sphere();
// console.log("spell: ", spell.toString());

// declare variables that will be used in player constructor
var playerName;
var playerClass;
var playerWeapon;

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
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--weapon":
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--battleground":
        moveAlong = ($("#player-name").val() !== "");
        break;
    }

    if (moveAlong) {
      $(".card").hide();
      $("." + nextCard).show();
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
  // TODO: create class and IDs
  $('.class').on('click', function (e) {
    switch (e.target.id) {
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
  // TODO: create weapon buttons, add classes and IDs
  $('.weapon').on('click', function (e) {
    switch (e.target.id) {
      case 'dagger':
        playerWeapon = new Gauntlet.Armory.Dagger();
        break;
      case 'broad-sword':
        playerWeapon = new Gauntlet.Armory.BroadSword();
        break;
      case 'war-axe':
        playerWeapon = new Gauntlet.Armory.WarAxe();
        break;
      default:
        break;
    }
  })

  // Switch to battle view when "begin" button is clicked
  // TODO: add "begin" button to HTML

});