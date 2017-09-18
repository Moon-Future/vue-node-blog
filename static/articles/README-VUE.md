# Vue学习笔记

## 1、创建vue实例
```javascript
    var vm = new Vue({
        el: '#id',
        data() {
            return {
                seen: true,
            }
        },
        methods: {

        },
        computed: {

        },
        beforeCreated() {

        },
        created() {

        }
        ...
    })
```

## 2、Vue数据响应式

## 3、markdown

## 4、组件
### 注册组件
- 全局注册  
```javascript
    Vue.component('my-component', {
        template: '<div>我是全局注册组件</div>'
    })
    new Vue({
        el: '#vue-demo'
    })
```
- 局部注册
```javascript
    var Child = {
        template: '<div>我是局部注册组件 -- {{ child }}</div>'
    }
    new Vue({
        el: '#vue-demo'，
        components: {
            'child-component': Child
        }
    })
```

### 组件几种书写方式
1. 使用javascript标签
```javascript
    <script type="text/x-template" id="myComponent">
        <div>This is a component!</div>
    </script>
    <script>
        Vue.component('my-component', {
            template: '#myComponent'
        })
    </script>
```
2. 使用template标签
```javascript
    <body>
        <template id="myComponent">
            <div>This is a component!</div>
        </template>
    </body>
    Vue.component('my-component', {
        template: '#myComponent'
    })
```
3. .vue 单文件组件


### 父子组件通讯
- 父 -> 子 props
- 子 -> 父 #emit

## vuex

vuex与全局变量的不同：
- Vuex的状态存储是响应式的。store里的状态发生变化，则vue组件内部的状态也会发生变化。 
- 不能直接改变store中的状态。唯一改变store中的状态途径就是显式地提交（commit）mutations。这样使得我们可以方便得跟踪每个状态的变化。

vuex大体可以看作四步：
1. action里面查到这个事件的触发
2. mutaction里面查看对应处理
3. 改变store的状态
4. getter视图渲染


## ES6解构对象
```javascript
    var obj1 = {
        'a': 1,
        'b': 2,
        'c': 3
    }
    var {a,c,d} = obj1;
    console.log(a);

    var obj2 = {
        'a': 1,
        'b': 2,
        'c': 3,
        ...{
            'd': 4,
            'e': 5
        },
        'f': 6,
        'g': 7
    }
    console.log(obj2);
```

## Cmder
