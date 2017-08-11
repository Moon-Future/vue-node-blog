// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './store/index'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/vs.css'
import axios from 'axios'

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.timeFormat = function (timestamp) {
	var time = new Date(timestamp), secondShow = arguments[1];
	var year = time.getFullYear(), month = time.getMonth(), day = time.getDay(), hour = time.getHours(), minute = time.getMinutes(), second = time.getSeconds();
	month = month < 10 ? '0' + month : month;
	day = day < 10 ? '0' + day : day;
	hour = hour < 10 ? '0' + hour : hour;
	minute = minute < 10 ? '0' + minute : minute;
	second = second < 10 ? '0' + second : second;
	return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + (secondShow ? ':' + second : '');
}

Vue.prototype.$http = axios;

router.beforeEach ((to, from, next) => {
	const toData = to.params;
	const fromData = from.params;
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
	template: '<App/>',
	components: { App }
})
