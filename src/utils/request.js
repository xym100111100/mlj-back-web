import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API,
 
  // baseURL: 'http://10.13.1.5:9021',
  
  // 上线的时候请修改商户请求图片前缀
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    //将post请求中参数为空去掉
    if (config.data && !config.data.length) {
      let data = {}
      for (let item in config.data) {
        if (config.data[item] === 0 || config.data[item]) {
          data[item] = config.data[item]
        }
      }
      config.data = data
    }

    // console.log(config)
    //  config.data = data
    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Auth-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
   
    const res = response.data
    // if the custom code is not 0, it is judged as an error.
    if (res.data) {
      // 因为后台的分页查询不会返回code，但是页面有大量判断是根据code来做的，所以假如没有code但是data不是空的的话就将code添加进去返回值里面
      res.code = 0
    } else {
      if (res.code === undefined) {
        res.code = 1
      }

    }
    if (res.code !== 0) {
      Message({
        message: res.msg || '服务器被外星人吃啦 -_-!',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return {
        msg: res.msg || '服务器被外星人吃啦 -_-!',
        code: res.code
      }
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.response.data && error.response.data.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
