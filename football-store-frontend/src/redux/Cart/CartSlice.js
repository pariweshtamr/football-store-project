import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addProductToCart: (state, { payload }) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === payload._id,
      )

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].productQuantity += 1
        toast.info(`Increased ${payload.name} cart quantity!`, {
          position: 'bottom-left',
        })
      } else {
        const productInCart = { ...payload, productQuantity: 1 }
        state.cartItems.push(productInCart)
        toast.success(`${payload.name} has been added to cart!`, {
          position: 'bottom-left',
        })
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    addProductToCartFail: (state, { payload }) => {
      state.cartResponse = payload
    },

    removeProductFromCart: (state, { payload }) => {
      const updateCartItems = state.cartItems.filter(
        (item) => item._id !== payload._id,
      )

      state.cartItems = updateCartItems
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      toast.error(`${payload.name} has been removed to cart!`, {
        position: 'bottom-left',
      })
    },

    decreaseProductQuantity: (state, { payload }) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === payload._id,
      )
      if (state.cartItems[itemIndex].productQuantity > 1) {
        state.cartItems[itemIndex].productQuantity -= 1

        toast.info(`Decreased ${payload.name} cart quantity`, {
          position: 'bottom-left',
        })
      } else if (state.cartItems[itemIndex].productQuantity === 1) {
        const updateCartItems = state.cartItems.filter(
          (item) => item._id !== payload._id,
        )

        state.cartItems = updateCartItems
        toast.error(`${payload.name} has been removed to cart!`, {
          position: 'bottom-left',
        })
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    clearCart: (state) => {
      state.cartItems = []
      toast.error(`Cart cleared!`, {
        position: 'bottom-left',
      })
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    getTotals: (state) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, productQuantity } = cartItem
          const itemTotal = price * productQuantity

          cartTotal.total += itemTotal
          cartTotal.quantity += productQuantity

          return cartTotal
        },
        {
          total: 0,
          quantity: 0,
        },
      )
      state.cartTotalQuantity = quantity
      state.cartTotalAmount = total
    },
  },
})

const { reducer, actions } = cartSlice
export const {
  addProductToCart,
  addProductToCartFail,
  removeProductFromCart,
  decreaseProductQuantity,
  clearCart,
  getTotals,
} = actions

export default reducer
