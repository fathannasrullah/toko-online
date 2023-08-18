import { TOKO_ONLINE_API_URL_PRODUCTS, TOKO_ONLINE_API_URL_PRODUCTS_SEARCH } from '@/utils/constant'
import { creatorListService } from '@/utils/helpers/creator-service-helper'

export const getProductListService = async(listParams) => {
  return (
    await creatorListService(
      TOKO_ONLINE_API_URL_PRODUCTS,
      listParams
    )
  )
}

export const getSearchProductService = async(searchParam) => {
  return (
    await creatorListService(
      TOKO_ONLINE_API_URL_PRODUCTS_SEARCH,
      searchParam
    )
  )
}
