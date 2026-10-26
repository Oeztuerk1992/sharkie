class EndBoss extends MovableObject {
  width = 700;
  height = 784;
  offset = { top: 290, left: 42, right: 52, bottom: 133 };
  world;
  hadFirstContact = false;
  introStep = 0;
  damage = 20;
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
  imagesAttack = [
    'img/2.Enemy/3 Final Enemy/Attack/1.png',
    'img/2.Enemy/3 Final Enemy/Attack/2.png',
    'img/2.Enemy/3 Final Enemy/Attack/3.png',
    'img/2.Enemy/3 Final Enemy/Attack/4.png',
    'img/2.Enemy/3 Final Enemy/Attack/5.png',
    'img/2.Enemy/3 Final Enemy/Attack/6.png'
  ];
  imagesHurt = [
    'img/2.Enemy/3 Final Enemy/Hurt/1.png',
    'img/2.Enemy/3 Final Enemy/Hurt/2.png',
    'img/2.Enemy/3 Final Enemy/Hurt/3.png',
    'img/2.Enemy/3 Final Enemy/Hurt/4.png'
  ];
  imagesDead = [
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png',
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
  ];
  attackStep = 0;
  deadStep = 0;
  isAttacking = false;
  lastAttack = 0;

  /**
   * Creates the end boss above the screen and loads all its images.
   */
  constructor() {
    super().loadImage(this.imagesIntroduce[0]);
    this.loadImages(this.imagesIntroduce);
    this.loadImages(this.imagesFloating);
    this.loadImages(this.imagesAttack);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDead);
    this.x = 4500;
    this.y = -600;
    this.animate();
  }


  /**
   * Starts the animation of the end boss.
   * @returns {void}
   */
  animate() {
    setInterval(() => this.moveBoss(), 1000 / 60);
    setInterval(() => this.animateBoss(), 150);
  }


  /**
   * Waits for Sharkie and plays the intro. After that it plays dead, hurt, attack or floating.
   * @returns {void}
   */
  animateBoss() {
    if (!this.hadFirstContact) {
      this.checkFirstContact();
    } else if (!this.isIntroOver()) {
      this.playIntroduce();
    } else if (this.isDead()) {
      this.playDeadAnimation();
    } else if (this.isHurt()) {
      this.playAnimation(this.imagesHurt);
    } else if (this.isAttacking) {
      this.playAttackAnimation();
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


  /**
   * Only poison bubbles hurt the end boss. Every hit takes away 25 energy.
   * @param {ThrowableObject} bubble - The bubble that hit the end boss.
   * @returns {void}
   */
  hitByBubble(bubble) {
    if (bubble.isPoisoned) {
      this.hit(25);
    }
  }


  /**
   * Checks if the intro animation has finished.
   * @returns {boolean} True if all intro images were shown.
   */
  isIntroOver() {
    return this.introStep >= this.imagesIntroduce.length;
  }


  /**
   * Swims towards Sharkie after the intro and starts an attack when he is close.
   * @returns {void}
   */
  moveBoss() {
    if (!this.isIntroOver() || this.isDead()) {
      return;
    }
    this.speed = 1.5;
    if (this.isAttacking) {
      this.speed = 5;
    }
    this.followCharacter();
    this.checkAttack();
  }


  /**
   * Swims left or right, so the end boss always faces Sharkie.
   * @returns {void}
   */
  followCharacter() {
    let characterX = this.world.character.x;
    if (characterX < this.x) {
      this.moveLeft();
      this.otherDirection = false;
    } else if (characterX > this.x + 300 && this.x + this.width < this.world.level.levelEndX) {
      this.moveRight();
      this.otherDirection = true;
    }
  }


  /**
   * Starts an attack when Sharkie is close, but only every 2 seconds.
   * @returns {void}
   */
  checkAttack() {
    let distance = Math.abs(this.world.character.x - this.x);
    let timePassed = new Date().getTime() - this.lastAttack;
    if (distance < 350 && timePassed > 2000 && !this.isAttacking) {
      this.isAttacking = true;
      this.attackStep = 0;
      this.lastAttack = new Date().getTime();
    }
  }


  /**
   * Shows the next attack image and ends the attack after the last image.
   * @returns {void}
   */
  playAttackAnimation() {
    this.img = this.imageCache[this.imagesAttack[this.attackStep]];
    this.attackStep++;
    if (this.attackStep >= this.imagesAttack.length) {
      this.isAttacking = false;
    }
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
