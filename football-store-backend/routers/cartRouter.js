import express from 'express'
import { isUser } from '../middlewares/auth.middleware.js'
import Order from '../models/Order/Order.schema.js'
const cartRouter = express.Router()

cartRouter.post('/', isUser, async (req, res) => {
  const {
    cartItems,
    totalAmount,
    totalQuantity,
    shippingAddress,
    paymentMethod,
  } = req.body

  const id = req.user
  console.log(id)

  try {
    const order = new Order({
      user: req.user._id,
      shippingAddress,
      cartItems,
      totalAmount,
      totalQuantity,
      paymentMethod,
    })

    const orderCreated = await order.save()
    res.status(200).json({ order: orderCreated })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
})

cartRouter.get('/', isUser, async (req, res) => {
  res.status(200)
})

cartRouter.post('/orderstatus', isUser, async (req, res) => {
  const { orderId: id, isPaid } = req.body
  console.log(req.body)
  try {
    const orderUpdated = await Order.findByIdAndUpdate(
      id,
      { isPaid },
      { new: true },
    )
    res.status(200).json({ order: orderUpdated })
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: error })
  }
})

export default cartRouter
