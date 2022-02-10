import styled from 'styled-components'
import { mobile } from '../../responsive'

export const BannerContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  background: #fcf5f5;

  ${mobile({ display: 'none' })}
`

export const BannerWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

export const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Image = styled.img`
  height: 75%;
`
export const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`
export const Title = styled.h1`
  font-size: 70px;
  font-weight: bold;
`
export const Description = styled.p`
  margin: 20px 0;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 3px;
`
export const Button = styled.button`
  padding: 10px;
  font-size: 18px;
  background: transparent;
  cursor: pointer;
`
