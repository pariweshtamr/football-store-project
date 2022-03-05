import Order from './Order.schema.js'

export const getOrderByUser = (user) => {
  return Order.findOne({ user })
}
