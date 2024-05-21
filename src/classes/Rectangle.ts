import { shapes } from '@joint/core'

/**
 * Class representing a Rectangle or Node on the canvas.
 * Extends the JointJS Rectangle class and adds some default values
 * such as fixed height, width, and colour.
 */
export class Rectangle extends shapes.standard.Rectangle {
  /**
   *
   * @param args - JointJS RectangleAttributes object.
   * @param args.attrs - Set presentation attributes (SVG and JointJS attributes) on view subelements.
   */
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
