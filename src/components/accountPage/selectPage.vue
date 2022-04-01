<template>
  <div class="query-page">
    <div class="form-title">查询单据</div>
    <div class="operations-box">
      <span class="operations-label">往来方：</span>
      <a-cascader :options="options" placeholder="往来方" @change="setEntity" />
      <span class="operations-label">资金账户：</span>
      <a-select
        style="width: 8vw"
        @change="setCapitalAccount"
        :allowClear="true"
      >
        <a-select-option
          v-for="item in capitalAccountList"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>

      <span class="operations-label">日期范围：</span>
      <a-range-picker style="width: 12vw" @change="setTime" />
      <div class="btn-box">
        <a-button type="primary" class="btn" @click="selectByFilter">
          查询
        </a-button>
        <a-button class="btn" @click="reset"> 重置 </a-button>
      </div>
    </div>
    <div class="my-table">
      <a-table
        :columns="columns"
        :data-source="billList"
        rowKey="gid"
        size="small"
        bordered
        :pagination="pagination"
      >
        <template slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="showEditModal(record)">修改</a>

          <a-popconfirm
            style="margin-left: 10px"
            title="确认删除吗?"
            @confirm="() => onDelete(record.key)"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
        <template slot="mDirection" slot-scope="text">
          {{ text === "in" ? "收入" : "支出" }}
        </template>
      </a-table>
      <div class="total-box">
        <span>合计：{{ sum }}</span>
      </div>
    </div>
    <FormModal
      v-show="modalVisible"
      :curOperationObj.sync="curOperationObj"
    >
    </FormModal>
  </div>
</template>

<script>
import Service from "../../utils/service";
import FormModal from "./formModal.vue";
const service = Service();

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: "5%",
  },
  {
    title: "供应商/员工",
    dataIndex: "relaEntityName",
    width: "10%",
  },
  {
    title: "金额",
    dataIndex: "sumMoney",
    sorter: (a, b) => a.sumMoney - b.sumMoney,
    sortDirections: ["descend", "ascend"],
    width: "10%",
  },
  {
    title: "资金流向",
    dataIndex: "mDirection",
    width: "10%",
    scopedSlots: { customRender: "mDirection" },
  },
  {
    title: "资金账户",
    dataIndex: "bank",
    width: "15%",
  },
  {
    title: "内容",
    dataIndex: "content",
    width: "20%",
  },
  {
    title: "时间",
    width: "15%",
    dataIndex: "createdTimeStr",
    sorter: (a, b) =>
      new Date(a.createdTimeStr) > new Date(b.createdTimeStr) ? 1 : -1,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "操作",
    key: "action",
    width: "15%",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  data() {
    return {
      columns,
      options: [],
      billList: [],
      currentPage: 1,
      sum: 0,
      pagination: {
        position: "top",
        total: 0,
        pageSize: 50, //每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["50", "100", "200"], //每页中显示的数据
        showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
      },
      bill: {
        gid: "",
        capitalAccount: "",
        sTime: "",
        relaEntity: "",
        eTime: "",
      },
      curOperationObj: {},
      capitalAccountList: [],
      modalVisible: true, //编辑弹窗是否可见
    };
  },
  mounted() {
    this.init();
  },
  components: {
    FormModal,
  },
  methods: {
    // 初始化
    init() {
      this.getBillList();
      this.getEntityComboxList();
      this.getCapitalAccountList();
    },
    // 获取filterVO
    reset() {
      this.bill = null;
    },
    showEditModal(obj) {
      this.curOperationObj = obj;
      this.showModal();
    },
    setCapitalAccount(value) {
      this.bill.capitalAccount = value;
    },
    setTime(dates, dateStrings) {
      this.bill.sTime = dateStrings[0];
      this.bill.eTime = dateStrings[1];
    },
    setEntity(value) {
      this.bill.relaEntity = value[value.length - 1];
    },
    // 删除动作
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter((item) => item.key !== key);
    },
    // 拿单据列表
    getBillList() {
      const url = "/bill/getBillList";
      service.doPost(url, {}).then((result) => {
        this.billList = result.getData();
        this.pagination.total = result.getData().length;
        this.sum = result.getSum();
      });
    },
    // 获取实体下拉框
    getEntityComboxList() {
      const url = "/entity/getEntityComboxList";
      service.doPost(url, {}).then((result) => {
        this.options = result.getData();
      });
    },
    // 获取账户下拉框
    getCapitalAccountList() {
      const url = "/account/getAccountComboxList";
      service.doGet(url).then((result) => {
        this.capitalAccountList = result.getData();
      });
    },
    // 条件查询
    selectByFilter() {
      const url = "/bill/getBillList";
      service.doPost(url, this.bill).then((result) => {
        this.billList = result.getData();
        this.pagination.total = result.getData().length;
        this.sum = result.getSum();
      });
    },
    // 编辑弹窗唤起
    showModal() {
      this.modalVisible = true;
      console.log(this.modalVisible);
    },
  },
};
</script>
<style lang="less" scoped>
.query-page {
  .form-title {
    padding: 2vh 2vw;
    font-size: 120%;
    font-weight: 800;
  }
  .operations-box {
    height: 6vh;
    background-color: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .operations-label {
      margin-left: 2vw;
    }
    .btn-box {
      margin-left: 2vw;
      .btn {
        margin-right: 2vw;
      }
    }
  }
  .searchBox {
    display: flex;
    height: 50px;
    justify-content: space-evenly;
    align-items: center;
  }
  .my-table {
    background-color: #fff;
    padding: 2vh 2vw;
    max-height: 80vh;
    overflow-y: auto;
    .total-box {
      background-color: #fff;
      width: 100%;
      height: 4vh;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 2vw;
      font-size: 120%;
      font-weight: 500;
    }
  }
}
</style>