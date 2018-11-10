import MarkdownRun from './components/mardownRun';

const components = [
  MarkdownRun
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
  MarkdownRun,
  install
};
