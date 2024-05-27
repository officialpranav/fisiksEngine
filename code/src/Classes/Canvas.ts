import Circle from "./Circle"
import Shape from "./Shape"
import Vector2D from "./Vector"
import Line from "./Line"

class Canvas {
  element: HTMLCanvasElement
  context: CanvasRenderingContext2D
  objects: Shape[]

  constructor(width: number, height: number, bgColor : string = "lightgrey") {
    this.element = document.createElement('canvas')
    this.context = this.element.getContext('2d')!

    this.element.width = width
    this.element.height = height

    this.element.style.backgroundColor = bgColor
    this.element.style.outline = "1px solid black"

    this.objects = []

    document.body.append(this.element)
  }

  circle(position: Vector2D, radius: number, velocity? : Vector2D, acceleration?: Vector2D, restitution?: number, fill? : string) {
    this.objects.push(new Circle(this.context, position, radius, velocity, acceleration, restitution, fill))
  }

  lineSegment(start: Vector2D, end: Vector2D, fill? : string) {
    this.objects.push(new Line(this.context, start, end, fill))
  }

  draw() {
    this.clear()
    for(let obj of this.objects) {
      obj.render()
      obj.move()
      obj.handleCanvasCollision()
      for(let other of this.objects) {
        if(obj === other) continue
        obj.handleObjectCollision(other)
      }
    }
    return this.element
  }

  clear() {
    this.context.clearRect(0,0,this.element.width,this.element.height)
  }
}

export default Canvas