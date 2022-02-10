import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user)
  return isLoggedIn === true ? children : <Navigate to="/login" />
}
export default PrivateRoute
