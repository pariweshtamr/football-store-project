import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: {},
  isLoggedIn: false,
  isLoading: false,
  userFetchResponse: {},
  userUpdateResponse: {},
  userRegisterResponse: {},
  userLoginResponse: {},
  isAutoLoginPending: false,
  showResetPasswordForm: false,
  resetPasswordRequestResponse: {},
  passwordResettingEmail: {},
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true
    },

    requestSuccess: (state, { payload }) => {
      state.isLoading = false
      state.userRegisterResponse = payload || {}
    },

    requestFail: (state, { payload }) => {
      state.isLoading = false
      state.userRegisterResponse = payload || {}
    },

    loginSuccess: (state, { payload }) => {
      state.userInfo = payload || {}
      state.userLoginResponse = {}
      state.isLoggedIn = true
      state.isLoading = false
    },

    getUserDetailsSuccess: (state, { payload }) => {
      state.userInfo = payload || {}
      state.userFetchResponse = {}
      state.isLoggedIn = true
      state.isLoading = false
    },

    profileUpdateSuccess: (state, { payload }) => {
      state.userUpdateResponse = payload || {}
      state.isLoading = false
    },
    passwordUpdateSuccess: (state, { payload }) => {
      state.userUpdateResponse = payload || {}
      state.isPending = false
    },

    loginAuto: (state) => {
      state.isLoggedIn = true
      state.isAutoLoginPending = false
    },

    loginFail: (state, { payload }) => {
      state.isLoading = false
      state.userLoginResponse = payload || {}
    },

    logoutSuccess: (state) => {
      state.userInfo = {}
      state.isLoggedIn = false
      state.isAutoLoginPending = false
    },

    autoLoginPending: (state, { payload }) => {
      state.isAutoLoginPending = payload
    },
    switchLoginResetPassForm: (state) => {
      state.showResetPasswordForm = !state.showResetPasswordForm
    },

    resetPassResponse: (state, { payload }) => {
      state.isPending = false
      state.resetPasswordRequestResponse = payload.data
      state.passwordResettingEmail = payload.email
      state.showResetPasswordForm = payload.data.status === 'success'
    },
  },
})

const { reducer, actions } = userSlice

export const {
  requestPending,
  requestSuccess,
  requestFail,
  loginSuccess,
  loginFail,
  loginAuto,
  logoutSuccess,
  autoLoginPending,
  getUserDetailsSuccess,
  profileUpdateSuccess,
  passwordUpdateSuccess,
  resetPassResponse,
  switchLoginResetPassForm,
} = actions

export default reducer
