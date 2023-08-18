import { Breadcrumbs, styled } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'

export const StyledBreadcrums = styled(Breadcrumbs)(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.text.primary,
  '& a': {
    color: theme.palette.primary.main
  }
}))

export const StyledHomeIcon = styled(HomeIcon)(() => ({
  marginTop: '4px'
}))