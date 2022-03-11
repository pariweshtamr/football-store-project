import React, { useEffect, useState } from 'react'
import { Card, Button, Row, Accordion, Col } from 'react-bootstrap'

import Axios from 'axios'

const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [noOrder, setNoOrder] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await Axios.get(
          'http://localhost:8000/api/v1/order/paid',
          {
            headers: {
              authorization: window.sessionStorage.getItem('accessJWT'),
            },
          },
        )
        console.log(data)
        if ((data.message = 'No orders placed')) {
          setNoOrder(true)
        }
        setOrders(data.paidOrders)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrder()
  }, [])

  const paidOrders = orders.map((order) => {
    console.log(order)
    return (
      <div key={order._id}>
        <Col style={{ marginLeft: '20px', marginBottom: '30px' }}>
          <Card style={{ width: '35rem' }}>
            <Card.Img variant="top" src={order.image} />
            <Card.Body>
              <Card.Title>
                <h4>{`Order Id - ${order._id}`}</h4>
                <p>
                  <span>Total Price - </span>${order.totalAmount}
                </p>
                <p>
                  <span>Total Items - </span>
                  {order.totalQuantity}
                </p>
                <p>
                  <span>Order Status - </span>
                  {'Paid'}
                </p>
                <p>
                  <span>Payment Method - </span>
                  {order.paymentMethod.toUpperCase(0)}
                </p>
                <p>
                  <span>Order Date - </span>
                  {new Date(order.createdAt).toDateString()}
                </p>
              </Card.Title>
              <Accordion defaultActiveKey="0" flush>
                <Card>
                  <Card.Header>
                    <Accordion.Item as={Button} variant="link" eventKey="0">
                      Order Items
                    </Accordion.Item>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {order.cartItems.map((item) => {
                        return (
                          <Card style={{ width: '18rem', marginTop: '20px' }}>
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                              <Card.Title>{item.name}</Card.Title>
                              <Card.Text>Quantity - {item.qty}</Card.Text>
                              <Card.Text>Price - ${item.price}</Card.Text>
                            </Card.Body>
                          </Card>
                        )
                      })}
                    </Row>
                  </Card.Body>
                </Card>
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </div>
    )
  })
  console.log(paidOrders)
  return (
    <>
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Orders Placed</h2>
      {orders.length === 0 ? (
        <>
          {noOrder ? (
            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>
              No Order Found
            </h2>
          ) : (
            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>
              Loading....
            </h2>
          )}
        </>
      ) : (
        <>
          <div
            style={{
              textAlign: 'center',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          ></div>

          <Row
            style={{
              maxWidth: '100%',
              justifyContent: 'space-between',
              marginBottom: '40px',
              marginTop: '40px',
            }}
          >
            {paidOrders}
          </Row>
        </>
      )}
    </>
  )
}

export default OrderHistory
