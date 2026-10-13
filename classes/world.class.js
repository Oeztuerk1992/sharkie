class World {
  character = new Character();
  enemies = [new PufferFish(), new JellyFish(), new EndBoss()];
  barriers = [
    new Barrier('img/3. Background/Barrier/1.png', 0, 0, 1121, 720),
    new Barrier('img/3. Background/Barrier/2.png', 1500, 287, 943, 433),
    new Barrier('img/3. Background/Barrier/3.png', 2700, 116, 294, 604)
  ];
  backgroundObjects = [
    new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0),
    new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
    new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0),
    new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0),

    new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 1280),
    new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 1280),
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 1280),
    new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 1280),
    new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 1280)
  ];

  canvas;
  ctx;
  keyboard;


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
    
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.barriers);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);

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