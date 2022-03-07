<template>
  <div>
    <div>
      <div>
        <span>往来方：</span>
        <a-cascader
          :options="options"
          placeholder="请选择供应商"
          @change="setEntity"
        />
      </div>
      <div>
        <span>资金账户：</span>
        <a-select style="width: 6vw" @change="onAccountChange">
          <a-select-option
            v-for="item in capitalAccountList"
            :key="item.value"
            :value="item.label"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <span>日期范围：</span>
        <a-range-picker @change="setTime" />
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
    dataIndex: "releEntity",
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
        sTime: "",
        eTime: "",
      },
      curOperationObj: {},
      capitalAccountList: [],
    };
  },
  mounted() {
    this.getBillList();
    this.getEntityComboxList();
    this.getCapitalAccountList();
  },
  methods: {
    showEditModal(obj) {
      this.curOperationObj = obj;
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
    getEntityComboxList() {
      const url = "/entity/getEntityComboxList";
      service.doPost(url, {}).then((result) => {
        this.options = result.getData();
      });
    },
    getCapitalAccountList() {
      const url = "/account/getAccountComboxList";
      service.doGet(url).then((result) => {
        this.optiocapitalAccountListns = result.getData();
      });
    },
  },
};
</script>
