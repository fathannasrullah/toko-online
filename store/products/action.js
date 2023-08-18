import { createAsyncThunk } from '@reduxjs/toolkit'

import { STATE_NAME_PRODUCT_BRANDS, STATE_NAME_PRODUCT_CATEGORIES, STATE_NAME_PRODUCT_LIST } from '@/utils/constant'
import { creatorListOrDetailAction } from '@/utils/helpers/creator-action-helper'

import { getProductListService, getSearchProductService } from '@/services/products'
import { cache } from 'react'

export const getProductList = createAsyncThunk(
  'products/list',
  async (listParams, thunkAPI) => {
    return (
      await creatorListOrDetailAction(
        thunkAPI,
        listParams,
        getProductListService,
        STATE_NAME_PRODUCT_LIST,
      )
    )
  }
)

export const getProductListTest = cache(async () => getProductList)

export const getProductCategories = createAsyncThunk(
  'products/categories',
  async (listParam, thunkAPI) => {
    return (
      await creatorListOrDetailAction(
        thunkAPI,
        listParam,
        getProductListService,
        STATE_NAME_PRODUCT_CATEGORIES
      )
    )
  }
)

export const getProductBrands = createAsyncThunk(
  'products/brands',
  async (listParam, thunkAPI) => {
    return (
      await creatorListOrDetailAction(
        thunkAPI,
        listParam,
        getProductListService,
        STATE_NAME_PRODUCT_BRANDS
      )
    )
  }
)

export const getSearchProduct = createAsyncThunk(
  'products/search',
  async (searchParam, thunkAPI) => {
    return (
      await creatorListOrDetailAction(
        thunkAPI,
        searchParam,
        getSearchProductService,
        STATE_NAME_PRODUCT_LIST,
      )
    )
  }
)