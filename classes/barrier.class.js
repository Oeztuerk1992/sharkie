class Barrier extends MovableObject {
  /**
   * Creates a barrier and loads its image.
   * @param {string} imagePath - The path to the barrier image.
   * @param {number} x - The x-coordinate of the barrier.
   * @param {number} y - The y-coordinate of the barrier.
   * @param {number} width - The width of the barrier.
   * @param {number} height - The height of the barrier.
   */
  constructor(imagePath, x, y, width, height) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}