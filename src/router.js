import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/front/Home.vue'
import Admin from './views/admin/Admin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/front/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/front/Login.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      // component: () => import('@/views/admin/Admin.vue'),
      children: [
        {
          path: 'selfinfo',
          name: 'SelfInfo',
          component: () => import('@/views/admin/SelfInfo.vue')
        },
        {
          path: 'articles',
          name: 'Articles',
          component: () => import('@/views/admin/ArticleList.vue')
        },
        {
          path: 'markdown',
          name: 'Markdown',
          component: () => import('@/views/admin/Markdown.vue')
        }
      ]
    },
  ]
})
