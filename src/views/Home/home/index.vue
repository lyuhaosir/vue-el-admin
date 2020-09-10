<template>
  <div class="HomePage">
    <div class="header-left">
      <div class="s_box"></div>
      <div class="s_box"></div>
    </div>
    <div class="header-right">
      <div class="s_box"></div>
      <div class="s_box"></div>
    </div>

    <div class="center-left"></div>
    <div class="center-right"></div>

    <div class="bottom-left"></div>
    <div class="bottom-right"></div>
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
.HomePage {
  padding: 20px 20px 60px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  div {
    width: 49.2%;
    height: 96px;
    margin-bottom: 10px;
    // background: coral;
  }
  .header-left {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .s_box {
      width: 48.4%;
      height: 96px;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      background-color: #ffffff;
      overflow: hidden;
      color: #303133;
      -webkit-transition: 0.3s;
      transition: 0.3s;
      padding:20px;
      box-sizing:border-box;
    }
  }
  .header-right {
    @extend .header-left;
  }
}
</style>