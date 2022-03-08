<template>
  <div>
    <div>
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
        <a-select style="width: 6vw" @change="setCapitalAccount">
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
        <a-button type="primary" style="margin-left:10px" @click="reset"> 重置 </a-button>
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="billList"
      rowKey="gid"
      size="small"
      bordered
      :pagination="pagination"
    >
      <template slot="action" slot-scope="text, record">
        <a-popconfirm title="确认删除吗?" @confirm="() => onDelete(record.key)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </template>
      <template slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="showEditModal(record)">删除</a>
      </template>
    </a-table>
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
    title: "关系实体",
    dataIndex: "relaEntity",
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
    dataIndex: "capitalAccount",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "时间",
    dataIndex: "createdTime",
    sorter: (a, b) => (new Date(a.sumMoney) > new Date(b.sumMoney) ? 1 : -1),
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
      pagination: {
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
    init() {
      this.getBillList();
      this.getEntityComboxList();
      this.getCapitalAccountList();
    },
    reset(){
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
      this.bill.gid = value[value.length - 1];
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter((item) => item.key !== key);
    },
    getBillList() {
      const url = "/bill/getBillList";
      service.doPost(url, {}).then((result) => {
        this.billList = result.getData();
        this.pagination.total = result.getData().length;
      });
    },
    selectByFilter() {
      const url = "/bill/getBillList";
      service.doPost(url, this.bill).then((result) => {
        this.billList = result.getData();
        this.pagination.total = result.getData().length;
      });
    },
    getEntityComboxList() {
      const url = "/entity/getEntityComboxList";
      service.doPost(url, {}).then((result) => {
        this.options = result.getData();
      });
    },
    getCapitalAccountList() {
      const url = "/account/getAccountComboxList";
      service.doGet(url).then((result) => {
        this.capitalAccountList = result.getData();
      });
    },
  },
};
</script>
