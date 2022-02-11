import { getNewAccessJWT, updateAccessJWT } from '../../api/tokenAPI'
import {
  createUser,
  getUser,
  loginUser,
  logoutUser,
  verifyNewUser,
} from '../../api/userAPI'
import {
  autoLoginPending,
  getUserDetailsSuccess,
  loginAuto,
  loginFail,
  loginSuccess,
  logoutSuccess,
  requestFail,
  requestPending,
  requestSuccess,
} from './UserSlice'

export const userRegister = (newUser) => async (dispatch) => {
  dispatch(requestPending())

  // call api
  const data = await createUser(newUser)
  data?.status === 'success'
    ? dispatch(requestSuccess(data))
    : dispatch(requestFail(data))
}

export const userEmailVerification = (userObj) => async (dispatch) => {
  dispatch(requestPending())

  // call api
  const data = await verifyNewUser(userObj)
  data?.status === 'success'
    ? dispatch(requestSuccess(data))
    : dispatch(requestFail(data))
}

const setJWTinBrowserMemory = ({ accessJWT, refreshJWT }) => {
  window.sessionStorage.setItem('accessJWT', accessJWT)
  window.localStorage.setItem('refreshJWT', refreshJWT)
}

export const userLogin = (loginInfo) => async (dispatch) => {
  dispatch(requestPending())

  // CALL API TO LOGIN
  const data = await loginUser(loginInfo)
  if (data?.status === 'success') {
    setJWTinBrowserMemory(data.jwts)
    return dispatch(loginSuccess(data.user))
  }

  dispatch(loginFail(data))
}

export const userLogout = () => async (dispatch) => {
  const accessJWT = window.sessionStorage.getItem('accessJWT')
  const refreshJWT = window.localStorage.getItem('refreshJWT')

  await logoutUser({ accessJWT, refreshJWT })

  window.sessionStorage.removeItem('accessJWT')
  window.localStorage.removeItem('refreshJWT')

  dispatch(logoutSuccess())
}

export const autoLogin = () => async (dispatch) => {
  dispatch(autoLoginPending(true))
  const accessJWT = window.sessionStorage.getItem('accessJWT')
  const refreshJWT = window.localStorage.getItem('refreshJWT')

  //1. accessJWT EXISTS
  if (accessJWT) {
    return dispatch(loginAuto())
  }

  //2. accessJWT does not exist but refreshJWT exists
  if (!accessJWT && refreshJWT) {
    // CALL API to get refreshJWT
    const result = await getNewAccessJWT()
    console.log(result, 'from user action')
    if (result?.accessJWT) {
      window.sessionStorage.setItem('accessJWT', result.accessJWT)
      return dispatch(loginAuto())
    }

    dispatch(userLogout())
  }
}

export const fetchUserDetails = () => async (dispatch) => {
  dispatch(requestPending())
  const data = await getUser()
  console.log(data, 'action user')
  if (data?.message === 'jwt expired') {
    // request for new accessJWT
    const token = await updateAccessJWT()
    if (token) {
      return dispatch(fetchUserDetails())
    } else {
      dispatch(userLogout())
    }
  }

  if (data?.user) {
    return dispatch(getUserDetailsSuccess(data.user))
  }
  dispatch(requestFail(data))
}
