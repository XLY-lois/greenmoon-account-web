<template>
  <div class="index-container">
    <div class="menu-item-box"><MenuItem></MenuItem></div>
    <div class="menu-item-box"><MenuItem></MenuItem></div>
    <div class="menu-item-box"><MenuItem></MenuItem></div>
    <div class="menu-item-box"><MenuItem></MenuItem></div>
    <div class="menu-item-box"><MenuItem></MenuItem></div>

  </div>
</template>
<script>
import MenuItem from './menuItem'
export default {
  data() {
    return {
      msg: ''
    }
  },
  props: {
    menuType: String
  },
  components: {
    MenuItem
  },
  watch: {
    menuType() {
      this.msg = this.menuType
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang='less' scoped>
.index-container {
  display: -webkit-box;
  flex-wrap: wrap;
  padding: 20px;
  width: 100%;
  .menu-item-box {
    width: 170px;
    background-color: pink;
    margin: 10px;
  }
}
</style>
