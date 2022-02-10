import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addProductToCartSuccess: (state, { payload }) => {
      const item = payload
      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x,
          ),
        }
      } else {
        return { ...state, cartItems: [...state.cartItems, item] }
      }
    },

    removeProductFromCartSuccess: (state, { payload }) => {
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== payload),
      }
    },

    addProductToCartFail: (state, { payload }) => {
      state.cartResponse = payload
    },
  },
})

const { reducer, actions } = cartSlice
export const {
  addProductToCartSuccess,
  removeProductFromCartSuccess,
  addProductToCartFail,
} = actions

export default reducer
