'use client'

import { getCartList } from '@/store/carts/action'

import { STATE_NAME_CART_LIST, STATUS_REQUEST_CART_LIST_PENDING, STORE_NAME } from '@/utils/constant'
import { cartTableColumns } from '@/utils/table-columns/cart-table-column'

import ListPrimary from './ListPrimary'
import TableRowCollapsible from './Table/TableRowCollapsible'

const CartList = () => {
  return (
    <ListPrimary
      TableRowCustom={TableRowCollapsible}
      tableColumns={cartTableColumns}
      responseKeyName={STORE_NAME.CARTS}
      storeName={STORE_NAME.CARTS}
      listStateName={STATE_NAME_CART_LIST}
      listStatusLoading={STATUS_REQUEST_CART_LIST_PENDING}
      viewDetail
      basePath={'/carts'}
      onFetchList={getCartList}
    />
  )
}

export default CartList