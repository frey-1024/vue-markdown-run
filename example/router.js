import Vue from 'vue';
import Router from 'vue-router';
import Sample from './components/Sample.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Sample',
      component: Sample
    }
  ]
});
