class StatusBar extends DrawableObject {
  imagesLife = [
    'img/4. Marcadores/green/Life/0_  copia 3.png',
    'img/4. Marcadores/green/Life/20_ copia 4.png',
    'img/4. Marcadores/green/Life/40_  copia 3.png',
    'img/4. Marcadores/green/Life/60_  copia 3.png',
    'img/4. Marcadores/green/Life/80_  copia 3.png',
    'img/4. Marcadores/green/Life/100_  copia 2.png'
  ];
  percentage = 100;


  /**
   * Creates the life bar in the top left corner.
   */
  constructor() {
    super();
    this.loadImages(this.imagesLife);
    this.x = 20;
    this.y = 0;
    this.width = 300;
    this.height = 80;
    this.setPercentage(100);
  }


  /**
   * Saves the new percentage and shows the matching image.
   * @param {number} percentage - The energy from 0 to 100.
   * @returns {void}
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.imagesLife[this.getImageIndex()];
    this.img = this.imageCache[path];
  }


  /**
   * Finds the image that fits the current percentage.
   * @returns {number} The index of the image in imagesLife.
   */
  getImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
