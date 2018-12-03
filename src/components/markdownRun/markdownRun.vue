<script>
import marked from 'marked';
import hljs from 'highlight.js';
import uuidv4 from 'uuid/v4';
import parser from './parser';
import compiler from './compiler';
import Preview from './preview';
import Extend from './extend';
import {codeMarkRunAllRE, codeRE} from './reg';

export default {
  name: 'MarkdownRun',
  props: {
    mark: {
      type: String,
      required: true
    },
    runClass: {
      type: String,
      default: ''
    },
    runStyle: {
      type: Object,
      default: () => {}
    },
    highlightStyleFileName: {
      type: String,
      default: 'github'
    }
  },
  data () {
    return {
      rest: []
    };
  },
  created () {
    require(`highlight.js/styles/${this.highlightStyleFileName}.css`);
    // 初始化marked, 配置选项，并集成highlight
    const renderer = new marked.Renderer();
    marked.setOptions({
      renderer: renderer,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      langPrefix: 'hljs lang-',
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });
    this.parserMark(this.mark);
  },
  watch: {
    mark (val) {
      this.parserMark(val);
    }
  },
  methods: {
    parserMark (val) {
      // 不处理为空或者不是string类型的数据
      if (val === '' || typeof val !== 'string') {
        return;
      }
      let markdownString = val;
      // 匹配代码块
      const matchArr = markdownString.match(codeMarkRunAllRE);
      // 没有匹配到代码块，将按照普通的文本处理
      if (!matchArr) {
        this.rest = [{
          template: marked(markdownString)
        }];
        return;
      }
      const result = [];
      // 找到代码块， 然后分割和替换
      markdownString = markdownString.replace(codeMarkRunAllRE, ($0) => {
        // 清除vue-run标识符
        $0 = $0.replace(/vue-run/i, '');
        const id = uuidv4();
        // 拆分代码和mark标志
        const matchArr = $0.match(codeRE);
        // 区分在使用代码标志时， 没有注明语言类型的情况
        if (matchArr.length > 2) {
          result.push({
            id,
            lang: matchArr[1],
            code: matchArr[2],
            template: marked($0)
          });
        } else {
          result.push({
            id,
            code: matchArr[1],
            template: marked($0)
          });
        }
        return id;
      });
      let rest = [];
      let nextMarkdownString = markdownString;
      // 把拆分的代码再次处理，按照顺序保存成数组
      for (let i = 0, l = result.length, item; i < l; i++) {
        item = result[i];
        if (!nextMarkdownString) {
          break;
        }
        const splitArr = nextMarkdownString.split(item.id);
        if (splitArr.length > 1) {
          nextMarkdownString = splitArr[1];
        } else {
          nextMarkdownString = '';
        }
        rest = [...rest, {
          template: marked(splitArr[0])
        }, item, {
          template: item.template
        }];
      }
      // 处理循环过后，没有处理完的nextMarkdownString
      if (nextMarkdownString !== '') {
        rest = [...rest, {template: marked(nextMarkdownString)}];
      }
      this.rest = rest;
    },
    executeCode (code) {
      const result = parser(code);
      // 解析失败
      if (result.error) {
        this.$emit('error', result.error);
        return {};
      }

      const compiledCode = compiler(result, this.scope);
      // 编译失败
      if (compiledCode.error) {
        this.$emit('error', result.error);
        return;
      }
      return {
        preview: compiledCode.result,
        styles: compiledCode.styles
      };
    }
  },
  render (h) {
    const rest = this.rest;
    const children = rest.map((item) => {
      // 普通文本，不需要特殊处理
      if (!item.code && item.template) {
        return h(Extend, {
          props: {
            value: item.template
          },
          on: {
            error: (e) => {
              this.$emit('error', e);
            }
          }
        });
      }
      if (item.code) {
        const {styles, preview} = this.executeCode(item.code);
        return h(Preview, {
          class: `vue-markdown-run ${this.runClass}`,
          style: this.runStyle,
          props: {
            value: preview,
            styles: styles
          },
          on: {
            error: (e) => {
              this.$emit('error', e);
            }
          }
        });
      }
    });
    return h('div', {}, children);
  }
};
</script>

<style lang="scss">
  .vue-markdown-run{
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    padding: 15px;
    &:hover{
      box-shadow: 0 0 10px 1px #ebebeb;
    }
  }
</style>
