<template>
  <div class="add-form">
    <div class="form-title">支出新增</div>
    <div class="operations-box">
      <span class="operations-label">单据日期：</span>
      <a-date-picker @change="onDateChange" v-model="momentObj" />
      <span class="operations-label"> 往来方： </span>
      <a-cascader
        :options="entityList"
        :show-search="{ filterEntity }"
        placeholder="请选择往来方"
        @change="onEntityChange"
        style="width: 6vw"
      />
      <span class="operations-label"> 资金账户： </span>
      <a-select style="width: 6vw" @change="onAccountChange">
        <a-select-option
          v-for="item in capitalAccountList"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
      <div class="btn-box">
        <a-button class="btn" @click="handleAdd"> 新增 </a-button>
        <a-button class="btn" @click="deleteRows()"> 批量删除 </a-button>
        <a-button type="primary" class="btn" @click="submitList()">
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
            :type="'selectEntity'"
            :entityList="entityList"
            :defaultEntity="defaultEntity"
            @change="onCellChange(record.key, 'relaEntity', $event)"
          />
        </template>
        <template slot="sTime" slot-scope="text, record">
          <editable-cell
            :text="text"
            :type="'date'"
            :momentObj="momentObj || null"
            @change="onCellChange(record.key, 'sTime', $event)"
          />
        </template>
        <template slot="sumMoney" slot-scope="text, record">
          <editable-cell
            :text="text"
            :type="'number'"
            @change="onCellChange(record.key, 'sumMoney', $event)"
          />
        </template>
        <template slot="capitalAccount" slot-scope="text, record">
          <editable-cell
            :text="text"
            :type="'selectAccount'"
            :capitalAccountList="capitalAccountList"
            @change="onCellChange(record.key, 'capitalAccount', $event)"
          />
        </template>
        <template slot="content" slot-scope="text, record">
          <editable-cell
            :text="text"
            :type="'text'"
            @change="onCellChange(record.key, 'content', $event)"
          />
        </template>
        <template slot="operation" slot-scope="text, record">
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
  </div>
</template>

<script>
const EditableCell = {
  template: `
      <div 
        style="width:100%;height:30px;" 
      >
        <div> 
          <a-cascader
            v-if="type == 'selectEntity' "
            :options="entityList"
            :show-search="{ filterEntity }"
            placeholder="请选择往来方"
            @change="onEntityChange"
            style="width: 6vw"
            :value="entityArr"
          />
          <a-input 
            v-if="type == 'text' || type == 'number'"
            :value="value" 
            @change="onInputChange" 
            @blur="check(value)"
            style="border:white;"
          />
          <a-date-picker 
            v-if="type == 'date'"
            @change="onDateChange"
            :value="dateObj"
          />
           <a-select 
                v-if="type == 'selectAccount'"
                placeholder="请选择资金账户"
                style="width: 100%;"
                @change="entityChange"
                :value="value" 
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
      </div>
    `,
  props: {
    text: String | Number,
    type: String,
    momentObj: Object, //默认日期
    defaultDir: String, //默认方向
    defaultEntity: Array, //默认往来方路径
    suppliersList: Array, //往来方列表
    capitalAccountList: Array, //资金账户列表
  },
  data() {
    return {
      value: this.text,
      dateObj: this.momentObj,
      entityArr: this.defaultEntity,
    };
  },
  mounted() {
    this.getCapitalAccountList();
  },
  methods: {
    
    onEntityChange(value, selectedOptions) {
      //默认往来方下拉框变化时
      this.value = value;
      this.$emit("change", this.value);
    },
    filterEntity(inputValue, path) {
      return path.some(
        (option) =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );
    },
    entityChange(value) {
      //   console.log(`selected ${value}`);
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
      //   console.log(value);
    },
    checkNum() {
      if (this.type == "number" && isNaN(this.value)) {
        this.$message.warning("金额栏请输入正确格式数字。");
      }
    },
    check() {
      this.checkNum();
      this.$emit("change", this.value);
    },
    onDateChange(date, dateString) {
      this.value = dateString;
      this.dateObj = date;
      this.$emit("change", this.value);
    },
  },
};
import Service from "../../utils/service";

var service = Service();

export default {
  name: "addRecord",
  components: {
    EditableCell,
  },
  data() {
    return {
      suppliersList: [],
      capitalAccountList: [
        { id: 1, name: "账户1" },
        { id: 2, name: "账户2" },
      ],
      suppliersEnum: {},
      dataSource: [],
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
          title: "金额",
          dataIndex: "sumMoney",
          width: "15%",
          scopedSlots: { customRender: "sumMoney" },
        },
        {
          title: "资金账户",
          dataIndex: "capitalAccount",
          width: "15%",
          scopedSlots: { customRender: "capitalAccount" },
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
      selectDate: "", //日期默认string
      momentObj: undefined, //日期默认obj
      defaultEntity: [], //默认往来方路径
      defaultAccount: "", //默认资金账户
      defaultDir: "out", //资金流默认值
      selectedRowKeys: [],
      selectedRow: [],
      total: 0, //本次查询合计金额
      entityList: [], //往来方级联
    };
  },
  props: {
    curMenuKey: String,
  },
  mounted() {
    this.getEntityComboxList();
    this.getCapitalAccountList();
  },
  watch: {
    curMenuKey(newVal, oldVal) {
      this.dataSource = [];
      this.momentObj = undefined;
      this.defaultDir = "out";
    },
  },
  methods: {
    getCapitalAccountList() {
      const url = "/account/getAccountComboxList";
      service.doGet(url).then((result) => {
        this.capitalAccountList = result.getData();
      });
    },
    filterEntity(inputValue, path) {
      return path.some(
        (option) =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRow = selectedRows;
    },
    onEntityChange(value, selectedOptions) {
      //默认往来方下拉框变化时
      console.log(value, selectedOptions);
      this.defaultEntity = value;
    },
    onAccountChange(value) {
      //   console.log(`selected ${value}`);
      this.defaultAccount = value;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    getEntityComboxList() {
      service
        .doGet("/entity/getEntityComboxList")
        .then((result) => {
          let arr = result.getData();
          this.entityList = arr
        });
    },
    async submitList() {
      let billList = this.dataSource;
      billList.forEach((element) => {
        //处理往来方路径
        let len = element.relaEntity.length;
        element.relaEntity = element.relaEntity[len - 1];
      });
      console.log(billList);
      // const res = await this.$http
      //   .post("/bill/addBill", { billList })
      //   .then((res) => {
      //     if (res.data.code == 200) {
      //       this.$message.success("保存成功！");
      //       this.dataSource = [];
      //     } else {
      //       this.$message.error(`保存失败，错误代码：${res.data.code}`);
      //     }
      //   });
    },
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find((item) => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter((item) => item.key !== key);
    },
    handleAdd() {
      const { count, dataSource } = this;
      const newData = {
        key: count,
        relaEntity: this.defaultEntity,
        sTime: this.selectDate,
        sumMoney: "",
        mDirection: this.defaultDir,
        content: "",
        capitalAccount: this.defaultAccount,
      };
      this.dataSource = [...dataSource, newData];
      this.count = count + 1;
    },
    onDateChange(date, dateString) {
      //默认日期选择器变化时
      this.selectDate = dateString;
      this.momentObj = date;
    },
    deleteRows() {
      const dataSource = [...this.dataSource];
      const delArr = this.selectedRow;
      let newArr = [];
      dataSource.forEach((element) => {
        if (!delArr.includes(element)) {
          newArr.push(element);
        }
      });
      this.dataSource = newArr;
    },
  },
};
</script>

<style lang="less" scoped>
.add-form {
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