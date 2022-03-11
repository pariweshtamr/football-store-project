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

export const SuccessIcon = styled.div`
  color: green;
  text-align: center;
  margin-bottom: 20px;
`

export const SuccessContainer = styled.div`
  height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`
