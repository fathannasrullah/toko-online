import { createAsyncThunk } from '@reduxjs/toolkit'

import { creatorListOrDetailAction } from '@/utils/helpers/creator-action-helper'
import { STATE_NAME_CART_DETAIL, STATE_NAME_CART_LIST } from '@/utils/constant'

import { getCartDetailService, getCartListService } from '@/services/carts'

export const getCartList = createAsyncThunk(
  'carts/list',
  async (listParams, thunkAPI) => {
    return (
      await creatorListOrDetailAction(
        thunkAPI,
        listParams,
        getCartListService,
        STATE_NAME_CART_LIST,
      )
    )
  }
)

export const getCartDetail = createAsyncThunk(
  'carts/detail',
  async (cartID, thunkAPI) => {
    return (
      await creatorListOrDetailAction(
        thunkAPI,
        cartID,
        getCartDetailService,
        STATE_NAME_CART_DETAIL,
      )
    )
  }
)