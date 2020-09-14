import request from '../utils/request'

export default {
    login(username,password){
        return request({
            url:'/login',
            method:'post',
            data:{
                username,
                password
            }
        })
    },
    login_out(){
        return request({
            url:'/logout',
            method:'post'
        })
    }
}