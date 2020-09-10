import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//默认样式
import './assets/reset/normalize.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
