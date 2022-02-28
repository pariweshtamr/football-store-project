import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from '@stripe/react-stripe-js'
import Axios from 'axios'
import { Wrapper } from './StripeStyles'

const promise = loadStripe(
  'pk_test_51KShxEIHP3y9z5gNppWegQ7G9m2uFCuTBGrvX4NpHasrM31ZpC9jgXkG8Qn3OkqNyfhYHzAGwDwmlFTokZyiJ9HT00246flD5j',
)

const CheckoutForm = ({ data: value, paymentSuccess }) => {
  const [processing, setProcessing] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  console.log(value)
  const createPaymentIntent = async () => {
    try {
      const { data } = await Axios.post(
        'http://localhost:8000/api/v1/payment',
        {
          value,
        },
      )
      console.log(data)
      setClientSecret(data.clientSecret)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    createPaymentIntent()
  }, [])

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    console.log('clicked')
    console.log(clientSecret)

    try {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })

      console.log(payload)

      if (payload.error) {
        console.log('failed')
        setProcessing(false)
        console.log(payload.error)
      } else {
        console.log('success')
        setProcessing(false)
        paymentSuccess()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <p>
          Test Card Number - 4242 4242 4242 4242
          <span style={{ margin: '50px' }}> MM/YY - 11/33</span>
        </p>
        <p>
          CVC - 111<span style={{ margin: '50px' }}> ZIP - 11111</span>
        </p>

        <form id="payment-form" onSubmit={handleOnSubmit}>
          <CardElement option={cardStyle} id="card-element" />
          <button id="submit" style={{ marginTop: '40px' }} disabled={!stripe}>
            Pay ${value.totalAmount}
          </button>
          {processing && <h5>Processing.....</h5>}
        </form>
      </div>
    </>
  )
}

const Stripe = ({ data, paymentSuccess }) => {
  return (
    <>
      <Wrapper>
        <Elements stripe={promise}>
          <CheckoutForm data={data} paymentSuccess={paymentSuccess} />
        </Elements>
      </Wrapper>
    </>
  )
}

export default Stripe
