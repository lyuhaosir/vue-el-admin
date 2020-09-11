<template>
  <div class="app-header">
    <h3>UNI-ADMIN</h3>
    <div class="center">
      <ul>
        <li
          v-for="(item, i) in headerList"
          :key="i"
          @click="topList(i)"
          :class=" activeIndex == i?'active':''"
        >{{ item.name }}</li>
      </ul>
      <el-dropdown class="right" @command='handleCommand'>
        <span class="el-dropdown-link">
          <div class="block">
            <el-avatar :size="28" :src="this.list.avatar"></el-avatar>
          </div>
          {{ this.list.username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='a'>修改</el-dropdown-item>
          <el-dropdown-item command='b'>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import loginApi from '@/api/login'
export default {
  name: "",
  data() {
    return {
      list: {},
      headerList: [],
      activeIndex:0
    };
  },
  methods: {
    topList(i) {
      this.$store.commit('getHeadIndex',i)
      this.activeIndex = i;
      // console.log(this.$route.name);
      // console.log();
      const a = this.headerList[i].desc
      const str = a.replace(/_/g,'/')
      // console.log(this.headerList[i].child);
      this.$router.push('/'+str)
    },
    handleCommand(command){
      let  str = command;
      switch (str) {
        case 'a':
            console.log(修改);
          break;
        case 'b':   //退出登录
            const token = localStorage.getItem('admin_token')
            // console.log(token);
            // loginApi.login_out(token).then(res=>{
            //   console.log(res);
            // })
            localStorage.removeItem('admin_token')
            localStorage.removeItem('admin_info')
            this.$message.success('退出成功')
            this.$router.push('/login')
          break;
      
        default:
          break;
      }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    
    this.activeIndex = JSON.parse(localStorage.getItem('admin_NavBar')).active
    //获取本地存储的数据
    const data = JSON.parse(localStorage.getItem("admin_info"));
    //本人信息
    this.list = data;
    this.headerList = data.tree;
    // console.log(this.headerList);
    //分类信息
    // const list = data.role.rules;
    //顶级分类
    // this.headerList = list.filter(item => {
    //   return item.rule_id == 0;
    // });
    // console.log(this.role)
    // console.log(this.list);
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
h3 {
  float: left;
  color: #f8f9fa;
  font-size: 20px;
}
.center {
  font-size: 14px;
  float: right;
  ul {
    float: left;
    li {
      width: 68px;
      text-align: center;
      float: left;
      color: rgb(255, 255, 255);
      border-bottom-color: transparent;
      background-color: rgb(84, 92, 100);
    }
    li:hover {
      cursor: pointer;
      background-color: rgb(67, 74, 80);
    }
    .active {
      box-sizing: border-box;
      height: 60px;
      color: rgb(255, 208, 75);
      border-bottom: 2px solid rgb(255, 208, 75);
      background-color: rgb(84, 92, 100);
    }
  }
  .right {
    padding: 0 20px;
    float: left;
    color: white;
    .block {
      margin-right: 5px;
      .el-avatar {
        vertical-align: middle;
      }
      float: left;
    }
  }
}
.el-dropdown-menu {
  border-color: rgb(84, 92, 100);
  background: rgb(84, 92, 100);
  z-index: 100;
  min-width: 200px;
  border: none;
  padding: 5px 0;
  border-radius: 2px;
}
.el-dropdown-menu__item {
  background: rgb(84, 92, 100);
  color: white;
  float: none;
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
}
.el-dropdown-menu__item:hover {
  cursor: pointer;
  color: rgb(255, 208, 75);
  background-color: rgb(67, 74, 80);
}
</style>
