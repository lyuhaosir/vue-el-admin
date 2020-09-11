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

    <div class="center-left">
      <div class="c-l-box">
        <div class="c-l-head">
          <p>
            <span>交易提示</span>
            <a href>需要立即处理的交易订单</a>
          </p>
        </div>
        <div class="c-l-body">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="center-right">
      <div class="c-l-head"></div>
      <div class="c-l-body"></div>
    </div>

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
      padding: 20px;
      box-sizing: border-box;
    }
  }
  .header-right {
    @extend .header-left;
  }
  .center-left {
    .c-l-box {
      width: 100%;
      height: 170px;
      background: white;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      background-color: #ffffff;
      overflow: hidden;
      color: #303133;
      -webkit-transition: 0.3s;
      transition: 0.3s;
      .c-l-head {
        width: 100%;
        padding: 20px;
        border-bottom: 1px solid #ebeef5;
        box-sizing: border-box;
        height: 60px;
        p {
          height: 24px;
          line-height: 20px;
          .span {
            float: left;
            color: #303133;
            font-size: 16px;
          }
          a {
            float: right;
            text-decoration: none;
            color: #008080;
            font-size: 14px;
          }
        }
      }
      .c-l-body {
        padding: 20px;
        width: 100%;
        height: 110px;
        box-sizing: border-box;
        ul {
          width: 100%;
          display: flex;
          justify-content: space-between;
          li {
            width: 15%;
            height: 70px;
            padding: 6px 12px;
            box-sizing: border-box;
            background: #f8f9fa;
            border-radius: 4px;
            border: 1px solid #ebeef5;
            background-color: #ffffff;
            overflow: hidden;
            color: #303133;
            -webkit-transition: 0.3s;
            transition: 0.3s;
          }
        }
      }
    }
  }
  .center-right {
  }
}
</style>