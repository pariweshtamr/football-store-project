import styled from 'styled-components'
import { mobile } from '../../responsive'

export const ProfileFormContainer = styled.div`
  width: 100vw;
  height: 100%;
  /* background-image: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1)
    ),
    url('../../assets/profileWallpaper.jpg'); */
  background-size: cover;
  display: flex;
  align-items: Flex-start;
  padding: 4rem;
  justify-content: flex-start;

  ${mobile({ height: '100%' })}
`
export const FormTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`
export const ProfileFormWrapper = styled.form`
  padding: 20px;
  width: 40%;
  background-color: #f0f0f0;
  opacity: 0.9;
  border-radius: 5px;

  ${mobile({ width: '80%', margin: '20px 0' })}
`
export const ProfileItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const ProfileLabel = styled.label`
  margin: 0.5rem 0;
  text-align: right;
  font-weight: 600;
`
export const ProfileInput = styled.input`
  flex: 1;
  min-width: 100%;
  margin-bottom: 1rem;
  padding: 10px;
`
export const ProfileButton = styled.button`
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