import Vue from 'vue'
import Router from 'vue-router'
import Container from './views/front/Container.vue'
import Admin from './views/admin/Admin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'container',
      component: Container,
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('@/views/front/Home.vue')
        },
        {
          path: 'article/:id',
          name: 'Article',
          component: () => import('@/views/front/Article.vue')
        },
        {
          path: '/catalog',
          name: 'Catalog',
          component: () => import('@/views/front/Catalog.vue')
        },
      ]
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
