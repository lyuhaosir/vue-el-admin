import request from '../../utils/request'

export default {
    //获取列表的商品信息
    getShopList(page,limit,tab){
        return request({
            url:`/goods/${page}`,
            method:'get',
            params:{
                limit,
                tab
            }
        })
    },
    //批量删除
    BatchRemove(ids){
        return request({
            url:'/goods/delete_all',
            method:'post',
            data:{
                ids
            }
        })
    }
}