import Order from '@/views/order/index'   //订单
import Order_m from '@/views/order/order'   //订单管理
import invoice from '@/views/order/invoice' //发票管理
import after_sale from '@/views/order/after_sale' //售后服务

const order = [
    {
        path: '/order',
        name:'order',
        component: Order,
        meta:{title:'订单'},
        redirect:'/order/order/list',
        children: [
            {
                path:'/order/order/list',
                name:'order_list',
                component:Order_m,
                meta:{
                    title:'订单管理'
                }
            },
            {
                path:'/order/invoice/list',
                name:'invoice_list',
                component:invoice,
                meta:{
                    title:'发票管理'
                }
            },
            {
                path:'/order/after-sale/list',
                name:'after-sale_list',
                component:after_sale,
                meta:{
                    title:'售后服务'
                }
            },
        ]
    }
]

export default order