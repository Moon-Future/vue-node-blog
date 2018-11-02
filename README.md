# vue-node-blog

2018.10.22 ToDoList
1. 重新设计页面布局
2. vue-cli 2 升级为 @vue/cli 3
3. express 改为 Koa2
4. Mysql 改为 Mongodb
5. 之前项目版本备份在 version 文件夹下

标签的 Props 应该有统一的顺序，依次为指令、属性和事件
```
<my-component
  v-if="if"
  v-show="show"
  v-model="value"
  ref="ref"
  :key="key"
  :text="text"
  @input="onInput"
  @change="onChange"
/>
```
