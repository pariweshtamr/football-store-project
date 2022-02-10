import express from 'express'
const productRouter = express.Router()

import { products } from '../data.js'
import Product from '../models/Product/Product.schema.js'

//Get all products or by category
productRouter.get('/', async (req, res) => {
  const qNew = req.query.new
  const qCategory = req.query.category
  try {
    let products
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1)
    } else if (qCategory) {
      products = await Product.find({ category: { $in: [qCategory] } })
    } else {
      products = await Product.find({})
    }

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
})

productRouter.get('/seed', async (req, res) => {
  // await Product.deleteMany(products) //remove all products from db
  const createdProducts = await Product.insertMany(products)
  res.send({ createdProducts })
})

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  console.log(products)
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({ message: 'Product not found' })
  }
})

// productRouter.get('/:category', async (req, res) => {
//   const category = await Product.distinct('category')
//   console.log(category)
//   if (category) {
//     res.send(category)
//   } else {
//     res.status(404).send({ message: 'Category not found' })
//   }
// })

export default productRouter
