<template>
  <div class="query-page">
    <div class="searchBox">
      <div>
        <span>往来方：</span>
        <a-cascader
          :options="options"
          placeholder="往来方"
          @change="setEntity"
        />
      </div>
      <div>
        <span>资金账户：</span>
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
      </div>
      <div>
        <span>日期范围：</span>
        <a-range-picker style="width: 12vw" @change="setTime" />
      </div>
      <div>
        <a-button type="primary" @click="selectByFilter"> 查询 </a-button>
        <a-button type="primary" style="margin-left: 10px" @click="reset">
          重置
        </a-button>
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
        <template slot="footer">
          <div>总计：{{ sum }}</div>
          <!-- <a-pagination
            :total="pagination.total"
            :show-total="(total) => `共有 ${total} 条数据`"
            :page-size="pagination.pageSize"
            :default-current="1"
            :pageSizeOptions="pagination.pageSizeOptions"
            :show-size-changer="true"
          /> -->
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import Service from "../../utils/service";

const service = Service();

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "供应商/员工",
    dataIndex: "relaEntityName",
  },
  {
    title: "金额",
    dataIndex: "sumMoney",
    sorter: (a, b) => a.sumMoney - b.sumMoney,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "资金流向",
    dataIndex: "mDirection",
    filters: [
      { text: "收入", value: "in" },
      { text: "支出", value: "out" },
    ],
    onFilter: (value, record) => record.mDirection.indexOf(value) === 0,
  },
  {
    title: "资金账户",
    dataIndex: "bank",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "时间",
    dataIndex: "createdTimeStr",
    sorter: (a, b) =>
      new Date(a.createdTimeStr) > new Date(b.createdTimeStr) ? 1 : -1,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "操作",
    key: "action",
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
        position:"top",
        total: 0,
        pageSize: 10, //每页中显示10条数据
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
    };
  },
  mounted() {
    this.init();
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
  },
};
</script>
<style lang="less" scoped>
.query-page {
  .searchBox {
    display: flex;
    height: 50px;
    justify-content: space-evenly;
    align-items: center;
  }
  .my-table {
    margin-left: 10px;
    margin-right: 10px;
    overflow-y: auto;
    max-height: 86vh;
  }
}
</style>