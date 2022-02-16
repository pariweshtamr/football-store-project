import express from 'express'
import { isUser } from '../middlewares/auth.middleware.js'
import Order from '../models/Order/Order.schema.js'

const orderRouter = express.Router()

// create order
cartRouter.post('/', isUser, async (req, res) => {
  const newOrder = new Order(eq.body)

  try {
    const savedOrder = await newOrder.save()
    res.status(200).json(savedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

// get user order
orderRouter.get('find/:id', isUser, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
})

export default cartRouter
