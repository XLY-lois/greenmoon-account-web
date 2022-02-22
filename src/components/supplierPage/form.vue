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
      >
        <a-form-model-item label="ID">
          <a-input v-model="form.gid" />
        </a-form-model-item>
        <a-form-model-item label="供应商名称">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="微信名">
          <a-input v-model="form.wxName" />
        </a-form-model-item>
        <a-form-model-item label="微信号">
          <a-input v-model="form.wxNumber" />
        </a-form-model-item>
        <a-form-model-item label="主营业务">
          <a-input v-model="form.mainBusiness" type="textarea" />
        </a-form-model-item>
      </a-form-model>
    </div>
  </a-modal>
</template>

<script>
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
      }
    },
  },
  mounted() {},
  methods: {
    handleOk(e) {
        console.log("Clicked OK button");
      //   this.ModalText = "The modal will be closed after two seconds";
    //   this.confirmLoading = true;
      //   setTimeout(() => {
      //     this.$emit("update:modalVisible", false);
      //     this.confirmLoading = false;
      //   }, 2000);
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
  },
};
</script>
<style lang="less" scope>
.form-box {
}
</style>