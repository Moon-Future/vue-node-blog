// import Vue from 'vue'
// import Router from 'vue-router'
import Home from './views/front/Home.vue'
import Admin from './views/admin/Admin.vue'
import { apiUrl } from '@/serviceAPI.config.js'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
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
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'selfinfo',
          name: 'SelfInfo',
          meta: {
            requireAuth: true
          },
          component: () => import('@/views/admin/SelfInfo.vue')
        },
        {
          path: 'articles',
          name: 'Articles',
          meta: {
            requireAuth: true
          },
          component: () => import('@/views/admin/ArticleList.vue')
        },
        {
          path: 'markdown',
          name: 'Markdown',
          meta: {
            requireAuth: true
          },
          component: () => import('@/views/admin/Markdown.vue')
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    axios.post(apiUrl.getSession).then(res => {
      if (res.data.code === 200) {
        next()
      } else {
        next({path: '/'})
      }
    })
  } else if (to.name === 'Login') {
    axios.post(apiUrl.getSession).then(res => {
      if (res.data.code === 200) {
        next({path: '/admin/selfinfo'})
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

export default router
