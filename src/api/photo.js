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
    },
    //添加相册
    setAlbum(order,name){
        return request({
            url:'/imageclass',
            method:'post',
            data:{
                order,
                name
            }
        })
    },
    //删除相册
    removeAlbum(id){
        return request({
            url:`/imageclass/${id}`,
            method:'delete'
        })
    },
    //修改相册
    changeAlbum(id,name,order){
        return request({
            url:`/imageclass/${id}`,
            method:'post',
            data:{
                order,
                name
            }
        })
    },
    //删除单张图片
    removeSolaImg(id){
        return request({
            url:`/image/${id}`,
            method:'delete'
        })
    },
    //编辑单张图片
    changeSolaImg(id,name){
        return request({
            url:`/image/${id}`,
            method:'post',
            data:{
                name
            }
        })
    },
    //上传图片
    setImage(img,image_class_id){
        return request({
            url:'/image/upload',
            method:'post',
            data:{
                img,
                image_class_id
            }
        })
    },

}