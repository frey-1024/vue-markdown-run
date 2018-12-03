<template>
  <markdown-run
    :mark="markdownTxt"
    highlight-style-file-name="github"
  />
</template>

<script>
import {zkFetch} from './fetch.js';
export default {
  name: 'Sample',
  data () {
    return {
      markdownTxt: ''
    };
  },
  created () {
    // 本地获取一个md文本，你可以用其他方式
    zkFetch('http://localhost:9090/article/33/detail').get().then((data) => {
      this.markdownTxt = data.data.markdown;
    });
  }
};
</script>

<style>
</style>
