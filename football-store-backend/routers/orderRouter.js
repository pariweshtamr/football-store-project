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

orderRouter.get('/paid', isUser, async (req, res) => {
  const user = req.user._id
  console.log(user)
  try {
    const result = await getOrderByUser(user)
    console.log(result.isPaid)
    if (!result) {
      res.json({
        message: 'No orders placed',
      })
    }

    // converting object to array to use filter function
    const values = Object.values(result)
    console.log(values)
    const paidOrders = values.filter((order) => order.isPaid)

    res.status(200).json({ paidOrders })
  } catch (error) {
    console.log(error)
    res.status(501).json({ message: 'Some error occurred' })
  }
})

export default orderRouter
