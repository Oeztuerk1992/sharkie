class JellyFish extends MovableObject {
  x = 400;
  y = 200;
  height = 100;
  width = 100;


  /**
   * Creates the jelly fish and loads its image.
   */
  constructor() {
    super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
  }
}