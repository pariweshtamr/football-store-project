import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
import Checkout from './screens/Checkout/Checkout'
import Order from './screens/Order/Order'
import Payment from './screens/Payment/Payment'
import OrderSuccess from './screens/Order/OrderSuccess'

function App() {
  return (
    <Router>
      <ToastContainer autoClose={2000} />
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
        <Route
          path="/cart/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/cart/checkout/order"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/order/:id"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/order/:id/success"
          element={
            <PrivateRoute>
              <OrderSuccess />
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
