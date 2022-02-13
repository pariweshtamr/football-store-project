import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PasswordForm, ProfileForm } from '../../components/Profile/ProfileForm'
import { fetchUserDetails } from '../../redux/User/UserAction'
import {
  Hr,
  RightSide,
  Profile,
  GreetUser,
  UserName,
} from './UserProfileScreenStyles'
import profileWallpaper from '../../assets/profileWallpaper.jpg'

const UserProfileScreen = () => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.user)

  useEffect(() => {
    !userInfo && dispatch(fetchUserDetails())
  }, [dispatch, userInfo])

  return (
    <>
      <Hr />
      <Profile
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${profileWallpaper})`,
        }}
      >
        <ProfileForm />
        <RightSide>
          <GreetUser>
            Welcome, <UserName>{userInfo.firstName}!</UserName>
          </GreetUser>
          <PasswordForm />
        </RightSide>
      </Profile>
    </>
  )
}

export default UserProfileScreen
