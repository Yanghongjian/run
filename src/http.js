import axios from "axios";
import { message, Modal } from 'ant-design-vue';
import { getToken } from '@/tools/webstore'
import route from "./router";
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const api = axios.create({
    baseURL: 'http://localhost:3000/dev-api/',
    timeout: 10000
})

api.interceptors.request.use(config => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    return config
}, err => {
    console.log(err);
    Promise.reject(error)
})

api.interceptors.response.use(res => {
    const code = res.data.code || 200
    const errMsg = res.data.msg
    if (code == 401) {
        Modal.confirm({
            title: '会话过期，请重新登陆',
            // content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                location.href = '/login';
                // return new Promise((resolve, reject) => {
                //     setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                // }).catch(() => console.log('Oops errors!'));
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onCancel() { },
        });
        // route.push()
        return Promise.reject(new Error(errMsg))
    } else if (code === 500) {
        message.error(errMsg);
        return Promise.reject(new Error(errMsg))
    } else if (code != 200) {
        message.error(errMsg);
        return Promise.reject(new Error(errMsg))
    } else {
        return res.data
    }
}, err => {
    console.log(err);
})


export default api