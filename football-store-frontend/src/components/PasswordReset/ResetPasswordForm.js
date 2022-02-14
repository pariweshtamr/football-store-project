import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../LoadingBox/LoadingBox'
import MessageBox from '../MessageBox/MessageBox'

import resetPassWallpaper from '../../assets/resetPassWallpaper.jpg'
import { ListGroup } from 'react-bootstrap'
import {
  FormTitle,
  ResetPassButton,
  ResetPassFormContainer,
  ResetPassFormWrapper,
  ResetPassInput,
  ResetPassItemContainer,
  ResetPassLabel,
} from './ResetPasswordFormStyles'

const initialPassword = {
  otp: '',
  password: '',
  confirmPassword: '',
}
const passErrorInitial = {
  isMatched: false,
  isLengthy: false,
  hasLowerCase: false,
  hasUpperCase: false,
  hasNumber: false,
  hasSpecialChar: false,
}

const ResetPasswordForm = () => {
  const dispatch = useDispatch()
  const [resetPassword, setResetPassword] = useState(initialPassword)
  const [passError, setPassError] = useState(passErrorInitial)

  const { isLoading, userUpdateResponse } = useSelector((state) => state.user)
  const handleOnSubmit = (e) => {
    e.preventDefault()

    const { otp, password } = resetPassword
    // dispatch(userPasswordUpdate({ currentPassword, password }))
  }

  const changeHandler = (e) => {
    const { name, value } = e.target

    // Validation testing

    let isMatched = false
    if (name === 'password') {
      setPassError({
        ...passError,
        isMatched: resetPassword.confirmPassword === value,
      })
    }

    if (name === 'confirmPassword') {
      isMatched = resetPassword.password === value
      const isLengthy = value.length >= 7
      const hasLowerCase = /[a-z]/.test(value)
      const hasUpperCase = /[A-Z]/.test(value)
      const hasNumber = /[0-9]/.test(value)
      const hasSpecialChar = /[., !, @, #, $, %, ^, &, *, _, (, )]/.test(value)

      setPassError({
        ...passError,
        isMatched,
        isLengthy,
        hasLowerCase,
        hasUpperCase,
        hasNumber,
        hasSpecialChar,
      })
    }

    setResetPassword({
      ...resetPassword,
      [name]: value,
    })
  }
  return (
    <>
      <ResetPassFormContainer
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url(${resetPassWallpaper})`,
        }}
      >
        <ResetPassFormWrapper onSubmit={handleOnSubmit}>
          <FormTitle>Reset Password</FormTitle>
          <hr />
          {isLoading && <LoadingBox />}
          {userUpdateResponse?.message && (
            <MessageBox
              variant={
                userUpdateResponse.status === 'success' ? 'success' : 'danger'
              }
            >
              {userUpdateResponse.message}
            </MessageBox>
          )}
          <ResetPassItemContainer>
            <ResetPassLabel htmlFor="otp">OTP</ResetPassLabel>
            <ResetPassInput
              name="otp"
              type="password"
              minLength="6"
              placeholder="Enter OTP"
              onChange={changeHandler}
              required
            ></ResetPassInput>
          </ResetPassItemContainer>

          <ResetPassItemContainer>
            <ResetPassLabel htmlFor="password">New Password</ResetPassLabel>
            <ResetPassInput
              name="password"
              type="password"
              minLength="7"
              placeholder="Enter a password"
              onChange={changeHandler}
              required
            ></ResetPassInput>
          </ResetPassItemContainer>

          <ResetPassItemContainer>
            <ResetPassLabel htmlFor="confirmPassword">
              Confirm Password
            </ResetPassLabel>
            <ResetPassInput
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              onChange={changeHandler}
              required
            ></ResetPassInput>
          </ResetPassItemContainer>

          <ListGroup>
            <h5 className="m-auto mb-3">Password Rules</h5>
            <ListGroup.Item
              variant={passError.isMatched ? 'success' : 'danger'}
            >
              {passError.isMatched ? (
                <i
                  title="cerified email"
                  className="fa-solid fa-circle-check text-success"
                ></i>
              ) : (
                <i
                  title="email not verified"
                  className="fa-solid fa-circle-xmark text-danger"
                ></i>
              )}{' '}
              Password match
            </ListGroup.Item>
            <ListGroup.Item
              variant={passError.isLengthy ? 'success' : 'danger'}
            >
              {passError.isLengthy ? (
                <i
                  title="cerified email"
                  className="fa-solid fa-circle-check text-success"
                ></i>
              ) : (
                <i
                  title="email not verified"
                  className="fa-solid fa-circle-xmark text-danger"
                ></i>
              )}{' '}
              Must be atleast 7 characters
            </ListGroup.Item>
            <ListGroup.Item
              variant={passError.hasNumber ? 'success' : 'danger'}
            >
              {passError.hasNumber ? (
                <i
                  title="cerified email"
                  className="fa-solid fa-circle-check text-success"
                ></i>
              ) : (
                <i
                  title="email not verified"
                  className="fa-solid fa-circle-xmark text-danger"
                ></i>
              )}{' '}
              Must include number
            </ListGroup.Item>
            <ListGroup.Item
              variant={passError.hasUpperCase ? 'success' : 'danger'}
            >
              {passError.hasUpperCase ? (
                <i
                  title="cerified email"
                  className="fa-solid fa-circle-check text-success"
                ></i>
              ) : (
                <i
                  title="email not verified"
                  className="fa-solid fa-circle-xmark text-danger"
                ></i>
              )}{' '}
              Must include uppercase
            </ListGroup.Item>
            <ListGroup.Item
              variant={passError.hasLowerCase ? 'success' : 'danger'}
            >
              {passError.hasLowerCase ? (
                <i
                  title="cerified email"
                  className="fa-solid fa-circle-check text-success"
                ></i>
              ) : (
                <i
                  title="email not verified"
                  className="fa-solid fa-circle-xmark text-danger"
                ></i>
              )}{' '}
              Must include lowercase
            </ListGroup.Item>
            <ListGroup.Item
              variant={passError.hasSpecialChar ? 'success' : 'danger'}
            >
              {passError.hasSpecialChar ? (
                <i
                  title="cerified email"
                  className="fa-solid fa-circle-check text-success"
                ></i>
              ) : (
                <i
                  title="email not verified"
                  className="fa-solid fa-circle-xmark text-danger"
                ></i>
              )}{' '}
              Must include one of the following special characters i.e. . ! @ #
              $ % ^ & * _ ( )
            </ListGroup.Item>
          </ListGroup>

          <ResetPassButton
            type="submit"
            disabled={Object.values(passError).includes(false)}
          >
            RESET PASSWORD
          </ResetPassButton>
        </ResetPassFormWrapper>
      </ResetPassFormContainer>
    </>
  )
}

export default ResetPasswordForm
