class JellyFish extends MovableObject {
  width = 100;
  height = 100;
  offset = { top: 17, left: 1, right: 5, bottom: 10 };
  startY;
  swimRange = 520;
  swimmingUp = true;
  imagesSwimming;
  imagesDead;


  /**
   * Creates the jelly fish and loads its images.
   * @param {number} x - The x-coordinate of the jelly fish.
   * @param {string} color - 'yellow', 'green' or 'pink'. Green and pink are the dangerous ones with lightning.
   */
  constructor(x, color) {
    super();
    this.imagesSwimming = this.getImages(color);
    this.loadImage(this.imagesSwimming[0]);
    this.loadImages(this.imagesSwimming);
    this.imagesDead = this.getDeadImages(color);
    this.loadImages(this.imagesDead);
    this.x = x;
    this.startY = 570;
    this.y = 50 + Math.random() * 520;
    this.swimmingUp = Math.random() < 0.5;
    this.speed = 0.5 + Math.random() * 1;
    this.animate();
  }


  /**
   * Lets the jelly fish swim all the time.
   * @returns {void}
   */
  animate() {
    setInterval(() => {
      this.swim();
    }, 1000 / 60);
    setInterval(() => {
      this.animateJellyFish();
    }, 200);
  }


  /**
   * Swims one step up or down and checks if it has to turn.
   * @returns {void}
   */
  swim() {
    if (this.isDead()) {
      this.y -= 3;
      return;
    }
    if (this.swimmingUp) {
      this.moveUp();
    } else {
      this.moveDown();
    }
    this.checkTurn();
  }


  /**
   * Turns the jelly fish around at the top and bottom of its swim range.
   * @returns {void}
   */
  checkTurn() {
    if (this.y <= this.startY - this.swimRange) {
      this.swimmingUp = false;
    }
    if (this.y >= this.startY) {
      this.swimmingUp = true;
    }
  }


  /**
   * Returns the four animation images for a color.
   * @param {string} color - 'yellow', 'green' or 'pink'.
   * @returns {string[]} The paths of the four images.
   */
  getImages(color) {
    let folder = 'img/2.Enemy/2 Jelly fish/Regular damage/';
    let name = 'Yellow';
    if (color === 'green') {
      folder = 'img/2.Enemy/2 Jelly fish/Super dangerous/';
      name = 'Green';
    }
    if (color === 'pink') {
      folder = 'img/2.Enemy/2 Jelly fish/Super dangerous/';
      name = 'Pink';
    }
    return [folder + name + ' 1.png', folder + name + ' 2.png', folder + name + ' 3.png', folder + name + ' 4.png'];
  }


  /**
   * Plays the dead animation if the jelly fish is dead, otherwise the swim animation.
   * @returns {void}
   */
  animateJellyFish() {
    if (this.isDead()) {
      this.playAnimation(this.imagesDead);
    } else {
      this.playAnimation(this.imagesSwimming);
    }
  }


  /**
   * Returns the four dead images for a color.
   * @param {string} color - 'yellow', 'green' or 'pink'.
   * @returns {string[]} The paths of the four images.
   */
  getDeadImages(color) {
    let path = 'img/2.Enemy/2 Jelly fish/Dead/Yellow/y';
    if (color === 'green') {
      path = 'img/2.Enemy/2 Jelly fish/Dead/green/g';
    }
    if (color === 'pink') {
      path = 'img/2.Enemy/2 Jelly fish/Dead/Pink/P';
    }
    return [path + '1.png', path + '2.png', path + '3.png', path + '4.png'];
  }
}
