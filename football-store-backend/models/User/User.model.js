import User from './User.Schema.js'

// REGISTER USER

export const createUser = (newUser) => {
  try {
    const user = User(newUser).save()
    return user
  } catch (error) {
    console.log(error)
  }
}

export const verifyEmail = (email) => {
  try {
    return User.findOneAndUpdate(
      { email },
      { isEmailConfirmed: true },
      { new: true },
    )
  } catch (error) {
    throw new Error(error)
  }
}

export const setRefreshJWT = (_id, token) => {
  return User.findByIdAndUpdate(_id, {
    refreshJWT: token,
  })
}

export const getUserByUsername = (username) => {
  return User.findOne({ username })
}

export const getUserByUsernameAndRefreshToken = (filter) => {
  return User.findOne(filter)
}

export const removeRefreshJWT = (refreshJWT) => {
  return User.findOneAndUpdate({ refreshJWT }, { refreshJWT: '' })
}
