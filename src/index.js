import MarkdownRun from './components/markdownRun';
import TT from './components/tt';

const components = [
  MarkdownRun,
  TT
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
  TT,
  install
};
