// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
// import axios from 'axios'
// import 'element-ui/lib/theme-chalk/index.css'
// import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/vs.css'
import VueLazyload from 'vue-lazyload'
// import {
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Menu,
//   Submenu,
//   MenuItem,
//   MenuItemGroup,
//   Input,
//   Button,
//   Table,
//   TableColumn,
//   Popover,
//   Breadcrumb,
//   BreadcrumbItem,
//   Form,
//   FormItem,
//   Tabs,
//   TabPane,
//   Row,
//   Col,
//   Badge,
//   Card,
//   Timeline,
//   TimelineItem,
//   Loading,
//   MessageBox,
//   Message
// } from 'element-ui';

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VueLazyload)
// Vue.use(Dropdown);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);
// Vue.use(Menu);
// Vue.use(Submenu);
// Vue.use(MenuItem);
// Vue.use(MenuItemGroup);
// Vue.use(Input);
// Vue.use(Button);
// Vue.use(Table);
// Vue.use(TableColumn);
// Vue.use(Popover);
// Vue.use(Breadcrumb);
// Vue.use(BreadcrumbItem);
// Vue.use(Form);
// Vue.use(FormItem);
// Vue.use(Tabs);
// Vue.use(TabPane);
// Vue.use(Row);
// Vue.use(Col);
// Vue.use(Badge);
// Vue.use(Card);
// Vue.use(Timeline);
// Vue.use(TimelineItem);

// Vue.use(Loading.directive);

// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
// // Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;
// // Vue.prototype.$prompt = MessageBox.prompt;
// // Vue.prototype.$notify = Notification;
// Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
