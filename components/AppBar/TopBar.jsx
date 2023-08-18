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
  /*const router = useRouter()
  const currentPathname = usePathname()
  const newPathname = currentPathname.split('/')
  const targetPathname = newPathname.slice(0, newPathname.length - 1).join('/') || '/'
  
  const breadcrumbs = newPathname.map((name, index) => {
    let label = name.toUpperCase()
    const link = `/${name}`
    const lastName = newPathname[newPathname.length - 1]

    if (name === '') label = <HomeIcon />

    return (
      name === lastName ? (
        <Typography key={index}>{label}</Typography>
      ) : (
        <Link href={link} key={index}>{label}</Link>
      )
    )
  })

  const handleBackToPrevious = () => router.push(targetPathname)*/

  return (
    <Grid item xs={12} container 
      columnSpacing={1.5}
      direction='row'
      justifyContent='flex-end'
      alignItems='center'
    >
      
      {showSearchFilter &&
        <>
          <Grid item xs={8.2} sm={9.8}>
            <Search
              searchValue={searchValue}
              onSearchChange={onSearchChange}
            />
          </Grid>
          <Grid item xs={3.8} sm={2.2}>
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