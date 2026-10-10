class Character {
  x = 60;
  y = 60;
  width = 245;
  height = 300;
  img;

  /**
   * Creates the character and loads its image.
   */
  constructor() {
    this.img = new Image();
    this.img.src = 'img/1.Sharkie/1.IDLE/1.png';
  }
}