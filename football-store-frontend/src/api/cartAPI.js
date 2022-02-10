import Axios from 'axios'

const rootUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.ROOT_URL
    : 'http://localhost:8000/api/v1'

const cartApi = rootUrl + '/products'

export const addToCartById = async (_id) => {
  try {
    const { data } = await Axios.get(`${cartApi}/${_id}`)
    return data
  } catch (error) {
    return error?.message?.data || { status: 'error', message: error.message }
  }
}
