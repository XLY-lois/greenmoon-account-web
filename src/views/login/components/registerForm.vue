<template>
  <div class="form-container">
    <el-form :label-position="labelPosition" label-width="80px" :model="registerForm">
      <el-form-item label="电话号码">
        <el-input v-model="registerForm.telephone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="registerForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="registerForm.passwordAgain" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "registerForm",
  data() {
    return {
      labelPosition: "left",
      registerForm: {
        telephone: "",
        password: "",
        passwordAgain: "",
      },
    };
  },
  methods: {
    checkInput() {
      if (this.registerForm.password && this.registerForm.passwordAgain) {
      }
    },
    submitForm() {
      let { telephone, password } = this.registerForm;
      this.register({ telephone, password }).then((data) => {
        const code = data.code
        if(code == '200') {
          this.$router.push('/userInfo')
        }
        if(code == '1001'){
          this.$message.warning('用户已存在')
        }
      })
    },
    register(params) {
      return new Promise(async(resolve, reject) => {
        const res = await this.$http.post("/users/register",params)
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
