class MovableObject {
  y = 250;
  width = 150;
  height = 100;
  img;
  speed = 0.15;
  otherDirection = false;
  imageCache = {};
  currentImage = 0;
  speedY = 0;
  acceleration = 0.8;
  maxFallSpeed = 5;
  offset = { top: 0, left: 0, right: 0, bottom: 0 };
  energy = 100;


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
  moveRight() {
    this.x += this.speed;
  }


  /**
   * Moves the object up.
   * @returns {void}
   */
  moveUp() {
    this.y -= this.speed;
  }


  /**
   * Moves the object down.
   * @returns {void}
   */
  moveDown() {
    this.y += this.speed;
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


  /**
   * Pulls the object down all the time, like gravity.
   * @returns {void}
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        this.limitFallSpeed();
      } else {
        this.speedY = 0;
        this.y = 720 - this.height;
      }
    }, 1000 / 60);
  }


  /**
   * Makes sure the object does not sink faster than the max fall speed.
   * @returns {void}
   */
  limitFallSpeed() {
    if (this.speedY < -this.maxFallSpeed) {
      this.speedY = -this.maxFallSpeed;
    }
  }


  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is in the air.
   */
  isAboveGround() {
    return this.y < 720 - this.height;
  }


  /**
   * Lets the object jump up.
   * @returns {void}
   */
  jump() {
    this.speedY = 15;
  }


  /**
   * Checks if this object touches another object. The offsets cut away the empty edges of the images.
   * @param {MovableObject} object - The other object.
   * @returns {boolean} True if both objects touch each other.
   */
  isColliding(object) {
    return this.x + this.width - this.offset.right > object.x + object.offset.left &&
      this.x + this.offset.left < object.x + object.width - object.offset.right &&
      this.y + this.height - this.offset.bottom > object.y + object.offset.top &&
      this.y + this.offset.top < object.y + object.height - object.offset.bottom;
  }


  /**
   * Takes away energy when the object gets hit.
   * @returns {void}
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }
}
