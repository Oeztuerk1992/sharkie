class PoisonBottle extends MovableObject {
  width = 60;
  height = 82;
  offset = { top: 6, left: 8, right: 8, bottom: 0 };
  imagesBottle = [
    'img/4. Marcadores/Poison/Animada/1.png',
    'img/4. Marcadores/Poison/Animada/2.png',
    'img/4. Marcadores/Poison/Animada/3.png',
    'img/4. Marcadores/Poison/Animada/4.png',
    'img/4. Marcadores/Poison/Animada/5.png',
    'img/4. Marcadores/Poison/Animada/6.png',
    'img/4. Marcadores/Poison/Animada/7.png',
    'img/4. Marcadores/Poison/Animada/8.png'
  ];


  /**
   * Creates a poison bottle at a position and lets it wobble.
   * @param {number} x - The x-coordinate of the bottle.
   * @param {number} y - The y-coordinate of the bottle.
   */
  constructor(x, y) {
    super().loadImage(this.imagesBottle[0]);
    this.loadImages(this.imagesBottle);
    this.x = x;
    this.y = y;
    this.animate();
  }


  /**
   * Plays the wobble animation of the bottle.
   * @returns {void}
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.imagesBottle);
    }, 150);
  }
}
