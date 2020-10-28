
import Category from '@/views/shopping/category'            //分类列表
import ShopComment from '@/views/shopping/shopComment'      //商品评论
import ShopList from '@/views/shopping/shopList'            //商品列表
import ShopType from '@/views/shopping/shopType'            //商品类型
import Specification from '@/views/shopping/specification'  //商品规格
import ShopCreate from '@/views/shopping/shopList/shopcreate' //发布商品

const shopping = [

    {
        path: '/shop/goods/list',
        name: 'shop_goods_list',
        component: ShopList,
        meta: {
            title: "商品列表"
        }
    },
    {
        path: '/shop/category/list',
        name: 'shop_category_list',
        component: Category,
        meta: {
            title: "分类列表"
        }
    },
    {
        path: '/shop/sku/list',
        name: 'shop_sku_list',
        component: Specification,
        meta: {
            title: "商品规格"
        }
    },
    {
        path: '/shop/type/list',
        name: 'shop_type_list',
        component: ShopType,
        meta: {
            title: "商品类型"
        }
    },
    {
        path: '/shop/comment/list',
        name: 'shop_comment_list',
        component: ShopComment,
        meta: {
            title: "商品评论"
        }
    },
    {
        path: '/shop/goods/create',
        name: 'shop_goods_create',
        component:ShopCreate,
        meta: {
            title: "创建商品"
        }
    },

]

export default shopping