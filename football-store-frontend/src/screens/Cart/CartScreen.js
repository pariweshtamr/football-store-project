import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
  CartProductInfoTitle,
  FilterCartQtyOption,
  FilterCartSizeOption,
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
  HrMain,
  TopText,
} from './CartScreenStyles'
import { removeFromCart } from '../../redux/Cart/CartAction'
import MessageBox from '../../components/MessageBox/MessageBox'
import Announcement from '../../components/Announcement/Announcement'
import { Add, Remove } from '@material-ui/icons'
import StripeCheckout from 'react-stripe-checkout'
import Axios from 'axios'

const KEY = process.env.REACT_APP_STRIPE

const CartScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [stripeToken, setStripeToken] = useState(null)

  const cart = useSelector((state) => state.cart)

  const { isLoggedIn } = useSelector((state) => state.user)

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  // const checkoutHandler = () => {
  //   if (!isLoggedIn) {
  //     alert('Please log in to continue')
  //     navigate('/login', { replace: true })
  //   } else {
  //     alert('go to checkout page')
  //   }
  //   return
  // }

  const onToken = (token) => {
    setStripeToken(token)
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await Axios.post(
          'http://localhost:8000/api/v1/checkout/payment',
          {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
          },
        )
        navigate('/paymentSuccess', { data: res.data })
      } catch (error) {}
    }
    stripeToken && cart.total >= 1 && makeRequest()
  }, [stripeToken, cart.total, navigate])

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
            <TopText>Shopping Bag({cart.products.length})</TopText>
          </CartTopTexts>
        </CartTop>

        {cart.products.length === 0 ? (
          <MessageBox>
            Cart is empty. <ShopLink to="/products">Go to Shop</ShopLink>
          </MessageBox>
        ) : (
          <CartBottom>
            <CartProductInfo>
              {cart.products.map((item) => (
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
                          <Remove />
                          <CartProductQty>{item.qty}</CartProductQty>
                          <Add />
                          <CartProductSize>{item.size}</CartProductSize>
                        </CartProductAmountContainer>
                        <CartProductPrice>
                          ${item.price * item.qty}
                        </CartProductPrice>
                      </CartPriceDetail>

                      <CartActionButton>
                        <RemoveButton
                          type="button"
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          REMOVE
                        </RemoveButton>
                      </CartActionButton>
                    </CartProductDetails>
                  </CartProduct>
                  <Hr />
                </div>
              ))}
            </CartProductInfo>

            <CartSummary>
              <CartSummaryTitle>ORDER SUMMARY</CartSummaryTitle>
              <CartSummaryItem>
                <CartSummaryItemText>
                  Subtotal ({cart.products.reduce((a, c) => a + c.qty, 0)}{' '}
                  item(s)) :
                </CartSummaryItemText>
                <CartSummaryItemPrice>${cart.total}</CartSummaryItemPrice>
              </CartSummaryItem>
              <CartSummaryItem>
                <CartSummaryItemText>Shipping: </CartSummaryItemText>
                <CartSummaryItemPrice>$ 14.99</CartSummaryItemPrice>
              </CartSummaryItem>
              <CartSummaryItem>
                <CartSummaryItemText>Discount: </CartSummaryItemText>
                <CartSummaryItemDiscount variant="danger">
                  ${cart.total > 250 ? -14.99 : 0.0}
                </CartSummaryItemDiscount>
              </CartSummaryItem>
              <CartSummaryItem type="total">
                <CartSummaryItemText>Total</CartSummaryItemText>
                <CartSummaryItemPrice>${cart.total}</CartSummaryItemPrice>
              </CartSummaryItem>

              <StripeCheckout
                name="Soccer Boot Store"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <CartSummaryButton>PROCEED TO CHECKOUT</CartSummaryButton>
              </StripeCheckout>
            </CartSummary>
          </CartBottom>
        )}
      </CartWrapper>
    </CartContainer>
  )
}

export default CartScreen
