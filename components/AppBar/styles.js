import { AppBar, IconButton, styled } from '@mui/material'

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  color: theme.palette.text.primary,
  background: theme.palette.background.default,
  [theme.breakpoints.up('sm')]: {
    width: 'calc(100% - 240px)',
    //marginLeft: '240px'
  }
}))

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: 4,
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  },
}))