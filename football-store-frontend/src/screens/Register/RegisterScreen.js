import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import MessageBox from '../../components/MessageBox/MessageBox'
import { userRegister } from '../../redux/User/UserAction'
import {
  LoginLink,
  LoginOption,
  RegisterButton,
  RegisterContainer,
  RegisterForm,
  RegisterInput,
  RegisterTitle,
  RegisterWrapper,
} from './RegisterScreenStyles'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
}

const RegisterScreen = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(initialState)
  const [passwordError, setPasswordError] = useState('')

  const { isLoading, userRegisterResponse } = useSelector((state) => state.user)

  const handleOnSubmit = (e) => {
    e.preventDefault()

    // check for password confirmation
    const { password, confirmPassword } = user

    if (password !== confirmPassword) {
      setPasswordError('Password does not match')
      return
    }
    dispatch(userRegister(user))
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target

    // reset error message
    passwordError && name === 'confirmPassword' && setPasswordError('')

    setUser({
      ...user,
      [name]: value,
    })
  }
  return (
    <RegisterContainer>
      <RegisterWrapper>
        <RegisterTitle>CREATE AN ACCOUNT</RegisterTitle>
        <hr />
        {isLoading && <LoadingBox />}
        {userRegisterResponse?.message && (
          <MessageBox
            variant={
              userRegisterResponse.status === 'success' ? 'success' : 'danger'
            }
          >
            {userRegisterResponse.message}
          </MessageBox>
        )}
        <RegisterForm onSubmit={handleOnSubmit}>
          <RegisterInput
            name="firstName"
            onChange={handleOnChange}
            placeholder="Enter your First name"
            required
          />
          <RegisterInput
            name="lastName"
            onChange={handleOnChange}
            placeholder="Enter your Last name *"
            required
          />
          <RegisterInput
            name="email"
            onChange={handleOnChange}
            placeholder="Enter your Email address"
            required
          />
          <RegisterInput
            name="username"
            onChange={handleOnChange}
            placeholder="Enter a username"
            required
          />
          <RegisterInput
            name="password"
            onChange={handleOnChange}
            type="password"
            minLength="7"
            placeholder="Create a password"
            required
          />
          <RegisterInput
            name="confirmPassword"
            onChange={handleOnChange}
            type="password"
            placeholder="Confirm your password"
            required
          />
          <RegisterButton type="submit">REGISTER</RegisterButton>
        </RegisterForm>
        <LoginOption>Already have an account?</LoginOption>
        <LoginLink to="/login">LOGIN</LoginLink>
      </RegisterWrapper>
    </RegisterContainer>
  )
}

export default RegisterScreen
