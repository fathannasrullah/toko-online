import { IconButton, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

import { isEmpty } from 'lodash'

import { 
  StyledForm,
  StyledInputBase, 
  StyledSearchContainer, 
  StyledSearchIconContainer 
} from './styles'

const Search = ({ searchValue, onSearchChange }) => {
  return (
    <StyledForm>
      <StyledSearchContainer>
        <StyledSearchIconContainer>
          <SearchIcon />
        </StyledSearchIconContainer>
        <StyledInputBase
          value={searchValue}
          placeholder='Search..'
          inputProps={{ 'aria-label': 'search' }}
          endAdornment={!isEmpty(searchValue) &&
            <InputAdornment position='end'>
              <IconButton
                size='small'
                onClick={(event) => onSearchChange(event, '')}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          }
          onChange={onSearchChange}
        />
      </StyledSearchContainer>
    </StyledForm>
  )
}

export default Search