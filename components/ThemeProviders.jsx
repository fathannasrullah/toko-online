'use client'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { theme } from '@/theme/theme'

const ThemeProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default ThemeProviders