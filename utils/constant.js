//** API Url */
export const TOKO_ONLINE_API_URL = 'https://dummyjson.com'
export const TOKO_ONLINE_API_URL_PRODUCTS = `${TOKO_ONLINE_API_URL}/products`
export const TOKO_ONLINE_API_URL_PRODUCTS_SEARCH = `${TOKO_ONLINE_API_URL_PRODUCTS}/search`
export const TOKO_ONLINE_API_URL_CARTS = `${TOKO_ONLINE_API_URL}/carts`

//** Store Name and Global State name */
export const STORE_NAME = {
  PRODUCTS: 'products',
  CARTS: 'carts',
}

export const STATE_NAME_PRODUCT_LIST = 'productListData'
export const STATE_NAME_PRODUCT_CATEGORIES = 'productCategoriesData'
export const STATE_NAME_PRODUCT_BRANDS = 'productBrandsData'
export const STATE_NAME_PRODUCT_DETAIL = 'productDetailData'
export const STATE_NAME_CART_LIST = 'cartListData'
export const STATE_NAME_CART_DETAIL = 'cartDetailData'

//** Status Request */
export const STATUS_REQUEST_BASE_IDDLE = 'iddle'
export const STATUS_REQUEST_BASE_PENDING = 'pending'
export const STATUS_REQUEST_BASE_SUCCESS = 'success'
export const STATUS_REQUEST_BASE_FAILED = 'failed'

export const STATUS_REQUEST_PRODUCT_LIST_SUCCESS = 'product-list-success'
export const STATUS_REQUEST_PRODUCT_LIST_FAILED = 'product-list-failed'
export const STATUS_REQUEST_PRODUCT_LIST_PENDING = 'product-list-loading'

export const STATUS_REQUEST_PRODUCT_CATEGORIES_SUCCESS = 'product-categories-success'
export const STATUS_REQUEST_PRODUCT_CATEGORIES_FAILED = 'product-categories-failed'
export const STATUS_REQUEST_PRODUCT_CATEGORIES_PENDING = 'product-categories-loading'

export const STATUS_REQUEST_PRODUCT_BRANDS_SUCCESS = 'product-brands-success'
export const STATUS_REQUEST_PRODUCT_BRANDS_FAILED = 'product-brands-failed'
export const STATUS_REQUEST_PRODUCT_BRANDS_PENDING = 'product-brands-loading'

export const STATUS_REQUEST_CART_LIST_SUCCESS = 'cart-list-success'
export const STATUS_REQUEST_CART_LIST_FAILED = 'cart-list-failed'
export const STATUS_REQUEST_CART_LIST_PENDING = 'cart-list-loading'

export const STATUS_REQUEST_CART_DETAIL_SUCCESS = 'cart-detail-success'
export const STATUS_REQUEST_CART_DETAIL_FAILED = 'cart-detail-failed'
export const STATUS_REQUEST_CART_DETAIL_PENDING = 'cart-detail-loading'