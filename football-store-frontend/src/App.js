import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/Home/HomeScreen'

import './App.css'
import RegisterScreen from './screens/Register/RegisterScreen'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import EmailVerificationScreen from './screens/Email/EmailVerificationScreen'
import LoginScreen from './screens/Login/LoginScreen'
import ProductListScreen from './screens/Product/ProductListScreen'
import ProductScreen from './screens/Product/ProductScreen'
import CartScreen from './screens/Cart/CartScreen'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import UserProfileScreen from './screens/UserProfile/UserProfileScreen'
import ResetPasswordScreen from './screens/ResetPassword/ResetPasswordScreen'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/cart" element={<CartScreen />}></Route>
        <Route path="/cart/:id" element={<CartScreen />}></Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfileScreen />
            </PrivateRoute>
          }
        ></Route>

        <Route path="/reset-password" element={<ResetPasswordScreen />}></Route>
        <Route path="/login" element={<LoginScreen />}></Route>
        <Route path="/register" exact element={<RegisterScreen />}></Route>
        <Route
          path="/email-verification"
          exact
          element={<EmailVerificationScreen />}
        ></Route>
        <Route path="/product/:id" element={<ProductScreen />}></Route>
        <Route
          path="/products/:category"
          element={<ProductListScreen />}
        ></Route>
        <Route path="/products" element={<ProductListScreen />}></Route>
        <Route path="/" exact element={<HomeScreen />}></Route>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
