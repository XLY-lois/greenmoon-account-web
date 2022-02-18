<template>
  <div class="userInfo-container">
    <div class="userInfo-aside">
      <div class="userInfo-aside-avatar">
        <!-- <img src="http://192.168.1.105:8888/static/15900046112.jpg"> -->
      </div>
      <input class="userInfo-aside-input" accept="image/*" name="avatar" id="avatar" type="file">
      <el-button @click="updateImg" size="small">上传图片</el-button>
    </div>
    <div class="userInfo-form">
      <el-form ref="form" :model="form" label-width="80px" :label-position="'left'">
        <el-form-item label="昵称">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="地区" prop="address">
          <el-select v-model="form.address" placeholder="请选择区域">
            <el-option label="广东" value="guangdong"></el-option>
            <el-option label="湖南" value="hunan"></el-option>
          </el-select>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="一句话介绍你自己">
          <el-input type="textarea" v-model="form.intro" :autosize="{ minRows: 4}">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="toPage('index')">返回首页</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        gender: "",
        intro: "",
        address: "",
      },
      imgUrl: "../../assets/logo.png",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.form = this.user;
  },
  methods: {
    onSubmit() {
      this.editInfo(this.form).then((data) => {
        const code = data.code;
        console.log(code)
        if (code === 200) {
          this.$message.success("修改信息成功:)");
          this.$router.push('/')
        }
      });
    },
    toPage(page) {
      this.$emit("toPage", page);
    },
    updateImg() {
      let img = document.getElementById("avatar").files[0];
      // console.log(img);
      var formdata = new FormData();
      formdata.append("avatar", img, img.name);
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      this.$http
        .post("/users/updateAvatar", formdata, config)
        .then((response) => {
          console.log(response.data);
          // this.imgUrl = response.data.data
        });
    },
    // headImgChange(e) {
    //   // let self = this;
    //   let reader = new FileReader();
    //   let imgResult = "";
    //   // console.log(e.target.files[0]);
    //   reader.readAsDataURL(e.target.files[0]);
    //   reader.onload = function (e) {
    //     imgResult = e.target.result; //img base64
    //     console.log(imgResult);
    //   };
    // },
    editInfo(params) {
      return new Promise(async (resolve, reject) => {
        const res = await this.$http.post("/users/completeInfo", params);
        const { data } = res;
        if (data) {
          resolve(data);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.userInfo-container {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.575);
  display: flex;
  justify-content: center;
  .userInfo-aside {
    width: 10%;
    // background-color: rgb(211, 154, 154);
    .userInfo-aside-avatar {
      margin-top: 40px;
      width: 140px;
      height: 140px;
      background-color: #fff;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .userInfo-aside-input {
      margin: 10px 0;
    }
  }
  .userInfo-form {
    margin: 40px;
    width: 30%;
  }
}
</style>
