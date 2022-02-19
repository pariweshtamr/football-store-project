import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  CartBottom,
  ShopLink,
  CartContainer,
  CartPriceDetail,
  CartProduct,
  CartProductAmountContainer,
  CartProductDescription,
  CartProductDetails,
  CartProductImage,
  CartProductInfo,
  CartProductName,
  CartProductPrice,
  CartProductQty,
  CartProductSize,
  CartSummary,
  CartSummaryButton,
  CartSummaryItem,
  CartSummaryItemPrice,
  CartSummaryItemDiscount,
  CartSummaryItemText,
  CartSummaryTitle,
  CartTitle,
  CartTop,
  CartTopButton,
  CartTopTexts,
  CartWrapper,
  RemoveButton,
  CartActionButton,
  ProductLink,
  Hr,
  ClearCartButton,
  HrMain,
  TopText,
} from './CartScreenStyles'
import MessageBox from '../../components/MessageBox/MessageBox'
import Announcement from '../../components/Announcement/Announcement'
import { Add, Remove } from '@material-ui/icons'
import {
  addProductToCart,
  clearCart,
  decreaseProductQuantity,
  getTotals,
  removeProductFromCart,
} from '../../redux/Cart/CartSlice'

const CartScreen = () => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(getTotals())
  }, [cart, dispatch])

  const removeFromCartHandler = (item) => {
    dispatch(removeProductFromCart(item))
  }

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseProductQuantity(item))
  }
  const handleIncreaseQuantity = (item) => {
    dispatch(addProductToCart(item))
  }
  const clearCartHandler = () => {
    dispatch(clearCart())
  }

  let shipping = 15
  let discount = 15

  return (
    <CartContainer>
      <HrMain>
        <hr />
      </HrMain>
      <Announcement />
      <CartWrapper>
        <CartTitle>Your Cart</CartTitle>
        <CartTop>
          <Link to="/products">
            <CartTopButton>CONTINUE SHOPPING</CartTopButton>
          </Link>
          <CartTopTexts>
            <TopText>Shopping Bag({cart.cartItems.length})</TopText>
          </CartTopTexts>
        </CartTop>

        {cart.cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <ShopLink to="/products">Go to Shop</ShopLink>
          </MessageBox>
        ) : (
          <CartBottom>
            <CartProductInfo>
              {cart.cartItems.map((item) => (
                <div key={item._id}>
                  <CartProduct>
                    <CartProductDetails>
                      <CartProductImage src={item.image} alt={item.name} />

                      <CartProductDescription>
                        <CartProductName>
                          <b>Product:</b>{' '}
                          <ProductLink to={`/product/${item._id}`}>
                            {item.name}
                          </ProductLink>
                        </CartProductName>
                      </CartProductDescription>

                      <CartPriceDetail>
                        <CartProductAmountContainer>
                          <Remove
                            onClick={() => handleDecreaseQuantity(item)}
                          />
                          <CartProductQty>
                            {item.productQuantity}
                          </CartProductQty>
                          <Add onClick={() => handleIncreaseQuantity(item)} />
                          {/* <CartProductSize>{item.size}</CartProductSize> */}
                        </CartProductAmountContainer>
                        <CartProductPrice>
                          ${item.price * item.productQuantity}
                        </CartProductPrice>
                      </CartPriceDetail>

                      <CartActionButton>
                        <RemoveButton
                          type="button"
                          onClick={() => removeFromCartHandler(item)}
                        >
                          REMOVE
                        </RemoveButton>
                      </CartActionButton>
                    </CartProductDetails>
                  </CartProduct>
                  <Hr />
                </div>
              ))}
              <ClearCartButton type="button" onClick={() => clearCartHandler()}>
                CLEAR CART
              </ClearCartButton>
            </CartProductInfo>

            <CartSummary>
              <CartSummaryTitle>ORDER SUMMARY</CartSummaryTitle>
              <CartSummaryItem>
                <CartSummaryItemText>
                  Subtotal ({cart.cartTotalQuantity}
                  item(s)) :
                </CartSummaryItemText>
                <CartSummaryItemPrice>
                  ${cart.cartTotalAmount}
                </CartSummaryItemPrice>
              </CartSummaryItem>
              <CartSummaryItem>
                <CartSummaryItemText>Shipping: </CartSummaryItemText>
                <CartSummaryItemPrice>${shipping}</CartSummaryItemPrice>
              </CartSummaryItem>
              <CartSummaryItem>
                <CartSummaryItemText>Discount: </CartSummaryItemText>
                <CartSummaryItemDiscount variant="danger">
                  ${cart.cartTotalAmount > 250 ? `(${discount})` : 0}
                </CartSummaryItemDiscount>
              </CartSummaryItem>
              <CartSummaryItem type="total">
                <CartSummaryItemText>Total</CartSummaryItemText>
                <CartSummaryItemPrice>
                  $
                  {cart.cartTotalAmount +
                    shipping -
                    `${cart.cartTotalAmount > 250 ? `${discount}` : 0}`}
                </CartSummaryItemPrice>
              </CartSummaryItem>

              <CartSummaryButton>PROCEED TO CHECKOUT</CartSummaryButton>
            </CartSummary>
          </CartBottom>
        )}
      </CartWrapper>
    </CartContainer>
  )
}

export default CartScreen
