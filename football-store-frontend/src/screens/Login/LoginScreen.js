import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import MessageBox from '../../components/MessageBox/MessageBox'
import { autoLogin, userLogin } from '../../redux/User/UserAction'
import {
  Back,
  ExternalLink,
  RegisterOrHome,
  LoginButton,
  LoginContainer,
  LoginForm,
  LoginInput,
  LoginTitle,
  LoginWrapper,
} from './LoginScreenStyles'

const initialState = {
  username: 'pariwesh7',
  password: '12345678',
}

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { isLoggedIn, isLoading, userLoginResponse } = useSelector(
    (state) => state.user,
  )
  const [loginInfo, setLoginInfo] = useState(initialState)

  const from = location?.state?.from?.pathname || '/'

  useEffect(() => {
    !isLoggedIn && dispatch(autoLogin())

    isLoggedIn && navigate(from)
  }, [isLoggedIn, dispatch, navigate, from])

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setLoginInfo({
      ...loginInfo,
      [name]: value,
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    dispatch(userLogin(loginInfo))
  }

  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginTitle>SIGN IN</LoginTitle>
        <hr />
        {isLoading && <LoadingBox />}
        {userLoginResponse?.message && (
          <MessageBox
            variant={
              userLoginResponse.status === 'success' ? 'success' : 'danger'
            }
          >
            {userLoginResponse.message}
          </MessageBox>
        )}
        <LoginForm onSubmit={handleOnSubmit}>
          <LoginInput
            name="username"
            placeholder="Enter your Username"
            required
            value={loginInfo.username}
            onChange={handleOnChange}
          />
          <LoginInput
            name="password"
            type="password"
            placeholder="Enter your Password"
            required
            value={loginInfo.password}
            onChange={handleOnChange}
          />
          <LoginButton type="submit">LOGIN</LoginButton>
          <RegisterOrHome>
            <ExternalLink>
              <Link to="/">Forgot your password?</Link>
              <Link to="/register">Create a new account</Link>
            </ExternalLink>

            <Back>
              <Link to="/">Home</Link>
            </Back>
          </RegisterOrHome>
        </LoginForm>
      </LoginWrapper>
    </LoginContainer>
  )
}

export default LoginScreen
