class StormTrooper {
  constructor() {
    this.r = 100;
    this.x = width - this.r;
    this.y = height - this.r;
  }

  show() {
    image(stormTrooperImg, this.x, this.y, this.r, this.r);
  }
}
