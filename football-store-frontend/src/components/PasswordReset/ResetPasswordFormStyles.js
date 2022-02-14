import styled from 'styled-components'
import { mobile } from '../../responsive'

export const ResetPassFormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 2rem;
  justify-content: flex-end;
  background-size: cover;

  ${mobile({ height: '100%' })}
`
export const FormTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: teal;
`
export const ResetPassFormWrapper = styled.form`
  padding: 20px;
  width: 30rem;
  background-color: #f8f8f8;
  opacity: 0.9;
  border-radius: 5px;

  ${mobile({ width: '80%', margin: '20px 0' })}
`
export const ResetPassItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const ResetPassLabel = styled.label`
  margin: 0.5rem 0;
  text-align: right;
  font-weight: 600;
`
export const ResetPassInput = styled.input`
  flex: 1;
  min-width: 100%;
  margin-bottom: 1rem;
  padding: 10px;
`
export const ResetPassButton = styled.button`
  width: 100%;
  margin: 20px 0;
  border: none;
  border-radius: 5px;
  padding: 15px;
  background-color: #ffc107e3;
  color: black;
  cursor: pointer;

  ${mobile({ padding: '10px' })}
`