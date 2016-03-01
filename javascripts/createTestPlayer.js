function createTestPlayer(name) {
  p = new Gauntlet.Combatants.Player();
  p.playerName = name;
  p.skinColor = "brindle";
  p.allowedClasses = ["Monk","Shaman"];
  p.class = p.generateClass();
  p.setWeapon("Dagger")
  p.agility = 40;

  return p;
}