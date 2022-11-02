import Axios from 'axios'
import { Cookies } from 'react-cookie'
import { CONFIG } from '../appConstants/config'
import { ENDPOINTS } from '../appConstants/endpoint'
import { PATHS } from '../appConstants/path'

const PUBLIC_URLS = [ENDPOINTS.LOGIN]

const axios = Axios.create({
  baseURL: CONFIG.API_URL,
  timeout: 30000
})

axios.interceptors.request.use(
  function (config) {
    //don't add auth header if url match ignore list
    if (PUBLIC_URLS.indexOf(config.url) >= 0 || config.url.indexOf('public') >= 0) {
      return config
    }
    //if token is passed in server side
    if (config && config.token) {
      //modify header here to include token
      Object.assign(config.headers, {
        Authorization: `Bearer ${config.token}`
      })
    } else {
      const cookies = new Cookies()
      const token = cookies.get(CONFIG.AUTH_TOKEN_KEY)
      if (token) {
        Object.assign(config.headers, { Authorization: `Bearer ${token}` })
      }
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response?.status ?? ''
    if (status === 401) {
      const cookies = new Cookies()
      localStorage.clear()
      cookies.remove(CONFIG.AUTH_TOKEN_KEY)
      setTimeout(() => {
        window.location.href = PATHS.LOGIN
      }, 500)
    }
    return Promise.reject(error)
  }
)

const API = {
  get: (endpoint, params = {}) => axios.get(endpoint, { params }),
  post: (endpoint, data = {}) => axios.post(endpoint, data),
  put: (endpoint, data ) => axios.put(endpoint, data),
  del: (endpoint, params = {}) => axios.delete(endpoint, { params })
}

export default API
