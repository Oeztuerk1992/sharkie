class Character extends MovableObject {
  x = 60;
  y = 60;
  width = 245;
  height = 300;

  /**
   * Creates the character and loads its image.
   */
  constructor() {
    super();
    this.loadImage('img/1.Sharkie/1.IDLE/1.png');
  }
}