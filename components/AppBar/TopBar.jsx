import { Grid } from '@mui/material'

import Search from '../Search/Search'
import Filter from '../Filter/Filter'

const TopBar = ({
  selects,
  priceRangeValue,
  price,
  filterSelected,
  showSearchFilter = false,
  searchValue,
  onSearchChange,
  onPriceRangeChange,
  onClearFilter,
  onApplyFilter
}) => {
  return (
    <Grid item xs={12} container 
      columnSpacing={1.5}
      direction='row'
      justifyContent='flex-end'
      alignItems='center'
    >
      {showSearchFilter &&
        <>
          <Grid item xs={7}>
            <Search
              searchValue={searchValue}
              onSearchChange={onSearchChange}
            />
          </Grid>
          <Grid item>
            <Filter
              selects={selects}
              priceRangeValue={priceRangeValue}
              price={price}
              filterSelected={filterSelected}
              onPriceRangeChange={onPriceRangeChange}
              onClearFilter={onClearFilter}
              onApplyFilter={onApplyFilter}
            />
          </Grid>
        </>
      }
    </Grid>
  )
}

export default TopBar