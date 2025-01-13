import { shapes, util } from '@joint/core'

// Append a foreignObject to the default Rectangle SVG containing an input.
// Input should allow the text of the node to become editable when the element is double clicked.
// Not visible by default.
const markup = util.svg/*xml*/ `
<foreignObject @selector="foreignObject">
  <div @selector="inputWrapper">
    <input @selector="rectangleInput" class="rectangle-input" type="text"/>
  </div>
</foreignObject>`

/**
 * Class representing a Rectangle or Node on the canvas.
 * Extends the JointJS Rectangle class and adds some default values
 * such as fixed height, width, and colour.
 */
export class Rectangle extends shapes.standard.Rectangle {
  preinitialize() {
    super.preinitialize()

    this.markup = this.markup.concat(markup)
  }

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
        foreignObject: {
          x: 0,
          y: 0,
          width: 'calc(w)',
          height: 'calc(h)',
          visibility: 'hidden',
        },
        inputWrapper: {
          style: {
            display: 'flex',
            'justify-content': 'Center',
            'align-items': 'Center',
            height: '100%',
          },
        },
        ...attrs,
      },
      ...rest,
    })
  }

  defaults() {
    return { ...super.defaults, type: 'flowCreate.rectangle' }
  }

  // Want to customize the SVG for the JointJS Rectangle shape so that
  // it includes an input that becomes editable when we double click the element.
}
