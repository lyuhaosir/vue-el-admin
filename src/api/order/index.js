import request from '../../utils/request'

export function getOrderList(page,limit,tab){
    return request({
        url:`/admin/order/${page}`,
        method:'get',
        params:{
            limit,
            tab
        }
    })
}