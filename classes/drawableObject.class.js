class DrawableObject {
  static allImages = {};
  x = 0;
  y = 0;
  width = 100;
  height = 100;
  img;
  imageCache = {};


  /**
   * Returns the image for a path. Every image is loaded only once and then shared by all objects.
   * @param {string} path - The path to the image file.
   * @returns {HTMLImageElement} The image.
   */
  getImage(path) {
    if (!DrawableObject.allImages[path]) {
      let img = new Image();
      img.src = path;
      DrawableObject.allImages[path] = img;
    }
    return DrawableObject.allImages[path];
  }


  /**
   * Loads an image for this object.
   * @param {string} path - The path to the image file.
   * @returns {void}
   */
  loadImage(path) {
    this.img = this.getImage(path);
  }


  /**
   * Loads several images and stores them in the image cache.
   * @param {string[]} paths - The paths of the images.
   * @returns {void}
   */
  loadImages(paths) {
    paths.forEach(path => {
      this.imageCache[path] = this.getImage(path);
    });
  }
}
