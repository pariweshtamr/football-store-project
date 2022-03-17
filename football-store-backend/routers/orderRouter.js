import express from 'express'
import { isUser } from '../middlewares/auth.middleware.js'
import { getOrderByUser } from '../models/Order/Order.model.js'
import Order from '../models/Order/Order.schema.js'

const orderRouter = express.Router()

// create order

orderRouter.post('/', isUser, async (req, res) => {
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

orderRouter.get('/', isUser, async (req, res) => {
  res.status(200)
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

orderRouter.post('/orderstatus', async (req, res) => {
  const { orderId: id, isPaid } = req.body
  console.log(req.body, 'orderRouter')
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

export default orderRouter
