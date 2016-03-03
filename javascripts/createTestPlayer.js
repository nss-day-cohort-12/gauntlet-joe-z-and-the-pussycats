function createTestPlayer(name) {
  p = new Gauntlet.Combatants.Player();
  p.playerName = name;
  p.species = "human";
  p.allowedClasses = ["Shaman", "Monk", "Valkyrie"];
  p.class = p.generateClass();
  p.agility = 40;

  return p;
}