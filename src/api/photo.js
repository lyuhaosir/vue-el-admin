import request from "@/utils/request";

export default {
    //获取图片导航数据
    getImageNav(page,pageSize){
        return request({
            url:`/imageclass/${page}?limit=${pageSize}`,
            method:'get',
        })
    },
    //获取图片列表数据
    getImageList(id,page,limit,order,keyword){
        return request({
            url:`/imageclass/${id}/image/${page}?limit=${limit}&order=${order}`,
            method:'get'
        })
    }
}