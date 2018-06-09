import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/page/Home'
import { resolve } from 'path';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/blog',
      name: 'Blog',
      component: resolve => require(['@/components/page/Blog'], resolve),
      children: [
        {
          path: '/blog',
          name: 'BoxCatalog',
          component: resolve => require(['@/components/page/BoxCatalog'], resolve)
        }
      ]
    }
  ]
})
