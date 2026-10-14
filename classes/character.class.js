class Character extends MovableObject {
  x = 60;
  y = 60;
  width = 250;
  height = 300;
  speed = 4;
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
 

  /**
   * Creates the character and loads its images.
   */
  constructor() {
    super().loadImage(this.imagesIdle[0]);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesSwimming);
    this.animate();
  }


    /**
   * Starts moving and animating the character.
   * @returns {void}
   */
  animate() {
    setInterval(() => {
      this.moveHorizontal();
      this.moveVertical();
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
    if (this.world.keyboard.right && this.x < this.world.levelEndX - this.width) {
      this.moveRight();
      this.otherDirection = false;
    }
    if (this.world.keyboard.left && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }


  /**
   * Moves the character up or down.
   * @returns {void}
   */
  moveVertical() {
    if (this.world.keyboard.up && this.y > 0) {
      this.moveUp();
    }
    if (this.world.keyboard.down && this.y < this.world.canvas.height - this.height) {
      this.moveDown();
    }
  }


    /**
   * Plays the swim animation while swimming, otherwise the idle animation.
   * @returns {void}
   */
  animateCharacter() {
    if (this.isSwimming()) {
      this.playAnimation(this.imagesSwimming);
    } else {
      this.playAnimation(this.imagesIdle);
    }
  }


  /**
   * Checks if any arrow key is pressed.
   * @returns {boolean} True if the character is swimming.
   */
  isSwimming() {
    let keyboard = this.world.keyboard;
    return keyboard.left || keyboard.right || keyboard.up || keyboard.down;
  }


  /**
   * Moves the camera with the character, but not past the start or the end of the level.
   * @returns {void}
   */
  updateCamera() {
    let cameraX = -this.x + 100;
    let lastCameraX = -(this.world.levelEndX - this.world.canvas.width);
    if (cameraX > 0) {
      cameraX = 0;
    }
    if (cameraX < lastCameraX) {
      cameraX = lastCameraX;
    }
    this.world.cameraX = cameraX;
  }
}