<template>
  <div class='app-main'>
    <crumbs />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import crumbs from './line'
export default {
  components:{crumbs},
name:"",
data() {
return {

}
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>