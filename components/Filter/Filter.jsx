import { useState } from 'react'

import {
  Badge,
  Button,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Typography
} from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import ClearIcon from '@mui/icons-material/Clear'
import CloseIcon from '@mui/icons-material/Close'

import { isEmpty } from 'lodash'

import { currencyFormat } from '@/utils/helpers/format-helper'

import { StyledSwipeableDrawer } from './styles'

const ITEM_HEIGHT = 50
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
    sx: {
      
    }
  }
}

const Filter = ({ 
  selects,
  priceRangeValue,
  price,
  filterSelected, 
  onPriceRangeChange,
  onApplyFilter,
  onClearFilter,
}) => {
  const [openFilter, setOpenFilter] = useState(false)
  
  const toggleFilter = (newOpenFilter) => () => {
    setOpenFilter(newOpenFilter)
  }

  const { minPrice, maxPrice } = price
  const { 
    categoriesAndBrandsSelected, 
    minPriceSelected,
    maxPriceSelected,
  } = filterSelected

  return (
    <>
      <Button
        variant='outlined'
        onClick={toggleFilter(true)} 
        startIcon={
          <Badge badgeContent={categoriesAndBrandsSelected.length} color='error'>
            <TuneIcon />
          </Badge>
        }
      >
        Filters
      </Button>
      <StyledSwipeableDrawer
        anchor='bottom'
        open={openFilter}
        onOpen={toggleFilter(true)}
        onClose={toggleFilter(false)}
        ModalProps={{
          keepMounted: true
        }}
      >
        <List>
          <ListItem>
            <Grid container justifyContent='space-between'>
              <Button
                variant='contained'
                disabled={isEmpty(categoriesAndBrandsSelected) && minPriceSelected == 10 && maxPriceSelected == 5000}
                onClick={onClearFilter}
              >
                Clear Filter
              </Button>
              <IconButton onClick={toggleFilter(false)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </ListItem>
          {selects.map(({
            title,
            name,
            value,
            placeHolder,
            options,
            optionsIsLoading,
            onOpenSelect,
            onSelectChange,
            onClearSelect
          }, index) => (
            <ListItem key={index}>
              <Grid container flexGrow='column'>
                <ListItemText primary={title} />
                <FormControl fullWidth size='small'>
                  <Select
                    name={name}
                    multiple
                    displayEmpty
                    value={value}
                    onOpen={onOpenSelect}
                    onChange={onSelectChange}
                    input={
                      <OutlinedInput
                        endAdornment={!isEmpty(value) &&
                          <IconButton 
                            size='small'
                            sx={{ marginRight: '10px' }}
                            onClick={onClearSelect}
                          >
                            <ClearIcon />
                          </IconButton>
                        }
                      />
                    }
                    renderValue={(selected) => {
                      if (selected.length == 0) return <em>{placeHolder}</em>
                      if (selected.length > 1) return <em>{selected.length} category selected</em>
          
                      return selected.join(' ')
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {options
                      ? options.map((option, index) => (
                          <MenuItem key={index} value={option}>
                            <Checkbox checked={value.indexOf(option) > -1} />
                            <ListItemText primary={option} />
                          </MenuItem>
                      ))
                      : optionsIsLoading && <MenuItem><em>loading..</em></MenuItem>
                    }
                  </Select>
                </FormControl>
              </Grid>
            </ListItem>
          ))}
          <ListItem>
            <Grid container flexDirection='column'>
              <Grid item container justifyContent='space-between'>
                <Typography>${currencyFormat(minPrice, 0)}</Typography>
                <Typography>${currencyFormat(maxPrice, 0)}</Typography>
              </Grid>
              <Slider
                getAriaLabel={() => 'Price Range'}
                value={priceRangeValue}
                step={10}
                min={0}
                max={5000}
                onChange={onPriceRangeChange}
                valueLabelDisplay='auto'
              />
            </Grid>
          </ListItem>
          <ListItem>
            <Button
              variant='contained'
              fullWidth
              size='large'
              onClick={() => onApplyFilter(toggleFilter(false))}
            >
              Apply Filter
            </Button>
          </ListItem>
        </List>
      </StyledSwipeableDrawer>
    </>
  )
}

export default Filter