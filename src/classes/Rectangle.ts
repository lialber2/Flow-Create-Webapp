import { shapes } from '@joint/core'

export class Rectangle extends shapes.standard.Rectangle {
  constructor({ attrs, ...rest }: shapes.standard.RectangleAttributes) {
    super({
      size: { width: 150, height: 65 },
      attrs: {
        body: { fill: 'rgb(191, 177, 223)', rx: 5, ry: 5 },
        ...attrs,
      },
      ...rest,
    })
  }
}
