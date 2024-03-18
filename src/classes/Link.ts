import { shapes } from '@joint/core'
import { Rectangle } from './Rectangle'

interface LinkArguments {
  labelText: string
  source: Rectangle
  target: Rectangle
}

export class Link extends shapes.standard.Link {
  constructor({ labelText, source, target }: LinkArguments) {
    super({
      attrs: {
        line: {
          stroke: 'gray',
          strokeWidth: 2,
          targetMarker: {
            type: 'image',
            'xlink:href': 'arrow_left_black_24dp.svg',
            width: 50,
            height: 50,
            y: -25,
            x: -22,
          },
        },
      },
    })
    this.appendLabel({ attrs: { text: { text: labelText } } })
    this.source(source)
    this.target(target)
  }
}
