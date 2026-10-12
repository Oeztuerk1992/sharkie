class Barrier extends MovableObject {
  width = 1121;
  height = 720;

  /**
   * Creates a barrier and loads its image.
   */
  constructor() {
    super().loadImage('img/3. Background/Barrier/1.png');
    this.x = 0;
    this.y = 0;
    
  }
}