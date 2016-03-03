'use strict';

const guildHall = require('./classes');
const armory = require('./weapons');
const spellBook = require('./spells');
const player = require('./player');
const enemies = require('./enemies');

let combatants = {
	player, enemies
}

let Gauntlet = {
	armory, spellBook, guildHall, combatants
};

