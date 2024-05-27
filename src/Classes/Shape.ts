import Vector2D from './Vector';

abstract class Shape {
  shape!: string;
  pos: Vector2D
  fill: string;
  v: Vector2D
  a: Vector2D
  context: CanvasRenderingContext2D
  elasticity: number

  constructor(context: CanvasRenderingContext2D, position: Vector2D, velocity = new Vector2D(0, 0), acceleration = new Vector2D(0,1), elasticity = 1, fill: string = "white") {
    this.pos = position;
    this.fill = fill;
    this.v = velocity;
    this.a = acceleration;
    this.context = context;
    this.elasticity = elasticity;
  }

  abstract render(): void;

  abstract handleObjectCollision(shape: Shape): boolean;

  abstract handleCanvasCollision(): boolean;

  move() {
    this.v = this.v.add(this.a);
    this.pos = this.pos.add(this.v);
  }
}

export default Shape;