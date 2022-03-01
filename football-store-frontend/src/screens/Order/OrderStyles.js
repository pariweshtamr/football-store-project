import styled from 'styled-components'
import { mobile } from '../../responsive'

export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`
export const OrderItemImage = styled.img`
  width: 25%;
`

export const OrderItemDetails = styled.div`
  display: flex;
`
export const OrderItemName = styled.div``
export const OrderItemPrice = styled.div``
export const OrderItemQty = styled.div``

export const Container = styled.div`
  border: 1px solid teal;
  width: 60%;
  padding: 10px 20px;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 5px 10px 20px grey;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  text-decoration: underline;
`
export const Details = styled.div`
  span {
    font-weight: 400;
  }

  > div {
    font-weight: 500;
  }
`

export const OrderButton = styled.button`
  width: 30%;
  margin: 20px 0;
  border: none;
  border-radius: 5px;
  padding: 10px;
  background-color: #ffc107e3;
  color: black;
  cursor: pointer;

  ${mobile({ padding: '10px' })}
`

export const PaymentMethod = styled.div`
  margin-top: 1rem;
`
export const MethodStripe = styled.div`
  display: flex;
  align-items: center;
`
export const MethodPaypal = styled.div`
  display: flex;
  align-items: center;
`
export const PaymentInput = styled.input`
  margin-right: 0.5rem;
`
export const PaymentLabel = styled.label`
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
`
