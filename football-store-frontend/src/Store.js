import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/User/UserSlice'
import categoryReducer from './redux/Category/CategorySlice'
import productReducer from './redux/Product/ProductSlice'
import cartReducer from './redux/Cart/CartSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
  },
})

export default store
