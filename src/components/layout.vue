<template>
  <div class="layout">
      <app-header></app-header>
      <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
export default {
  components: { AppHeader},
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
<style>
/* @import url(); 引入css类 */
.app-header{
    width: 100%;
    background: #545C64;
    color: white;
    position: absolute;
    height: 60px;
    line-height: 60px;
    top:0;
    left: 0;
    right: 0;
    padding:0 20px;
    box-sizing: border-box;
}
.app-nav-bar{
    width: 200px ;
    position: absolute;
    top: 60px;
    bottom: 0;
    left:0;
    background: gray;
}
.app-main{
    position: absolute;
    left: 200px;
    right: 0;
    top:60px;
    bottom:0;
    background: #F8F9FA;
}
</style>