import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import cors from 'cors'
import helmet from 'helmet'

import { isUser } from './middlewares/auth.middleware.js'
import Order from './models/Order/Order.schema.js'

const PORT = process.env.POT || 8000

// Connect MongoDB
import mongoClient from './config/db.js'
mongoClient()

//Middlewares
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(helmet())

//IMPORT ROUTERS
import userRouter from './routers/userRouter.js'
import categoryRouter from './routers/categoryRouter.js'
import productRouter from './routers/productRouter.js'
import cartRouter from './routers/cartRouter.js'
import tokenRouter from './routers/tokenRouter.js'
import paymentRouter from './routers/paymentRouter.js'

// USE ROUTERS
app.use('/api/v1/user', userRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/token', tokenRouter)
app.use('/api/v1/payment', paymentRouter)

app.get('/paid', isUser, async (req, res, next) => {
  console.log('paid')
  const id = req.id
  console.log(id)
  try {
    const result = await Order.find({ user: id })
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

app.use('/', (req, res) => {
  res.json('Server is ready')
})

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error)
  }
  console.log('Backend server is running')
})
