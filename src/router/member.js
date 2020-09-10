import Member from '@/views/member'     //会员

import List from '@/views/member/list'  //会员列表
import Grade from '@/views/member/grade'    //会员等级


const member = [
    {
        path: '/user',
        name:'user',
        component: Member,
        meta:{title:'会员'},
        redirect:'/user-list/list',
        children: [
            {
                path:'/user/user-list/list',
                name:'user_user-list_list',
                component:List,
                meta:{
                    title:'会员列表'
                }
            },
            {
                path:'/user/user-level/list',
                name:'user_user-level_list',
                component:Grade,
                meta:{
                    title:'会员等级'
                }
            },
        ]
    }
]

export default member