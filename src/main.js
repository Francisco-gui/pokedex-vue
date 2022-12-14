import Vue from 'vue'
import App from './App.vue'
import VueObserveVisibility from "vue-observe-visibility";

Vue.config.productionTip = false;
Vue.use(VueObserveVisibility);

new Vue({
  render: h => h(App),
}).$mount('#app')
