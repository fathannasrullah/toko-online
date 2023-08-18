import { createSlice } from '@reduxjs/toolkit'

import { 
  STORE_NAME, 
  STATE_NAME_PRODUCT_LIST, 
  STATUS_REQUEST_BASE_IDDLE, 
  STATUS_REQUEST_PRODUCT_LIST_FAILED, 
  STATUS_REQUEST_PRODUCT_LIST_PENDING, 
  STATUS_REQUEST_PRODUCT_LIST_SUCCESS,
  STATE_NAME_PRODUCT_CATEGORIES,
  STATUS_REQUEST_PRODUCT_CATEGORIES_SUCCESS,
  STATUS_REQUEST_PRODUCT_CATEGORIES_PENDING,
  STATUS_REQUEST_PRODUCT_CATEGORIES_FAILED,
  STATE_NAME_PRODUCT_BRANDS,
  STATUS_REQUEST_PRODUCT_BRANDS_SUCCESS,
  STATUS_REQUEST_PRODUCT_BRANDS_PENDING,
  STATUS_REQUEST_PRODUCT_BRANDS_FAILED, 
} from '@/utils/constant'

import { 
  getProductList, 
  getProductCategories, 
  getProductBrands, 
  getSearchProduct 
} from './action'

const initialState = {
  statusRequest: STATUS_REQUEST_BASE_IDDLE,
  [STATE_NAME_PRODUCT_LIST]: {},
  [STATE_NAME_PRODUCT_CATEGORIES]: {},
  [STATE_NAME_PRODUCT_BRANDS]: {},
}

const productSlice = createSlice({
  name: STORE_NAME.PRODUCTS,
  initialState,
  reducers: {
    getProductList,
    getProductCategories,
    getProductBrands,
    getSearchProduct,
  },
  extraReducers: (builder) => {
    // product list
    builder.addCase(getProductList.fulfilled, (state, action) => {
      const { skip } = action.payload[STATE_NAME_PRODUCT_LIST]

      state[STATE_NAME_PRODUCT_LIST] = skip === 0
        ? action.payload[STATE_NAME_PRODUCT_LIST] || {}
        : {
            ...action.payload[STATE_NAME_PRODUCT_LIST],
            products: [...state[STATE_NAME_PRODUCT_LIST].products, ...action.payload[STATE_NAME_PRODUCT_LIST].products]
          }
      state.statusRequest = STATUS_REQUEST_PRODUCT_LIST_SUCCESS
    }),
    builder.addCase(getProductList.pending, (state) => {
      state.statusRequest = STATUS_REQUEST_PRODUCT_LIST_PENDING
    }),
    builder.addCase(getProductList.rejected, (state) => {
      state[STATE_NAME_PRODUCT_LIST] = {}
      state.statusRequest = STATUS_REQUEST_PRODUCT_LIST_FAILED
    }),
    // product categories
    builder.addCase(getProductCategories.fulfilled, (state, action) => {
      state[STATE_NAME_PRODUCT_CATEGORIES] = action.payload[STATE_NAME_PRODUCT_CATEGORIES] || {}
      state.statusRequest = STATUS_REQUEST_PRODUCT_CATEGORIES_SUCCESS
    }),
    builder.addCase(getProductCategories.pending, (state) => {
      state.statusRequest = STATUS_REQUEST_PRODUCT_CATEGORIES_PENDING
    }),
    builder.addCase(getProductCategories.rejected, (state) => {
      state[STATE_NAME_PRODUCT_CATEGORIES] = {}
      state.statusRequest = STATUS_REQUEST_PRODUCT_CATEGORIES_FAILED
    }),
    // product brands
    builder.addCase(getProductBrands.fulfilled, (state, action) => {
      state[STATE_NAME_PRODUCT_BRANDS] = action.payload[STATE_NAME_PRODUCT_BRANDS] || {}
      state.statusRequest = STATUS_REQUEST_PRODUCT_BRANDS_SUCCESS
    }),
    builder.addCase(getProductBrands.pending, (state) => {
      state.statusRequest = STATUS_REQUEST_PRODUCT_BRANDS_PENDING
    }),
    builder.addCase(getProductBrands.rejected, (state) => {
      state[STATE_NAME_PRODUCT_BRANDS] = {}
      state.statusRequest = STATUS_REQUEST_PRODUCT_BRANDS_FAILED
    }),
    // search product
    builder.addCase(getSearchProduct.fulfilled, (state, action) => {
      state[STATE_NAME_PRODUCT_LIST] = action.payload[STATE_NAME_PRODUCT_LIST] || {},
      state.statusRequest = STATUS_REQUEST_PRODUCT_LIST_SUCCESS
    }),
    builder.addCase(getSearchProduct.pending, (state) => {
      state.statusRequest = STATUS_REQUEST_PRODUCT_LIST_PENDING
    }),
    builder.addCase(getSearchProduct.rejected, (state) => {
      state[STATE_NAME_PRODUCT_LIST] = {}
      state.statusRequest = STATUS_REQUEST_PRODUCT_LIST_FAILED
    })
  }
})

export default productSlice.reducer