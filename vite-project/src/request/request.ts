import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://service.test.nttcc.com.cn/',
    timeout: 15000
})

instance.interceptors.request.use(
    config => {
        return config
    }, err => {
        return Promise.reject(err)
    }
)

instance.interceptors.response.use(
    response => {
        return response
    }, err => {
        return Promise.reject(err)
    }
)



export default instance