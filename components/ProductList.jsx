'use client'

import dynamic from 'next/dynamic'

import {
  getProductBrands,
  getProductCategories,
  getProductList,
  getSearchProduct
} from '@/store/products/action'

import { productTableColumns } from '@/utils/table-columns/product-table-columns'
import { 
  STORE_NAME, 
  STATE_NAME_PRODUCT_BRANDS,
  STATE_NAME_PRODUCT_CATEGORIES,
  STATE_NAME_PRODUCT_LIST,
  STATUS_REQUEST_PRODUCT_BRANDS_PENDING,
  STATUS_REQUEST_PRODUCT_CATEGORIES_PENDING,
  STATUS_REQUEST_PRODUCT_LIST_PENDING,
} from '@/utils/constant'

const ListPrimary = dynamic(() => import('./ListPrimary'))

const ProductList = () => {
  return (
    <ListPrimary
      showSearchFilter
      tableColumns={productTableColumns}
      responseKeyName={STORE_NAME.PRODUCTS}
      storeName={STORE_NAME.PRODUCTS}
      listStateName={STATE_NAME_PRODUCT_LIST}
      categoriesStateName={STATE_NAME_PRODUCT_CATEGORIES}
      brandsStateName={STATE_NAME_PRODUCT_BRANDS}
      listStatusLoading={STATUS_REQUEST_PRODUCT_LIST_PENDING}
      categoriesStatusLoading={STATUS_REQUEST_PRODUCT_CATEGORIES_PENDING}
      brandsStatusLoading={STATUS_REQUEST_PRODUCT_BRANDS_PENDING}
      onFetchList={getProductList}
      onFetchSearch={getSearchProduct}
      onFetchCategories={getProductCategories}
      onFetchBrands={getProductBrands}
    />
  )
}

export default ProductList