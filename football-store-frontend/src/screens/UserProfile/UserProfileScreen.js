import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileForm from '../../components/Profile/ProfileForm'
import { fetchUserDetails } from '../../redux/User/UserAction'
import { Hr } from './UserProfileScreenStyles'

const UserProfileScreen = () => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.user)

  useEffect(() => {
    !userInfo._id && dispatch(fetchUserDetails())
  }, [dispatch, userInfo])

  return (
    <>
      <Hr />
      <ProfileForm />
    </>
  )
}

export default UserProfileScreen
