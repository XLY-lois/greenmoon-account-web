<template>
  <div class="add-form">
    <div class="operations-box">
      <div>
        <span class="operations-label" v-show="curMenuKey == '2-1'"
          >单据日期：</span
        >
        <span class="operations-label" v-show="curMenuKey == '2-2'"
          >开始日期：</span
        >
        <a-date-picker @change="onDateChange" v-model="momentObj" />
        <span class="operations-label" v-show="curMenuKey == '2-2'"
          >结束日期：</span
        >
        <a-date-picker
          @change="onEndDateChange"
          v-model="queryParams.endMomentObj"
          v-show="curMenuKey == '2-2'"
        />
        <span class="operations-label" v-show="curMenuKey == '2-2'">
          往来方：
        </span>
        <a-select
          show-search
          placeholder="请选择往来方"
          option-filter-prop="children"
          style="width: 10vw"
          :filter-option="filterOption"
          @change="onSupplierChange"
          v-show="curMenuKey == '2-2'"
          allowClear
        >
          <a-select-option
            v-for="item in suppliersList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
        <span class="operations-label">方向：</span>
        <a-radio-group
          :options="options"
          @change="onDirChange"
          :value="curMenuKey == '2-1' ? defaultDir : queryParams.mDirection"
        />
        <a-button v-show="curMenuKey == '2-1'" class="btn" @click="handleAdd">
          新增
        </a-button>
        <a-button v-show="curMenuKey == '2-2'" class="btn" @click="queryBill">
          查询
        </a-button>
        <a-button class="btn" @click="deleteRows()"> 批量删除 </a-button>
        <a-button
          type="primary"
          v-show="curMenuKey == '2-1'"
          class="btn"
          @click="submitList()"
        >
          保存
        </a-button>
      </div>
    </div>
    <div class="table-box">
      <a-table
        bordered
        :data-source="dataSource"
        :columns="columns"
        :pagination="false"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
      >
        <template slot="relaEntity" slot-scope="text, record">
          <editable-cell
            :text="text"
            :type="'select'"
            :curMenuKey="curMenuKey"
            :suppliersList="suppliersList"
            @change="onCellChange(record.key, 'relaEntity', $event)"
          />
        </template>
        <template slot="sTime" slot-scope="text, record">
          <editable-cell
            :text="text"
            :type="'date'"
            :momentObj="momentObj || null"
            :curMenuKey="curMenuKey"
            @change="onCellChange(record.key, 'sTime', $event)"
          />
        </template>
        <template slot="mDirection" slot-scope="text, record">
          <editable-cell
            :text="text == 'in' ? '收入' : text == 'out' ? '支出' : ''"
            :type="'option'"
            :defaultDir="defaultDir"
            :curMenuKey="curMenuKey"
            @change="onCellChange(record.key, 'mDirection', $event)"
          />
        </template>
        <template slot="sumMoney" slot-scope="text, record">
          <editable-cell
            :text="text"
            :type="'number'"
            :curMenuKey="curMenuKey"
            @change="onCellChange(record.key, 'sumMoney', $event)"
          />
        </template>
        <template slot="content" slot-scope="text, record">
          <editable-cell
            :text="text"
            :type="'text'"
            :curMenuKey="curMenuKey"
            @change="onCellChange(record.key, 'content', $event)"
          />
        </template>
        <template
          slot="operation"
          slot-scope="text, record"
          v-if="curMenuKey == '2-1'"
        >
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)"
          >
            <a href="javascript:;">Delete</a>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <div class="total-box" v-show="curMenuKey == '2-2'">
      <span>合计：{{ total }}</span>
    </div>
  </div>
</template>

<script>
const EditableCell = {
  template: `
      <div 
        style="width:100%;height:30px;" 
        @click="edit()" 
      >
        <div 
          v-if="editable && curMenuKey == '2-1'" 
           
        > 
        <a-select
          v-if="type == 'select'"
          show-search
          placeholder="请选择往来方"
          option-filter-prop="children"
          style="width: 100%"
          :filter-option="filterOption"
          @change="supplierChange"
        >
          <a-select-option 
            v-for="item in suppliersList" 
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
          <a-input 
            v-if="type == 'text' || type == 'number'"
            :value="value" 
            @change="onInputChange" 
            @blur="check(value)"
          />
          <a-date-picker 
            v-if="type == 'date'"
            @change="onDateChange"
            :value="dateObj" 
          />
          <a-radio-group 
            v-if="type == 'option'"
            :options="options" 
\           :value="curOption"
            @change="onRadioChange" 
            @blur="check(curOption)"
          />

        </div>
        <div v-else >
          {{ value || ' ' }}
        </div>
      </div>
    `,
  props: {
    text: String | Number,
    type: String,
    momentObj: Object, //默认日期
    defaultDir: String, //默认方向
    suppliersList: Array, //往来方列表
    curMenuKey: String,
  },
  data() {
    return {
      value: this.text,
      editable: false,
      dateObj: this.momentObj,
      curOption: this.defaultDir,
      options: [
        { label: "收入", value: "in" },
        { label: "支出", value: "out" },
      ],
    };
  },
  mounted() {},
  methods: {
    supplierChange(value) {
      console.log(`selected ${value}`);
      this.value = value;
      this.$emit("change", this.value);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    onInputChange(e) {
      const value = e.target.value;
      this.value = value;
      console.log(value);
    },
    checkNum() {
      if (this.type == "number" && isNaN(this.value)) {
        this.$message.warning("金额栏请输入正确格式数字。");
      }
    },
    check() {
      this.editable = false;
      this.checkNum();
      this.$emit("change", this.value);
    },
    edit() {
      this.editable = true;
    },
    onRadioChange(e) {
      this.curOption = e.target.value;
      this.$emit("change", this.curOption);
    },
    onDateChange(date, dateString) {
      this.value = dateString;
      this.dateObj = date;
      this.check();
    },
  },
};

export default {
  name: "addRecord",
  components: {
    EditableCell,
  },
  data() {
    return {
      suppliersList: [],
      suppliersEnum: {},
      dataSource: [],
      options: [
        { label: "收入", value: "in" },
        { label: "支出", value: "out" },
      ],
      count: 2,
      columns: [
        {
          title: "往来方",
          dataIndex: "relaEntity",
          width: "15%",
          scopedSlots: { customRender: "relaEntity" },
        },
        {
          title: "单据日期",
          dataIndex: "sTime",
          width: "15%",
          scopedSlots: { customRender: "sTime" },
        },
        {
          title: "资金流向",
          dataIndex: "mDirection",
          width: "15%",
          scopedSlots: { customRender: "mDirection" },
        },
        {
          title: "金额",
          dataIndex: "sumMoney",
          width: "15%",
          scopedSlots: { customRender: "sumMoney" },
        },
        {
          title: "用途",
          dataIndex: "content",
          width: "25%",
          scopedSlots: { customRender: "content" },
        },
        {
          title: "操作",
          dataIndex: "operation",
          width: "15%",
          scopedSlots: { customRender: "operation" },
        },
      ],
      selectDate: "",
      momentObj: undefined, //日期默认值
      defaultDir: "", //资金流默认值
      selectedRowKeys: [],
      selectedRow: [],
      queryParams: {
        endMomentObj: undefined,
        sTime: "",
        eTime: "",
        relaEntity: "",
        mDirection: "",
      },
      total: 0, //本次查询合计金额
    };
  },
  props: {
    curMenuKey: String,
  },
  mounted() {
    this.getSupplierComboxList();
  },
  watch: {
    curMenuKey(newVal, oldVal) {
      this.dataSource = [];
      this.momentObj = undefined;
      this.defaultDir = "";
      this.queryParams = {
        endMomentObj: undefined,
        sTime: "",
        eTime: "",
        relaEntity: "",
        mDirection: "",
      };
      if (newVal == "2-2") {
        this.queryBill();
      }
    },
  },
  methods: {
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRow = selectedRows;
    },
    onSupplierChange(value) {
      console.log(`selected ${value}`);
      this.queryParams.relaEntity = value;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    async getSupplierComboxList() {
      const res = await this.$http
        .get("/supplier/getSupplierComboxList")
        .then((res) => {
          this.suppliersList = res.data.data;
          this.suppliersList.forEach((element) => {
            this.suppliersEnum[element.id] = element.name;
          });
        });
    },
    async submitList() {
      let billList = this.dataSource;
      const res = await this.$http
        .post("/bill/addBill", { billList })
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success("保存成功！");
            this.dataSource = [];
          } else {
            this.$message.error(`保存失败，错误代码：${res.data.code}`);
          }
        });
    },
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find((item) => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
      console.log(this.dataSource);
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter((item) => item.key !== key);
    },
    handleAdd() {
      const { count, dataSource } = this;
      const newData = {
        key: count,
        relaEntity: "",
        sTime: this.selectDate,
        sumMoney: "",
        mDirection: this.defaultDir,
        content: "",
      };
      this.dataSource = [...dataSource, newData];
      this.count = count + 1;
    },
    onDateChange(date, dateString) {
      if (this.curMenuKey == "2-1") {
        this.selectDate = dateString;
        this.momentObj = date;
      } else if (this.curMenuKey == "2-2") {
        this.queryParams.sTime = dateString;
      }
    },
    onEndDateChange(date, dateString) {
      this.queryParams.eTime = dateString;
    },
    onDirChange(e) {
      let val = e.target.value;
      if (this.curMenuKey == "2-1") {
        this.defaultDir = val;
      } else if (this.curMenuKey == "2-2") {
        this.queryParams.mDirection = val;
      }
    },
    deleteRows() {
      const dataSource = [...this.dataSource];
      const delArr = this.selectedRow;
      if (this.curMenuKey == "2-1") {
        let newArr = [];
        dataSource.forEach((element) => {
          if (!delArr.includes(element)) {
            newArr.push(element);
          }
        });
        this.dataSource = newArr;
      } else if (this.curMenuKey == "2-2") {
        console.log(delArr);
        let idList = [];
        delArr.forEach((ele) => {
          idList.push(ele.key);
        });
        this.deletsBills(idList);
      }
    },
    async deletsBills(idList) {
      const res = await this.$http
        .post("/bill/deleteBills", { gids: idList })
        .then((res) => {
          console.log(res);
          // let list = res.data.data.data;
          // let sum = res.data.data.sum;
          // let code = res.data.code;
          if (code == 200) {
            this.$message.success("删除成功！");
            this.queryBill();
          } else {
            this.$message.error(`保存失败，错误代码：${res.data.code}`);
          }
        });
    },
    async queryBill() {
      this.dataSource = [];
      this.total = 0;
      const res = await this.$http
        .post("/bill/getBillList", { ...this.queryParams })
        .then((res) => {
          console.log(res);
          let list = res.data.data.data;
          let sum = res.data.data.sum;
          let code = res.data.code;
          if (code == 200) {
            list.forEach((element) => {
              this.dataSource.push({
                key: element.gid,
                relaEntity: this.suppliersEnum[element.relaEntity],
                sTime: element.sTimeStr,
                sumMoney: element.sumMoney,
                mDirection: element.mDirection,
                content: element.content,
              });
            });
            this.total = sum;
          } else {
            this.$message.error(`保存失败，错误代码：${res.data.code}`);
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.add-form {
  .operations-box {
    height: 6vh;
    background-color: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .operations-label {
      margin-left: 2vw;
    }
    .btn {
      margin-right: 2vw;
    }
  }
  .table-box {
    background-color: #fff;
    padding: 2vh 2vw;
    max-height: 80vh;
    overflow-y: auto;
    .edit-btn {
      margin-left: 10px;
    }
  }
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
</style>