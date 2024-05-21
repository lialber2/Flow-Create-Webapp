import { ZoomIn, ZoomOut, RestartAlt } from '@mui/icons-material'
import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@mui/material'
import type { CanvasRef } from './Canvas'

interface Props extends CanvasRef {}

/**
 * Top app ShellBar containing various buttons to control Canvas zoom and pan.
 * @param props - Props for the ShellBar.
 * @param props.onReset - Reset button handler.
 * @param props.onZoom - Handler for the zoom buttons.
 * @returns The ShellBar.
 */
const ShellBar = ({ onReset, onZoom }: Props) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ padding: '0.5rem 0' }}>
        <Typography variant="h1" sx={{ flexGrow: 1, fontSize: '2.5rem' }}>
          Flow Create
        </Typography>
        <Tooltip title="Zoom In">
          <IconButton onClick={() => onZoom('IN')}>
            <ZoomIn />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom Out">
          <IconButton onClick={() => onZoom('OUT')}>
            <ZoomOut />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset zoom and pan">
          <IconButton onClick={onReset}>
            <RestartAlt />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}

export default ShellBar
