<template>
  <div class="form-container">
    <el-form :label-position="labelPosition" label-width="80px" :model="loginForm">
      <el-form-item label="电话号码">
        <el-input v-model="loginForm.telephone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "loginForm",
  data() {
    return {
      labelPosition: "left",
      loginForm: {
        telephone: "15900046112",
        password: "abc123456",
      },
    };
  },
  computed: {
    ...mapGetters(["user","logined"]),
  },
  mounted() {},
  methods: {
    submitForm() {
      let { telephone, password } = this.loginForm;
      this.login({ telephone, password }).then((data) => {
        const code = data.code
        const user = data.data
        if(code === 200) {
          this.$router.push('/')
          this.$store.commit('SET_USERINFO',user) // 修改store中的userInfo状态
          this.$store.commit('SET_LOGINED',true)
          console.log(this.logined)
        }
        if(code === 1002) {
          this.$message.warning('用户不存在')
        }
        if(code === 1003) {
          this.$message.warning('密码错误')
        }
        if(code === 1004) {
          this.$message.warning('用户被锁定')
        }
        if(code === 1005) {
          this.$message.warning('认证失败')
        }
      })
    },
    login(params) {
      return new Promise(async(resolve, reject) => {
        const res = await this.$http.post("/users/login",params)
        const {data} = res
        if(data){
          resolve(data)
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.form-container {
  width: 400px;
  height: 300px;
  background-color: #fff;
  .el-form {
    padding: 40px 20px;
  }
}
</style>
