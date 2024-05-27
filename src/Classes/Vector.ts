class Vector2D {
  //speeds are defined in pixels per second
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(v: Vector2D) {
    return new Vector2D(this.x + v.x, this.y + v.y)
  }

  subtract(v: Vector2D) {
    return new Vector2D(this.x - v.x, this.y - v.y)
  }

  divide(divisor: number) {
    return new Vector2D(this.x / divisor, this.y / divisor)
  }

  multiply(scalar: number) {
    return new Vector2D(this.x * scalar, this.y * scalar)
  }

  normal() {
    return new Vector2D(-this.y, this.x)
  }

  unit() {
    return this.divide(this.magnitude())
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  dot(v: Vector2D) {
    return this.x * v.x + this.y * v.y
  }

  static dotProduct(v1: Vector2D, v2: Vector2D) {
    return v1.x * v2.x + v1.y * v2.y
  }

  static closestPointOnLine(vector: Vector2D, origin: Vector2D, point: Vector2D) {
    const ax = origin.x;
    const ay = origin.y;
    const bx = origin.x + vector.x;
    const by = origin.y + vector.y;
    const px = point.x; 
    const py = point.y;

    const atob = { x: bx - ax, y: by - ay };
    const atop = { x: px - ax, y: py - ay };
    const len = (atob.x * atob.x) + (atob.y * atob.y);
    let dot = (atop.x * atob.x) + (atop.y * atob.y);
    const t = Math.min(1, Math.max(0, dot / len));

    dot = ((bx - ax) * (py - ay)) - ((by - ay) * (px - ax));

    return { x: ax + (atob.x * t), y: ay + (atob.y * t) };
  }
}

export default Vector2D