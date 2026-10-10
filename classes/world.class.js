class World {
  canvas;
  ctx;
  character = new Character();

  /**
   * Creates the game world.
   * @param {HTMLCanvasElement} canvas - The canvas from index.html.
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.draw();
  }


  /**
   * Draws the game world again and again.
   * @returns {void}
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
    requestAnimationFrame(() => this.draw());
  }
}