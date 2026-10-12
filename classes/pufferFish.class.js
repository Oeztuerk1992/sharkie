class PufferFish extends MovableObject {
  x = 200;
  y = 100;
  width = 100;
  height = 100;


  /**
   * Creates the puffer fish and loads its image.
   */
  constructor() {
    super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
  }
}