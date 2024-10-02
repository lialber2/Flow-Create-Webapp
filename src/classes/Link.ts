import { shapes } from '@joint/core'
import { Rectangle } from './Rectangle'

interface LinkArguments {
  /**
   * The text to display on top of the edge.
   */
  labelText: string
  /**
   * The source node of the edge.
   */
  source: Rectangle
  /**
   * The target (end) node of the edge.
   */
  target: Rectangle
}

/**
 * Link class that represents an edge between two nodes in a flowchart.
 * Extends the JointJS link class and adds some default values for appearance.
 */
export class Link extends shapes.standard.Link {
  /**
   *
   * @param args - The arguments to construct the Link with.
   * @param args.labelText - The edge's label text.
   * @param args.source - The source node of the edge.
   * @param args.target - The target (end) node of the edge.
   */
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
