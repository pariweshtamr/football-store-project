import React from 'react'
import { useLocation } from 'react-router-dom'

const PaymentSuccessScreen = () => {
  const location = useLocation()
  console.log(location)
  return <div>Payment Successful</div>
}

export default PaymentSuccessScreen
