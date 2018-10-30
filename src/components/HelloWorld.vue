<template>
  <div class="hello">hello world {{msg}}</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to my xxx'
    };
  }
};
</script>

<style scoped>
  .hello{
    font-size: 30px;
  }
</style>
