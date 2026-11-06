class World {
  character = new Character();
  lifeBar = new StatusBar('life', 20, 0, 100);
  coinBar = new StatusBar('coin', 20, 50, 0);
  poisonBar = new StatusBar('poison', 20, 100, 0);
  bossBar = new StatusBar('boss', 940, 0, 100);
  throwableObjects = [];
  animationFrameId;
  isGameOver = false;
  level = level1;
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  lastUpdateTime = 0;
  showFrames = false;


  /**
   * Creates the game world and starts drawing.
   * @param {HTMLCanvasElement} canvas - The canvas from index.html.
   * @param {Keyboard} keyboard - The keyboard with the pressed keys.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.lastUpdateTime = performance.now();
    this.draw(this.lastUpdateTime);
  }


  /**
   * Moves the game forward exactly 60 steps per second, no matter if the screen shows 60, 120 or 144 pictures per second.
   * On a fast screen some pictures are drawn without a step. After a long break (hidden tab) the game does not jump forward.
   * @param {number} time - The time in milliseconds from requestAnimationFrame.
   * @returns {void}
   */
  updateGame(time) {
    let stepTime = 1000 / 60;
    if (time - this.lastUpdateTime > 250) {
      this.lastUpdateTime = time - stepTime;
    }
    while (time - this.lastUpdateTime >= stepTime - 1) {
      this.moveObjects();
      this.checkCollisions();
      this.lastUpdateTime += stepTime;
    }
  }


  /**
   * Moves the character, all enemies and all bubbles one step.
   * @returns {void}
   */
  moveObjects() {
    this.character.updateCharacter();
    this.character.applyGravity();
    this.level.enemies.forEach(enemy => {
      enemy.move();
    });
    this.throwableObjects.forEach(bubble => {
      bubble.fly();
    });
  }


  /**
   * Checks if the character touches an enemy, a coin or a poison bottle,
   * and if a bubble or the fin hits an enemy. It runs after every step, so even fast jumps cannot fly through a coin.
   * @returns {void}
   */
  checkCollisions() {
    this.checkEnemyCollisions();
    this.collectCoins();
    this.collectPoisonBottles();
    this.checkBubbleHits();
    this.checkFinSlap();
    this.removeFarBubbles();
    this.checkGameOver();
  }


  /**
   * Hurts the character when it touches an enemy.
   * @returns {void}
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach(enemy => {
      if (!enemy.isDead() && this.character.isColliding(enemy)) {
        this.character.hit(enemy.damage);
        this.lifeBar.setPercentage(this.character.energy);
      }
    });
  }


  /**
   * Removes a touched coin from the level and fills the coin bar.
   * @returns {void}
   */
  collectCoins() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(index, 1);
        this.character.coins++;
        this.coinBar.setPercentage(this.character.coins * 10);
      }
    });
  }


  /**
   * Removes a touched poison bottle from the level and fills the poison bar.
   * @returns {void}
   */
  collectPoisonBottles() {
    this.level.poisonBottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.level.poisonBottles.splice(index, 1);
        this.character.poison++;
        this.poisonBar.setPercentage(this.character.poison * 20);
      }
    });
  }


  /**
   * Gives the character and all enemies access to the world.
   * @returns {void}
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach(enemy => {
      enemy.world = this;
    });
  }


  /**
   * Moves the game forward and draws it again and again.
   * @param {number} time - The time in milliseconds from requestAnimationFrame.
   * @returns {void}
   */
  draw(time) {
    this.updateGame(time);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.drawLevelObjects();
    this.ctx.translate(-this.cameraX, 0);
    this.drawStatusBars();
    let self = this;
    this.animationFrameId = requestAnimationFrame(function(time) {
      self.draw(time);
    });
  }


  /**
   * Draws everything that moves with the camera.
   * @returns {void}
   */
  drawLevelObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.barriers);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.poisonBottles);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.drawFrames();
  }


  /**
   * Draws the status bars. They stay in the top left corner.
   * @returns {void}
   */
  drawStatusBars() {
    this.addToMap(this.lifeBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.poisonBar);
    this.drawBossBar();
  }


  /**
   * Shows the life bar of the end boss in the top right corner, but only after he has appeared.
   * @returns {void}
   */
  drawBossBar() {
    let endBoss = this.getEndBoss();
    if (endBoss.hadFirstContact) {
      this.bossBar.setPercentage(endBoss.energy);
      this.addToMap(this.bossBar);
    }
  }


  /**
   * Draws every object of a list on the canvas.
   * @param {MovableObject[]} objects - The objects to draw.
   * @returns {void}
   */
  addObjectsToMap(objects) {
    objects.forEach(object => {
      this.addToMap(object);
    });
  }


  /**
   * Draws one object on the canvas, mirrored if needed.
   * @param {MovableObject} object - The object to draw.
   * @returns {void}
   */
  addToMap(object) {
    if (object.otherDirection) {
      this.flipImage(object);
    } else {
      this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
    }
  }


  /**
   * Draws an object mirrored, so it looks the other way.
   * @param {MovableObject} object - The object to draw.
   * @returns {void}
   */
  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.x + object.width, object.y);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(object.img, 0, 0, object.width, object.height);
    this.ctx.restore();
  }


  /**
   * Draws the hit boxes of the character and the enemies, only for testing.
   * @returns {void}
   */
  drawFrames() {
    if (!this.showFrames) {
      return;
    }
    this.drawFrame(this.character);
    this.level.enemies.forEach(enemy => {
      this.drawFrame(enemy);
    });
  }


  /**
   * Draws a red rectangle around the hit box of one object.
   * @param {MovableObject} object - The object with the hit box.
   * @returns {void}
   */
  drawFrame(object) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'red';
    this.ctx.rect(
      object.x + object.getOffsetLeft(),
      object.y + object.offset.top,
      object.width - object.getOffsetLeft() - object.getOffsetRight(),
      object.height - object.offset.top - object.offset.bottom
    );
    this.ctx.stroke();
  }


  /**
   * Creates a new bubble in front of Sharkie's mouth.
   * @param {boolean} isPoisoned - True for a poison bubble, which uses one poison bottle.
   * @returns {void}
   */
  shootBubble(isPoisoned) {
    let x = this.character.x + this.character.width - this.character.offset.right;
    if (this.character.otherDirection) {
      x = this.character.x + this.character.offset.left - 60;
    }
    let bubble = new ThrowableObject(x, this.character.y + 230, this.character.otherDirection, isPoisoned);
    this.throwableObjects.push(bubble);
    if (isPoisoned) {
      this.character.poison--;
      this.poisonBar.setPercentage(this.character.poison * 20);
    }
  }


  /**
   * Checks if a bubble hits a living enemy. The bubble disappears after a hit.
   * @returns {void}
   */
  checkBubbleHits() {
    this.throwableObjects.forEach((bubble, bubbleIndex) => {
      let enemy = this.level.enemies.find(enemy => !enemy.isDead() && bubble.isColliding(enemy));
      if (enemy) {
        enemy.hitByBubble(bubble);
        this.removeBubble(bubbleIndex);
      }
    });
  }


  /**
   * Removes all bubbles that have flown too far.
   * @returns {void}
   */
  removeFarBubbles() {
    this.throwableObjects.forEach((bubble, bubbleIndex) => {
      if (bubble.isFarAway()) {
        this.removeBubble(bubbleIndex);
      }
    });
  }


  /**
   * Removes a bubble from the world.
   * @param {number} bubbleIndex - The position of the bubble in the list.
   * @returns {void}
   */
  removeBubble(bubbleIndex) {
    this.throwableObjects.splice(bubbleIndex, 1);
  }


  /**
   * Ends the game when Sharkie or the end boss is dead.
   * @returns {void}
   */
  checkGameOver() {
    if (this.isGameOver) {
      return;
    }
    if (this.character.isDead()) {
      this.endGame(false);
    }
    if (this.getEndBoss().isDead()) {
      this.endGame(true);
    }
  }


  /**
   * Finds the end boss in the list of enemies.
   * @returns {EndBoss} The end boss of the level.
   */
  getEndBoss() {
    return this.level.enemies.find(enemy => enemy instanceof EndBoss);
  }


  /**
   * Waits until the dead animation is over and then shows the end screen.
   * @param {boolean} isWon - True if the player won the game.
   * @returns {void}
   */
  endGame(isWon) {
    this.isGameOver = true;
    setTimeout(() => {
      showEndScreen(isWon);
    }, 2500);
  }


  /**
   * Knocks out every puffer fish that Sharkie hits with his fin.
   * @returns {void}
   */
  checkFinSlap() {
    if (!this.character.isSlapping()) {
      return;
    }
    this.level.enemies.forEach(enemy => {
      if (enemy instanceof PufferFish && !enemy.isDead() && this.character.isHittingWithFin(enemy)) {
        enemy.energy = 0;
        playSound(enemyTrappedSound);
      }
    });
  }
}
