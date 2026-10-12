class EndBoss extends MovableObject {
  
  width = 400;
  height = 400;


  /**
   * Creates the end boss and loads its image.
   */
  constructor() {
    super().loadImage('img/2.Enemy/3 Final Enemy/2.floating/1.png');
    this.x = Math.random()* 500 + 200;
  }
}