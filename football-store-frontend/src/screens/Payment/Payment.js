import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentDetails from '../../components/PaymentDetails/PaymentDetails'

const stripePromise = loadStripe(
  'pk_test_51KShxEIHP3y9z5gNppWegQ7G9m2uFCuTBGrvX4NpHasrM31ZpC9jgXkG8Qn3OkqNyfhYHzAGwDwmlFTokZyiJ9HT00246flD5j',
)

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentDetails />
    </Elements>
  )
}

export default Payment
