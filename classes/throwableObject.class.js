class ThrowableObject extends MovableObject {
  width = 60;
  height = 60;
  speed = 8;
  startX;
  isPoisoned;


  /**
   * Creates a bubble in front of Sharkie and lets it fly.
   * @param {number} x - The start x-coordinate.
   * @param {number} y - The start y-coordinate.
   * @param {boolean} otherDirection - True if the bubble flies to the left.
   * @param {boolean} isPoisoned - True for a green poison bubble.
   */
  constructor(x, y, otherDirection, isPoisoned) {
    super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
    if (isPoisoned) {
      this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
    }
    this.x = x;
    this.y = y;
    this.startX = x;
    this.otherDirection = otherDirection;
    this.isPoisoned = isPoisoned;
  }


  /**
   * Moves the bubble one step forward and a little bit up. The world calls this 60 times per second.
   * @returns {void}
   */
  fly() {
    if (this.otherDirection) {
      this.moveLeft();
    } else {
      this.moveRight();
    }
    this.y -= 0.5;
  }


  /**
   * Checks if the bubble has flown too far.
   * @returns {boolean} True if the bubble is far away from its start.
   */
  isFarAway() {
    return Math.abs(this.x - this.startX) > 700;
  }
}
