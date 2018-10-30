import HelloWorld from './components/HelloWorld.vue';

const components = [
  HelloWorld
];

const install = (Vue) => {
  components.map((component) => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  HelloWorld,
  install
};
