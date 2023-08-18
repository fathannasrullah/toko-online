import { createSlice } from '@reduxjs/toolkit'

import {
  STORE_NAME,
  STATE_NAME_CART_DETAIL,
  STATE_NAME_CART_LIST,
  STATUS_REQUEST_BASE_IDDLE,
  STATUS_REQUEST_CART_LIST_SUCCESS,
  STATUS_REQUEST_CART_LIST_PENDING,
  STATUS_REQUEST_CART_LIST_FAILED,
  STATUS_REQUEST_CART_DETAIL_SUCCESS,
  STATUS_REQUEST_CART_DETAIL_PENDING,
  STATUS_REQUEST_CART_DETAIL_FAILED
} from '@/utils/constant'

import { getCartList, getCartDetail } from './action'

const initialState = {
  statusRequest: STATUS_REQUEST_BASE_IDDLE,
  [STATE_NAME_CART_LIST]: {},
  [STATE_NAME_CART_DETAIL]: {}
}

const cartSlice = createSlice({
  name: STORE_NAME.CARTS,
  initialState,
  reducers: {
    getCartList,
    getCartDetail,
  },
  extraReducers: (builder) => {
    // cart list
    builder.addCase(getCartList.fulfilled, (state, action) => {
      const { skip } = action.payload[STATE_NAME_CART_LIST]

      state[STATE_NAME_CART_LIST] = skip === 0
        ? action.payload[STATE_NAME_CART_LIST] || {}
        : {
            ...action.payload[STATE_NAME_CART_LIST],
            carts: [...state[STATE_NAME_CART_LIST].carts, ...action.payload[STATE_NAME_CART_LIST].carts]
          }
      state.statusRequest = STATUS_REQUEST_CART_LIST_SUCCESS
    }),
    builder.addCase(getCartList.pending, (state) => {
      state.statusRequest = STATUS_REQUEST_CART_LIST_PENDING
    }),
    builder.addCase(getCartList.rejected, (state) => {
      state[STATE_NAME_CART_LIST] = {}
      state.statusRequest = STATUS_REQUEST_CART_LIST_FAILED
    }),
    // cart detail
    builder.addCase(getCartDetail.fulfilled, (state, action) => {
      state[STATE_NAME_CART_DETAIL] = action.payload[STATE_NAME_CART_DETAIL]
      state.statusRequest = STATUS_REQUEST_CART_DETAIL_SUCCESS
    }),
    builder.addCase(getCartDetail.pending, (state) => {
      state.statusRequest = STATUS_REQUEST_CART_DETAIL_PENDING
    }),
    builder.addCase(getCartDetail.rejected, (state) => {
      state[STATE_NAME_CART_DETAIL] = {}
      state.statusRequest = STATUS_REQUEST_CART_DETAIL_FAILED
    })
  }
})

export default cartSlice.reducer