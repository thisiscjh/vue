// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//reset.css引入
import "./assets/css/reset.css"
//2处理公共1组件
import commonConponents from "./components/index"
for(var i in commonConponents){
  Vue.component(i,commonConponents[i])
}
//3.处理公共过滤器
import filters from "./filters"
for(var i in filters){
  Vue.filter(i,filters[i])
}

//5.vuex
import store from "./store"

//6.element-ui
import ElementUi from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUi)
/* eslint-disable no-new */
//图片前缀
Vue.prototype.$imgPre="http://localhost:3000"
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
