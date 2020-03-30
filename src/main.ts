import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api' // 导入api接口

Vue.prototype.$api = api // 将api挂载到vue的原型上

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h: (arg0: any) => any) => h(App)
}).$mount('#app')
