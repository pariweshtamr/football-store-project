import styled from 'styled-components'
import { mobile } from '../../responsive'

export const Container = styled.div`
  display: flex;
`
export const LeftSide = styled.div`
  width: 100%;
`
export const PaymentDetailsContainer = styled.div`
  background: linear-gradient(
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  background-size: cover;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem 0;
`
export const PaymentDetailsWrapper = styled.div`
  padding: 20px;
  width: 100%;
  background-color: #f0f0f0;
  opacity: 0.9;
  border-radius: 5px;
  margin: 0 2rem;
  /* margin: 0 auto; */

  ${mobile({ width: '80%', margin: '20px 0' })}
`
export const PaymentDetailsTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: teal;
`
export const PaymentGroup = styled.div`
  margin: 0 0 2rem;
  display: flex;
  flex-direction: column;
`
export const PaymentInput = styled.input`
  flex: 1;
  min-width: 40%;
  width: 100%;
  padding: 10px;
  margin: 0.5rem 0;
`

export const PaymentDetailsForm = styled.form`
  display: flex;
  flex-direction: column;
  ${mobile({ flexDirection: 'column' })}
`
export const PaymentDetailsRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  > :nth-child(1) {
    margin-right: 10px;
  }
`
export const ShippingDetails = styled.label`
  display: flex;
  flex-direction: column;
`
export const ShippingInput = styled.input`
  flex: 1;
  min-width: 40%;
  width: 100%;
  margin: 10px 10px 20px 0;
  padding: 10px;
`
export const PaymentButton = styled.button`
  width: 100%;
  font-weight: bolder;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  padding: 15px;
  background-color: #ffc107e3;
  color: black;
  cursor: pointer;

  ${mobile({ padding: '10px' })}
`

export const RightSide = styled.div`
  width: 100%;
`
