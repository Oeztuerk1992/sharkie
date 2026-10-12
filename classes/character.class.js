class Character extends MovableObject {
  x = 60;
  y = 60;
  width = 250;
  height = 300;

  /**
   * Creates the character and loads its image.
   */
  constructor() {
    super().loadImage('img/1.Sharkie/1.IDLE/1.png');
  }

  /**
   * Lets the character jump.
   * @returns {void}
   */
  jump() {
    console.log('Jumping');
  }
}