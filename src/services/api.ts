import axios from 'axios'
import { Expedia_Jira_API_Base } from '../config/constants'

const axiosCall = async (method, url, options: AxiosOptions) => {
  try {
    return await axios({
      method: method,
      url: `${Expedia_Jira_API_Base}/${url}`,
      data: options.data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        ...options.headers
      },
      params: options.params
    })
  } catch (err) {
    const { response } = err
    const {
      data: { message = 'Server error' }
    } = response
    return { error: true, message }
  }
}

interface AxiosOptions {
  data?: any;
  headers?: any;
  params?: any;
}


const api = {
  post: async (url: string, options: AxiosOptions) => {
    return axiosCall('post', url, options)
  },
  get: async (url: string, options: AxiosOptions) => {
    return axiosCall('get', url, options)
  },
  put: async (url: string, options: AxiosOptions) => {
    return axiosCall('put', url, options)
  },
  delete: async (url: string, options: AxiosOptions) => {
    return axiosCall('delete', url, options)
  }
}

export default api
