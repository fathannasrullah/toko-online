import { InputBase, styled } from '@mui/material'

export const StyledForm = styled('form')(() => ({
  display: 'flex',
  justifyContent: 'flex-end'
}))

export const StyledSearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '30px',
  backgroundColor: theme.palette.common.purple.dark[1],
  border: `1px solid ${theme.palette.common.purple.light[2]}`,
  opacity: 0.5,
  '&:hover': {
    backgroundColor: theme.palette.common.purple.dark[1],
    border: `1px solid ${theme.palette.common.purple.light[2]}`,
    opacity: 1
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '40%',
  },
}))

export const StyledSearchIconContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: '6px 6px 6px 0',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))