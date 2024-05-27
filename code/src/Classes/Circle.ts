import Shape from "./Shape"
import Vector2D from "./Vector"

export default class Circle extends Shape {
  shape: string
  radius: number
  mass: number
  inverseMass: number

  constructor(context: CanvasRenderingContext2D, position: Vector2D, radius: number, velocity?: Vector2D, acceleration?: Vector2D, elasticity?: number, fill?: string) {
    super(context, position, velocity, acceleration, elasticity, fill)
    this.shape = "circle"
    this.radius = radius
    this.mass = Math.PI * radius * radius
    this.inverseMass = 1/this.mass
  }

  render(showVectors: boolean = true) {
    this.context.beginPath()
    this.context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI)
    this.context.fillStyle = this.fill
    this.context.fill()
    this.context.strokeStyle = "black"
    this.context.stroke()
    this.context.closePath()
    if(showVectors) {
      let factor = 4
      
      this.context.beginPath()
      this.context.moveTo(this.pos.x, this.pos.y)
      this.context.lineTo(this.pos.x + this.v.x*factor, this.pos.y + this.v.y*factor)
      this.context.strokeStyle = "black"
      this.context.stroke()
      this.context.closePath()

      this.context.beginPath()
      this.context.moveTo(this.pos.x, this.pos.y)
      this.context.lineTo(this.pos.x + this.a.x*factor, this.pos.y + this.a.y*factor)
      this.context.strokeStyle = "red"
      this.context.stroke()
      this.context.closePath()
    }
    this.context.save()    
  }

  handleCanvasCollision(): boolean {
    let element = this.context.canvas
    if (this.pos.x + this.radius > element.width) {
      let diff = this.pos.x + this.radius - element.width
      //if the circle is outside the canvas, move it back inside to where it should be after bouncing
      this.pos.x -= diff * 2
      this.v.x *= -1
      return true
    } else if (this.pos.x - this.radius < 0) {
      let diff = this.pos.x - this.radius
      this.pos.x += diff * -2
      this.v.x *= -1
      return true
    }
    if (this.pos.y + this.radius > element.height) {
      let diff = this.pos.y + this.radius - element.width
      this.pos.y -= diff * 2
      this.v.y *= -this.elasticity
      return true
    } else if (this.pos.y - this.radius < 0) {
      let diff = this.pos.y - this.radius
      this.pos.y += diff * -2
      this.v.y *= -1
      return true
    }
    return false
  }

  handleObjectCollision(shape: Shape): boolean {
    switch (shape.shape) {
      case "circle":
        let circle = shape as Circle

        if(this.radius + circle.radius >= circle.pos.subtract(this.pos).magnitude()) {
          //resolve penetration
          const distance = this.pos.subtract(circle.pos)
          let penetrationDepth = this.radius + circle.radius - distance.magnitude()

          const velocityAlongDistance = distance.unit().multiply(distance.dot(this.v) / distance.magnitude());
          
          penetrationDepth += velocityAlongDistance.magnitude() * 0.5
          
          const penetrationResolution = distance.unit().multiply(penetrationDepth / (this.inverseMass + circle.inverseMass))

          
          this.pos = this.pos.add(penetrationResolution.multiply(this.inverseMass))
          circle.pos = circle.pos.add(penetrationResolution.multiply(-circle.inverseMass))

          const normal = distance.unit()
          
          const relativeVelocity = this.v.subtract(circle.v)

          const initialVelocity = relativeVelocity.dot(normal)
          const resultingVelocity = -initialVelocity * Math.min(this.elasticity, circle.elasticity)

          const impulse = (resultingVelocity - initialVelocity) / (this.inverseMass + circle.inverseMass)
          const impulseVector = normal.multiply(impulse)

          this.v = this.v.add(impulseVector.multiply(this.inverseMass))
          circle.v = circle.v.subtract(impulseVector.multiply(circle.inverseMass))

          return true
        }

        return false
      default:
        return false
    }
  }
}