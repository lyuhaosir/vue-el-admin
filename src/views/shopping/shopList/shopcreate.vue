<template>
  <div class="shoplist">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input
          v-model="form.name"
          placeholder="请输入商品名称，不能超过60个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="form.region" placeholder="请选择商品分类">
          <el-option label="服装" value="服装"></el-option>
          <el-option label="|--水果" value="|--水果"></el-option>
          <el-option label="|----新分类" value="|----新分类"></el-option>
          <el-option label="|--新分类" value="|--新分类"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input
          type="textarea"
          v-model="form.desc"
          placeholder="选填，商品买点简述，例如：此款商品美观大方 性价比高 不容错过"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品单位">
        <el-input
          v-model="form.name"
          placeholder="请输入商品单位"
        ></el-input>
      </el-form-item>
      <el-form-item label="总库存">
        <el-input-number
          v-model="num1"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="库存预警">
        <el-input-number
          v-model="num2"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="最低售价">
        <el-input-number
          v-model="num3"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="最低原价">
        <el-input-number
          v-model="num4"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="库存显示">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="库存显示">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      form: {
        title:'',
        gate:'',
        desc:'',
      }
    };
  },
  methods: {
    onSubmit(){},
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.shoplist {
  // position: relative;
  max-height: 720px;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  padding: 0 16px;
}
</style>
