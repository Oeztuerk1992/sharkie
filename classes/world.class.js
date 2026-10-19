class World {
  character = new Character();
  lifeBar = new StatusBar('life', 0, 100);
  coinBar = new StatusBar('coin', 50, 0);
  poisonBar = new StatusBar('poison', 100, 0);
  level = level1;
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  showFrames = true;


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
    this.draw();
    this.checkCollisions();
  }


  /**
   * Checks every 200 ms if the character touches an enemy, a coin or a poison bottle.
   * @returns {void}
   */
  checkCollisions() {
    setInterval(() => {
      this.checkEnemyCollisions();
      this.collectCoins();
      this.collectPoisonBottles();
    }, 200);
  }


  /**
   * Hurts the character when it touches an enemy.
   * @returns {void}
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach(enemy => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
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
   * Draws the whole game again and again.
   * @returns {void}
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.drawLevelObjects();
    this.ctx.translate(-this.cameraX, 0);
    this.drawStatusBars();
    let self = this;
    requestAnimationFrame(function() {
      self.draw();
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
      object.x + object.offset.left,
      object.y + object.offset.top,
      object.width - object.offset.left - object.offset.right,
      object.height - object.offset.top - object.offset.bottom
    );
    this.ctx.stroke();
  }
}
