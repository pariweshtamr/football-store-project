import React from 'react'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <i
          className="fas fa-check-circle fa-8x"
          style={{ color: 'green', textAlign: 'center', marginBottom: '20px' }}
        ></i>
      </div>
      <h2 style={{ textAlign: 'center' }}>
        Order has been Successfully placed! You will recieve your order shortly{' '}
        <i className="fas fa-smile" style={{ color: 'orange' }}></i>
      </h2>
      <h3 style={{ textAlign: 'center' }}>
        You can see your Order{' '}
        <i className="fas fa-shopping-bag" style={{ color: 'blue' }}></i> from
        the Order history in <Link to="/profile"> My Account!</Link>
      </h3>
    </>
  )
}

export default OrderSuccess
