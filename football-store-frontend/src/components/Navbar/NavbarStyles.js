import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../../responsive'

export const NavContainer = styled.div`
  height: 60px;
  background: #fff;
  ${mobile({ height: '50px' })}
`
export const NavWrapper = styled.div`
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;

  ${mobile({ padding: '10px 5px' })}
`
export const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${mobile({ flex: 1, justifyContent: 'center' })}
`

export const LogoLink = styled(Link)`
  text-decoration: none;
  color: teal;
  &:hover {
    color: #000;
  }
`

export const Logo = styled.h1`
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({ fontSize: '16px' })}
`

export const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${mobile({ flex: 3, justifyContent: 'center' })}
`
export const Welcome = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mobile({ flex: 3, justifyContent: 'center' })}
`
export const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;

  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`
export const UserGreet = styled.div`
  margin-right: 25px;
`
export const MenuLink = styled(Link)`
  text-decoration: none;
  color: teal;

  &:hover {
    color: #000;
  }
`
export const ProfileLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:hover {
    color: teal;
  }
`

export const Links = styled.div`
  display: flex;
`
