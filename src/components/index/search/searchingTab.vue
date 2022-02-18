<template>
  <div class="search-container">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane v-for="(val,key) in tabItem" :key="key" :label="val" :name="key">
        <SearchingList :curTab="key" @selectType="selectType"></SearchingList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import SearchingList from './searchingList'
export default {
  data() {
    return {
      activeName: "jiachang",
      tabItem: {
        jiachang: "家常菜谱",
        zhonghua: "中华菜系",
        xiaochi: "各地小吃",
        waiguo: "外国菜谱",
        hongbei: "烘焙",
        me: "我的美食属性",
      },
    };
  },
  components: {
    SearchingList
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    selectType(type) {
      this.$emit('selectType',type)
    }
  },
};
</script>
<style lang="less" scoped>
.search-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
