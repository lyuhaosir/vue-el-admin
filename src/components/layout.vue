<template>
  <div class="layout">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
export default {
  components: { AppHeader },
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
<style lang='scss'>
/* @import url(); 引入css类 */
.app-header {
  width: 100%;
  background: #545c64;
  color: white;
  position: absolute;
  height: 60px;
  line-height: 60px;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 20px;
  box-sizing: border-box;
}
.app-nav-bar {
  // min-height:900px;
  width: 200px;
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  ul {
    box-sizing: border-box;
    background: white;
    height: 100%;
    border-right: 1px solid #dee2e6 !important;
    border-bottom: 1px solid #dee2e6;
    li {
      height: 56px;
      line-height: 56px;
      padding: 0 20px;
      box-sizing: border-box;
      font-size: 14px;
      color: #303133;
      cursor: pointer;
      i {
        font-size: 18px;
        color: #909399;
        padding: 0 5px 0 0;
      }
    }
    li:hover {
      background: #e2f1ed;
    }
    .NavActive {
      color: #008080;
      i {
        color: #008080;
      }
    }
  }
}
.app-main {
  // min-height:532px;
  position: absolute;
  left: 200px;
  right: 0;
  top: 60px;
  bottom: 0;
  background: #f8f9fa;
  overflow: hidden;
  overflow:auto;
}
</style>