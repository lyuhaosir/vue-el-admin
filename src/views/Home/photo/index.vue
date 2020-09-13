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
      <div class="left">
        <div class="top_nav">
          <ul>
            <li
              v-for="(item,i) in imgNavList"
              :key="i"
              :class="activeIndex==i?'active':''"
              @click="getImgList(item,i)"
            >
              <span class="text">{{item.name}}</span>
              <el-dropdown>
                <el-button size="mini" type="1">
                  <span>{{imgNavList[i].images_count}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>修改</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </div>
        <div class="bottom-page">
          <el-pagination
            @current-change="handleCurrentChange"
            class="page"
            :page-size="10"
            prev-text="上一页"
            next-text="下一页"
            layout="prev , next"
            :total="this.total"
          ></el-pagination>
        </div>
      </div>
      <div class="right">
        <header>
          <div class="box">
            <el-col :span="8" v-for="(item, i) in imageList" :key="i">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="item.url" class="image" />
                <div class="imgOpacity"><p>{{item.path}}</p></div>
                <div class="el-button-text">
                  <el-button-group>
                    <el-button size="mini" type="" icon="el-icon-view" :preview-src-list="srcList" ></el-button>
                    <el-button size="mini" type="" icon="el-icon-edit"></el-button>
                    <el-button size="mini" type="" icon="el-icon-delete"></el-button>
                  </el-button-group>
                </div>
              </el-card>
            </el-col>
          </div>
        </header>
        <footer>
          <el-pagination
            :current-page="this.listPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="this.listPageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.listTotal"
          ></el-pagination>
        </footer>
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
      //nav总条数
      total: 0,
      //nav页数
      page: 1,
      //nav每页的条数
      pageSize: 10,
      //右侧图片列表
      imgNavList: [],
      //触发时的索引值
      activeIndex: 0,
      //排序
      order: "",
      //右侧总条数
      listTotal: 0,
      //右侧页码
      listPage: 1,
      //右侧每页显示的条数
      listPageSize: 10,
      //nvaId
      navId: 239,
      //右侧数据列表
      imageList: [],
      //大图模式
      srcList:''
    };
  },
  methods: {
    getImgList(item, i) {
      this.activeIndex = i;
      this.navId = item.id;
      // console.log(item.id);
      
      this.getImageList();
      // console.log(item.id);
    },
    //切换页码
    handleCurrentChange(page) {
      // console.log(page);
      this.page = page;
      this.getImageList();
    },
    //请求导航数据
    getImageNav() {
      imageApi.getImageNav(this.page, this.pageSize).then(res => {
        if (res.msg == "ok") {
          this.imgNavList = res.data.list;
          // console.log(res.data.list);
          this.navId = res.data.list[0].id;
          this.total = res.data.totalCount;
        }
      });
    },
    //请求图片列表数据
    getImageList() {
      imageApi
        .getImageList(this.navId, this.page, this.pageSize, this.order)
        .then(res => {
          // console.log(res);
          if (res.msg == "ok") {
            console.log(res.data.list);
            this.imageList = res.data.list;
          }
        });
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getImageNav();

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
  bottom: 0px;
  border-bottom: 1px solid #dee2e6;
  .left {
    width: 200px;
    position: absolute;
    z-index: 10;
    top: 0;
    bottom: 60px;
    left: 0;
    background: red;
    .top_nav {
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
          .text {
            width: 90px;
            overflow: hidden;
            text-overflow: ellipsos;
            white-space: nowrap;
          }
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
          border-top: 1px solid #c2e7b0 !important;
          border-bottom: 1px solid #c2e7b0 !important;
        }
      }
    }

    .bottom-page {
      float: left;
      width: 200px;
      box-sizing: border-box;
      border-right: 1px solid #dee2e6;
      border-top: 1px solid #dee2e6;
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
  }
  .right {
    position: absolute;
    top: 0;
    left: 200px;
    right: 0;
    bottom: 0;
    header {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      bottom: 60px;
      left: 0;
      right: 0;
      .box {
        width: 100%;
        .el-col {
          margin-right: 10px;
          width: 16%;
          border-radius: 4px;
          border: 1px solid #ebeef5;
          background-color: #ffffff;
          overflow: hidden;
          color: #c2c2c2;
          -webkit-transition: 0.3s;
          transition: 0.3s;
          cursor: pointer;
          position: relative;
          .imgOpacity{
            position: absolute;
            left: 1px;
            right: 1px;
            top: 76px;  
            background: rgba(0,0,0,0.5);
            height: 24px;
            line-height: 24px;
            p{
              color: white;
              padding-left: 10px;
              box-sizing: border-box;
              opacity: 1!important;
              width: 100%;
              font-size: 13px;
            }
          }
          img {
            width: 100%;
            height: 100px;
            cursor: pointer;
          }
          .el-button-text{
            padding: 8px;
            box-sizing: border-box;
            height: 47px !important;
            text-align: center;
          }
          
          .el-button-group{
            margin: 0 auto;
            button{
              padding: 8px;
            }
          }
        }
      }
    }
    footer {
      box-sizing: border-box;
      padding: 14px 10px;
      height: 60px;
      position: absolute;
      bottom: 0px;
      left: 0;
      right: 0;
      border-top: 1px solid #dee2e6;
    }
  }
}
</style>