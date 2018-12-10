export default {
  name: 'extend',
  props: ['value'],
  render (h) {
    return h('div');
  },
  mounted () {
    this.$watch('value', this.renderCode, { immediate: true });
  },
  methods: {
    renderCode (val) {
      this.$el.innerHTML = val;
    }
  }
};
