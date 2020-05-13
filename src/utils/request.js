import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import { Notify } from 'vant';
import { serverPath } from '@/settings'
// create an axios instance
const service = axios.create({
    baseURL: serverPath ,// process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    transformRequest: [function(data, headers) {
        if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            data = qs.stringify(data)
        }
        return data;
    }]
})

// request interceptor
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        // do something with request error
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
        const res = response.data;
        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 20000) {
            Notify({ type: 'danger', message: '嘿嘿嘿，服务器打了个盹！' });
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res;
        }
    },
    error => {
        Notify({ type: 'danger', message: '网络貌似出了点问题，请稍候重试' });
        return Promise.reject(error)
    }
)

export default service
