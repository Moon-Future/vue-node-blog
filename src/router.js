// import Vue from 'vue'
// import Router from 'vue-router'
import Home from './views/front/Home.vue'
import Admin from './views/admin/Admin.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: () => import('@/views/front/Article.vue'),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/catalog',
      name: 'Catalog',
      component: () => import('@/views/front/Catalog.vue'),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ './views/front/About.vue')
    },
    {
      path: '/login',
      name: 'Login',
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
