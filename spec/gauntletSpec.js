'use strict';

describe("Main Gauntlet Functionality", () => {

	it("should have a Gauntlet function defined", () => {
		expect(Gauntlet).toBeDefined();
	});

it("should have a Gauntlet.Combatant.Human protoype with a property of species should be defined", () => {
		let testHuman = new Gauntlet.Combatants.Human();
		expect(testHuman.species).toBeDefined();
	});

it("should have a Dagger with a defined damage property", () => {
		let testDagger = new Dagger();
		expect(testDagger.damage).toBeDefined();
	});

it("should have a generateClass function which defines a class property on a Player object", () => {
		let testPlayer = new new Gauntlet.Combatants.Player();
		testPlayer.generateClass();
		expect(testPlayer.class).toBeDefined();
	});

it("should have a generateClass function which defines a class property on a Player object", () => {
		let testWarrior = new new Gauntlet.GuildHall.Warrior();
		expect(testWarrior.name).toBe("Warrior");
	});



});
