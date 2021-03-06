
import Order_m from '@/views/order/order'   //订单管理
import invoice from '@/views/order/invoice' //发票管理
import after_sale from '@/views/order/after_sale' //售后服务

const order = [
            {
                path:'/order/order/list',
                name:'order_order_list',
                component:Order_m,
                meta:{
                    title:'订单管理'
                }
            },
            {
                path:'/order/invoice/list',
                name:'order_invoice_list',
                component:invoice,
                meta:{
                    title:'发票管理'
                }
            },
            {
                path:'/order/after-sale/list',
                name:'order_after-sale_list',
                component:after_sale,
                meta:{
                    title:'售后服务'
                }
            }
]

export default order