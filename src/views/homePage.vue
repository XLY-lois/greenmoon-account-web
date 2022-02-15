<template>
  <div class="home-page">
    <div class="home-header"></div>
    <div class="home-body">
      <div class="sider"></div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "homePage",
  components: {
    // HelloWorld
  },
};
</script>

<style lang="less" scoped>
.home-page {
  .home-header {
    width: 100%;
    height: 80px;
    background-color: pink;
  }
  .home-body {
    display: flex;
    width: 100%;
    .sider {
      width: 20vw;
      background-color: skyblue;
      height: 50vh;
    }
    .content {
      background-color: green;
      width: 80vw;
      height: 50vh;
    }
  } 
}
</style>>