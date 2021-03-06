
import HomePage from '@/views/Home/home'        //后台首页
import Photo from '@/views/Home/photo'          //商品管理

const home = [


    {
        path: '/index',
        name: 'index',
        component: HomePage,
        meta: {
            title: "后台首页"
        }
    },
    {
        path: '/image',
        name: 'image',
        component: Photo,
        meta: {
            title: "相册管理"
        }
    }
]

export default home