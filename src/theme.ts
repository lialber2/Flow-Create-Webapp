import { createGlobalStyle } from 'styled-components'
import { createTheme } from '@mui/material'

export const colorScheme = {
  main: '#577399',
  dark: '#495867',
  light: '#BDD5EA',
  contrastText: '#F7F7FF',
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#577399',
      dark: '#495867',
      light: '#BDD5EA',
      contrastText: '#F7F7FF',
    },
  },
})

export const GlobalStyle = createGlobalStyle`
  #root {
    height: 100vh;
  }
`
