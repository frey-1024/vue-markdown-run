import Vue from 'vue';

export default {
  name: 'preview',
  props: ['value', 'styles'],
  render (h) {
    this.className = 'vue-run-scoped-' + this._uid;

    return h('div', {
      class: this.className
    }, [
      this.scopedStyle ? h('style', null, this.scopedStyle) : ''
    ]);
  },

  computed: {
    scopedStyle () {
      return this.styles
        ? insertScope(this.styles, `.${this.className}`)
        : '';
    }
  },

  mounted () {
    this.$watch('value', this.renderCode, { immediate: true });
  },

  methods: {
    renderCode (val) {
      const lastData = this.codeVM && Object.assign({}, this.codeVM.$data);
      const container = this.$el;

      if (this.codeVM) {
        this.codeVM.$destroy();
        container.removeChild(this.codeVM.$el);
      }

      this.codeEl = document.createElement('div');
      container.appendChild(this.codeEl);
      try {
        const MyComponent = Vue.extend({ ...val });
        this.codeVM = new MyComponent().$mount(this.codeEl);
        if (lastData) {
          for (const key in lastData) {
            this.codeVM[key] = lastData[key];
          }
        }
      } catch (e) {
        this.$emit('error', e);
      }
    }
  }
};

function insertScope (style, scope) {
  const regex = /(^|\})\s*([^{]+)/g;
  return style.trim().replace(regex, (m, g1, g2) => {
    return g1 ? `${g1} ${scope} ${g2}` : `${scope} ${g2}`;
  });
}
