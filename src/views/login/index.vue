<template>
  <div class="main-container">
    <div class="form-container">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="登录" name="loginPage">
          <LoginForm></LoginForm>
        </el-tab-pane>
        <el-tab-pane label="注册" name="registerPage">
          <RegisterForm></RegisterForm>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
export default {
  name: "login",
  data() {
    return {
      activeName: "loginPage",
    };
  },
  components: {
    LoginForm,
    RegisterForm,
  },
  methods: {
  },
};
</script>
<style lang="less" scoped>
.main-container {
  width: 100%;
  height: calc(100vh);
  display: flex;
  justify-content: center;
  align-items: center;
  .form-container {
    background-color: #fff;
    margin: 10px;
  }
}
</style>
