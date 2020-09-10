<template>
  <div class="login">
    <div class="box">
      <div class="box-header">
        <h3>UNI-ADMIN</h3>
      </div>
      <div class="box-body">
        <el-form
          :model="formLogin"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="" prop="username">
            <el-input type="password" v-model="formLogin.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input type="password" v-model="formLogin.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      formLogin:{
        username:'',
        password:''
      }
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang='scss'>
/* @import url(); 引入css类 */
.box {
  margin: auto;
  width: 443px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin-top: 96px;
  .box-header {
    width: 100%;
    height: 58px;
    line-height: 58px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    h3 {
      color: #6c757d;
      text-align: center;
      font-size: 28px;
      // font-weight: bold;
    }
  }
  .box-body {
    width: 100%;
    height: 226px;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>