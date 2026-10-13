class JellyFish extends MovableObject {
  width = 100;
  height = 100;
  startY;
  swimRange = 520;
  swimmingUp = true;
  imagesSwimming = [
    'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
    'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
    'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
    'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
  ];


  /**
   * Creates the jelly fish and loads its image.
   */
  constructor() {
    super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
    this.loadImages(this.imagesSwimming);
    this.x = 1150;
    this.y = 570;
    this.startY = this.y;
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
      this.playAnimation(this.imagesSwimming);
    }, 200);
  }


  /**
   * Swims one step up or down and checks if it has to turn.
   * @returns {void}
   */
  swim() {
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
}