<template>
  <div>
    <h1>全局组件使用方法Demo:</h1>
    <p>只需要在全局使用“Vue.component('ZkButton', ZkButton)”即可</p>
    <div class="flex-row">
      <textarea ref="markdown1" class="markdown-text flex-1">
# vue-markdown-run
需要执行的Vue代码：
````html vue-run
<template>
  <zk-button class="btn btn-blue" @click="test">打开console，点击看看效果</zk-button>
</template>
<script>
  export default {
    data() {
      return {};
    },
    methods: {
      test() {
        console.log('你点击了按钮');
      }
    }
  }
</script>
````
      </textarea>
      <div class="flex-1 markdown-wrapper">
        <markdown-run
          :mark="markdownTxt1"
          highlight-style-file-name="github"
        />
      </div>
    </div>
    <h1>局部组件使用方法Demo:</h1>
    <p>需要在当前组件中引入组件“components: {xxx: yyy}”</p>
    <div class="flex-row">
      <textarea ref="markdown2" class="markdown-text flex-1">
# vue-markdown-run
需要执行的Vue代码：
````html vue-run
<template>
  <div>
    <zk-jitter :start.sync="error" class="form-group">
      <input class="form-control" type="text" placeholder="账号"/>
    </zk-jitter>
    <zk-button class="btn btn-blue" @click="jitter">点击抖动</zk-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        error: false,
      };
    },
    methods: {
      jitter() {
        this.error = true;
      }
    },
    components: {
      ZkJitter
    }
  }
</script>
<style>
  .form-group {
    margin-bottom: 20px;
  }
  .form-control {
    box-sizing: border-box;
    -webkit-appearance: none;
    outline: none;
    padding: 8px 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    transition: all .3s;
  }
</style>
````
      </textarea>
      <div class="flex-1 markdown-wrapper">
        <markdown-run
          :mark="markdownTxt2"
          highlight-style-file-name="github"
          :scope="scope"
        />
      </div>
    </div>

    <h1>不需要执行的Demo:</h1>
    <p>在代码中去掉标注“vue-run”</p>
    <div class="flex-row">
      <textarea ref="markdown3" class="markdown-text flex-1">
# vue-markdown-run
需要执行的Vue代码：
````html
<template>
  <div>
    <zk-jitter :start.sync="error" class="form-group">
      <input class="form-control" type="text" placeholder="账号"/>
    </zk-jitter>
    <zk-button class="btn btn-blue" @click="jitter">点击抖动</zk-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        error: false,
      };
    },
    methods: {
      jitter() {
        this.error = true;
      }
    },
    components: {
      ZkJitter
    }
  }
</script>
<style>
  .form-group {
    margin-bottom: 20px;
  }
  .form-control {
    box-sizing: border-box;
    -webkit-appearance: none;
    outline: none;
    padding: 8px 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    transition: all .3s;
  }
</style>
````
      </textarea>
      <div class="flex-1 markdown-wrapper">
        <markdown-run
          :mark="markdownTxt3"
          highlight-style-file-name="github"
          :scope="scope"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ZkJitter from './ZkJitter';
export default {
  name: 'Sample',
  data () {
    return {
      markdownTxt1: '',
      markdownTxt2: '',
      markdownTxt3: '',
      scope: {ZkJitter}
    };
  },
  mounted () {
    const markdownEl1 = this.$refs.markdown1;
    if (markdownEl1) {
      this.markdownTxt1 = markdownEl1.value;
      markdownEl1.addEventListener('input', (ev) => {
        this.markdownTxt1 = ev.target.value;
      });
    }

    const markdownEl2 = this.$refs.markdown2;
    if (markdownEl2) {
      this.markdownTxt2 = markdownEl2.value;
      markdownEl2.addEventListener('input', (ev) => {
        this.markdownTxt2 = ev.target.value;
      });
    }

    const markdownEl3 = this.$refs.markdown3;
    if (markdownEl3) {
      this.markdownTxt3 = markdownEl3.value;
      markdownEl3.addEventListener('input', (ev) => {
        this.markdownTxt3 = ev.target.value;
      });
    }
  },
  components: {
    ZkJitter
  }
};
</script>

<style lang="scss">
  h1{
    border-bottom: 1px solid #eee;
  }
  p{
    color: #348FEE;
  }
  .flex-row{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    .flex-1{
      flex: 1;
    }
  }
  .markdown-wrapper{
    padding: 0 20px;
  }
  .markdown-text{
    width: 100%;
    height: 600px;
  }
</style>
