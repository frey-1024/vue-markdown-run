import Vue from 'vue';
import App from './App.vue';
import router from './router';
import markdownRun from '../src/main';

Vue.config.productionTip = false;
Vue.use(markdownRun);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
