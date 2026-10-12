class MovableObject {
  
  y = 250;
  width = 150;
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

  /**
   * Moves the object to the right.
   * @returns {void}
   */
  moveRight() {
    console.log('Moving right');
  }

  /**
   * Moves the object to the left.
   * @returns {void}
   */
  moveLeft() {
    console.log('Moving left');
  }

  /**
   * Moves the object up.
   * @returns {void}
   */
  moveUp() {

  }

  /**
   * Moves the object down.
   * @returns {void}
   */
  moveDown() {

  }
}
