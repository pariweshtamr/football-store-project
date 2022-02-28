import { Col, Row, Card, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { currentOrderHandler } from '../../redux/Order/OrderSlice'

const Order = () => {
  const { isLoggedIn } = useSelector((state) => state.user)
  const state = useSelector((state) => state.order)
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [payment, setPayment] = useState('')

  const { address, city, postalCode, country } = JSON.parse(
    localStorage.getItem('shippingAddress'),
  )

  const placeOrderHandler = () => {
    console.log(payment)
    setLoading(true)

    const sendCartData = async () => {
      try {
        const { data } = await Axios.post(
          'http://localhost:8000/api/v1/cart',
          {
            ...cart,
            shippingAddress: {
              ...JSON.parse(localStorage.getItem('shippingAddress')),
            },
            paymentMethod: payment,
          },
          {
            headers: {
              authorization: window.sessionStorage.getItem('accessJWT'),
            },
          },
        )

        console.log(data)
        dispatch(currentOrderHandler(data))
        setLoading(false)
        navigate(`/order/${JSON.parse(localStorage.getItem('order'))._id}`)
      } catch (error) {
        console.log(error.message)
      }
    }

    if (payment) {
      sendCartData()
    }
  }

  console.log(JSON.parse(localStorage.getItem(state)))
  const orderItems = JSON.parse(localStorage.getItem('state'))?.cartItems.map(
    (item) => {
      return (
        <div
          key={item._id}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingBottom: '20px',
          }}
        >
          <div>
            <img
              style={{ width: '30%', height: '100%' }}
              src={item.image}
              alt="product img"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            <div>{item.name}</div>
            <div style={{ marginLeft: '60px' }}>${item.price}</div>
          </div>
          <div>
            <div style={{ marginLeft: '60px' }}>{item.qty}</div>
          </div>
        </div>
      )
    },
  )

  return loading ? (
    <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Loading......</h2>
  ) : (
    <>
      {isLoggedIn ? (
        <>
          {state ? (
            <>
              <Row style={{ overflowX: 'hidden', maxWidth: '100%' }}>
                <Col style={{ marginLeft: '20px', maxWidth: '100%' }}>
                  <Card style={{ width: '45rem', marginTop: '20px' }}>
                    <Card.Body>
                      <Card.Title>Shipping Details</Card.Title>
                      <div>
                        <h6>
                          Address - <span>{address}</span>
                        </h6>
                        <h6>
                          Country - <span>{country}</span>
                        </h6>
                        <h6>
                          City - <span>{city}</span>
                        </h6>
                        <h6>
                          Postal Code - <span>{postalCode}</span>
                        </h6>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col style={{ marginLeft: '20px' }}>
                  <Card style={{ width: '45rem', marginTop: '20px' }}>
                    <Card.Body>
                      <Card.Title>
                        <h3>Order Summary</h3>
                      </Card.Title>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>
                          Total Items :{' '}
                          {
                            JSON.parse(localStorage.getItem('state'))
                              .totalQuantity
                          }
                        </div>
                        <div style={{ fontWeight: 'bold' }}>
                          Total Price - $
                          {
                            JSON.parse(localStorage.getItem('state'))
                              .totalAmount
                          }
                        </div>
                      </div>
                      <div
                        className="form-check"
                        style={{ marginBottom: '15px' }}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          value="stripe"
                          onChange={(e) => setPayment(e.target.value)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Stripe{' '}
                          <i
                            className="fab fa-cc-stripe "
                            style={{ color: 'blue' }}
                          ></i>
                        </label>
                      </div>

                      <Button
                        variant="primary"
                        type="submit"
                        style={{ marginRight: '20px', marginTop: '20px' }}
                        onClick={placeOrderHandler}
                      >
                        Select Payment Method
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col style={{ marginLeft: '20px' }}>
                  <Card
                    style={{
                      width: '45rem',
                      marginTop: '20px',
                      fontWeight: 'bold',
                    }}
                  >
                    <Card.Body>
                      <Card.Title>Order Items</Card.Title>

                      <div>{orderItems}</div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          ) : (
            <div>Loading</div>
          )}
        </>
      ) : (
        <h3 style={{ textAlign: 'center', marginTop: '40px' }}>
          Please Sign In to Place Order!
        </h3>
      )}
    </>
  )
}

export default Order
