import Vue from 'vue';
import App from './App.vue';
import router from './router';
import markdownRun from '../src/index';
import ZkButton from './components/ZkButton';

Vue.config.productionTip = false;
Vue.use(markdownRun);
Vue.component('ZkButton', ZkButton);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
