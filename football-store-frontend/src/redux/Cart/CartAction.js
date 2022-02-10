import {
  addProductToCartSuccess,
  removeProductFromCartSuccess,
  addProductToCartFail,
} from './CartSlice'
import { addToCartById } from '../../api/cartAPI'

export const addToCart = (_id, qty) => async (dispatch, getState) => {
  const data = await addToCartById(_id, qty)
  console.log(data)
  if (data) {
    dispatch(
      addProductToCartSuccess({
        name: data.name,
        image: data.image,
        price: data.price,
        inStock: data.inStock,
        product: data._id,
        size: data.size,
        qty,
      }),
    )
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    return
  }
  dispatch(addProductToCartFail(data))
}

export const removeFromCart = (_id) => (dispatch, getState) => {
  dispatch(removeProductFromCartSuccess(_id))
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
