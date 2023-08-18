import { configureStore } from '@reduxjs/toolkit'

import productReducer from './products/slice'
import cartReducer from './carts/slice'

const store = configureStore({
  reducer: {
    products: productReducer,
    carts: cartReducer
  },
})

export default store