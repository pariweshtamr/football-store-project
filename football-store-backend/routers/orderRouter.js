import express from 'express'
import { isUser } from '../middlewares/auth.middleware.js'
import { getOrderByUser } from '../models/Order/Order.model.js'
import Order from '../models/Order/Order.schema.js'

const orderRouter = express.Router()

// create order
orderRouter.post('/', isUser, async (req, res) => {
  const newOrder = new Order(req.body)

  try {
    const savedOrder = await newOrder.save()
    res.status(200).json(savedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

// get user order

orderRouter.get('/paid', isUser, async (req, res, next) => {
  const user = req.id
  console.log(user)
  try {
    const result = await getOrderByUser(user)
    if (!result) {
      res.json({
        message: 'No orders placed',
      })
    }
    const paidOrders = result.filter((order) => order.isPaid)

    res.status(200).json({ paidOrders })
  } catch (error) {
    console.log(error)
    res.status(501).json({ message: 'Some error occurred' })
  }
})

export default orderRouter
