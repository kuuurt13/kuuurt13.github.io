export default class Point {
  constructor(stage, index, config = {}) {
    this.stage = stage
    this.index = index
    this.config = config

    this.point
    this.line
    this.coords = { x: 0, y: 0 }
    this.nextSibling = null

    this.draw()
  }

  tick() {
    this.move()
    this.connectToNextSibling()
  }

  draw() {
    this.point = new createjs.Shape()
    this.coords = {
      x: this.randomNumber(2) ? -1 : 1,
      y: this.randomNumber(2) ? -1 : 1,
    }

    this.point.graphics.drawCircle(0, 0, 0)

    this.point.y = Math.random() * window.innerHeight
    this.point.x = Math.random() * window.innerWidth
    this.pointIndex = this.index
    this.point.alpha = 0.5

    this.stage.addChild(this.point)
  }

  move() {
    const { clientHeight, clientWidth } = this.stage.canvas

    if (
      this.point.x > clientWidth ||
      this.point.y > clientHeight ||
      this.point.x < 0 ||
      this.point.y < 0
    ) {
      this.stage.removeChild(this.point)
      this.draw()
    } else {
      this.point.pointIndex = this.index
      this.point.x += this.coords.x
      this.point.y += this.coords.y
    }
  }

  connectToNextSibling() {
    const { children } = this.stage

    this.nextSibling = children.find((c) => c.pointIndex + 1 === this.index)

    if (this.nextSibling) {
      const { x: endX, y: endY } = this.nextSibling
      const { x: startX, y: startY } = this.point

      if (this.line) this.stage.removeChild(this.line)

      this.line = new createjs.Shape()
      this.line.graphics.setStrokeStyle(1)
      this.line.graphics.beginStroke(this.config.lineStroke)
      this.line.alpha = 0.4
      this.line.graphics.moveTo(startX, startY)
      this.line.graphics.lineTo(endX, endY)
      this.line.graphics.endStroke()

      this.stage.addChild(this.line)
    }
  }

  randomNumber(max) {
    return parseInt(Math.random() * max)
  }
}
