import { Drawer, ListItemButton, SwipeableDrawer, styled } from '@mui/material'


export const StyledNavigation = styled('nav')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: '240px',
    flexShrink: 0
  }
}))

export const StyledDrawerTemporary = styled(SwipeableDrawer)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: '240px',
    borderRadius: '0 20px 20px 0'
  }
}))

export const StyledDrawerPermanent = styled(Drawer)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: '240px'
  }
}))

export const StyledListItemButton = styled(ListItemButton)(() => ({
  width: '240px',
  borderRadius: '0 30px 30px 0'
}))