<template>
  <a-modal
    :title="modalTitle"
    :visible="modalVisible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="form-box">
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
        ref="supplierForm"
      >
        <a-form-model-item label="ID">
          <a-input v-model="form.gid" disabled />
        </a-form-model-item>
        <a-form-model-item label="供应商名称" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="微信名" prop="wxName">
          <a-input v-model="form.wxName" />
        </a-form-model-item>
        <a-form-model-item label="微信号" prop="wxNumber">
          <a-input v-model="form.wxNumber" />
        </a-form-model-item>
        <a-form-model-item label="主营业务" prop="mainBusiness">
          <a-input v-model="form.mainBusiness" type="textarea" />
        </a-form-model-item>
      </a-form-model>
    </div>
  </a-modal>
</template>

<script>
const requiredRule = {
  required: true,
  message: "此项必填，请输入值。",
  trigger: "blur",
};
export default {
  data() {
    return {
      confirmLoading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      form: {
        gid: "",
        name: "",
        wxName: "",
        wxNumber: "",
        mainBusiness: "",
      },
      rules: {
        name: requiredRule,
        wxName: requiredRule,
        wxNumber: requiredRule,
        mainBusiness: requiredRule,
      },
    };
  },
  props: {
    modalTitle: String,
    modalVisible: Boolean,
    supplierObj: Object,
  },
  watch: {
    modalVisible(newVal, oldVal) {
      if (newVal) {
        this.fillInInfo();
      }else {
          this.resetForm()
          this.$emit("refreshList")
      }
    },
  },
  mounted() {},
  methods: {
    handleOk(e) {
      console.log("Clicked OK button");
      this.onSubmit().then((res) => {
        console.log(res);
        if (res) {
          this.$emit("update:modalVisible", false);
          this.confirmLoading = false;
        }
      });
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.$emit("update:modalVisible", false);
    },
    onSubmit() {
      let params = this.form;
      if (this.modalTitle == "新增供应商信息") {
        return new Promise(async (resolve, reject) => {
          const res = await this.$http.post("/supplier/addSuppliers", params);
          if (res) {
            resolve(res);
          }
        });
      } else if (this.modalTitle == "修改供应商信息") {
        return new Promise(async (resolve, reject) => {
          const res = await this.$http.post(
            "/supplier/updateSupplierInfo",
            params
          );
          if (res) {
            resolve(res);
          }
        });
      }
    },
    fillInInfo() {
      console.log(this.supplierObj);
      let obj = this.supplierObj;
      this.form = {
        gid: obj.key,
        name: obj.name,
        wxName: obj.wxName,
        wxNumber: obj.wxNumber,
        mainBusiness: obj.mainBusiness,
      };
    },
    resetForm() {
      this.$refs.supplierForm.resetFields();
    },
  },
};
</script>
<style lang="less" scope>
.form-box {
}
</style>