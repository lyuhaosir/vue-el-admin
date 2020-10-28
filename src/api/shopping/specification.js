import request from '../../utils/request'

export default {
    //商品规格
    specification(page,limit){
        return request({
            url:`/skus/${page}`,
            method:'get',
            params:{
                limit
            }
        })
    },
    //商品类型
    getShopTypeList(page,limit){
        return request({
            url:`/goods_type/${page}`,
            method:'get',
            params:{
                limit
            }
        })
    },
    //商品评论
    getCommentList(page,limit,title=''){
        return request({
            url:`/goods_comment/${page}`,
            method:'get',
            params:{
                limit,
                // title
            }
        })
    }
}