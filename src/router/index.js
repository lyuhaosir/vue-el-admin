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
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () =>
          import('@/components/AppNavBar'),
        meta: { title: '首页' },
        redirect: '/index',
        children: [
          ...home
        ]
      },
      {
        path: '/user',
        name: 'user',
        component: () =>
          import('@/components/AppNavBar'),
        meta: { title: '会员' },
        redirect: '/user-list/list',
        children: [
          ...member
        ]
      },
      {
        path: '/order',
        name: 'order',
        component: () =>
          import('@/components/AppNavBar'),
        meta: { title: '订单' },
        redirect: '/order/order/list',
        children: [
          ...order,
        ]
      },
      {
        path: '/shop',
        name: 'shop',
        component: () =>
          import('@/components/AppNavBar'),
        meta: { title: '商品' },
        redirect: '/shop/goods/list',
        children: [
          ...shopping,
        ]
      },
      {
        path: '/set',
        name: 'set',
        component: () =>
          import('@/components/AppNavBar'),
        meta: { title: '设置' },
        redirect: '/set/base',
        children: [
          ...setting
        ]
      }

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
