class Character extends MovableObject {
  x = 100;
  y = 300;
  width = 390;
  height = 420;
  speed = 7;
  offset = { top: 197, left: 79, right: 78, bottom: 103 };
  world;
  imagesIdle = [
    'img/1.Sharkie/1.IDLE/1.png',
    'img/1.Sharkie/1.IDLE/2.png',
    'img/1.Sharkie/1.IDLE/3.png',
    'img/1.Sharkie/1.IDLE/4.png',
    'img/1.Sharkie/1.IDLE/5.png',
    'img/1.Sharkie/1.IDLE/6.png',
    'img/1.Sharkie/1.IDLE/7.png',
    'img/1.Sharkie/1.IDLE/8.png',
    'img/1.Sharkie/1.IDLE/9.png',
    'img/1.Sharkie/1.IDLE/10.png',
    'img/1.Sharkie/1.IDLE/11.png',
    'img/1.Sharkie/1.IDLE/12.png',
    'img/1.Sharkie/1.IDLE/13.png',
    'img/1.Sharkie/1.IDLE/14.png',
    'img/1.Sharkie/1.IDLE/15.png',
    'img/1.Sharkie/1.IDLE/16.png',
    'img/1.Sharkie/1.IDLE/17.png',
    'img/1.Sharkie/1.IDLE/18.png'
  ];
  imagesSwimming = [
    'img/1.Sharkie/3.Swim/1.png',
    'img/1.Sharkie/3.Swim/2.png',
    'img/1.Sharkie/3.Swim/3.png',
    'img/1.Sharkie/3.Swim/4.png',
    'img/1.Sharkie/3.Swim/5.png',
    'img/1.Sharkie/3.Swim/6.png'
  ];
  imagesHurt = [
    'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
    'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
    'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
    'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
    'img/1.Sharkie/5.Hurt/1.Poisoned/5.png'
  ];
  imagesDead = [
    'img/1.Sharkie/6.dead/1.Poisoned/1.png',
    'img/1.Sharkie/6.dead/1.Poisoned/2.png',
    'img/1.Sharkie/6.dead/1.Poisoned/3.png',
    'img/1.Sharkie/6.dead/1.Poisoned/4.png',
    'img/1.Sharkie/6.dead/1.Poisoned/5.png',
    'img/1.Sharkie/6.dead/1.Poisoned/6.png',
    'img/1.Sharkie/6.dead/1.Poisoned/7.png',
    'img/1.Sharkie/6.dead/1.Poisoned/8.png',
    'img/1.Sharkie/6.dead/1.Poisoned/9.png',
    'img/1.Sharkie/6.dead/1.Poisoned/10.png',
    'img/1.Sharkie/6.dead/1.Poisoned/11.png',
    'img/1.Sharkie/6.dead/1.Poisoned/12.png'
  ];
  deadStep = 0;
  coins = 0;
  poison = 0;

  /**
   * Creates the character and loads its images.
   */
  constructor() {
    super().loadImage(this.imagesIdle[0]);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesSwimming);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDead);
    this.applyGravity();
    this.animate();
  }


  /**
   * Starts moving and animating the character.
   * @returns {void}
   */
  animate() {
    setInterval(() => {
      if (!this.isDead()) {
        this.moveHorizontal();
        this.checkJump();
      }
      this.updateCamera();
    }, 1000 / 60);

    setInterval(() => {
      this.animateCharacter();
    }, 150);
  }


  /**
   * Moves the character left or right and turns it in that direction.
   * @returns {void}
   */
  moveHorizontal() {
    if (this.world.keyboard.right && this.x < this.world.level.levelEndX - this.width) {
      this.moveRight();
      this.otherDirection = false;
    }
    if (this.world.keyboard.left && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }


  /**
   * Lets the character jump once per key press, also again in the air.
   * @returns {void}
   */
  checkJump() {
    if (this.world.keyboard.jump && this.y > 0) {
      this.jump();
    }
    this.world.keyboard.jump = false;
  }


  /**
   * Plays the right animation: dead, hurt, swimming or idle.
   * @returns {void}
   */
  animateCharacter() {
    if (this.isDead()) {
      this.playDeadAnimation();
    } else if (this.isHurt()) {
      this.playAnimation(this.imagesHurt);
    } else if (this.isSwimming()) {
      this.playAnimation(this.imagesSwimming);
    } else {
      this.playAnimation(this.imagesIdle);
    }
  }


  /**
   * Checks if the left or right key is pressed.
   * @returns {boolean} True if the character is swimming.
   */
  isSwimming() {
    let keyboard = this.world.keyboard;
    return keyboard.left || keyboard.right;
  }


  /**
   * Moves the camera with the character, but not past the start or the end of the level.
   * @returns {void}
   */
  updateCamera() {
    let cameraX = -this.x + 100;
    let lastCameraX = -(this.world.level.levelEndX - this.world.canvas.width);
    if (cameraX > 0) {
      cameraX = 0;
    }
    if (cameraX < lastCameraX) {
      cameraX = lastCameraX;
    }
    this.world.cameraX = cameraX;
  }


  /**
   * Plays the dead animation one time and stays on the last image.
   * @returns {void}
   */
  playDeadAnimation() {
    if (this.deadStep < this.imagesDead.length) {
      this.img = this.imageCache[this.imagesDead[this.deadStep]];
      this.deadStep++;
    }
  }
}
