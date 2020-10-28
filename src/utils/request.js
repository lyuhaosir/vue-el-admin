import axios from 'axios'

import { Loading,Message } from 'element-ui'

const Server = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: ''
})

const loading = {
    loadingInstance:null,
    open(){
        if(this.loadingInstance === null){
            this.loadingInstance =Loading.service({
                target:'.app-main',
                text:'正在加载中',
                background:"rgba(255,255,255,0.3)"
            })
        }
    },
    close(){
        if(this.loadingInstance !== null){
            this.loadingInstance.close()
        }
        this.loadingInstance = null
    }
}




Server.interceptors.request.use(config => {
    // console.log('请求拦截');
    
    loading.open()
    const token = localStorage.getItem('admin_token') ? localStorage.getItem('admin_token') : "";
    // console.log(token);
    config.headers.token = token;
    // Do something before request is sent
    return config;
}, error => {
    loading.close()
    // Do something with request error
    return Promise.reject(error);
});

Server.interceptors.response.use(response => {
    // console.log('响应拦截');
    // Do something before response is sent
    loading.close()
    if (response.status == 200) {
        return response.data
    }
    return response;
}, error => {
    loading.close()
    Message.warning('请求超时')
    // Do something with response error
    return Promise.reject(error);
});

export default Server