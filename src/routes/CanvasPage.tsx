import Canvas, { type CanvasRef } from '../components/Canvas'
import { Wrapper } from './CanvasPage.styles'
import ShellBar from '../components/ShellBar'
import { useRef } from 'react'

/**
 * Route for the CanvasPage.
 * Contains the canvas for creating and modifying flowcharts and a top ShellBar.
 */
const CanvasPage = () => {
  // Ref to the Canvas component that contains event handlers for the ShellBar.
  const canvasRef = useRef<CanvasRef>()

  const onReset = () => {
    if (canvasRef.current) {
      canvasRef.current.onReset()
    }
  }

  const onZoom = (direction: 'IN' | 'OUT') => {
    if (canvasRef.current) {
      canvasRef.current.onZoom(direction)
    }
  }

  return (
    <Wrapper>
      <ShellBar onReset={onReset} onZoom={onZoom} />
      <Canvas ref={canvasRef} />
    </Wrapper>
  )
}

export default CanvasPage
