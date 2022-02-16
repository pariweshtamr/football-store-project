import express from 'express'
import { isUser } from '../middlewares/auth.middleware.js'
import Cart from '../models/Cart/Cart.schema.js'

const cartRouter = express.Router()

import Product from '../models/Product/Product.schema.js'

// cartRouter.get('/:id', (req, res) => {
//   const cart = Product.find((x) => x._id === req.params.id)

//   if (cart) {
//     res.send(cart)
//   } else {
//     res.status(404).send({ message: 'Product not found' })
//   }
// })

// create cart
cartRouter.post('/', isUser, async (req, res) => {
  const newCart = new Cart(eq.body)

  try {
    const savedCart = await newCart.save()
    res.status(200).json(savedProduct)
  } catch (error) {
    res.status(500).json(error)
  }
})

// update cart
cartRouter.put('/:id', isUser, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    )
    res.status(200).json(updateCart)
  } catch (error) {
    res.status(500).json(error)
  }
})

//delete
cartRouter.put('/:id', isUser, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json('Cart has been deleted...')
  } catch (error) {
    res.status(500).json(error)
  }
})

// get user cart
cartRouter.get('find/:id', isUser, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json(error)
  }
})

// get all

export default cartRouter
