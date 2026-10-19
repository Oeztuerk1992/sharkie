class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  currentImage = 0;
  lastHit = 0;
  speedY = 0;
  acceleration = 0.8;
  maxFallSpeed = 5;
  offset = { top: 0, left: 0, right: 0, bottom: 0 };
  energy = 100;


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
   * @param {MovableObject} mo - The other movable object.
   * @returns {boolean} True if both objects touch each other.
   */
  isColliding(mo) {
    return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
  }


  /**
   * Takes away energy when the object gets hit, but not again while it is still hurt.
   * @returns {void}
   */
  hit() {
    if (this.isHurt()) {
      return;
    }
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }


  /**
   * Checks if the object was hit in the last second.
   * @returns {boolean} True if the object is still hurt.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed < 1000;
  }


  /**
   * Checks if the object has no energy left.
   * @returns {boolean} True if the object is dead.
   */
  isDead() {
    return this.energy == 0;
  }
}
