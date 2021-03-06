import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
import  'default-passive-events'
import less from 'less'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(less)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
