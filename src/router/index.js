import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/page/Home'
import Article from '@/components/page/Article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
    	path: '/',
    	name: 'Article',
    	component: Article,
    	children: [
    		{
    			path: 'blog',
    			name: 'Blog',
    			component: resolve => require(['@/components/page/Blog'], resolve)
    		},
    		{
    			path: 'about',
    			name: 'About',
    			component: resolve => require(['@/components/page/About'], resolve)
    		},
    		{
    			path: 'comment',
    			name: 'Comment',
    			conponent: resolve => require(['@/components/page/Comment'], resolve)
    		},
    		{
    			path: 'contact',
    			name: 'Contact',
    			component: resolve => require(['@/components/page/Contact'], resolve)
    		}
    	]
    }
  ]
})
