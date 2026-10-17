class BackgroundObject extends DrawableObject {
  width = 1280;
  height = 720;

  
  /**
   * Creates a background object and loads its image.
   * @param {string} imagePath - The path to the image to be loaded.
   * @param {number} x - The x-coordinate of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 720 - this.height;
  }
}