class World {
  character = new Character();
  enemies = [new PufferFish(), new JellyFish(), new EndBoss()];
  barriers = [
    new Barrier('img/3. Background/Barrier/1.png', 0, 0, 1121, 720),
    new Barrier('img/3. Background/Barrier/2.png', 1500, 287, 943, 433),
    new Barrier('img/3. Background/Barrier/3.png', 2700, 116, 294, 604)
  ];
  backgroundObjects = [];
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  levelEndX = 5120;


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
    this.createBackground();
    this.draw();
  }


  /**
   * Gives the character access to the world, so it can read the keyboard.
   * @returns {void}
   */
  setWorld() {
    this.character.world = this;
  }


  /**
   * Draws the background, barriers, enemies and the character again and again.
   * @returns {void}
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.barriers);
    this.addObjectsToMap(this.enemies);
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


    /**
   * Places the background parts side by side for the whole level.
   * @returns {void}
   */
  createBackground() {
    this.addBackgroundPart(1, 0);
    this.addBackgroundPart(2, 1280);
    this.addBackgroundPart(1, 2560);
    this.addBackgroundPart(2, 3840);
  }


  /**
   * Adds all five layers of one background part at a position.
   * @param {number} part - 1 for the left part, 2 for the right part.
   * @param {number} x - The x-coordinate of the part.
   * @returns {void}
   */
  addBackgroundPart(part, x) {
    this.backgroundObjects.push(
      new BackgroundObject('img/3. Background/Layers/5. Water/D' + part + '.png', x),
      new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D' + part + '.png', x),
      new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D' + part + '.png', x),
      new BackgroundObject('img/3. Background/Layers/2. Floor/D' + part + '.png', x),
      new BackgroundObject('img/3. Background/Layers/1. Light/' + part + '.png', x)
    );
  }
}