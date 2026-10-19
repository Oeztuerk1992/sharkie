class Level {
  enemies;
  barriers;
  backgroundObjects;
  coins;
  poisonBottles;
  levelEndX = 5120;


  /**
   * Creates a level with all its objects.
   * @param {MovableObject[]} enemies - All enemies of the level.
   * @param {Barrier[]} barriers - All barriers of the level.
   * @param {BackgroundObject[]} backgroundObjects - All background layers of the level.
   * @param {Coin[]} coins - All coins of the level.
   * @param {PoisonBottle[]} poisonBottles - All poison bottles of the level.
   */
  constructor(enemies, barriers, backgroundObjects, coins, poisonBottles) {
    this.enemies = enemies;
    this.barriers = barriers;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.poisonBottles = poisonBottles;
  }
}
