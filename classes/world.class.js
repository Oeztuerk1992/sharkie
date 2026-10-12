class World {
  character = new Character();
  enemies = [new PufferFish(), new JellyFish(), new EndBoss()];
  barriers = [new Barrier()];
  backgroundObjects = [new BackgroundObject('img/3. Background/Dark/1.png', 0)];
  canvas;
  ctx;
  /**
   * Creates the game world and starts drawing.
   * @param {HTMLCanvasElement} canvas - The canvas from index.html.
   */
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.draw();
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
   * Draws one object on the canvas.
   * @param {MovableObject} object - The object to draw.
   * @returns {void}
   */
  addToMap(object) {
    this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
  }
}