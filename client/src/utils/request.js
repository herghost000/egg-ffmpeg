import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken, setToken } from '@/utils/auth'
import { encrypt } from './rsa'
import md5 from 'md5'
import { parseQuery, urlencode, aesEncrypt, aesDecrypt, randnum } from './index'
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    if (config.method.toLowerCase() === 'get') {
      const newParams = config.params || {}
      const t = `${+new Date()}`
      config.headers['X-Sign'] = encrypt(
        `${md5(
          JSON.stringify({
            ...parseQuery(urlencode(newParams)),
            t
          })
        )}.${t}`
      )
    } else {
      let newParams = config.data || {}
      config.encrypt = true
      if (config.encrypt) {
        const key = randnum(32, 16)
        config.headers['X-Key'] = encrypt(key)
        config.key = key
        config.data = {
          body: aesEncrypt(JSON.stringify(newParams), key)
        }
      }
      newParams = config.data
      const t = `${+new Date()}`
      config.headers['X-Sign'] = encrypt(
        `${md5(
          JSON.stringify({
            ...newParams,
            t
          })
        )}.${t}`
      )
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    if (response.config.encrypt) {
      const { key } = response.config
      const encryptBody = response.data.body
      const decryptBody = aesDecrypt(encryptBody, key)
      const objBody = JSON.parse(decryptBody)
      response.data = objBody
    }
    const res = response.data
    if (res.code < 200 || res.code > 300) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 401 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          `你已被登出，可以取消继续留在该页面，或者重新登录（${res.message})`,
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
        setToken('')
      }
      return Promise.reject(res.message)
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
