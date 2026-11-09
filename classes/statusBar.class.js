class StatusBar extends DrawableObject {
  allImages = {
    life: [
      'img/4. Marcadores/green/Life/0_  copia 3.png',
      'img/4. Marcadores/green/Life/20_ copia 4.png',
      'img/4. Marcadores/green/Life/40_  copia 3.png',
      'img/4. Marcadores/green/Life/60_  copia 3.png',
      'img/4. Marcadores/green/Life/80_  copia 3.png',
      'img/4. Marcadores/green/Life/100_  copia 2.png'
    ],
    coin: [
      'img/4. Marcadores/green/Coin/0_  copia 4.png',
      'img/4. Marcadores/green/Coin/20_  copia 2.png',
      'img/4. Marcadores/green/Coin/40_  copia 4.png',
      'img/4. Marcadores/green/Coin/60_  copia 4.png',
      'img/4. Marcadores/green/Coin/80_  copia 4.png',
      'img/4. Marcadores/green/Coin/100_ copia 4.png'
    ],
    poison: [
      'img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
      'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
      'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
      'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
      'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
      'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png'
    ],
    boss: [
      'img/4. Marcadores/orange/0_  copia.png',
      'img/4. Marcadores/orange/20_ copia 2.png',
      'img/4. Marcadores/orange/40_  copia.png',
      'img/4. Marcadores/orange/60_  copia.png',
      'img/4. Marcadores/orange/80_  copia.png',
      'img/4. Marcadores/orange/100_  copia.png'
    ]
  };
  images;
  percentage = 0;


  /**
   * Creates a status bar.
   * @param {string} type - 'life', 'coin', 'poison' or 'boss'.
   * @param {number} x - The x-coordinate of the bar.
   * @param {number} y - The y-coordinate of the bar.
   * @param {number} percentage - The start value from 0 to 100.
   */
  constructor(type, x, y, percentage) {
    super();
    this.images = this.allImages[type];
    this.loadImages(this.images);
    this.x = x;
    this.y = y;
    this.width = 250;
    this.height = 66;
    this.setPercentage(percentage);
  }


  /**
   * Saves the new percentage and shows the matching image.
   * @param {number} percentage - The energy from 0 to 100.
   * @returns {void}
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.getImageIndex()];
    this.img = this.imageCache[path];
  }


  /**
   * Finds the image that fits the current percentage. Every image stands for 20 percent, and the bar is only empty at 0.
   * @returns {number} The index of the image in the images list.
   */
  getImageIndex() {
    if (this.percentage > 80) {
      return 5;
    } else if (this.percentage > 60) {
      return 4;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
