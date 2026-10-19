class Coin extends MovableObject {
  width = 50;
  height = 47;
  imagesCoin = [
    'img/4. Marcadores/1. Coins/1.png',
    'img/4. Marcadores/1. Coins/2.png',
    'img/4. Marcadores/1. Coins/3.png',
    'img/4. Marcadores/1. Coins/4.png'
  ];


  /**
   * Creates a coin at a position and lets it spin.
   * @param {number} x - The x-coordinate of the coin.
   * @param {number} y - The y-coordinate of the coin.
   */
  constructor(x, y) {
    super().loadImage(this.imagesCoin[0]);
    this.loadImages(this.imagesCoin);
    this.x = x;
    this.y = y;
    this.animate();
  }


  /**
   * Plays the spin animation of the coin.
   * @returns {void}
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.imagesCoin);
    }, 150);
  }
}
