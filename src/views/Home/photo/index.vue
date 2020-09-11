<template>
  <div class>
    <div class="header">
      <div class="head-left">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline">
          <el-form-item label>
            <el-select size="mini" v-model="formSearch.sort" placeholder>
              <el-option label="降序" value="降序"></el-option>
              <el-option label="升序" value="升序"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label>
            <el-input size="mini" v-model="formSearch.imgName" placeholder="输入图片名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="success">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="head-right">
        <el-button type="success" size="mini">创建相册</el-button>
        <el-button type="warning" size="mini">上传图片</el-button>
      </div>
    </div>
    <div class="body">
      <div class="b-left">
        <ul>
          <li v-for="(item,i) in imgList" :key="i" :class="activeIndex==i?'active':''">
            {{item.name}}
            <el-dropdown>
              <el-button size="mini" type="1">
                <span>1</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item>双皮奶</el-dropdown-item>
                <el-dropdown-item>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
      <div class="b-right"></div>
    </div>
    <div class="foot">
      <div class="f-left">
        <el-pagination
          class="page"
          :page-size="10"
          prev-text="上一页"
          next-text="下一页"
          layout="prev , next"
          :total="1000"
        ></el-pagination>
      </div>
      <div class="f-right">
        <el-pagination
          :current-page="this.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="this.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import imageApi from "@/api/photo";
export default {
  name: "",
  data() {
    return {
      formSearch: {
        sort: "降序",
        imgName: ""
      },
      total: 10,
      page: 1,
      pageSize: 10,
      imgList: [],
      activeIndex: 0
    };
  },
  methods: {
    getImageList() {
      imageApi.getImageList(this.page, this.pageSize).then(res => {
        if (res.msg == "ok") {
          this.imgList = res.data.list;
          console.log(res.data.list);
        }
      });
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getImageList();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang='scss'>
/* @import url(); 引入css类 */
.header {
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #dee2e6 !important;
  display: flex;
  justify-content: space-between;
  .el-form-item {
    height: 60px;
    padding-top: 10px;
    box-sizing: border-box;
    width: 150px;
  }
}
.body {
  position: absolute;
  left: 0;
  right: 0;
  top: 115px;
  bottom: 60px;
  border-bottom: 1px solid #dee2e6;
  .b-left {
    width: 200px;
    height: 100%;
    background: white;
    box-sizing: border-box;
    border-right: 1px solid #dee2e6;
    overflow: hidden;
    overflow-y: scroll;
    ul {
      width: 100%;
      li {
        width: 100%;
        width: 100%;
        height: 56px;
        line-height: 56px;
        border-bottom: 1px solid #dee2e6;
        border-top: 1px solid #dee2e6;
        padding: 0 1.25rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        margin-top: -1px;
        button {
          padding: 7px 10px;
        }
      }
      li:hover {
        background: #f8f9fa;
      }
      .active {
        color: #67c23a !important;
        background-color: #f0f9eb !important;
        border-top:1px solid #c2e7b0 !important;
        border-bottom:1px solid #c2e7b0 !important;
      }
    }
  }
}
.foot {
  height: 60px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #dee2e6;
  box-sizing: border-box;
  .f-left {
    float: left;
    width: 200px;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid #dee2e6;
    .page {
      padding: 15px 31px;
      box-sizing: border-box;
      /deep/button {
        border: 1px solid #dee2e6;
        border-radius: 2px;
        width: 68px;
      }
    }
  }
  .f-right {
    height: 60px;
    float: left;
    padding: 15px 10px;
    box-sizing: border-box;
  }
}
</style>