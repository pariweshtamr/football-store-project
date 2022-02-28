import { createSlice } from '@reduxjs/toolkit'

const stateCurrentOrder = JSON.parse(localStorage.getItem('order')) || {}

const initialState = {
  pastOrders: [],
  currentOrder: stateCurrentOrder,
  paymentMethod: JSON.parse(localStorage.getItem('order'))?.paymentMethod || '',
  address: JSON.parse(localStorage.getItem('order'))?.shippingAddress || {},
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    currentOrderHandler(state, { payload }) {
      console.log(payload)
      localStorage.setItem('order', JSON.stringify(payload.order))
      state.currentOrder = payload.order
    },
  },
})

const { reducer, actions } = orderSlice
export const { currentOrderHandler } = actions

export default reducer
