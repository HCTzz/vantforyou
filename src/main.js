import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/css/style.css';
import * as filters from './filters'
import FastClick from 'fastclick'
import LightTimeline from 'vue-light-timeline';
import VueTouch from 'vue-touch'

import VueLazyload from 'vue-lazyload'
import { ImagePreview } from 'vant';
// 全局注册
Vue.use(ImagePreview);

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('@/assets/img/error.png'),
  attempt: 1
})
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(LightTimeline);
Vue.use(Vant);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

FastClick.attach(document.body);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (from.path.indexOf('detail') != -1) {
    to.meta.isBack = true;
  } else {
    to.meta.isBack = false;
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
