import request from '../../utils/request'

export function getGradeList(page,limit){
    return request({
        url:`admin/user_level/${page}`,
        method:'get',
        params:{
            limit
        }
    })
}