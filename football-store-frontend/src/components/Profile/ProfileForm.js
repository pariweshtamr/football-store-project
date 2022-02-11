import React from 'react'
import { useSelector } from 'react-redux'
import LoadingBox from '../LoadingBox/LoadingBox'
import MessageBox from '../MessageBox/MessageBox'
import img from '../../assets/profileWallpaper.jpg'
import {
  ProfileFormContainer,
  FormTitle,
  ProfileFormWrapper,
  ProfileLabel,
  ProfileInput,
  ProfileButton,
  ProfileItemContainer,
} from './ProfileFormStyles'

const ProfileForm = () => {
  const { userInfo, isLoading, userFetchResponse } = useSelector(
    (state) => state.user,
  )

  const submitHandler = (e) => {
    e.preventDefault()

    //dispatch update user
  }
  return (
    <>
      <ProfileFormContainer style={{ backgroundImage: `url(${img})` }}>
        <ProfileFormWrapper onSubmit={submitHandler}>
          <FormTitle>My Profile</FormTitle>
          <hr />
          {isLoading && <LoadingBox />}
          {userFetchResponse?.message && (
            <MessageBox
              variant={
                userFetchResponse.status === 'success' ? 'success' : 'danger'
              }
            >
              {userFetchResponse.message}
            </MessageBox>
          )}
          <ProfileItemContainer>
            <ProfileLabel htmlFor="firstName">First Name</ProfileLabel>
            <ProfileInput
              type="text"
              placeholder="Enter your First name"
              value={userInfo.firstName}
            ></ProfileInput>
          </ProfileItemContainer>
          <ProfileLabel htmlFor="lastName">Last Name</ProfileLabel>
          <ProfileInput
            type="text"
            placeholder="Enter your First name"
            value={userInfo.lastName}
          ></ProfileInput>

          <ProfileLabel htmlFor="email">Email</ProfileLabel>
          <ProfileInput
            type="email"
            disabled
            value={userInfo.email}
          ></ProfileInput>

          <ProfileLabel htmlFor="username">Username</ProfileLabel>
          <ProfileInput
            type="text"
            disabled
            value={userInfo.username}
          ></ProfileInput>

          <ProfileLabel htmlFor="password">Password</ProfileLabel>
          <ProfileInput
            type="password"
            minLength="7"
            placeholder="Enter password"
          ></ProfileInput>

          <ProfileLabel htmlFor="confirmPassword">
            Confirm Password
          </ProfileLabel>
          <ProfileInput
            type="password"
            placeholder="Enter confirm password"
          ></ProfileInput>

          <ProfileButton type="submit">UPDATE PROFILE</ProfileButton>
        </ProfileFormWrapper>
      </ProfileFormContainer>
    </>
  )
}

export default ProfileForm
