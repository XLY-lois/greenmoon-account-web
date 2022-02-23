<template>
  <div class="home-page">
    <div class="home-header">
      <img class="header-logo" src="../assets/logo.png" />
      <div class="header-text">绿月管理后台</div>
    </div>
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
          <a-sub-menu key="2" @titleClick="titleClick">
            <span slot="title">
              <a-icon type="account-book" /><span>收入与支出</span>
            </span>
            <a-menu-item key="2-1">记录</a-menu-item>
            <a-menu-item key="2-2">查询</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="3" @titleClick="titleClick">
            <a-icon type="idcard" />
            <span>供应商</span>
          </a-menu-item>
        </a-menu>
      </div>
      <div class="content">
        <HomePage v-if="current == '1'"></HomePage>
        <SupplierPage v-if="current == '3'"></SupplierPage>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from "../components/homePage";
import SupplierPage from "../components/supplierPage";

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
    SupplierPage,
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  methods: {
    handleClick(e) {
      this.current = e.key;
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
    height: 6vh;
    background-color: #2a5caa;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .header-logo {
      width: 40px;
      margin-left: 10px;
    }
    .header-text {
      color: #fff;
      margin-left: 10px;
      font-size: 140%;
      font-weight: 800;
    }
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