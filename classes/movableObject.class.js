class MovableObject {
  y = 250;
  width = 150;
  height = 100;
  img;
  speed = 0.15;
  otherDirection = false;


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
   * Moves the object to the left.
   * @returns {void}
   */
  moveLeft() {
    this.x -= this.speed;
  }


  /**
   * Moves the object to the right.
   * @returns {void}
   */
  moveRight(){
  this.x += this.speed;
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
