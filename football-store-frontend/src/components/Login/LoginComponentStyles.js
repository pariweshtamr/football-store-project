import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../../responsive'

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;

  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
`
export const RegisterOrHome = styled.div`
  display: flex;
  justify-content: space-between;
`
export const ExternalLink = styled.div`
  display: flex;
  flex-direction: column;
`
export const Back = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  text-transform: uppercase;
`
export const LoginWrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: #f0f0f0;
  opacity: 0.85;
  border-radius: 5px;

  ${mobile({ width: '80%' })}
`
export const LoginTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  display: flex;
  justify-content: center;
`
export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`
export const LoginInput = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`
export const LoginButton = styled.button`
  width: 40%;
  margin: 20px 0;
  border: none;
  border-radius: 5px;
  padding: 15px;
  background-color: #ffc107e3;
  color: black;
  cursor: pointer;

  ${mobile({ padding: '10px' })}
`

export const ForgotPasswordLink = styled(Link)`
  margin: 5px 0;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  color: teal;

  &:hover {
    color: #000;
  }
`
export const LoginLink = styled(Link)`
  margin: 5px 0;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  color: teal;

  &:hover {
    color: #000;
  }
`
export const HomeLink = styled(Link)`
  cursor: pointer;
  font-size: 2rem;
  color: teal;

  margin: 20px 0;

  &:hover {
    color: #000;
  }

  ${mobile({ padding: '10px' })}
`
