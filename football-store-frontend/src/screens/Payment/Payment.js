import React, { useState } from 'react'
import Axios from 'axios'
import Stripe from '../../components/Stripe/Stripe'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { currentOrderHandler } from '../../redux/Order/OrderSlice'
import { clearCart } from '../../redux/Cart/CartSlice'
import { Col, Row, Card } from 'react-bootstrap'
import {
  OrderItemImage,
  OrderItem,
  OrderItemName,
  OrderItemPrice,
  OrderItemQty,
} from '../Order/OrderStyles'

const Payment = () => {
  const { isLoggedIn } = useSelector((state) => state.user)
  const [paymentStatus, setPaymentStatus] = useState(false)
  const { currentOrder: order } = useSelector((state) => state.order)
  console.log(order)
  const state = useSelector((state) => state.order)
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
            Authorization: window.sessionStorage.getItem('accessJWT'),
          },
        },
      )
      console.log(data)
      dispatch(currentOrderHandler(data))

      navigate(
        `/order/${JSON.parse(localStorage.getItem('order'))?._id}/success`,
      )
    } catch (error) {
      console.log(error.message)
    }

    //RESET CART AFTER PAYMENT
    setPaymentStatus(true)
    dispatch(clearCart())
  }
  console.log(state.currentOrder.cartItems)

  const orderItems = state.currentOrder.cartItems?.map((item) => {
    return (
      <OrderItem key={item._id}>
        <OrderItemImage src={item.image} alt="product img" />

        <OrderItemName>{item.name}</OrderItemName>
        <OrderItemPrice>${item.price}</OrderItemPrice>

        <OrderItemQty>
          x&nbsp;
          {item.productQuantity}
        </OrderItemQty>
      </OrderItem>
    )
  })

  return (
    <>
      {isLoggedIn ? (
        <>
          <Row style={{ maxWidth: '100%', overflowX: 'hidden' }}>
            <h2
              style={{
                textAlign: 'center',
                maxWidth: '100%',
                marginLeft: '40px',
                marginTop: '20px',
              }}
            >{`OrderId - ${order?._id}`}</h2>
          </Row>

          <Row
            style={{
              overflowX: 'hidden',
              maxWidth: '100%',
              marginBottom: '50px',
            }}
          >
            <Col style={{ marginLeft: '20px', zIndex: '0.5' }}>
              <Card style={{ width: '45rem', marginTop: '20px' }}>
                <Card.Body>
                  <Card.Title>
                    <h3>Order Summary</h3>
                  </Card.Title>
                  <div>
                    <Card.Body>
                      <Col>
                        <Card style={{ width: '100%', fontWeight: 'bold' }}>
                          <Card.Body>
                            <Card.Title>Order Items</Card.Title>

                            <div>{orderItems}</div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Card.Body>
                  </div>
                  <div>
                    <p style={{ fontWeight: 'bold' }}>
                      Total Items - {order?.totalQuantity}
                    </p>
                    <p style={{ fontWeight: 'bold' }}>
                      Total Price - ${order?.totalAmount}{' '}
                    </p>
                  </div>
                  {!paymentStatus && (
                    <div>
                      {JSON.parse(localStorage.getItem('order'))
                        .paymentMethod === 'stripe' &&
                      order.isPaid === false ? (
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
                </Card.Body>
              </Card>
            </Col>

            <Col style={{ marginLeft: '20px', maxWidth: '100%' }}>
              <Card style={{ width: '45rem', marginTop: '20px' }}>
                <Card.Body>
                  <Card.Title>Shipping Details</Card.Title>
                  <div>
                    <h6>
                      Address - <span>{order.shippingAddress?.address}</span>
                    </h6>
                    <h6>
                      Country - <span>{order.shippingAddress?.country}</span>
                    </h6>
                    <h6>
                      City - <span>{order.shippingAddress?.city}</span>
                    </h6>
                    <h6>
                      Postal Code -{' '}
                      <span>{order.shippingAddress?.postalCode}</span>
                    </h6>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
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
