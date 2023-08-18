import { TOKO_ONLINE_API_URL_CARTS } from '@/utils/constant'
import { creatorDetailService, creatorListService } from '@/utils/helpers/creator-service-helper'

export const getCartListService = async(listParams) => {
  return (
    await creatorListService(
      TOKO_ONLINE_API_URL_CARTS,
      listParams
    )
  )
}

export const getCartDetailService = async(cartID) => {
  return (
    await creatorDetailService(
      TOKO_ONLINE_API_URL_CARTS,
      cartID
    )
  )
}