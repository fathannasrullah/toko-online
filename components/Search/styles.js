import { OutlinedInput, styled } from '@mui/material'

export const StyledForm = styled('form')(() => ({
  display: 'flex',
  justifyContent: 'flex-end'
}))

export const StyledSearchContainer = styled('div')(() => ({
  position: 'relative',
  maxWidth: '265px'
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

export const StyledInputBase = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: '30px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  '& .MuiInputAdornment-positionEnd': {
    margin: '0 -10px'
  }
}))