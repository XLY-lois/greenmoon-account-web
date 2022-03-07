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
        ref="infoForm"
      >
        <a-form-model-item label="ID">
          <a-input v-model="form.gid" disabled />
        </a-form-model-item>
        <a-form-model-item label="名称" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="微信名" prop="wxName">
          <a-input v-model="form.wxName" />
        </a-form-model-item>
        <a-form-model-item label="微信号" prop="wxNumber">
          <a-input v-model="form.wxNumber" />
        </a-form-model-item>
        <a-form-model-item label="电话号码" prop="phone">
          <a-input v-model="form.phone" />
        </a-form-model-item>
        <a-form-model-item
          v-if="parent == 'supplierTable'"
          label="主营业务"
          prop="mainBusiness"
        >
          <a-input v-model="form.mainBusiness" type="textarea" />
        </a-form-model-item>
      </a-form-model>
    </div>
  </a-modal>
</template>

<script>
import Service from "../../utils/service";
import { Message } from "element-ui";

const service = Service();

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
        phone: "",
        entityType: "",
      },
      rules: {
        name: requiredRule,
      },
    };
  },
  props: {
    modalTitle: String,
    modalVisible: Boolean,
    curOperation: Object,
    parent: String,
  },
  watch: {
    modalVisible(newVal, oldVal) {
      if (newVal) {
        this.fillInInfo();
      } else {
        this.resetForm();
        // this.$emit("refreshList");
      }
    },
  },
  mounted() {},
  methods: {
    handleOk(e) {
      console.log("Clicked OK button");
      this.onSubmit();
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.$emit("update:modalVisible", false);
    },
    onSubmit() {
      let params = this.form;
      if (
        this.modalTitle == "新增供应商信息" ||
        this.modalTitle == "新增员工信息"
      ) {
        service.doPost("/entity/addEntity", params).then((res) => {
          if (res.getCode() == 200) {
            Message({
              message: `新增供应商信息成功！`,
              type: "success",
            });
          }
          this.$emit("update:modalVisible", false);
          this.$emit("refreshList");
        });
      } else if (
        this.modalTitle == "修改供应商信息" ||
        this.modalTitle == "修改员工信息"
      ) {
        service.doPost("/entity/updateEntity", params).then((res) => {
          if (res.getCode() == 200) {
            Message({
              message: `${this.modalTitle}成功`,
              type: "success",
            });
            this.$emit("update:modalVisible", false);
            this.$emit("refreshList");
          }
        });
      }
    },

    fillInInfo() {
      this.form = this.curOperation;
      console.log(this, this.form);
    },
    // 重置表单数据
    resetForm() {
      this.$refs.infoForm.resetFields();
    },
  },
};
</script>
<style lang="less" scope>
.form-box {
}
</style>