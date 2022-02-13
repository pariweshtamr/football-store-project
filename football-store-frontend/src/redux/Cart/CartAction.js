import {
  addProductToCart,
  removeProductFromCartSuccess,
  addProductToCartFail,
} from './CartSlice'
import { addToCartById } from '../../api/cartAPI'

export const addToCart = (_id, qty, size) => async (dispatch, getState) => {
  const data = await addToCartById(_id, qty, size)
  if (data) {
    dispatch(
      addProductToCart({
        name: data.name,
        image: data.image,
        price: data.price,
        inStock: data.inStock,
        product: data._id,
        size: data.size,
        qty,
      }),
    )
    localStorage.setItem('products', JSON.stringify(getState().cart.products))
    return
  }
  dispatch(addProductToCartFail(data))
}

export const removeFromCart = (_id) => (dispatch, getState) => {
  //   dispatch(removeProductFromCartSuccess(_id))
  localStorage.setItem('products', JSON.stringify(getState().cart.products))
}
