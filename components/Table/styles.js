import { TableContainer, styled } from '@mui/material'

export const StyledTableContainer = styled(TableContainer)(() => ({
  width: '100%',
  height: '69vh',
  '@media (min-height: 767px) and (min-width: 1023px)': {
    height: '75vh'
  }
}))