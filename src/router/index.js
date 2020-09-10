import Vue from "vue";
import VueRouter from "vue-router";

import home from './home'
import shopping from './shopping'
import order from './order'
import member from './member'
import setting from './setting'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () =>   
      import('@/components/layout'),
      redirect:'/index',
      children:[
        ...home,
        ...shopping,
        ...order,
        ...member,
        ...setting
      ],
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
