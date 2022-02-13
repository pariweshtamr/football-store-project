import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addProductToCart: (state, { payload }) => {
      state.quantity += 1
      state.products.push(payload)
      state.total += payload.price * payload.qty
    },
    addProductToCartFail: (state, { payload }) => {
      state.cartResponse = payload
    },
  },
})

const { reducer, actions } = cartSlice
export const { addProductToCart, addProductToCartFail } = actions

export default reducer
