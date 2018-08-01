import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/style/base.scss'
import VueJsonp from 'vue-jsonp'
import VueLazyload from 'vue-lazyload'

Vue.use(VueJsonp)
Vue.use(VueLazyload, {
  error: require('@/assets/img/album.jpg'),
  loading: require('@/assets/img/album.jpg')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
