import React, { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
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
  TopText,
} from './CartScreenStyles'
import { addToCart, removeFromCart } from '../../redux/Cart/CartAction'
import MessageBox from '../../components/MessageBox/MessageBox'

const CartScreen = () => {
  const { id } = useParams()
  const location = useLocation()
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const { cartItems } = useSelector((state) => state.cart)
  console.log(id, cartItems)

  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  // const checkoutHandler = () => {
  //   navigate('/shipping')
  // }

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  return (
    <CartContainer>
      <CartWrapper>
        <CartTitle>Your Cart</CartTitle>
        <CartTop>
          <Link to="/product">
            <CartTopButton>CONTINUE SHOPPING</CartTopButton>
          </Link>
          <CartTopTexts>
            <TopText>Shopping Bag({cartItems.length})</TopText>
          </CartTopTexts>
        </CartTop>

        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <ShopLink to="/product">Go to Shop</ShopLink>
          </MessageBox>
        ) : (
          <CartBottom>
            <CartProductInfo>
              {cartItems.map((item) => (
                <div key={item.product}>
                  <CartProduct>
                    <CartProductDetails>
                      <CartProductImage src={item.image} alt={item.name} />

                      <CartProductDescription>
                        <CartProductName>
                          <b>Product:</b>{' '}
                          <ProductLink to={`/product/${item.product}`}>
                            {item.name}
                          </ProductLink>
                        </CartProductName>
                      </CartProductDescription>

                      <CartPriceDetail>
                        <CartProductAmountContainer>
                          <CartProductQty
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value)),
                              )
                            }
                          >
                            {[...Array(item.inStock).keys()].map((x) => (
                              <option value={x + 1}>{x + 1}</option>
                            ))}
                          </CartProductQty>
                        </CartProductAmountContainer>
                        <CartProductPrice>${item.price}</CartProductPrice>
                      </CartPriceDetail>

                      <CartActionButton>
                        <RemoveButton
                          type="button"
                          onClick={() => removeFromCartHandler(item.product)}
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
                  Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} item(s))
                  :{' '}
                </CartSummaryItemText>
                <CartSummaryItemPrice>
                  ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </CartSummaryItemPrice>
              </CartSummaryItem>
              <CartSummaryItem>
                <CartSummaryItemText>Shipping: </CartSummaryItemText>
                <CartSummaryItemPrice>$4.99</CartSummaryItemPrice>
              </CartSummaryItem>
              <CartSummaryItem>
                <CartSummaryItemText>Discount: </CartSummaryItemText>
                <CartSummaryItemDiscount variant="danger">
                  $
                  {cartItems.reduce((a, c) => a + c.price * c.qty, 0) > 250
                    ? 4.99
                    : 0.0}
                </CartSummaryItemDiscount>
              </CartSummaryItem>
              <CartSummaryItem type="total">
                <CartSummaryItemText>Total</CartSummaryItemText>
                <CartSummaryItemPrice>$$$</CartSummaryItemPrice>
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
