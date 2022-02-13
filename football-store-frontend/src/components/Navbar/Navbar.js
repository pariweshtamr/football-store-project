import React, { useEffect } from 'react'
import {
  Left,
  LogoLink,
  Logo,
  MenuItem,
  MenuLink,
  NavContainer,
  NavWrapper,
  Right,
  UserGreet,
  Welcome,
} from './NavbarStyles'
import { Badge } from '@material-ui/core'
import { ShoppingCartOutlined } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { autoLogin, userLogout } from '../../redux/User/UserAction'

const Navbar = () => {
  const { quantity } = useSelector((state) => state.cart)
  const { isLoggedIn, userInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    !userInfo._id && dispatch(autoLogin())
  }, [userInfo._id, dispatch])

  const signoutHandler = () => {
    dispatch(userLogout())
  }

  return (
    <>
      <NavContainer>
        <NavWrapper>
          <Left>
            <LogoLink to="/">
              <Logo>Soccer Boot Store.</Logo>
            </LogoLink>
          </Left>
          <Right>
            {isLoggedIn ? (
              <Welcome>
                <UserGreet>Hi, {userInfo.firstName}</UserGreet>
                <MenuLink to="/" onClick={signoutHandler}>
                  SIGN OUT
                </MenuLink>
              </Welcome>
            ) : (
              <>
                <MenuLink to="/register">
                  <MenuItem>REGISTER</MenuItem>
                </MenuLink>
                <MenuLink to="/login">
                  <MenuItem>SIGN IN</MenuItem>
                </MenuLink>
              </>
            )}

            <MenuLink to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </MenuLink>
          </Right>
        </NavWrapper>
      </NavContainer>
    </>
  )
}

export default Navbar
