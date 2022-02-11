import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: {},
  isLoggedIn: false,
  isLoading: false,
  userFetchResponse: {},
  userRegisterResponse: {},
  userLoginResponse: {},
  isAutoLoginPending: false,
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

    loginAuto: (state, { payload }) => {
      state.userInfo = payload || {}
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
} = actions

export default reducer
