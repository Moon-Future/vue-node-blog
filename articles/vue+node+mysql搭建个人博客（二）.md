# 组件

### 父组件向子组件通信
    父组件通过 props 向子组件通信，在父组件内可通过 this.$children 来读取子组件中的值。props 是单向绑定，不可在子组件中赋值。
#### 创建单文件组件
在 src/components 目录下创建文件夹 common 用于存放公共组件，并在 common 下创建单文件组件 LeftNavItem.vue（子组件）
```js
<template>
  <div>
    {{ childMes }}
  </div>
</template>

<script>
  export default {
    name: 'LeftNav',
    props: ['childMes'],
  }
</script>

<style lang="scss">

</style>
```

#### 引入组件
在 src/components/page/Blog.vue（父组件） 里引入组件 LeftNavItem.vue
```js
<template>
  <div>
    <div class="child-area">
      <Leftnav :childMes="message"></Leftnav>
      <button @click="getChild">getChild</button>
    </div>
  </div>
</template>

<script>
  import Leftnav from '../common/LeftNavItem'
  export default {
    name: 'blog',
    data() {
      return {
        message: 'father message',
      }
    },
    components: {
      Leftnav
    },
    methods: {
      getChild() {
        console.log(this.$children[0].childMes);
      }
    }
  }
</script>

<style scoped>
  .father-area {
    background-color: aqua;
    padding: 10px;
  }
  .child-area {
    background-color: bisque;
    padding: 10px;
  }
</style>
```

这里父组件是 Blog.vue，子组件是 LeftNavItem.vue，父组件中调用子组件 
```js
<Leftnav :childMes="message"></Leftnav>
```
其中 :childMes 中的 childMes 是要传递到子组件中的变量，即对应 LeftNavItem.vue 中 props 属性中的值，可以传递多个变量
```js
props: ['childMes', 'childMes2', 'childMes3'],
```
- props 中的变量和 data 的变量一样，直接使用 this.childMes 获取值，
- :childMes="message" 中的 "message" 即是父组件自身 data 中的变量，
这样在父组件中更改 message 的值，子组件便会得到相应的更新。
- 方法 getChild 中的 this.$children[0].childMes 可以的到子组件中 childMes的值，但不可给其赋值，否值的话会报错，只能通过父组件中的 message 来更改值。

### 子组件向父组件通信
    父组件向子组件传递事件方法，子组件通过 $emit 触发事件，回调给父组件。使用$parent可以访问父组件的数据
在 LeftNavItem.vue 中增加代码
```js
<template>
  <div>
    {{ childMes }}
    <button @click="toParent">toParent</button>
  </div>
</template>

<script>
  export default {
    name: 'LeftNav',
    props: ['childMes'],
    methods: {
      toParent() {
        this.$emit('mesFunc', 'from children');
        console.log(this.$parent);
      }
    }
  }
</script>

<style lang="scss">

</style>
```
Blog.vue 增加代码
```js
<template>
  <div>
    <div class="father-area">
      {{ fatherMes }}
    </div>
    <div class="child-area">
      <Leftnav :childMes="message" @mesFunc="func"></Leftnav>
      <button @click="getChild">getChild</button>
    </div>
  </div>
</template>

<script>
  import Leftnav from '../common/LeftNavItem'
  export default {
    name: 'blog',
    data() {
      return {
        message: 'father message',
        fatherMes: 'Hello World'
      }
    },
    components: {
      Leftnav
    },
    methods: {
      getChild() {
        console.log(this.$children[0].childMes);
      },
      func(data) {
        console.log(data);
        this.fatherMes = data;
      }
    }
  }
</script>

<style scoped>
  .father-area {
    background-color: aqua;
    padding: 10px;
  }
  .child-area {
    background-color: bisque;
    padding: 10px;
  }
</style>
```
- 父组件 Blog.vue 中通过

    ```js
    <Leftnav :childMes="message" @mesFunc="func"></Leftnav>
    ```
    将事件方法 mesFunc 传递到子组件
- 子组件 LeftNavItem.vue 中通过 $emit 可以触发事件，并传递数据

    ```js
    this.$emit('mesFunc', 'from children')
    // 第一个参数：父组件传递过来的事件
    // 第二个参数：要传递到父组件的数据
    ```


# 状态管理（Vuex）
[Vuex 是什么](https://vuex.vuejs.org/zh/)

    Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
以上是官方介绍，通俗点将有点类似全局变量，来管理各种状态。
Vuex 中 Store 的模版化定义如下：
```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
  },
  actions: {
  },
  mutations: {
  },
  getters: {
  },  
  modules: {
  }
})
export default store
```
- state：定义了应用状态的数据结构，"状态值"的存放处
- action：定义提交触发更改信息的描述，常见的例子有从服务端获取数据，在数据获取完成后会调用 store.commit() 来调用更改 Store 中的状态。可以在组件中使用 dispatch 来发出 actions
- mutations：唯一允许更新应用状态的地方
- getters：Getters 允许组件从 Store 中获取数据
- modules：modules 对象允许将单一的 Store 拆分为多个 Store 的同时保存在单一的状态树中

## 初始化 state
在 scr 下新建文件夹 store，并在 store 里新建文件 index.js
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  currentArticle: {id: '1', title: '学习笔记', tag: 'vue'},   // 当前文章状态, 名字, 标签
  count: 1
}

// 使用常量替代 Mutation 事件类型
const types = {
  CURRENT_ARTICLE: 'CURRENT_ARTICLE',
  COUNT: 'COUNT'
}

const actions = {
  currentArticle({commit}, obj) {
    commit(types.CURRENT_ARTICLE, obj);
  },
  countIncrement({commit}, n) {
    commit(types.COUNT, n);
  }
}

const mutations = {
  [types.CURRENT_ARTICLE](state, obj) {
    obj.id == undefined ? false : state.currentArticle.id = obj.id;
    obj.title == undefined ? false : state.currentArticle.title = obj.title;
    obj.tag == undefined ? false : state.currentArticle.tag = obj.tag;
    obj.catalog == undefined ? false : state.currentArticle.catalog = obj.catalog;
  },
  [types.COUNT](state, n = 1) {
    state.count += n;
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})
```
---
### ES6 了解下
往下之前先了解下 ES6 的新语法 [ES6教程](http://es6.ruanyifeng.com/#docs/object)

1. 对象的解构赋值，变量必须与属性同名，才能取到正确的值
    ```js
    let { foo, bar } = { foo: "aaa", bar: "bbb" };
    foo // "aaa"
    bar // "bbb"
    
    const actions = {
      currentArticle({commit}, obj) {
        commit(types.CURRENT_ARTICLE, obj);
      },
    }
    // 等同于
    const actions = {
      currentArticle(context, obj) {
        context.commit(types.CURRENT_ARTICLE, obj);
      },
    }
    
    // 传入 currentArticle 的第一个参数是一个与 store 实例具有相同方法和属性的 context 对象，可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters，这里只要用到 context.commit 这个方法，所以可以 
    {commit} = context 即 commit = context.commit
    ```
    
2. ES6 允许在对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值
    ```js
    const foo = 'bar';
    const baz = {foo};
    baz // {foo: "bar"}
    
    // 等同于
    const baz = {foo: foo};
    
    export default new Vuex.Store({
      state,
      actions,
      mutations,
    })
    
    // 等同于
    export default new Vuex.Store({
      state: state,
      actions: actions,
      mutations: mutations
    })
    ```
3. 对象方法属性可以简写
    ```js
    const o = {
      method() {
        return "Hello!";
      }
    };

    // 等同于

    const o = {
      method: function() {
        return "Hello!";
      }
    };
    ```
4. ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内 
    ```js
    let propKey = 'foo';

    let obj = {
      [propKey]: true,
      ['a' + 'bc']: 123
    };
    ```
    所以
    ```js
    const mutations = {
      [types.CURRENT_ARTICLE](state, obj) {
  
      },
    }
    // 等同于
    const mutations = {
      ['CURRENT_ARTICLE'](state, obj) {
  
      },
    }
    // 等同于
    const mutations = {
      CURRENT_ARTICLE: function(state, obj) {
  
      },
    }
    ```

---
### 组件中使用 state
言归正传，我们定义一个 state 状态属性 currentArticle 对象，用来记录当前文章的 id，title，tags，catalog，还是使用 Blog.vue 和 LeftNavItem.vue 来测试
```js
// Blog.vue
<template>
  <div>
    <div class="father-area">
      id: <input type="text" v-model="currentArticle.id">
      title: <input type="text" v-model="currentArticle.title">
      tag: <input type="text" v-model="currentArticle.tag">
      count: <input type="text" v-model="count">
    </div>
    <div class="child-area">
      <Leftnav></Leftnav>
    </div>
  </div>
</template>

<script>
  import Leftnav from '../common/LeftNavItem'
  import store from '../../store/demo'
  export default {
    name: 'blog',
    data() {
      return {
        message: 'father message'
      }
    },
    components: {
      Leftnav
    },
    methods: {

    },
    computed: {
      currentArticle() {
        return store.state.currentArticle
      },
      count() {
        return store.state.count
      }
    }
  }
</script>

<style scoped>
  .father-area {
    background-color: aqua;
    padding: 10px;
  }
  .child-area {
    background-color: bisque;
    padding: 10px;
  }
</style>
```
我们可以在每个组件内引入 store  
```js
import store from '../../store/index'
```
然后通过计算属性（命名符合规则即可）来获取状态值，可以看到，要获得多个状态时，将这些状态都声明为计算属性会有些重复和冗余，内置 mapState 辅助函数可以帮助我们生产计算属性。要想使用辅助函数，需要先将 store 实例注册到 vue 实例中，这样 store 实例会注入到跟组件下的所有组件，且子组件能通过 this.$store 访问到。

大家 src/main.js 引入 store 实例，并在 vue 根实例中注册 store 选项
```js
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store/index.js'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```
改写 src/components/page/Blog.vue 使用 mapState 辅助函数生产状态属性
```js
<template>
  <div>
    <div class="father-area">
      id: <input type="text" v-model="currentArticle.id">
      title: <input type="text" v-model="currentArticle.title">
      tag: <input type="text" v-model="currentArticle.tag">
      count: <input type="text" v-model="count">
    </div>
    <div class="child-area">
      <Leftnav></Leftnav>
    </div>
  </div>
</template>

<script>
  import Leftnav from '../common/LeftNavItem'
  import { mapState } from 'vuex';
  export default {
    name: 'blog',
    data() {
      return {
        message: 'father message'
      }
    },
    components: {
      Leftnav
    },
    methods: {

    },
    computed: mapState(['currentArticle', 'count'])
  }
</script>

<style scoped>
  .father-area {
    background-color: aqua;
    padding: 10px;
  }
  .child-area {
    background-color: bisque;
    padding: 10px;
  }
</yle>
```
mapState 除了可以传入数组外，还可传入对象
```js
// 1. 直接只用函数返回状态住
computed: mapState({
  currentArticle: state => state.currentArticle,
  count: state => state.count
})

// 2. 使用别名对应状态属性，对象中的值 value 对应等同于 state => state.value
// key 值是状态值的别名，value 是 state 中的状态值，不能简写成 {currentArticle, count}，必须有对应的状态属性
computed: mapState({
  currentArticle: 'currentArticle',
  count: 'count'
})

// 3. 因为 computed 中也可能会有其他计算属性，不只有 mapState，要将它与其他计算属性混合使用，就要用到对象的扩展运算符（...），用于取出参数对象的所有可遍历属性，拷贝到当前对象之中，例如：
let z = { a: 3, b: 4};
let n = { ...z }; // 等同于 n = Object.assign({}, z)
n // ( a: 3, b: 4 )

// mapState 函数返回的是一个对象，所以混合其他计算属性：
computed: {
  otherComputed() {

  },
  ...mapState(['currentArticle', 'count']) // 也可传入对象
}
```

## Action
    Action 提交的是 mutation，而不是直接修改状态
### 分发 Action
Action 通过 store.dispatch 方法触发
在 Blog.vue 中增加一个按钮和一个方法来增加 count 的值
```js
<template>
  <div>
    <div class="father-area">
      id: <input type="text" v-model="currentArticle.id">
      title: <input type="text" v-model="currentArticle.title">
      tag: <input type="text" v-model="currentArticle.tag">
      count: <input type="text" v-model="count">
      <button @click="countAdd">+</button>
    </div>
    <div class="child-area">
      <Leftnav></Leftnav>
    </div>
  </div>
</template>

<script>
  import Leftnav from '../common/LeftNavItem'
  import { mapState } from 'vuex';
  export default {
    name: 'blog',
    data() {
      return {
        message: 'father message'
      }
    },
    components: {
      Leftnav
    },
    methods: {
      countAdd() {
        this.$store.dispatch('countIncrement');
      }
    },
    computed: mapState(['currentArticle', 'count'])
  }
</script>

<style scoped>
  .father-area {
    background-color: aqua;
    padding: 10px;
  }
  .child-area {
    background-color: bisque;
    padding: 10px;
  }
</style>
```
点击 + 号后调用方法 countAdd 触发 countIncrement 的 Action，接着触发类型为 COUNT 的 mutation，完成状态的修改。根据 action 中 countIncrement 方法的定义，可以传入第二个参数，this.$store.dispatch('countIncrement', 3)。

### 辅助函数 mapAction
Action 也有辅助函数 mapAction 将组件的 methods 映射为 store.dispatch（需要现在根结点注入 store）
```js
<template>
  <div>
    <div class="father-area">
      id: <input type="text" v-model="currentArticle.id">
      title: <input type="text" v-model="currentArticle.title">
      tag: <input type="text" v-model="currentArticle.tag">
      count: <input type="text" v-model="count">
      <button @click="countAdd">+</button>
    </div>
    <div class="child-area">
      <Leftnav></Leftnav>
    </div>
  </div>
</template>

<script>
  import Leftnav from '../common/LeftNavItem'
  import { mapState, mapActions } from 'vuex';
  export default {
    name: 'blog',
    data() {
      return {
        message: 'father message'
      }
    },
    components: {
      Leftnav
    },
    methods: {
      countAdd() {
        this.countIncrement(2);
      },
      ...mapActions(['countIncrement']) // 将 this.countIncrement 映射为 this.$store.dispatch('countIncrement)
    },
    computed: mapState(['currentArticle', 'count'])
  }
</script>

<style scoped>
  .father-area {
    background-color: aqua;
    padding: 10px;
  }
  .child-area {
    background-color: bisque;
    padding: 10px;
  }
</style>
```
和 mapStata 类似，mapActions 也可以传入对象，使用别名来代替 countIncrement
```js
methods: {
  countAdd() {
    this.add(2);
  },
  ...mapActions({
    add: 'countIncrement'
  })
}
```
我个人觉得 vuex 中的 state、actions 比较难理解，所以笔记就记下这两块，其他官方文档应该可以看明白，和这两个用法也都比较类似。

## 模块化 store
    对于大型项目，一般把 vuex 相关代码分割到模块中
在 src/store 下新建文件
- index.js // 初始化 state，导出 Vuex.Store 实例
- actions.js // acitons 对象
- mutation_type.js // 常量化 mutation 类型
- mutation.js // mutation 对象

```js
// index.js
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import mutations from './mutation'

Vue.use(Vuex);

const state = {
  currentArticle: {id: '1', title: '学习笔记', tag: 'vue'},
  count: 1
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})
```

```js
// actions.js
import * as types from './mutation_type'

export default {
  currentArticle({commit}, obj) {
    commit(types.CURRENT_ARTICLE, obj);
  },
  countIncrement({commit}, n) {
    commit(types.COUNT, n);
  }
}
```

```js
// mutation_type.js
export const CURRENT_ARTICLE = 'CURRENT_ARTICLE'
export const COUNT = 'COUNT'
```

```js
// mutation.js
import * as types from './mutation_type'

export default {
  [types.CURRENT_ARTICLE](state, obj) {
    obj.id == undefined ? false : state.currentArticle.id = obj.id;
    obj.title == undefined ? false : state.currentArticle.title = obj.title;
    obj.tag == undefined ? false : state.currentArticle.tag = obj.tag;
    obj.catalog == undefined ? false : state.currentArticle.catalog = obj.catalog;
  },
  [types.COUNT](state, n = 1) {
    state.count += n;
  }
}
```
然后在 main.js 中注册 Store 实例即可
```js
// main.js
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```