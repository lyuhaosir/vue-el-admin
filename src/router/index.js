import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () =>
      import('@/components/layout')
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import('@/views/login')
  },
];

const router = new VueRouter({
  routes
});

export default router;
