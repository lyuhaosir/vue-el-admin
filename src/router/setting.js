import Setting from '@/views/setting'       //设置

import Admin from '@/views/setting/admin'       //管理员管理
import Basics from '@/views/setting/basics'     //基础设置
import Logistics from '@/views/setting/logistics'   //物流设置
import transaction from '@/views/setting/transaction'   //交易设置

const setting = [
    {
        path: '/set/base',
        name: 'set_base',
        component: Basics,
        meta: {
            title: '基础设置'
        }
    },
    {
        path: '/set/express',
        name: 'set_express',
        component: Logistics,
        meta: {
            title: '物流设置'
        }
    },
    {
        path: '/set/manager',
        name: 'set_manager',
        component: Admin,
        meta: {
            title: '管理员设置'
        }
    },
    {
        path: '/set/payment',
        name: 'set_payment',
        component: transaction,
        meta: {
            title: '交易设置'
        }
    }
]

export default setting