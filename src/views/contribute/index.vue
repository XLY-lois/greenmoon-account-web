<template>
  <div>
    tougao
    <el-button @click="toPage('index')">返回首页</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  components: {},
  watch: {},
  methods: {
    toPage(page) {
      this.$emit("toPage", page);
    },
  },
  mounted() {},
}
</script>

<style lang='stylus' scoped>

</style>
