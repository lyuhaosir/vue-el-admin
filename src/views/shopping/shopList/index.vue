<template>
  <div class="shoplist">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="审核中" name="checking"></el-tab-pane>
      <el-tab-pane label="出售中" name="saling"></el-tab-pane>
      <el-tab-pane label="已下架" name="off"></el-tab-pane>
      <el-tab-pane label="库存预警" name="min_stock"></el-tab-pane>
      <el-tab-pane label="回收站" name="delete"></el-tab-pane>
    </el-tabs>
    <div class="el-button-gray">
      <el-button
        size="mini"
        type="success"
        @click="$router.push('/shop/goods/create')"
        >发布商品</el-button
      >
      <el-button size="mini" type="warning" v-show="false">回收商品</el-button>
      <el-button size="mini" type="danger" @click="batchRemove"
        >批量删除</el-button
      >
      <el-button size="mini" @click='putaway'>上架</el-button>
      <el-button size="mini">下架</el-button>
    </div>
    <el-table :data="shopList" border style="width: 100%">
      <el-table-column prop="" type = "selection"  width="45">
        <template slot-scope="scope">
          <el-checkbox
            @change="deleteGood(scope.row.id)"
            ref="el-checkbox"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="商品" width="">
        <template slot-scope="scope">
          <img :src="scope.row.cover" alt="" />
          <div class="table-text">
            <p>{{ scope.row.title }}</p>
            <p>分类：{{ scope.row.category.name }}</p>
            <p>时间：{{ scope.row.create_time }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sale_count" label="实际销售" width="60">
      </el-table-column>
      <el-table-column prop="" label="商品状态" width="60">
        <template slot-scope="scope">
          <p
            :class="
              scope.row.status == 1
                ? 'shop_status_style shop_status_style1'
                : 'shop_status_style shop_status_style2'
            "
          >
            {{ scope.row.status | shopStatus }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="" label="审核状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.ischeck | checkingStatus }}
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="总库存" width="90">
      </el-table-column>
      <el-table-column prop="" label="价格(元)" width="180">
        <template slot-scope="scope">
          <span style="color:red">￥{{ scope.row.min_price }}</span>
          /￥{{ scope.row.min_oprice }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="">
        <ul>
          <li>基础设置</li>
          <li>商品规格</li>
          <li>商品属性</li>
          <li>媒体设置</li>
          <li>商品详情</li>
          <li>折扣设置</li>
          <li>删除商品</li>
        </ul>
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
      activeName: "all",
      shopList: [],
      total: 0,
      ids: []
    };
  },
  methods: {
    putaway(){
      // console.log(this.ids);
      
    },
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
    //批量删除
    batchRemove() {
      // console.log(this.$refs["el-checkbox"]);

      if (this.ids.length == 0) {
        this.$message.error("请先选中要删除的商品信息");
      } else {
        this.$confirm("是否要删除选中规格", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            shopApi.BatchRemove(this.ids).then(res => {
              // console.log(res);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getShopList();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    //顶部navbar切换
    handleClick(tab) {
      this.activeName = tab.name;
      // console.log(tab.name);
      this.getShopList();
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
    //商品状态
    shopStatus(status) {
      if (status == 1) {
        return "上架";
      } else if (status == 0) {
        return "仓库";
      }
    },
    //审核状态
    checkingStatus(status) {
      switch (status) {
        case 1:
          return "通过";
          break;
        case 2:
          return "拒绝";
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
