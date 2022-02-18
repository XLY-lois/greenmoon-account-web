<template>
  <div class="home-page">
    <div class="home-header"></div>
    <div class="home-body">
      <div class="sider">
        <a-menu
          style="width: 256px"
          :default-selected-keys="['1']"
          :open-keys.sync="openKeys"
          mode="inline"
          @click="handleClick"
        >
          <a-menu-item key="1" @titleClick="titleClick">
            <a-icon type="pie-chart" />
            <span>Option 1</span>
          </a-menu-item>
          <a-sub-menu key="sub2" @titleClick="titleClick">
            <span slot="title"
              ><a-icon type="appstore" /><span>Navigation Two</span></span
            >
            <a-menu-item key="5"> Option 5 </a-menu-item>
            <a-menu-item key="6"> Option 6 </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title"
              ><a-icon type="setting" /><span>Navigation Three</span></span
            >
            <a-menu-item key="9"> Option 9 </a-menu-item>
            <a-menu-item key="10"> Option 10 </a-menu-item>
            <a-menu-item key="11"> Option 11 </a-menu-item>
            <a-menu-item key="12"> Option 12 </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "homePage",
  data() {
    return {
      current: ["mail"],
      openKeys: ["sub1"],
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  methods: {
    handleClick(e) {
      console.log("click", e);
    },
    titleClick(e) {
      console.log("titleClick", e);
    },
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
      width: 256px;
      //   background-color: skyblue;
      //   height: 50vh;
    }
    .content {
      background-color: green;
      //   width: 80vw;
        flex-grow: 1;
      height: 50vh;
    }
  }
}
</style>