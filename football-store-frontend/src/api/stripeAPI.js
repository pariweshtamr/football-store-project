import Axios from 'axios'

const rootUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.ROOT_URL
    : 'http://localhost:8000/api/v1'

export const userRequest = Axios.create({
  baseURL: rootUrl,
  headers: {
    authorization: window.sessionStorage.getItem('accessJWT'),
  },
})
