// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store/index.js'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/vs.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$http = axios

Vue.prototype.timeFormat = function (timestamp) {
  var time = new Date(timestamp), secondShow = arguments[1];
  var year = time.getFullYear(), month = time.getMonth() + 1, day = time.getDate(), hour = time.getHours(), minute = time.getMinutes(), second = time.getSeconds();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + (secondShow ? ':' + second : '');
}

Date.prototype.format = function(format) {
  let date = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds()
  };
  if(/(y+)/i.test(format)){
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for(let k in date){
    if(new RegExp('(' + k + ')').test(format)){
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
    }
  }
  return format;
}

router.beforeEach ((to, from, next) => {
  const toData = to.params;
  const fromData = from.params;

  if (to.name === from.name && to.query.id !== from.query.id) {
    router.go(0);
  }

  if(fromData.id && !toData.id){
    store.state.currentArticle.title = '';
    store.state.crumbFlag.splice(2, 1, '');
  }
  if(toData.id && !fromData.id){
    store.state.currentArticle.title = toData.title;
    store.state.currentArticle.id = toData.id;
    store.state.crumbFlag.splice(2, 1, toData.title);
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
