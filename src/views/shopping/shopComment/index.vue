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
      <el-table-column type="expand" width="48">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column width="70" label="ID" prop="id"> </el-table-column>
      <el-table-column width="380" label="商品" prop="goods_item.title">
        <template slot-scope="scope">
          <img :src="scope.row.goods_item.cover" alt="" />
          {{ scope.row.goods_item.title }}
        </template>
      </el-table-column>
      <el-table-column width="240" label="评价信息" prop="">
        <template slot-scope="scope">
          <p>用户名：{{scope.row.user.username}}</p>
          <p>评分：</p>
          <p></p>
        </template>
      </el-table-column>
      <el-table-column label="评价时间" prop="review_time"> </el-table-column>
      <el-table-column label="是否显示" prop="">
        <template slot-scope="scope">
          <button :class="scope.row.status == 1 ? 'ifShow' : 'ifHidden'">
            {{ scope.row.status | IfShow }}
          </button>
        </template>
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
      shopApi.getCommentList(this.page, this.limit).then(res => {
        console.log(res);
        this.total = res.data.list.totalCount;
        if (res.msg == "ok") {
          // console.log(res);
          this.total = res.data.totalCount;
          this.shopList = res.data.list;
        }
        // this.shopList = res.data.list;
        // this.total = res.data.totalCount
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
        case 1:
          return "启用";
          break;
        case 0:
          return "禁用";
          break;

        default:
          break;
      }
    },
    //是否显示
    IfShow(status) {
      switch (status) {
        case 1:
          return "启用";
          break;
        case 0:
          return "禁用";
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
.ifShow {
  width: 56px;
  height: 28px;
  border-radius: 4px;
  color: #67c23a;
  background: #f0f9eb;
  border: 1px solid #c2e7b0;
}
.ifShow:hover{
  border: 1px solid #c2e7b0;
  background: #67c23a;
  color: #fff;
}
.ifHidden {
  width: 56px;
  height: 28px;
  border-radius: 4px;
  background: #fef0f0;
  border: 1px solid #f56c6c;
  color: #f56c6c;
}
.ifHidden:hover{
  color: #fff;
  border: 1px solid #f56c6c;  
  background:#f56c6c;
}
</style>
