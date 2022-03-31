import axios from 'axios'
import config from './config'

const api = axios.create()
const { BASE_URL, API_KEY } = config

api.interceptors.request.use(
  request => {
    request.url = BASE_URL + request.url
    request.headers = {
      'api-key': API_KEY,
      Accept: '*/*'
    }

    return request
  },
  error => {
    return Promise.reject(error)
  }
)

export default api