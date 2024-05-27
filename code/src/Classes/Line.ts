import Vector2D from "./Vector"
import Shape from "./Shape"

export default class Line extends Shape{
  shape: string
  start: Vector2D
  end: Vector2D

  constructor(context: CanvasRenderingContext2D, start: Vector2D, end: Vector2D, fill?: string) {
    super(context, new Vector2D((start.x + end.x)/2,(start.y + end.y)/2), new Vector2D(0,0), new Vector2D(0,0), undefined, fill);
    this.shape = "line";
    this.start = start;
    this.end = end;
  }

  render() {
    this.context.beginPath();
    this.context.moveTo(this.start.x, this.start.y);
    this.context.lineTo(this.end.x, this.end.y);
    this.context.strokeStyle = this.fill;
    this.context.stroke();
    this.context.closePath();
  }

  move(){}

  handleCanvasCollision(): boolean {
    return false;
  }

  handleObjectCollision(): boolean {
    return false;
  }
}