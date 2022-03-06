<template>
  <div class="account-page">
    <div class="table-box">
      <IncomeRecord v-if="curMenuKey == '2-1'" :curMenuKey="curMenuKey"></IncomeRecord>

    </div>
  </div>
</template>

<script>
import IncomeRecord from "./incomeRecord.vue";
export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    IncomeRecord,
  },
  props: {
    curMenuKey: String,
  },
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
    // padding: 2vh 2vw;
    margin-top: 2vh;
  }
}
</style>