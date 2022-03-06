import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import {
  Container,
  LeftSide,
  PaymentButton,
  PaymentDetailsContainer,
  PaymentDetailsForm,
  PaymentDetailsRow,
  PaymentDetailsTitle,
  PaymentDetailsWrapper,
  PaymentGroup,
  PaymentInput,
  RightSide,
} from './PaymentDetailsStyles'
import { CountryDropdown } from 'react-country-region-selector'
import OrderDetails from '../Order/OrderDetails'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/Cart/CartSlice'

const initialAddressState = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  country: '',
  postal_code: '',
}

const PaymentDetails = () => {
  const elements = useElements()
  const stripe = useStripe()
  const dispatch = useDispatch()

  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  })
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  })
  const [recipientName, setRecipientName] = useState('')
  const [nameOnCard, setNameOnCard] = useState('')

  const { totalAmount } = useSelector((state) => state.cart)

  const handleShipping = (e) => {
    const { name, value } = e.target

    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    })
  }

  const handleBilling = (e) => {
    const { name, value } = e.target

    setBillingAddress({
      ...billingAddress,
      [name]: value,
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const cardElement = elements.getElement('card')

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !nameOnCard
    ) {
      return
    }

    Axios.post('http://localhost:8000/api/v1/payment/create', {
      amount: totalAmount * 100,
      shipping: {
        name: recipientName,
        address: {
          ...shippingAddress,
        },
      },
    }).then(({ data: clientSecret }) => {
      stripe
        .createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: nameOnCard,
            address: {
              ...billingAddress,
            },
          },
        })
        .then(({ paymentMethod }) => {
          stripe
            .confirmCardPayment(clientSecret, {
              payment_method: paymentMethod.id,
            })
            .then(({ paymentIntent }) => {
              dispatch(clearCart())
            })
        })
    })
  }

  const configCardElement = {
    iconStyle: 'solid',
    style: {
      base: {
        color: 'teal',
        fontSmoothing: 'antialiased',
        fontSize: '14px',
        '::placeholder': {
          color: 'gray',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },

    hidePostalCode: true,
  }
  return (
    <>
      <Container>
        <LeftSide>
          <PaymentDetailsContainer>
            <PaymentDetailsWrapper>
              <PaymentDetailsForm onSubmit={handleFormSubmit}>
                <PaymentGroup>
                  <PaymentDetailsTitle>SHIPPING ADDRESS</PaymentDetailsTitle>
                  <hr />
                  <PaymentInput
                    required
                    type="text"
                    name="recipientName"
                    placeholder="Recipient Name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                  <PaymentDetailsRow>
                    <PaymentInput
                      required
                      type="text"
                      name="line1"
                      placeholder="Line 1"
                      value={shippingAddress.line1}
                      onChange={(e) => handleShipping(e)}
                    />
                    <PaymentInput
                      type="text"
                      name="line2"
                      placeholder="Line 2"
                      value={shippingAddress.line2}
                      onChange={(e) => handleShipping(e)}
                    />
                  </PaymentDetailsRow>

                  <PaymentDetailsRow>
                    <CountryDropdown
                      valueType="short"
                      required
                      value={shippingAddress.country}
                      onChange={(val) =>
                        handleShipping({
                          target: { name: 'country', value: val },
                        })
                      }
                      style={{
                        width: '49%',
                        padding: '10px',
                        margin: '.5rem 0',
                        marginRight: '10px',
                      }}
                    />
                    <PaymentInput
                      required
                      type="text"
                      name="state"
                      placeholder="State"
                      value={shippingAddress.state}
                      onChange={(e) => handleShipping(e)}
                    />
                  </PaymentDetailsRow>
                  <PaymentDetailsRow>
                    <PaymentInput
                      required
                      type="text"
                      placeholder="City"
                      name="city"
                      value={shippingAddress.city}
                      onChange={(e) => handleShipping(e)}
                    />

                    <PaymentInput
                      required
                      type="text"
                      name="postal_code"
                      placeholder="Postal Code"
                      value={shippingAddress.postal_code}
                      onChange={(e) => handleShipping(e)}
                    />
                  </PaymentDetailsRow>
                </PaymentGroup>

                <PaymentGroup>
                  <PaymentDetailsTitle>BILLING ADDRESS</PaymentDetailsTitle>
                  <hr />
                  <PaymentInput
                    type="text"
                    required
                    placeholder="Name on Card"
                    name="nameOnCard"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                  />
                  <PaymentDetailsRow>
                    <PaymentInput
                      type="text"
                      name="line1"
                      required
                      placeholder="Line 1"
                      value={billingAddress.line1}
                      onChange={(e) => handleBilling(e)}
                    />
                    <PaymentInput
                      type="text"
                      name="line2"
                      placeholder="Line 2"
                      value={billingAddress.line2}
                      onChange={(e) => handleBilling(e)}
                    />
                  </PaymentDetailsRow>
                  <PaymentDetailsRow>
                    <CountryDropdown
                      valueType="short"
                      required
                      value={billingAddress.country}
                      onChange={(val) =>
                        handleBilling({
                          target: { name: 'country', value: val },
                        })
                      }
                      style={{
                        width: '49%',
                        padding: '10px',
                        margin: '.5rem 0',
                        marginRight: '10px',
                      }}
                    />
                    <PaymentInput
                      type="text"
                      required
                      placeholder="State"
                      name="state"
                      value={billingAddress.state}
                      onChange={(e) => handleBilling(e)}
                    />
                  </PaymentDetailsRow>
                  <PaymentDetailsRow>
                    <PaymentInput
                      type="text"
                      required
                      placeholder="City"
                      name="city"
                      value={billingAddress.city}
                      onChange={(e) => handleBilling(e)}
                    />

                    <PaymentInput
                      type="text"
                      required
                      name="postal_code"
                      placeholder="Postal Code"
                      value={billingAddress.postal_code}
                      onChange={(e) => handleBilling(e)}
                    />
                  </PaymentDetailsRow>
                </PaymentGroup>

                <PaymentGroup>
                  <PaymentDetailsTitle>CARD DETAILS</PaymentDetailsTitle>
                  <hr />
                  <CardElement options={configCardElement} />

                  <PaymentButton type="submit">PAY NOW</PaymentButton>
                </PaymentGroup>
              </PaymentDetailsForm>
            </PaymentDetailsWrapper>
          </PaymentDetailsContainer>
        </LeftSide>

        <RightSide>
          <OrderDetails />
        </RightSide>
      </Container>
    </>
  )
}

export default PaymentDetails
