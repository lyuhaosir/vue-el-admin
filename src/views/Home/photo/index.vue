<template>
  <div class>
    <div class="header">
      <div class="head-left">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline">
          <el-form-item label prop="sort">
            <el-select size="mini" :v-model="formSearch.sort" value="降序" placeholder>
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
        <el-button type="success" size="mini" @click="addAlbumDialog=true">创建相册</el-button>
        <el-button type="warning" size="mini" @click="addImageDialog=true">上传图片</el-button>
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
              <el-dropdown @command="switchAlbum">
                <el-button size="mini" type="1">
                  <span>{{imgNavList[i].images_count}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="beforeHandleCommand(item,'a')">修改</el-dropdown-item>
                  <el-dropdown-item :command="beforeHandleCommand(item,'b')">删除</el-dropdown-item>
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
                <div class="imgOpacity">
                  <p>{{item.name}}</p>
                </div>
                <div class="el-button-text">
                  <el-button-group>
                    <el-button size="mini" type @click='viewImage' icon="el-icon-view" :preview-src-list="srcList"></el-button>
                    <el-button size="mini" type @click="changeSolaImg(item)" icon="el-icon-edit"></el-button>
                    <el-button size="mini" type @click="removeSolaImg(item)" icon="el-icon-delete"></el-button>
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

    <!-- 添加相册 -->
    <el-dialog title="创建相册" :visible.sync="addAlbumDialog">
      <el-form :model="addForm" :rules="addalbum" ref="addForm">
        <el-form-item label="相册名称" label-width="80px" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入相册名称"></el-input>
        </el-form-item>
        <el-form-item label="相册排序" label-width="80px">
          <el-input-number v-model="addForm.order" :min="0" label></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAlbumDialog = false">取 消</el-button>
        <el-button type="primary" @click="addAlbum('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改相册 -->
    <el-dialog title="修改相册" :visible.sync="changeAlbumDialog">
      <el-form :model="changeForm" :rules="changealbum" ref="addForm">
        <el-form-item label="相册名称" label-width="80px" prop="name">
          <el-input v-model="changeForm.name" placeholder="请输入相册名称"></el-input>
        </el-form-item>
        <el-form-item label="相册排序" label-width="80px">
          <el-input-number v-model="changeForm.order" :min="0" label></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeAlbumDialog = false">取 消</el-button>
        <el-button type="primary" @click="alterAlbum('addAlbum')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 上传图片 -->
    <el-dialog title="上传图片" @close="closeDialog" :visible.sync="addImageDialog">
      <div class="text-center">
      <el-upload
        class="upload-demo"
        drag
        action='/dev-api/image/upload'
        multiple
        name='img'
        :headers='{token:token}'
        :data="{image_class_id:navId}"
        :on-success="handleChange"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      </div>
    </el-dialog>
    <!-- 查看大图 -->
    <el-dialog
    :visible.sync="viewImageShow"
     width="30%"
     class="viewImage">
</el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import imageApi from "@/api/photo";
export default {
  name: "",
  data() {
    return {
      //
      token:'',
      //查看大图
      viewImageShow:false,
      //升序降序
      formSearch: {
        sort: "desc",
        imgName: ""
      },
      //添加相册
      addForm: {
        order: 0,
        name: ""
      },
      //修改相册
      changeForm: {
        id: 0,
        order: 0,
        name: ""
      },
      //添加相册规则验证
      addalbum: {
        name: [{ required: true, message: "请输入相册名称", trigger: "blur" }]
      },
      //修改相册规则验证
      changealbum: {
        name: [{ required: true, message: "请输入相册名称", trigger: "blur" }]
      },
      addAlbumDialog: false,
      addImageDialog: false,
      changeAlbumDialog: false,
      fileList: [],
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
      //右侧总条数
      listTotal: 0,
      //右侧页码
      listPage: 1,
      //右侧每页显示的条数
      listPageSize: 10,
      //nvaId
      navId: 0,
      //右侧数据列表
      imageList: [],
      //大图模式
      srcList: ""
    };
  },
  methods: {
    //查看大图
    viewImage(){
      this.viewImageShow=true;
    },
    //上传图片
    handleChange(response, file, fileList) {
      console.log(response);
      
      
    },
    closeDialog() {
      this.getImageNav()
      this.getImageList(this.navId)
    },
    //添加相冊
    addAlbum(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          imageApi.setAlbum(this.addForm.order, this.addForm.name).then(res => {
            if (res.msg == "ok") {
              this.getImageNav();
              this.addAlbumDialog = false;
              console.log(res);
            } else {
              console.log(error);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除相册
    removeAlbum(item) {
      console.log(item.id);
      this.$confirm("是否删除该相册？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          imageApi.removeAlbum(item.id).then(res => {
            if (res.msg == "ok") {
              // this.navId =
              this.$message.success("删除成功");
              this.getImageNav();
            } else {
              console.log("remove error");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改相册
    changeAlbum(item) {
      // console.log(item);
      this.changeForm.id = item.id;
      this.changeForm.name = item.name;
      this.changeForm.order = item.order;
      // console.log(item.id,item.name,item.order);
      this.changeAlbumDialog = true;
    },
    //修改相册
    alterAlbum() {
      imageApi
        .changeAlbum(
          this.changeForm.id,
          this.changeForm.name,
          this.changeForm.order
        )
        .then(res => {
          if (res.msg == "ok") {
            this.getImageNav();
            this.changeAlbumDialog = false;
            this.$message.success("修改成功");
          } else {
            this.changeAlbumDialog = false;
            console.log("change error");
          }
        });
    },
    //获取当前要修改属性的id
    beforeHandleCommand(item, command) {
      return {
        item: item,
        command: command
      };
    },
    //switch删除与修改相册
    switchAlbum(command) {
      switch (command.command) {
        case "a":
          //修改相册方法
          this.changeAlbum(command.item);
          break;
        case "b":
          //删除相册方法
          this.removeAlbum(command.item);
          break;

        default:
          break;
      }

      // imageApi.removeAlbum(id).then(res => {
      //   this.getImageNav();
      //   this.$message.success("删除成功");
      // });
    },
    //删除单张图片
    removeSolaImg(item) {
      console.log(item);
      imageApi.removeSolaImg(item.id).then(res => {
        if (res.msg == "ok") {
          this.getImageList(this.navId);
          this.getImageNav();
        } else {
          console.log("remove error");
        }
      });
    },
    //修改单张图片名称
    changeSolaImg(item) {
      this.$prompt("请输入新昵称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: item.name,
        inputPattern: /\S/,
        inputErrorMessage: "图片名称不能为空"
      })
        .then(({ value }) => {
          imageApi.changeSolaImg(item.id, value).then(res => {
            if (res.msg == "ok") {
              this.$message({
                type: "success",
                message: "修改成功"
              });
              this.getImageList(this.navId);
            } else {
              console.log("changeSolaImg error");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    //上传图片
    addFile(file) {
      imageApi.setImage(file, this.navId).then(res => {
        console.log(res);
      });
      this.addImageDialog = false;
    },
    //点击nav导航获取右侧图片列表
    getImgList(item, i) {
      this.activeIndex = i;
      this.navId = item.id;
      // console.log(item.id);
      // console.log(this.navId);
      

      this.getImageList(item.id);
      // console.log(item.id);
    },
    //切换页码
    handleCurrentChange(page) {
      // console.log(page);
      this.page = page;
      this.getImageNav();
    },
    //请求导航数据
    getImageNav() {
      imageApi.getImageNav(this.page, this.pageSize).then(res => {
        if (res.msg == "ok") {
          this.imgNavList = res.data.list;
          // console.log(res.data.list);
          // this.navId = res.data.list[0].id;
          this.total = res.data.totalCount;
          this.navId = res.data.list[0].id
          console.log(res.data.list[0].id);
          
          this.getImageList(res.data.list[0].id);

        }
      });
    },
    //请求图片列表数据
    getImageList(id) {
      // console.log(id);
      
      imageApi
        .getImageList(
          id,
          this.page,
          this.pageSize,
          this.formSearch.sort
        )
        .then(res => {
          // console.log(res);
          if (res.msg == "ok") {
            // console.log(res.data.list);
            this.imageList = res.data.list;
          }
        });
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getImageNav();
    // console.log(this.navId);
     console.log(this.navId);
      
      const a = localStorage.getItem('admin_token');
      // console.log(a);
      
      this.token = a
     
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
          .imgOpacity {
            position: absolute;
            left: 1px;
            right: 1px;
            top: 76px;
            background: rgba(0, 0, 0, 0.5);
            height: 24px;
            line-height: 24px;
            p {
              color: white;
              padding-left: 10px;
              box-sizing: border-box;
              opacity: 1 !important;
              width: 100%;
              font-size: 13px;
            }
          }
          img {
            width: 100%;
            height: 100px;
            cursor: pointer;
          }
          .el-button-text {
            padding: 8px;
            box-sizing: border-box;
            height: 47px !important;
            text-align: center;
          }

          .el-button-group {
            margin: 0 auto;
            button {
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