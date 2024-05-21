import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { dia } from '@joint/core'
import { Rectangle } from '../classes/Rectangle'
import { Link } from '../classes/Link'

/**
 * Ref for the Canvas component containing event handlers for zooming and resetting zoom/pan.
 */
export interface CanvasRef {
  /**
   * Event handler for when the zoom button is pressed containing logic for zooming the Canvas in and out.
   * @param direction IN if zooming in, OUT otherwise.
   */
  onZoom: (direction: 'IN' | 'OUT') => void
  /**
   * Event handler for when the reset button is pressed to reset any zoom/pan of the Canvas.
   */
  onReset: () => void
}

/**
 * Canvas component for creating and editing flowcharts.
 * @returns The Canvas.
 */
const Canvas = forwardRef<CanvasRef | undefined>((props, ref) => {
  const canvas = useRef<HTMLDivElement>(null)
  const graph = useRef<dia.Graph>()
  const paper = useRef<dia.Paper>()
  const initialMousePosition = useRef<{ x: number; y: number } | null>(null)
  const currentScale = useRef(1)
  const scaleIncrement = 0.1

  useImperativeHandle(
    ref,
    () => {
      return {
        onZoom: zoomButtonHandler,
        onReset: onReset,
      }
    },
    []
  )

  const onMouseDown = (event: dia.Event) => {
    initialMousePosition.current = {
      x: event.clientX!,
      y: event.clientY!,
    }
    paper.current?.on('blank:pointermove', onMouseMove)
    paper.current?.on('blank:pointerup', onMouseUp)
  }

  const onMouseMove = (event: dia.Event) => {
    if (initialMousePosition.current) {
      const dx = event.clientX! - initialMousePosition.current.x
      const dy = event.clientY! - initialMousePosition.current.y
      const currTranslate = paper.current!.translate()
      const newOrigin = {
        tx: currTranslate.tx + dx,
        ty: currTranslate.ty + dy,
      }
      paper.current?.translate(newOrigin.tx, newOrigin.ty)

      initialMousePosition.current = {
        x: event.clientX ?? 0,
        y: event.clientY ?? 0,
      }
    }
  }

  const onMouseUp = () => {
    initialMousePosition.current = null
    paper.current?.off('blank:pointermove', onMouseMove)
    paper.current?.off('blank:pointerup', onMouseUp)
  }

  const zoomHandler = (
    _evt: dia.Event,
    x: number,
    y: number,
    delta: number
  ) => {
    if (paper.current) {
      const scale =
        delta > 0
          ? Math.min(currentScale.current + scaleIncrement, 2)
          : Math.max(currentScale.current - scaleIncrement, 0.1)
      currentScale.current = scale
      paper.current.scaleUniformAtPoint(currentScale.current, { x: x, y: y })
    }
  }

  const zoomButtonHandler = (direction: 'IN' | 'OUT') => {
    if (paper.current) {
      const scale =
        direction === 'IN'
          ? Math.min(currentScale.current + scaleIncrement, 2)
          : Math.max(currentScale.current - scaleIncrement, 0.1)
      currentScale.current = scale
      // Zoom in and out at current origin point if translations have occured.
      const currentOrigin = paper.current.translate()
      paper.current.scaleUniformAtPoint(currentScale.current, {
        x: currentOrigin.tx,
        y: currentOrigin.ty,
      })
    }
  }

  const onReset = () => {
    if (paper.current) {
      // Logic for resetting canvas. Need to reset zoom scale to 1 and translate canvas back to 0,0
      currentScale.current = 1
      paper.current.scale(currentScale.current)
      paper.current.translate(0, 0)
    }
  }

  useEffect(() => {
    graph.current = new dia.Graph()
    paper.current = new dia.Paper({
      el: canvas.current,
      model: graph.current,
      frozen: true,
      async: true,
      gridSize: 10,
      height: '100%',
      width: '100%',
      drawGrid: true,
      background: {
        color: 'rgb(255, 255, 255)',
      },
    })
    const rect1 = new Rectangle({
      position: { x: 50, y: 70 },
      attrs: {
        label: {
          text: 'Create a Node!',
          fontSize: 18,
          fontVariant: 'small-caps',
        },
      },
    })
    const rect2 = new Rectangle({
      position: {
        x: 250,
        y: 250,
      },
    })
    const link = new Link({
      labelText: 'Or a link!',
      source: rect1,
      target: rect2,
    })

    paper.current.on('blank:pointerdown', onMouseDown)
    paper.current.on('blank:mousewheel', zoomHandler)
    graph.current.addCells([rect1, rect2, link])
    paper.current.unfreeze()

    return () => {
      paper.current?.off('blank:pointerdown', onMouseDown)
      paper.current?.off('blank:pointermove', onMouseMove)
      paper.current?.off('blank:pointerup', onMouseUp)
      paper.current?.off('blank:mousewheel', zoomHandler)
    }
  }, [])

  return <main ref={canvas} style={{ flex: 1, cursor: 'all-scroll' }}></main>
})

export default Canvas
