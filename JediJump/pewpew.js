class PewPew {
  constructor() {
    this.r = 40;
    this.x = width - stormTrooper.r - this.r;
    this.y = height - 65;
  }

  move() {
    this.x -= 15;
  }

  show() {
    image(pewpewImg, this.x, this.y, this.r, 10);
  }
}
