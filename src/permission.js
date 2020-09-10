import router from './router/index'

// import LoginApi from './api/login'

import { Message } from 'element-ui'

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
        if (to.path != '/login') {
            localStorage.removeItem('admin_info')
            Message.warning('请先登录')
            next('/login')
        } else {
            const info = localStorage.getItem('admin_info')
            if (!info) {
                localStorage.removeItem('admin_token')
                if (to.path != '/login') {
                    Message.warning('请重新登录')
                    next('/login')
                }else{
                    next()
                }
            } else {
                next()
            }
        }
    } else {
        next()
    }
})