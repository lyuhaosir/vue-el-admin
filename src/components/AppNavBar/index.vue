<template>
  <div>
    <div class="app-nav-bar">
      <ul>
        <li
          v-for="(item,i) in NavList"
          :key="i"
          :class="item.pathname==$route.name?'NavActive':''"
          @click="goMain(item,i)"
        >
          <i :class="item.icon"></i>
          {{item.name}}
        </li>
      </ul>
      <!-- <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router="true">
        <el-menu-item index="/index">
          <i class="el-icon-setting"></i>
          <span slot="title">后台首页</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-setting"></i>
          <span slot="title">相册列表</span>
        </el-menu-item>
        <el-menu-item index="/shop/goods/list">
          <i class="el-icon-setting"></i>
          <span slot="title">商品列表</span>
        </el-menu-item>
      </el-menu>-->
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
    return {
      NavBarList: [],
      activeIndex: 0
    };
  },
  methods: {
    goMain(item, i) {
      this.activeIndex = i;
      // console.log(item);
      // console.log(item.pathname);
      let name = item.pathname;
      if (item.pathname == "shop_goods_list") {
        this.$store.commit("getHeadIndex",1);
      }
      this.$router.push({ name: name });
    }
  },
  computed: {
    NavList() {
      const list = JSON.parse(localStorage.getItem("admin_NavBar"));
      // console.log(this.$route.name);
      
      
      const i = this.$store.state.NavBar.active;
      // console.log(list.list[i].submenu[0]);
      return list.list[i].submenu;
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    const a = JSON.parse(localStorage.getItem("admin_NavBar")).active;
    this.$store.commit("getHeadIndex", a);
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang='scss'>
/* @import url(); 引入css类 */
</style>