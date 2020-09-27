/**
 * Created by jin.zhouhang on 17-7-19 上午10:01.
 */
import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'

/**  测试环境  */
axios.defaults.baseURL = window.APIHOST;
/* 所有ajax请求拦截 */
axios.interceptors.request.use(function (req) {

    const token = Cookies.get('x-auth-token')
    if (token) {
        req.headers['X-Auth-Token'] = token
    }

    // 在发送请求之前做些什么
    return req
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

/*所有ajax响应拦截*/
axios.interceptors.response.use(
    res => {
        const token = res.headers['x-auth-token']
        if (token) {
            Cookies.set('x-auth-token', token)
        } else {
            console.log('fuck')
        }
        return res
    },
    error => {
        return Promise.reject(error)
    }
)

const Ajax = {
    install (Vue) {
        const $$get = (url, data) => {
            if (data !== undefined) {
                let b = true
                for (const key in data) {
                    if (data[key] === null) {
                        continue
                    }
                    if (b) {
                        url += `?${key}=${data[key]}`
                        b = !b
                    } else {
                        url += `&${key}=${data[key]}`
                    }
                }
            }

            return new Promise((resolve, reject) => {
                axios.get(url)
                    .then(res => {
                        resolve(res)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        }

        const $$post = (url, data) => {
            return new Promise((resolve, reject) => {
                axios.post(url, data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        }

        const $$put = (url, data) => {
            return new Promise((resolve, reject) => {
                axios.put(url, data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        }

        const $$patch = (url, data) => {
            return new Promise((resolve, reject) => {
                axios.patch(url, qs.stringify(data))
                    .then(res => {
                        resolve(res)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        }

        const $$delete = (url, data) => {
            if (data !== undefined) {
                let b = true
                for (const key in data) {
                    if (data[key] === null) {
                        continue
                    }
                    if (b) {
                        url += `?${key}=${data[key]}`
                        b = !b
                    } else {
                        url += `&${key}=${data[key]}`
                    }
                }
            }

            return new Promise((resolve, reject) => {
                axios.delete(url)
                    .then(res => {
                        resolve(res)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        }

        Vue.prototype.$$ajax = axios
        Vue.prototype.$$get = $$get
        Vue.prototype.$$post = $$post
        Vue.prototype.$$put = $$put
        Vue.prototype.$$patch = $$patch
        Vue.prototype.$$delete = $$delete
    }
}

export default Ajax
