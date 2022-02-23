<template>
  <div class="account-page">
    <div class="table-box">
      <RecordAdd></RecordAdd>
    </div>
  </div>
</template>

<script>
import RecordAdd from "./recordAdd.vue";
export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    RecordAdd,
  },
  props: {},
  methods: {},
};
</script>

<style lang="less" scoped>
.account-page {
  width: 100%;
  height: 92vh;
  background: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  .table-box {
    width: 80%;
    background-color: #fff;
    padding: 2vh 2vw;
    margin-top: 2vh;
  }
}
</style>