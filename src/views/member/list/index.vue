<template>
  <div class="shoplist">
    <div class="el-button-gray">
      <el-button
        size="mini"
        type="success"
        >导出等级</el-button
      >
    </div>
    <el-table :data="shopList" border style="width: 100%">
      <el-table-column label="会员" prop=""  width="">
        <template slot-scope="scope">

        </template>
      </el-table-column>
      <el-table-column prop="date" label="会员等级" width="">
        <template slot-scope="scope">

        </template>
      </el-table-column>
      <el-table-column prop="" label="登录注册" width="">
      </el-table-column>
      <el-table-column prop="" label="状态" width="">
        <template slot-scope="scope">

        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="150">
      </el-table-column>
    </el-table>
    <footer>
      <el-pagination
        :current-page="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      >
      </el-pagination>
    </footer>
  </div>
</template>

<script>
import shopApi from "@/api/shopping/shoplist";
export default {
  name: "",
  data() {
    return {
      page: 1,
      limit: 10,
      shopList: [],
      total: 0,
      ids: []
    };
  },
  methods: {
    //切换每页显示数量
    handleSizeChange(pageSize){
      this.limit = pageSize
      this.getShopList()
    },
    //切换页码
    handleCurrentChange(page){
      this.page = page
      this.getShopList()
    },
    //获取要删除商品的id
    deleteGood(id) {
      const i = this.ids.indexOf(id);
      if (i == -1) {
        this.ids.push(id);
        // console.log(this.ids);
      } else {
        this.ids.splice(i, 1);
        // console.log(this.ids);
      }
    },
    //请求商品列表数据
    getShopList() {
      shopApi.getShopList(this.page, this.limit, this.activeName).then(res => {
        this.shopList = res.data.list;
        this.total = res.data.totalCount;
        // console.log(res.data);
      });
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getShopList();
  },
  filters: {
    
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
::-webkit-scrollbar {
  display: none;
}
.shoplist {
  // position: relative;
  max-height: 720px;
  box-sizing: border-box;
  height: 100%;
  padding: 0 16px;
}
.el-button-gray {
  // margin: 14px 0;
}
.el-table {
  margin-top: 15px;
  text-align: center;
  color: #606266;
  font-size: 14px;
  margin-bottom: 50px;
  img {
    width: 60px;
    height: 60px;
    float: left;
    margin-right: 16px;
  }
  //商品
  .el-table-column {
    .template {
      .table-text {
        float: left;
      }
    }
  }
  //商品状态
  .shop_status_style {
    color: #fff;
    border-radius: 0.25rem;
    text-align: center;
    font-size: 12px;
    padding: 0 !important;
  }
  .shop_status_style1 {
    background: #28a745;
  }
  .shop_status_style2 {
    background: #dc3545;
  }
}
footer {
  position: fixed;
  height: 50px;
  background: white;
  bottom: 0px;
  left: 200px;
  right: 0px;
  border-top: 1px solid #dee2e6;
  z-index: 1;
  .el-pagination {
    margin-top: 10px;
    margin-left: 10px;
  }
}
</style>
