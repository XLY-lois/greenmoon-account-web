<template>
  <div>
    <a-modal
      title="修改单据"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div></div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "formModal",
  data() {
    return {};
  },
  props: {
    // modalVisible: Boolean,
    curOperationObj: Object,
  },
  mounted() {
    console.log(this.curOperationObj);
  },
  methods: {
    // 编辑提交
    handleOk(e) {
      console.log(e);
      this.$emit("update:modalVisible", false);
    },
    handleCancel() {
      this.$emit("update:modalVisible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>