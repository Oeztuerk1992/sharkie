class Character extends MovableObject {
  x = 100;
  y = 300;
  width = 390;
  height = 420;
  speed = 7;
  offset = { top: 215, left: 130, right: 80, bottom: 110 };
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
  imagesAttack = [
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png'
  ];
  imagesPoisonAttack = [
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png'
  ];
  imagesFinSlap = [
    'img/1.Sharkie/4.Attack/Fin slap/1.png',
    'img/1.Sharkie/4.Attack/Fin slap/5.png',
    'img/1.Sharkie/4.Attack/Fin slap/5.png',
    'img/1.Sharkie/4.Attack/Fin slap/6.png',
    'img/1.Sharkie/4.Attack/Fin slap/6.png',
    'img/1.Sharkie/4.Attack/Fin slap/7.png',
    'img/1.Sharkie/4.Attack/Fin slap/7.png',
    'img/1.Sharkie/4.Attack/Fin slap/8.png'
  ];
  isAttacking = false;
  attackType = 'bubble';
  attackStep = 0;
  imagesLongIdle = [
    'img/1.Sharkie/2.Long_IDLE/i1.png',
    'img/1.Sharkie/2.Long_IDLE/I2.png',
    'img/1.Sharkie/2.Long_IDLE/I3.png',
    'img/1.Sharkie/2.Long_IDLE/I4.png',
    'img/1.Sharkie/2.Long_IDLE/I5.png',
    'img/1.Sharkie/2.Long_IDLE/I6.png',
    'img/1.Sharkie/2.Long_IDLE/I7.png',
    'img/1.Sharkie/2.Long_IDLE/I8.png',
    'img/1.Sharkie/2.Long_IDLE/I9.png',
    'img/1.Sharkie/2.Long_IDLE/I10.png',
    'img/1.Sharkie/2.Long_IDLE/I11.png',
    'img/1.Sharkie/2.Long_IDLE/I12.png',
    'img/1.Sharkie/2.Long_IDLE/I13.png',
    'img/1.Sharkie/2.Long_IDLE/I14.png'
  ];
  lastActivity = new Date().getTime();
  sleepStep = 0;

  /**
   * Creates the character and loads its images.
   */
  constructor() {
    super().loadImage(this.imagesIdle[0]);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesSwimming);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesAttack);
    this.loadImages(this.imagesLongIdle);
    this.loadImages(this.imagesPoisonAttack);
    this.loadImages(this.imagesFinSlap);
    this.animate();
  }


  /**
   * Starts the animations of the character. The movement is done by the world in updateCharacter().
   * The attack animation has its own, faster interval, so attacks feel quick.
   * @returns {void}
   */
  animate() {
    setInterval(() => this.animateCharacter(), 150);
    setInterval(() => this.animateAttack(), 60);
  }


  /**
   * Reads the keys and moves the character one step, as long as he is alive. The camera always follows him.
   * The world calls this 60 times per second.
   * @returns {void}
   */
  updateCharacter() {
    if (!this.isDead()) {
      this.checkActivity();
      this.moveHorizontal();
      this.checkJump();
      this.checkAttackKeys();
    }
    this.updateCamera();
  }


  /**
   * Shows the next attack image while an attack is running.
   * @returns {void}
   */
  animateAttack() {
    if (this.isAttacking && !this.isDead()) {
      this.playAttackAnimation();
    }
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
   * Plays the right animation: dead, hurt, swimming, sleeping or idle.
   * During an attack it does nothing, because animateAttack() shows the attack images.
   * @returns {void}
   */
  animateCharacter() {
    if (this.isDead()) {
      this.playDeadAnimation();
    } else if (this.isAttacking) {
      return;
    } else if (this.isHurt()) {
      this.playAnimation(this.imagesHurt);
    } else if (this.isSwimming()) {
      this.playAnimation(this.imagesSwimming);
    } else if (this.isSleeping()) {
      this.playSleepAnimation();
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


  /**
   * Starts a bubble attack with D, a poison bubble attack with F (only with poison) or a fin slap with S.
   * @returns {void}
   */
  checkAttackKeys() {
    let keyboard = this.world.keyboard;
    if (keyboard.shoot) {
      this.startAttack('bubble');
    }
    if (keyboard.shootPoison && this.poison > 0) {
      this.startAttack('poison');
    }
    if (keyboard.slap) {
      this.startAttack('slap');
    }
    keyboard.shoot = false;
    keyboard.shootPoison = false;
    keyboard.slap = false;
  }


  /**
   * Starts the attack animation, but only if no attack is running.
   * @param {string} type - 'bubble', 'poison' or 'slap'.
   * @returns {void}
   */
  startAttack(type) {
    if (this.isAttacking) {
      return;
    }
    this.isAttacking = true;
    this.attackType = type;
    this.attackStep = 0;
    if (type !== 'slap') {
      playSound(bubbleSound);
    }
  }


  /**
   * Shows the next attack image. After the last image of a bubble attack the bubble is shot.
   * @returns {void}
   */
  playAttackAnimation() {
    let images = this.getAttackImages();
    this.img = this.imageCache[images[this.attackStep]];
    this.attackStep++;
    if (this.attackStep >= images.length) {
      this.isAttacking = false;
      if (this.attackType !== 'slap') {
        this.world.shootBubble(this.attackType === 'poison');
      }
    }
  }


  /**
   * Returns the images for the current attack.
   * @returns {string[]} The image paths of the attack animation.
   */
  getAttackImages() {
    if (this.attackType === 'poison') {
      return this.imagesPoisonAttack;
    }
    if (this.attackType === 'slap') {
      return this.imagesFinSlap;
    }
    return this.imagesAttack;
  }


  /**
   * Remembers the time of the last key press and wakes Sharkie up.
   * @returns {void}
   */
  checkActivity() {
    let keyboard = this.world.keyboard;
    if (keyboard.left || keyboard.right || keyboard.jump || keyboard.shoot || keyboard.shootPoison) {
      this.lastActivity = new Date().getTime();
      this.sleepStep = 0;
      stopSnoring();
    }
  }


  /**
   * Checks if no key was pressed for 10 seconds.
   * @returns {boolean} True if Sharkie falls asleep.
   */
  isSleeping() {
    let timePassed = new Date().getTime() - this.lastActivity;
    return timePassed > 10000;
  }


  /**
   * Plays the falling asleep images once and then repeats the last four sleeping images.
   * @returns {void}
   */
  playSleepAnimation() {
    startSnoring();
    this.img = this.imageCache[this.imagesLongIdle[this.sleepStep]];
    this.sleepStep++;
    if (this.sleepStep >= this.imagesLongIdle.length) {
      this.sleepStep = 10;
    }
  }


  /**
   * Checks if the fin is out right now. That is the case from the second image of the fin slap.
   * @returns {boolean} True while the fin can hit an enemy.
   */
  isSlapping() {
    return this.isAttacking && this.attackType === 'slap' && this.attackStep >= 2;
  }


  /**
   * Checks if an enemy is close enough in front of Sharkie to be hit by his fin.
   * The fin reaches from his body up to 20 pixels in front of the image.
   * @param {MovableObject} enemy - The enemy to check.
   * @returns {boolean} True if the fin hits the enemy.
   */
  isHittingWithFin(enemy) {
    let finLeft = this.x + this.getOffsetLeft();
    let finRight = this.x + this.width + 20;
    if (this.otherDirection) {
      finLeft = this.x - 20;
      finRight = this.x + this.width - this.getOffsetRight();
    }
    return finRight > enemy.x + enemy.getOffsetLeft() &&
      finLeft < enemy.x + enemy.width - enemy.getOffsetRight() &&
      this.y + this.height - this.offset.bottom > enemy.y + enemy.offset.top &&
      this.y + this.offset.top < enemy.y + enemy.height - enemy.offset.bottom;
  }
}
