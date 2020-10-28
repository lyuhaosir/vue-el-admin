<template>
  <div class="crumbs" v-if="this.$route.path != '/index'">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">
        <span>后台首页</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item style="color:#606266">{{this.$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  <el-button v-show="this.$route.path == '/shop/goods/create'" size="mini" @click="$router.push('/shop/goods/list')">回到商品列表</el-button>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang='scss'>
/* @import url(); 引入css类 */
.crumbs {
  width: 100%;
  height: 55px;
  line-height: 55px;
  padding: 20px;
  box-sizing: border-box;
  background: white;
  border-bottom: 1px solid #dee2e6 !important;
  span {
    color: #303133;
    font-weight: bolder;
    cursor: pointer;
  }
}
.el-button{
  position: absolute;
  top: 13px;
  left: 200px;
}
</style>