class EndBoss extends MovableObject {
  width = 700;
  height = 784;
  world;
  hadFirstContact = false;
  introStep = 0;
  imagesIntroduce = [
    'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
  ];
  imagesFloating = [
    'img/2.Enemy/3 Final Enemy/2.floating/1.png',
    'img/2.Enemy/3 Final Enemy/2.floating/2.png',
    'img/2.Enemy/3 Final Enemy/2.floating/3.png',
    'img/2.Enemy/3 Final Enemy/2.floating/4.png',
    'img/2.Enemy/3 Final Enemy/2.floating/5.png',
    'img/2.Enemy/3 Final Enemy/2.floating/6.png',
    'img/2.Enemy/3 Final Enemy/2.floating/7.png',
    'img/2.Enemy/3 Final Enemy/2.floating/8.png',
    'img/2.Enemy/3 Final Enemy/2.floating/9.png',
    'img/2.Enemy/3 Final Enemy/2.floating/10.png',
    'img/2.Enemy/3 Final Enemy/2.floating/11.png',
    'img/2.Enemy/3 Final Enemy/2.floating/12.png',
    'img/2.Enemy/3 Final Enemy/2.floating/13.png'
  ];


  /**
   * Creates the end boss above the screen and loads all its images.
   */
  constructor() {
    super().loadImage(this.imagesIntroduce[0]);
    this.loadImages(this.imagesIntroduce);
    this.loadImages(this.imagesFloating);
    this.x = 4500;
    this.y = -600;
    this.animate();
  }


  /**
   * Starts the animation of the end boss.
   * @returns {void}
   */
  animate() {
    setInterval(() => this.animateBoss(), 150);
  }


  /**
   * Waits for Sharkie, then plays the intro once and after that floats.
   * @returns {void}
   */
  animateBoss() {
    if (!this.hadFirstContact) {
      this.checkFirstContact();
    } else if (this.introStep < this.imagesIntroduce.length) {
      this.playIntroduce();
    } else {
      this.playAnimation(this.imagesFloating);
    }
  }


  /**
   * Checks if Sharkie is close enough and moves the end boss into the screen.
   * @returns {void}
   */
  checkFirstContact() {
    if (this.world && this.world.character.x > 3800) {
      this.hadFirstContact = true;
      this.y = 0;
    }
  }


  /**
   * Shows the next intro image, where the end boss dives in from above.
   * @returns {void}
   */
  playIntroduce() {
    this.img = this.imageCache[this.imagesIntroduce[this.introStep]];
    this.introStep++;
  }
}
