# Vue-Node-Blog
Vue + Node + MySql 搭建个人博客，一步一个脚印

[TOC]

# 1、准备工作

## 安装node，这是必须的
新版node自带npm，安装Node.js时会一起安装，npm的作用就是对Node.js依赖的包进行管理，也可以理解为用来安装/卸载Node.js需要装的东西。
验证是否安装成功：  
![验证是否安装成功](http://otr9a8wg0.bkt.clouddn.com/17-7-28/48974756.jpg)  
推荐windows下终端工具：[cmder](http://cmder.net/)

## npm安装vue-cli
使用npm下载依赖包是可能有些慢，所以这里可以换上淘宝的镜像cnpm。  
打开终端(可以在任何位置)，输入  
```npm install cnpm -g --registry=https://registry.npm.taobao.org```   
cnpm跟npm用法完全一致，只是在执行命令时将npm改为cnpm。  
现在来安装vue-cli：输入  
```cnpm install -g vue-cli``` 或者 ```cnpm install -g vue-cli```  
命令中 -g 表示全局安装，会安装到node安装目录下的node_modules文件夹下，看看里面是不是多了vue-cli文件夹

## vue-cli快速构建项目
- 选定一个你喜欢的文件夹，进入该文件夹下，之后创建的项目目录就在文件夹下
- 打开终端，进入目标文件夹，以 D:\ 为例，使用webpack模板构建项目，输入 
```vue init webpack my-blog```  
此时会自动从github下载文件目录到目标文件夹，上不了github的只能想办法了，从别处把构建好的文件全部拷过来也是可以的。

## 运行项目
- 进入my-blog文件夹，首先可以看到文件夹下有一个package.json文件，这个文件很重要，里面记录的项目的一些信息和运行成功运行项目必须的一些依赖包，之后安装的一些包也要记录到里面，方便别人拷贝过来你的项目时安装依赖，顺利运行。
- 终端输入（要在此文件夹下）输入：```cnpm install``` install可以简写为 i 即 ```cnpm i```，cnpm安装应该挺快的，安装完成后会看到文件夹下多了个node_modules文件夹，里面就是运行项目所需要的一些依赖包，可以看到此文件夹虽然不大，但是里面文件个数有上千个，所以拷贝起来也是挺麻烦的，所以把依赖包记录到package.json里面，别人只要重新下载安装一下就好了，上传到github上也方便。
- 启动项目：  
输入 ```npm run dev```，等待浏览器自动打开。  
npm run dev 执行的命令即是package.json里 scripts下的dev：node build/dev-server.js
```
 "scripts": {
    "dev": "node build/dev-server.js",
    "start": "node build/dev-server.js",
    "build": "node build/build.js"
  },
```
![构建项目](http://otr9a8wg0.bkt.clouddn.com/17-8-2/419050.jpg) 

默认端口为8080，若此时8080端口被占用则会出错
```
...
> Starting dev server...
events.js:160
 throw er; // Unhandled 'error' event
      ^
Error: listen EADDRINUSE :::8080  
.....
```
可以在D:\my-blog\config\index.js里修改端口  
```
dev: {
    env: require('./dev.env'),
    port: 8080, // 端口号
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
```
启动成功后：
```
...
Compiled successfully in 2057ms 
> Listening at http://localhost:8080
``` 
![启动成功](http://otr9a8wg0.bkt.clouddn.com/17-7-28/73659113.jpg)


# 2、前段页面搭建
``
页面都是自己在网上搜索一些博客，然后仿照加点自己的想法写的，。。。
``
## 安装依赖
首先安装项目要用到的一些组件：
- element-ui：饿了么前段组件库，可以帮助快速建立起前段页面，少些很多样式
- vuex：vue状态管理
- axios：http...  
- mysql：
- express：
- body-parser：

可以依次安装：  
```
cnpm install element-ui --save  （回车）
cnpm install vuex --save  （回车）
cnpm install axios --save  （回车）
cnpm install mysql： --save  （回车）
cnpm install express： --save  （回车）
cnpm install body-parser --save  （回车）
```
也可以一起安装：
```
cnpm install element-ui vuex axios mysql express body-parser --save  （回车）
```
--save意思就是将次依赖记录在package.json里，方便别人通过npm install下载使用
```
"dependencies": {
    "axios": "^0.16.2",
    "element-ui": "^1.3.7",
    "vue": "^2.3.3",  // 项目构建完就有了
    "vue-router": "^2.5.3",  // 项目构建完就有了 当时"Install vue-router"选了Yes
    "vuex": "^2.3.1",
    "mysql": "^2.14.0",
    "body-parser": "^1.17.2",
    "express": "^4.14.1"
  },
```

## 写页面
1、打开入口js文件main.js，引入element-ui组件来搭建页面 [element-ui 查看官网文档](http://element.eleme.io/#/zh-CN/component/installation)
```
<!-- main.js -->
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
```
2、每个页面都相当于一个组件，文件以.vue结尾，第一次启动成功时看到的页面就是组件Hello.vue，路径src/components/Hello.vue。路由地址在 src/router/index.js 中配置，打开修改我们待会自己要用的：
```
<!-- src/router/index.js -->
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/page/Home' // 引入组件Home（待会创建）
import Article from '@/components/page/Article' // 引入组件Article（待会创建）

Vue.use(Router)

export default new Router({
  routes: [
    // {	默认的
    //   path: '/', // http://localhost:8080/#/
    //   name: 'Hello',
    //   component: Hello
    // },
    {
      path: '/',  // http://localhost:8080/#/
      name: 'Home',
      component: Home,
    },
    {
      path: '/',  
      name: 'Article',
      component: Article,
      // children里的组件页面都包含在在Article组件里，<router-view></router-view>路由切换来显示
      children: [
        {
          path: 'blog', // http://localhost:8080/#/blog
          name: 'Blog',
          component: resolve => require(['@/components/page/Blog'], resolve)  // 懒加载引入
        },
        {
          path: '', // http://localhost:8080/#/about
          name: 'About',
          component: resolve => require(['@/components/page/About'], resolve)
        },
        {
          path: 'comment', // http://localhost:8080/#/comment
          name: 'Comment',
          conponent: resolve => require(['@/components/page/Comment'], resolve)
        },
        {
          path: 'contact', // http://localhost:8080/#/contact
          name: 'Contact',
          component: resolve => require(['@/components/page/Contact'], resolve)
        }
      ]
    }
  ]
})

```
3、编写组件  
在src/components下新建两个文件夹，分别叫common、page，用来存放我们自己创建的组件。详细代码github上查看[Vue-Node-Blog](https://github.com/Moon-Future/Vue-Node-Blog)


...






# Express后端配置，MySql数据库连接
>先说明为什么选用MySql数据库，网上大多都是关于mongodb的教程，我原本也是想使用mongodb，无奈公司网络限制，没有权限安装任何东西（github上不了，各种网站打不开，好苦逼的，好在npm可以使用），mongodb也是无法安装，压缩包版又缺少什么dll文件，电脑上只有MySql数据库，并且有可视化工具Navicat for MySQL操作起来也是很方便。 之前MySql基本没怎么用过，所以现在也是边学边用，一些sql语句还是找同事帮忙的，在此只为能完成功能即可，优化什么的以后再慢慢搞。

后端使用Express做服务端提供数据接口，不了解的可以先去官网文档大致了解一下 [Express官网](http://expressjs.com/en/starter/installing.html)，在根目录my-blog下创建文件夹server用来存放后端数据库配置数据和相关方法api。  
server文件夹下创建文件：index.js, router.js, api.js, db.js, sqlMap.js

## 1、启动文件 index.js
```
const routerApi = require('./router');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api', routerApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
```

## 2、express路由配置 router.js
```
var express = require('express')
var router = express.Router();
var api = require('./api')

router.get('/blog/getBlogAll', function(req, res, next) {
  // api.getBlogAll(req, res, next);
  res.send('Hello World!');
})

module.exports = router;
```


## 3、数据库连接配置（登录数据库）db.js
```
<!-- db.js -->
// 数据库连接配置
module.exports = {
  mysql: {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'node_blog',
    port: '3306'
  }
}
```
user、password视自己数据库的连接信息配置，不懂的百度哈，后面也可以测试看是否连接成功，我的数据库连接信息如下：  
![连接信息](http://otr9a8wg0.bkt.clouddn.com/17-8-2/84026052.jpg)  

## 4、sql语句 sqlMap.js
```
var sqlMap = {
  blog: {
    insert:'INSERT INTO user(user_id,author,title,tyep,loadURL,tag,summary,posy_time,upd_time) VALUES(8023,陈亮,?,0,$,tag,?,?,?)',
    update:'update blog set name=?, age=? where id=?',
    delete: 'delete from blog where id=?',
    queryById: 'select * from blog where id=?',
    queryAll: 'select * from blog'
  },
}

module.exports = sqlMap;
```

## 5、数据库连接、api接口 api.js
```javascript
var mysql = require('mysql');
var mysqlConf = require('./db');
var sqlMap = require('./sqlMapping');

// 连接数据库
var pool = mysql.createPool({
  host: mysqlConf.mysql.host,
  user: mysqlConf.mysql.user,
  password: mysqlConf.mysql.password,
  database: mysqlConf.mysql.database,
  port: mysqlConf.mysql.port
})

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, data) {
  if(typeof data === 'undefined') {
    res.json({
      code:'1',
      msg: '操作失败'
    });
  } else {
    res.json(data);
  }
};

module.exports = {
  getBlogAll(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.blog.queryAll, (err, result) => {
        jsonWrite(res, result);
        connection.release();
      })
    })
  },
  getTagAll(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.tag.queryAll, (err, result) => {
        jsonWrite(res, result);
        connection.release();
      })
    })
  },
}
```

