class PufferFish extends MovableObject {
  width = 100;
  height = 100;
  startX;
  swimRange = 880;


  /**
   * Creates the puffer fish and loads its image.
   */
  constructor() {
    super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
    this.x = 980;
    this.y = 352;
    this.startX = this.x;
    this.speed = 1 + Math.random() * 1.5;
    this.animate();
  }


  /**
   * Lets the puffer fish swim all the time.
   * @returns {void}
   */
  animate() {
    setInterval(() => {
      this.swim();
    }, 1000 / 60);
  }


  /**
   * Swims one step in the current direction and checks if it has to turn.
   * @returns {void}
   */
  swim() {
    if (this.otherDirection) {
      this.moveRight();
    } else {
      this.moveLeft();
    }
    this.checkTurn();
  }


  /**
   * Turns the puffer fish around at the end of its swim range.
   * @returns {void}
   */
  checkTurn() {
    if (this.x <= this.startX - this.swimRange) {
      this.otherDirection = true;
    }
    if (this.x >= this.startX) {
      this.otherDirection = false;
    }
  }
}