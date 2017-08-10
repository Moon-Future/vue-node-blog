import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/page/Home'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
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
				},
				{
					path: 'article/:id/:title',
					name: 'Article',
					component: resolve => require(['@/components/page/Article'], resolve)
				},
				{
					path: 'comment',
					name: 'Comment',
					component: resolve => require(['@/components/page/Comment'], resolve)
				},
			]
		},
		{
			path: 'about',
			name: 'About',
			component: resolve => require(['@/components/page/About'], resolve)
		},
		{
			path: 'contact',
			name: 'Contact',
			component: resolve => require(['@/components/page/Contact'], resolve)
		},
		{
			path: '/login',
			name: 'Login',
			component: resolve => require(['@/components/admin/Login'], resolve),
		},
		{
			path: '/admin',
			name: 'Admin',
			component: resolve => require(['@/components/admin/Admin'], resolve),
			children: [
				{
					path: '/markdown',
					name: 'Markdown',
					component: resolve => require(['@/components/admin/markdown'], resolve),
				}
			]
		}
	]
})