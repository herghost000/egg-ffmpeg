<template>
  <div>666
    <el-button v-waves
               type="primary">水波纹效果</el-button>
  </div>
</template>
<script>

import waves from '@/directive/waves/index.js' // 水波纹指令

export default {
  directives: {
    waves
  },
  data () {
    return {}
  }
}
</script>
<style scoped>
</style>
