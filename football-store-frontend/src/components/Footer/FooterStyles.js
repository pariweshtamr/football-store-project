import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../../responsive'

export const FooterContainer = styled.div`
  display: flex;
  background: #fcf5f5;

  ${mobile({ flexDirection: 'column' })}
`
export const FooterLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 30px;

  ${mobile({ textAlign: 'center' })}
`

export const Logo = styled.h1`
  font-weight: bold;
`
export const Description = styled.p`
  margin: 20px 0;
`
export const SocialContainer = styled.div`
  display: flex;

  ${mobile({ display: 'flex', justifyContent: 'center' })}
`
export const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #cec7c7;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`
export const FooterCenter = styled.div`
  flex: 1;
  padding: 30px;

  ${mobile({ display: 'none' })}
`
export const FooterTitle = styled.h3`
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
`
export const FooterList = styled.ul`
  text-align: center;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const FooterListItem = styled(Link)`
  cursor: pointer;
  margin-bottom: 10px;
`

export const FooterRight = styled.div`
  flex: 1;
  padding: 30px;
  text-align: center;

  ${mobile({ backgroundColor: 'white' })}
`
export const FooterContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Payment = styled.img`
  width: 50%;
`
