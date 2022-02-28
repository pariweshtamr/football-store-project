import express from 'express'
import Stripe from 'stripe'

const paymentRouter = express.Router()

const stripe = new Stripe(
  'sk_test_51KShxEIHP3y9z5gN3jl9bAn6dhZAFwZVKqjawzAtfGpwdCRRRBGh5lErkFwkS79XsYjZ8zKqq9hLAKQhMp6wi4Fe00i6Uxq9S6',
)

paymentRouter.post('/', async (req, res) => {
  const {
    value: { totalAmount },
  } = req.body
  console.log(totalAmount)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      description: 'Soccer Boot Store.',
      currency: 'AUD',
      amount: parseInt(totalAmount),
    })
    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.log(error, 'paymentrouter error')
  }
})

export default paymentRouter
