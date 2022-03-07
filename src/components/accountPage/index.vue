<template>
  <div class="account-page">
    <div class="table-box">
      <IncomeRecord v-if="curMenuKey == '2-1'" :curMenuKey="curMenuKey"></IncomeRecord>
      <PayRecord v-if="curMenuKey == '2-2'" :curMenuKey="curMenuKey"></PayRecord>
    </div>
  </div>
</template>

<script>
import IncomeRecord from "./incomeRecord.vue";
import PayRecord from "./payRecord.vue"
export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    IncomeRecord,
    PayRecord
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
  height: 94vh;
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