<template>
  <div>
    <div class="app-nav-bar">
      <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :router='true'
    >
      <el-menu-item index="/order/order/list">
        <i class="el-icon-setting"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="/order/invoice/list">
        <i class="el-icon-setting"></i>
        <span slot="title">发票管理</span>
      </el-menu-item>
      <el-menu-item index="/order/after-sale/list">
        <i class="el-icon-setting"></i>
        <span slot="title">售后服务</span>
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
  props: [],
  name: "",
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
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