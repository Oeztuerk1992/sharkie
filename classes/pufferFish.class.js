class PufferFish extends MovableObject {
  
 
  width = 100;
  height = 100;


  /**
   * Creates the puffer fish and loads its image.
   */
  constructor() {
    super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');

    this.x = Math.random()* 500 + 200;
  }
}