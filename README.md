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
![构建项目](http://otr9a8wg0.bkt.clouddn.com/17-7-28/62770024.jpg) 

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

可以依次安装：  
```
cnpm install element-ui --save  （回车）
cnpm install vuex --save  （回车）
cnpm install axios --save  （回车）
```
也可以一起安装：
```
cnpm install element-ui vuex axios --save  （回车）
```
--save意思就是将次依赖记录在package.json里，方便别人通过npm install下载使用
```
"dependencies": {
    "axios": "^0.16.2",
    "element-ui": "^1.3.7",
    "vue": "^2.3.3",  // 项目构建完就有了
    "vue-router": "^2.5.3",  // 项目构建完就有了 当时"Install vue-router"选了Yes
    "vuex": "^2.3.1"
  },
```