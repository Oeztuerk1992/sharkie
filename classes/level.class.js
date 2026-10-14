class Level {
  enemies;
  barriers;
  backgroundObjects;
  levelEndX = 5120;


  /**
   * Creates a level with all its objects.
   * @param {MovableObject[]} enemies - All enemies of the level.
   * @param {Barrier[]} barriers - All barriers of the level.
   * @param {BackgroundObject[]} backgroundObjects - All background layers of the level.
   */
  constructor(enemies, barriers, backgroundObjects) {
    this.enemies = enemies;
    this.barriers = barriers;
    this.backgroundObjects = backgroundObjects;
  }
}
