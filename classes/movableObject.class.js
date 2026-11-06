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
  damage = 5;


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
   * Pulls the object down one step, like gravity. The world calls this 60 times per second.
   * @returns {void}
   */
  applyGravity() {
    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
      this.limitFallSpeed();
    } else {
      this.speedY = 0;
      this.y = 720 - this.height;
    }
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
    return this.x + this.width - this.getOffsetRight() > mo.x + mo.getOffsetLeft() &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.getOffsetLeft() < mo.x + mo.width - mo.getOffsetRight() &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
  }


  /**
   * Returns the empty space on the left of the image. When the image is mirrored, left and right swap.
   * @returns {number} The left offset.
   */
  getOffsetLeft() {
    if (this.otherDirection) {
      return this.offset.right;
    }
    return this.offset.left;
  }


  /**
   * Returns the empty space on the right of the image. When the image is mirrored, left and right swap.
   * @returns {number} The right offset.
   */
  getOffsetRight() {
    if (this.otherDirection) {
      return this.offset.left;
    }
    return this.offset.right;
  }


  /**
   * Takes away energy when the object gets hit, but not again while it is still hurt.
   * @param {number} damage - How much energy the object loses.
   * @returns {void}
   */
  hit(damage) {
    if (this.isHurt()) {
      return;
    }
    this.energy -= damage;
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


  /**
   * What happens when a bubble hits this object. Normal enemies die at once.
   * @param {ThrowableObject} bubble - The bubble that hit the object.
   * @returns {void}
   */
  hitByBubble(bubble) {
    this.energy = 0;
    playSound(enemyTrappedSound);
  }
}
