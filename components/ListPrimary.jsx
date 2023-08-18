import { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Grid } from '@mui/material'

import { isEmpty } from 'lodash'

import TablePrimary from './Table/TablePrimary'

import TopBar from './AppBar/TopBar'

const ListPrimary= ({
  TableRowCustom,
  showSearchFilter = false,
  tableColumns,
  responseKeyName,
  storeName,
  listStateName,
  categoriesStateName,
  brandsStateName,
  listStatusLoading,
  categoriesStatusLoading,
  brandsStatusLoading,
  viewDetail,
  basePath,
  onFetchList,
  onFetchSearch,
  onFetchCategories,
  onFetchBrands
}) => {
  const [page, setPage] = useState(0)
  const [fetchType, setFetchType] = useState({ name: 'initial' })
  const [searchValue, setSearchValue] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [optionsSelected, setOptionsSelected] = useState({
    categoriesSelected: [],
    brandsSelected: []
  })
  const [filterSelected, setFilterSelected] = useState({
    categoriesAndBrandsSelected: [],
    minPriceSelected: 10,
    maxPriceSelected: 5000
  })
  const [priceRangeValue, setPriceRangeValue] = useState([10, 5000])
  const [price, setPrice] = useState({
    minPrice: 10,
    maxPrice: 5000
  })
  const [filter, setFilter] = useState({ filterKey: 'NONE' })

  const dispatch = useDispatch()
  const { 
    statusRequest,
    [listStateName]: listState,
    [categoriesStateName]: categoriesState,
    [brandsStateName]: brandsState
  } = useSelector((state) => state[storeName])

  const listIsLoading = statusRequest === listStatusLoading
  const categoriesIsLoading = statusRequest === categoriesStatusLoading
  const brandsIsLoading = statusRequest === brandsStatusLoading

  const { [responseKeyName]: list = [], total } = listState
  const { [responseKeyName]: listForGetCategories } = categoriesState || {}
  const { [responseKeyName]: listForGetBrands } = brandsState || {}

  const categories = !isEmpty(listForGetCategories) && [...new Set(listForGetCategories.map(({ category }) => category))]
  const brands = !isEmpty(listForGetBrands) && [...new Set(listForGetBrands.map(({ brand }) => brand))]

  const rowsPerPage = 10

  const handleSearchData = (type) => {
    setFetchType({
      ...fetchType,
      name: type
    })
  }

  const handleSearchChange = (event, emptyValue) => {
    clearTimeout(searchTimeout)
    
    setSearchValue(
      typeof emptyValue === 'string'
        ? emptyValue
        : event.target.value
    )

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        setPage(0)

        handleSearchData('search')
      }, 500)
    )
  }

  const handleNextPage = () => {
    handleSearchData('next-page')
  }

  const handlePageChange = (event, newPage) => {
    event.preventDefault()

    const totalData = total
    const numberOfList = list.length
    const numberOfRow = rowsPerPage * (newPage+1)

    if (numberOfRow === numberOfList && numberOfRow !== totalData) handleNextPage()
    
    setPage(newPage)
  }

  const handleOpenSelect = (event, name) => {
    event.preventDefault()

    name === 'categories'
      ? handleSearchData('categories')
      : handleSearchData('brands')
  }
  
  const handleSelectChange = (event, stateName) => {
    const { target: { value } } = event

    setOptionsSelected({
      ...optionsSelected,
      [stateName]: typeof value === 'string'
        ? [...[value], value.split(',')]
        : value
    })
  }

  const handleClearSelect = (stateName) => {
    setOptionsSelected({
      ...optionsSelected,
      [stateName]: []
    })
  }

  const handlePriceRangeChange = (event, newValue) => {
    event.preventDefault()

    setPrice({
      ...price,
      minPrice: newValue[0],
      maxPrice: newValue[1]
    })

    setPriceRangeValue(newValue)
  }

  const { categoriesSelected, brandsSelected } = optionsSelected
  const { minPrice, maxPrice } = price
  const {
    categoriesAndBrandsSelected,
    minPriceSelected,
    maxPriceSelected
  } = filterSelected

  const FILTERS = {
    NONE: (listWithPagination) => listWithPagination,
    ALLSELECTED: (listWithoutPagination) => listWithoutPagination.filter(({ brand, category, price }) => 
      categoriesAndBrandsSelected.includes(category) &&
      categoriesAndBrandsSelected.includes(brand) &&
      price >= minPriceSelected && price <= maxPriceSelected
    ),
    SOMESELECTED: (listWithoutPagination) => listWithoutPagination.filter(({ brand, category, price }) => 
      categoriesAndBrandsSelected.includes(brand)
        ? categoriesAndBrandsSelected.includes(category) ||
          categoriesAndBrandsSelected.includes(brand) &&
          price >= minPriceSelected && price <= maxPriceSelected
        : !isEmpty(categoriesAndBrandsSelected)
          ? categoriesAndBrandsSelected.includes(brand) ||
            categoriesAndBrandsSelected.includes(category) &&
            price >= minPriceSelected && price <= maxPriceSelected
          : price >= minPriceSelected && price <= maxPriceSelected
    )
  }

  const handleApplyFilter = (autoCloseFilter) => {
    setPage(0)

    handleSearchData('all-data')
    
    setFilterSelected({
      ...filterSelected,
      categoriesAndBrandsSelected: [...categoriesSelected, ...brandsSelected],
      minPriceSelected: minPrice,
      maxPriceSelected: maxPrice
    })

    if (!isEmpty(categoriesSelected) && !isEmpty(brandsSelected) && (minPrice != 10 || maxPrice != 5000) ||
      !isEmpty(categoriesSelected) && !isEmpty(brandsSelected) && (minPrice == 10 && maxPrice == 5000) 
    ) setFilter({ ...filter, filterKey: 'ALLSELECTED' })
    
    if (!isEmpty(categoriesSelected) && isEmpty(brandsSelected) ||
      isEmpty(categoriesSelected) && !isEmpty(brandsSelected) ||
      isEmpty(categoriesSelected) && isEmpty(brandsSelected) && (minPrice != 10 || maxPrice != 5000)
    ) setFilter({ ...filter, filterKey: 'SOMESELECTED' })

    autoCloseFilter()
  }

  const handleClearFilter = () => {
    setFilterSelected({
      categoriesAndBrandsSelected: [],
      minPriceSelected: 10,
      maxPriceSelected: 5000
    })
    setOptionsSelected({
      ...optionsSelected,
      categoriesSelected: [],
      brandsSelected: []
    })
    setPriceRangeValue([10, 5000])
    setPrice({
      minPrice: 10,
      maxPrice: 5000
    })

    setFilter({ ...filter, filterKey: 'NONE'})
  }

  const handleFetchList = useCallback(() => {
    let param = {
      limit: 30
    }

    if (fetchType.name === 'next-page') {
      param = {
        ...param,
        skip: list.length
      }
    }

    if (fetchType.name === 'all-data') dispatch(onFetchList({ limit: 0 }))
    if (fetchType.name === 'categories') dispatch(onFetchCategories({ limit: 0 }))
    if (fetchType.name === 'brands') dispatch(onFetchBrands({ limit: 0 }))
    if (fetchType.name === 'search') dispatch(onFetchSearch({ 
      q: searchValue,
      limit: 0
    }))
    
    if (fetchType.name === 'initial' || fetchType.name === 'next-page') dispatch(onFetchList({ ...param }))
  }, [fetchType])

  useEffect(() => {
    handleFetchList()
  }, [handleFetchList])

  const selects = [
    {
      title: 'Category',
      name: 'categories',
      value: categoriesSelected,
      placeHolder: 'Choose Category',
      options: categories,
      optionsIsLoading: categoriesIsLoading,
      onOpenSelect: (event) => handleOpenSelect(event, 'categories'),
      onSelectChange: (event) => handleSelectChange(event, 'categoriesSelected'),
      onClearSelect: () => handleClearSelect('categoriesSelected')
    },
    {
      title: 'Brand',
      name: 'brands',
      value: brandsSelected,
      placeHolder: 'Choose Brand',
      options: brands,
      optionsIsLoading: brandsIsLoading,
      onOpenSelect: (event) => handleOpenSelect(event, 'brands'),
      onSelectChange: (event) => handleSelectChange(event, 'brandsSelected'),
      onClearSelect: () => handleClearSelect('brandsSelected')
    },
  ]

  const filterFunction = FILTERS[filter.filterKey]
  const filteredList = filterFunction(list)

  return (
    <Grid container spacing={1}>
        <TopBar
          selects={selects}
          priceRangeValue={priceRangeValue}
          price={price}
          filterSelected={filterSelected}
          showSearchFilter={showSearchFilter}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onPriceRangeChange={handlePriceRangeChange}
          onClearFilter={handleClearFilter}
          onApplyFilter={handleApplyFilter}
        />
      <Grid item xs={12}>
        <TablePrimary
          TableRowCustom={TableRowCustom}
          columns={tableColumns}
          rows={filteredList}
          page={page}
          rowsPerPage={rowsPerPage}
          viewDetail={viewDetail}
          basePath={basePath}
          listIsLoading={listIsLoading}
          onPageChange={handlePageChange}
        />
      </Grid>
    </Grid>
  )
}

export default ListPrimary