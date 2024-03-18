import { Typography } from '@mui/material'
import Canvas from '../components/Canvas'
import { Wrapper } from './CanvasPage.styles'

const CanvasPage = () => {
  return (
    <Wrapper>
      <Typography sx={{ marginBottom: '30px', fontWeight: 500 }} variant="h1">
        Flow Create
      </Typography>
      <Canvas />
    </Wrapper>
  )
}

export default CanvasPage
