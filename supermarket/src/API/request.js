//引入 axios
import axios from "axios"

//引入qs
import qs from "qs"


//设置默认请求服务器的根目录
axios.defaults.baseURL = 'http://127.0.0.1:666';


//暴露 一个对象出去 封装get和post方法
export default {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                    params
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    },
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}