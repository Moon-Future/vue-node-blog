import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/page/Home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        // 如果你的連結是帶 # 這種
        // to.hash 就會有值(值就是連結)
        // 例如 #3
        if (to.hash) {
            return {
                // 這個是透過 to.hash 的值來找到對應的元素
                // 照你的 html 來看是不用多加處理這樣就可以了
                // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
                selector: to.hash
            }
        }
    },
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
                    component: resolve => require(['@/components/admin/Markdown'], resolve),
                },
                {
                    path: '/articles',
                    name: 'Articles',
                    component: resolve => require(['@/components/admin/ArticleList'], resolve),
                },
                {
                    path: '/user',
                    name: 'User',
                    component: resolve => require(['@/components/admin/User'], resolve),
                }
            ]
        },
        {
            path: '*',
            name: 'Error',
            component: resolve => require(['@/components/page/ErrorPage'], resolve),
        },
    ]
})