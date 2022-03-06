<template>
  <div>
    <SupplierTable v-if="curMenuKey == '3-1'"></SupplierTable>
    <StaffTable v-if="curMenuKey == '3-2'"></StaffTable>
  </div>
</template>

<script>
import SupplierTable from "./supplierTable.vue";
import StaffTable from "./staffTable.vue";

export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    SupplierTable,
    StaffTable
  },
  props: {
    curMenuKey: String,
  },
  watch:{
    
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
</style>