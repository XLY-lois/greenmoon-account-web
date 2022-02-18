<template>
  <div class="home-page">
    <div class="home-header"></div>
    <div class="home-body">
      <div class="sider">
        <a-menu
          style="width: 10vw"
          :default-selected-keys="['1']"
          :open-keys.sync="openKeys"
          mode="inline"
          @click="handleClick"
        >
          <a-menu-item key="1" @titleClick="titleClick">
            <a-icon type="home" />
            <span>首页</span>
          </a-menu-item>
          <a-sub-menu key="sub2" @titleClick="titleClick">
            <span slot="title"
              ><a-icon type="account-book" /><span>收入与支出</span></span
            >
            <a-menu-item key="5">记录</a-menu-item>
            <a-menu-item key="6">查询</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title"
              ><a-icon type="idcard" /><span>供应商</span></span
            >
            <a-menu-item key="9"> Option 9 </a-menu-item>
            <a-menu-item key="10"> Option 10 </a-menu-item>
            <a-menu-item key="11"> Option 11 </a-menu-item>
            <a-menu-item key="12"> Option 12 </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
      <div class="content">
        <HomePage></HomePage>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from "../components/homePage";
export default {
  name: "homePage",
  data() {
    return {
      current: ["mail"],
      openKeys: ["sub1"],
    };
  },
  components: {
    HomePage,
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
    height: 8vh;
    background-color: #2a5caa;
  }
  .home-body {
    display: flex;
    width: 100%;
    .sider {
      width: 10vw;
    }
    .content {
      flex-grow: 1;
      height: 50vh;
    }
  }
}
</style>