import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import cors from 'cors'
import helmet from 'helmet'

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
import paypalRouter from './routers/paypalRouter.js'
// USE ROUTERS
app.use('/api/v1/user', userRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/token', tokenRouter)
app.use('/api/v1/config/paypal', paypalRouter)
// app.use('/api/v1/order', orderRouter)

app.use('/', (req, res) => {
  res.json('Server is ready')
})

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error)
  }
  console.log('Backend server is running')
})
