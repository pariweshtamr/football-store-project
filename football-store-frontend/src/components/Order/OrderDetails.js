import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  OrderDetailsContainer,
  OrderItem,
  OrderItemImage,
  OrderItemName,
  OrderItemPrice,
  OrderItemQty,
} from './OrderDetailsStyles'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import { Container, Details, Title } from '../../GlobalStyles'

const OrderDetails = () => {
  const orderState = useSelector((state) => state.order)

  const { isLoggedIn } = useSelector((state) => state.user)

  const [loading, setLoading] = useState(false)

  const orderItems = JSON.parse(
    localStorage.getItem('cartState'),
  )?.cartItems.map((item) => {
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

  return loading ? (
    <LoadingBox />
  ) : (
    <>
      {isLoggedIn ? (
        <>
          {orderState ? (
            <>
              <OrderDetailsContainer>
                <Container>
                  <Title>Order Summary</Title>

                  <Details>
                    <div>
                      Total Items :{' '}
                      <span>
                        {
                          JSON.parse(localStorage.getItem('cartState'))
                            .totalQuantity
                        }
                      </span>
                    </div>
                    <div>
                      Total Price - $
                      <span>
                        {
                          JSON.parse(localStorage.getItem('cartState'))
                            .totalAmount
                        }
                      </span>
                    </div>
                  </Details>
                </Container>

                <Container>
                  <Title>Order Items</Title>
                  <Details>
                    <div>{orderItems}</div>
                  </Details>
                </Container>
              </OrderDetailsContainer>
            </>
          ) : (
            <LoadingBox />
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

export default OrderDetails
