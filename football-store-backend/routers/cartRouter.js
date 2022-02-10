import express from 'express'
const cartRouter = express.Router()

import Product from '../models/Product/Product.schema.js'

cartRouter.get('/:id', (req, res) => {
  const cart = Product.find((x) => x._id === req.params.id)

  if (cart) {
    res.send(cart)
  } else {
    res.status(404).send({ message: 'Product not found' })
  }
})

export default cartRouter
