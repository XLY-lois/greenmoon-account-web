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
              <a-icon type="account-book" /><span>单据</span>
            </span>
            <a-menu-item key="2-1">收入新增</a-menu-item>
            <a-menu-item key="2-2">支出新增</a-menu-item>
            <a-menu-item key="2-3">查询</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="3" @titleClick="titleClick">
            <span slot="title">
              <a-icon type="idcard" /><span>人员</span>
            </span>
            <a-menu-item key="3-1">供应商</a-menu-item>
            <a-menu-item key="3-2">员工</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
      <div class="content">
        <HomePage v-if="current == '1'"></HomePage>
        <AccountPage
          v-if="current.indexOf('2') == 0"
          :curMenuKey="current"
        ></AccountPage>
        <PersonnelPage
          v-if="current.indexOf('3') == 0"
          :curMenuKey="current"
        ></PersonnelPage>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from "../components/homePage";
import PersonnelPage from "../components/personnelPage";
import AccountPage from "../components/accountPage";

export default {
  name: "homePage",
  data() {
    return {
      current: "",
      openKeys: ["sub1"],
    };
  },
  components: {
    HomePage,
    AccountPage,
    PersonnelPage,
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  methods: {
    handleClick(e) {
      this.current = e.key;
      console.log("click", this.current);
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