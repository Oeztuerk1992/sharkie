class MovableObject {
  y = 250;
  width = 150;
  height = 100;
  img;
  speed = 0.15;
  otherDirection = false;
  imageCache = {};
  currentImage = 0;


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
    this.y -= this.speed
  }

  /**
   * Moves the object down.
   * @returns {void}
   */
  moveDown() {
    this.y += this.speed
  }


    /**
   * Loads several images and stores them in the image cache.
   * @param {string[]} paths - The paths of the images.
   * @returns {void}
   */
  loadImages(paths) {
    paths.forEach(path => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }


  /**
   * Shows the next image of an animation.
   * @param {string[]} images - The paths of the animation images.
   * @returns {void}
   */
  playAnimation(images) {
    let animationSteps = this.currentImage % images.length;
    let path = images[animationSteps];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
