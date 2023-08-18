import { SwipeableDrawer, styled } from '@mui/material'

export const StyledSwipeableDrawer = styled(SwipeableDrawer)(() => ({
  '& .MuiDrawer-paperAnchorBottom' : {
    padding: '0 10px 20px 10px',
    borderRadius: '20px 20px 0 0',
  }
}))