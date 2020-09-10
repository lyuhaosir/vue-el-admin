<template>
  <div>
    <div class="app-nav-bar">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router="true">
        <el-menu-item index="/user/user-list/list">
          <i class="el-icon-setting"></i>
          <span slot="title">会员列表</span>
        </el-menu-item>
        <el-menu-item index="/user/user-level/list">
          <i class="el-icon-setting"></i>
          <span slot="title">会员等级</span>
        </el-menu-item>
      </el-menu>
    </div>
    <AppMain />
  </div>
</template>

<script>
import AppMain from "@/components/AppMain";
export default {
  components: { AppMain },
  name: "",
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.$nextTick(() => {
      const list = JSON.parse(localStorage.getItem("admin_info")).tree;
      const a = list.filter(item => {
        return item.desc == this.$route.name;
      });
      console.log(a);
    });
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang='scss'>
/* @import url(); 引入css类 */
.app-nav-bar {
  font-size: 14px;
}
.el-menu {
  height: 100%;
}
</style>