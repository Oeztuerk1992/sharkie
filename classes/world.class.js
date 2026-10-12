class World {
  character = new Character();

  enemies = [new PufferFish(), new JellyFish(), new EndBoss()];

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
   * Draws the character and all enemies again and again.
   * @returns {void}
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

    this.enemies.forEach(enemy => {
      this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
    });
   
    let self = this;
    requestAnimationFrame(function() {
      self.draw();
    });
  }
} 