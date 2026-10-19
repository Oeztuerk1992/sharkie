class PufferFish extends MovableObject {
  width = 120;
  height = 100;
  offset = { top: 7, left: 4, right: 15, bottom: 27 };
  startX;
  swimRange = 630;
  state = 'swim';
  transitionStep = 0;
  inflateOffset = 10;
  imageDead = 'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png';
  imagesSwimming = [
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
  ];
  imagesInflating = [
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png'
  ];
  imagesDeflating = [...this.imagesInflating].reverse();
  imagesInflated = [
    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png'
  ];


  /**
   * Creates the puffer fish and loads all its images.
   */
  constructor() {
    super().loadImage(this.imagesSwimming[0]);
    this.loadImages(this.imagesSwimming);
    this.loadImages(this.imagesInflating);
    this.loadImages(this.imagesInflated);
    this.loadImages([this.imageDead]);
    this.x = 1500;
    this.y = 340;
    this.startX = this.x;
    this.speed = 1 + Math.random() * 1.5;
    this.animate();
  }


  /**
   * Starts swimming, the image animation and the inflate cycle.
   * @returns {void}
   */
  animate() {
    setInterval(() => this.swim(), 1000 / 60);
    setInterval(() => {
      if (!this.isDead()) {
        this.animateImages();
      }
    }, 150);
    setInterval(() => this.changeState(), 3000);
  }


  /**
   * Swims one step in the current direction and checks if it has to turn.
   * @returns {void}
   */
  swim() {
    if (this.isDead()) {
      this.floatUp();
      return;
    }
    if (this.otherDirection) {
      this.moveRight();
    } else {
      this.moveLeft();
    }
    this.checkTurn();
  }


  /**
   * Turns the puffer fish around at the end of its swim range.
   * @returns {void}
   */
  checkTurn() {
    if (this.x <= this.startX - this.swimRange) {
      this.otherDirection = true;
    }
    if (this.x >= this.startX) {
      this.otherDirection = false;
    }
  }


  /**
   * Shows the images that belong to the current state.
   * @returns {void}
   */
  animateImages() {
    if (this.state === 'inflating') {
      this.playOnce(this.imagesInflating, 'inflated');
    } else if (this.state === 'deflating') {
      this.playOnce(this.imagesDeflating, 'swim');
    } else if (this.state === 'inflated') {
      this.playAnimation(this.imagesInflated);
    } else {
      this.playAnimation(this.imagesSwimming);
    }
  }


  /**
   * Plays a list of images one time and then switches to the next state.
   * @param {string[]} images - The image paths to play.
   * @param {string} nextState - The state after the last image.
   * @returns {void}
   */
  playOnce(images, nextState) {
    this.img = this.imageCache[images[this.transitionStep]];
    this.transitionStep++;
    if (this.transitionStep >= images.length) {
      this.transitionStep = 0;
      this.state = nextState;
      this.moveBackDown(nextState);
    }
  }


  /**
   * Starts inflating or deflating, depending on the current state.
   * @returns {void}
   */
  changeState() {
    if (this.state === 'swim') {
      this.state = 'inflating';
      this.y -= this.inflateOffset;
    } else if (this.state === 'inflated') {
      this.state = 'deflating';
    }
  }


  /**
   * Moves the puffer fish back down after it is small again.
   * @param {string} nextState - The state the puffer fish just switched to.
   * @returns {void}
   */
  moveBackDown(nextState) {
    if (nextState === 'swim') {
      this.y += this.inflateOffset;
    }
  }


  /**
   * Shows the dead image and lets the puffer fish float up, trapped in the bubble.
   * @returns {void}
   */
  floatUp() {
    this.img = this.imageCache[this.imageDead];
    this.y -= 3;
  }
}
