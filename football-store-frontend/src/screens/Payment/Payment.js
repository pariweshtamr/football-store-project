import React, { useState } from 'react'
import Axios from 'axios'
import Stripe from '../../components/Stripe/Stripe'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { currentOrderHandler } from '../../redux/Order/OrderSlice'
import { clearCart } from '../../redux/Cart/CartSlice'
import { Container, Details, Hr, Title } from '../../GlobalStyles'
import {
  OrderId,
  PaymentItem,
  PaymentItemImage,
  PaymentItemName,
  PaymentItemPrice,
  PaymentItemQty,
} from './PaymentStyles'

const Payment = () => {
  const { isLoggedIn } = useSelector((state) => state.user)
  const [paymentStatus, setPaymentStatus] = useState(false)
  const { currentOrder: order } = useSelector((state) => state.order)
  console.log(order)
  const orders = useSelector((state) => state.order)
  console.log(orders)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const paymentSuccess = async () => {
    try {
      const { data } = await Axios.post(
        'http://localhost:8000/api/v1/cart/orderstatus',
        {
          isPaid: true,
          orderId: JSON.parse(localStorage.getItem('order'))?._id,
        },
        {
          headers: {
            authorization: window.sessionStorage.getItem('accessJWT'),
          },
        },
      )
      console.log(data)
      dispatch(currentOrderHandler(data))

      navigate(
        `/order/${JSON.parse(localStorage.getItem('order'))?._id}/success`,
        { state: { data } },
      )

      window.scrollTo(0, 0)
    } catch (error) {
      console.log(error.message)
    }

    //RESET CART AFTER PAYMENT
    setPaymentStatus(true)
    dispatch(clearCart())
  }
  console.log(orders.currentOrder.cartItems)

  const orderItems = orders.currentOrder.cartItems?.map((item) => {
    return (
      <PaymentItem key={item._id}>
        <PaymentItemImage src={item.image} alt="product img" />

        <PaymentItemName>{item.name}</PaymentItemName>
        <PaymentItemPrice>${item.price}</PaymentItemPrice>

        <PaymentItemQty>
          x&nbsp;
          {item.productQuantity}
        </PaymentItemQty>
      </PaymentItem>
    )
  })

  return (
    <>
      <Hr>
        <hr />
      </Hr>
      <OrderId>{`Order ID : ${order?._id}`}</OrderId>
      {isLoggedIn ? (
        <>
          <Container>
            <Title>Order Summary</Title>

            <Container style={{ width: '91%' }}>
              <Title>Order Items</Title>
              <Details>
                <div>{orderItems}</div>
              </Details>
            </Container>

            <Details>
              <div style={{ textAlign: 'center' }}>
                <p>Total Items - {order?.totalQuantity}</p>
                <p>Total Price - ${order?.totalAmount} </p>
              </div>
            </Details>
            {!paymentStatus && (
              <div>
                {JSON.parse(localStorage.getItem('order')).paymentMethod ===
                  'stripe' && order.isPaid === false ? (
                  <Stripe
                    payment={() => setPaymentStatus(true)}
                    data={JSON.parse(localStorage.getItem('order'))}
                    paymentSuccess={paymentSuccess}
                  />
                ) : (
                  ''
                )}
              </div>
            )}
            {JSON.parse(localStorage.getItem('order')).isPaid && (
              <h3>Order - Paid</h3>
            )}
          </Container>
        </>
      ) : (
        <h3 style={{ textAlign: 'center', marginTop: '40px' }}>
          Please Sign In to Place Order!
        </h3>
      )}
    </>
  )
}

export default Payment
