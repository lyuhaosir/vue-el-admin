<template>
  <div class="shoplist">
    <div class="el-button-gray">
      <el-button size="mini" type="success">添加规格</el-button>
      <el-button size="mini" type="warning" v-show="false">批量删除</el-button>
      <el-button size="mini" type="danger">批量删除</el-button>
      <!-- <el-button size="mini">上架</el-button>
      <el-button size="mini">下架</el-button> -->
    </div>
    <el-table :data="shopList" border style="width: 100%">
      <el-table-column prop="" label="" type="selection" width="45">
        <template slot-scope="scope">
          <el-checkbox></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="类型名称" width="">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="属性标签" width="">
        <template slot-scope="scope">
          {{ scope.row.goods_type_values[0].name }},
          <!-- {{scope.row.goods_type_values[1].name}} -->
        </template>
      </el-table-column>
      <el-table-column prop="" label="排序" width="">
        <template slot-scope="scope">
          {{ scope.row.order }}
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="状态" width="">
        <template slot-scope="scope">
          {{ scope.row.status | statusFilters }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width=""> </el-table-column>
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
import shopApi from "@/api/shopping/specification";
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
    handleSizeChange(page) {
      this.limit = page;
      this.getShopList();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getShopList();
    },
    //请求商品列表数据
    getShopList() {
      shopApi.getShopTypeList(this.page, this.limit).then(res => {
        console.log(res.data.list[1].goods_type_values);
        this.total = res.data.list.totalCount;
        if (res.msg == "ok") {
          // console.log(res);
          this.total = res.data.totalCount;
          this.shopList = res.data.list;
        }
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
    //审核状态
    statusFilters(status) {
      switch (status) {
        case 0:
          return "禁用";
          break;
        case 1:
          return "启用";
          break;

        default:
          break;
      }
    }
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
  overflow: hidden;
  overflow-y: scroll;
  padding: 0 16px;
}
.el-button-gray {
  margin-top: 14px;
}
.el-table {
  margin-top: 15px;
  text-align: center;
  color: #606266;
  font-size: 14px;
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
  //操作
  .el-table__row {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: auto;
      width: 80%;
      li {
        font-size: 12px;
        color: #008080;
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
