import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'


import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {initMenu} from "@/utils/menus";


Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

router.beforeEach((to, from, next) => {
  console.log(to.path)
  console.log(from.path)
  if (window.sessionStorage.getItem('tokenStr')) {
    initMenu(router, store)
    // 如果用户不存在
    if (!window.sessionStorage.getItem('user')) {
      // 判断用户信息是否存在
      return getRequest('/admin/info').then(resp => {
        if (resp) {
          // 存入用户信息，转字符串，存入 sessionStorage
          window.sessionStorage.setItem('user', JSON.stringify(resp))
          // 同步用户信息 编辑用户
          store.commit('INIT_ADMIN',resp)
          next();
        }
      })
    }
    next();
  } else {
    if (to.path === '/') {
      next()
    } else {
      next('/?redirect=' + to.path)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
