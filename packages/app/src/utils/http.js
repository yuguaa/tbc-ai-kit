import axios from 'axios'
// create an axios instance
const service = axios.create({
  timeout: 6000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const reqUrl = response.config.url.split('?')[0]
    const res = response.data
    if (res.code === 1001 || reqUrl.endsWith('.json')) {
      return res
    }
    return Promise.reject(response.data)
  },
  (error) => {
    if (error.message && error.message.type === 'TBC_AI_API_CANCEL') {
      Promise.resolve(error)
    }
    return Promise.reject(error)
  },
)

export default service
