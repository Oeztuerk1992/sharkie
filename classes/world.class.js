class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  cameraX = 0;


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
   * Draws the background, barriers, enemies and the character again and again.
   * @returns {void}
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.barriers);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.ctx.translate(-this.cameraX, 0);
    let self = this;
    requestAnimationFrame(function() {
      self.draw();
    });

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
}
