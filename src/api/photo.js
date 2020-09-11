import request from "@/utils/request";

export default {
    getImageList(page,pageSize){
        return request({
            url:`/imageclass/${page}?limit=${pageSize}`,
            method:'get',
        })
    }
}