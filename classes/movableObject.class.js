class MovableObject {
  x = 0;
  y = 0;
  width = 100;
  height = 100;
  img;


  /**
   * Loads an image for this object.
   * @param {string} path - The path to the image file.
   * @returns {void}
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
}
