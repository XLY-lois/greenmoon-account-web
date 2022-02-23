<template>
  <div class="supplier-page">
    <div class="operations-box">
      <a-button class="btn" type="primary" @click="showModal()">
        新增
      </a-button>
      <a-button class="btn">批量删除</a-button>
    </div>
    <div class="table-box">
      <a-table
        :columns="columns"
        :data-source="supplierList"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
      >
        <a slot="name" slot-scope="text">{{ text }}</a>
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            v-if="supplierList.length"
            title="确定要删除该供应商吗？"
            @confirm="() => onDelete(record.key)"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
          <a href="javascript:;" class="edit-btn" @click="showModal(record)"
            >编辑</a
          >
        </template>
      </a-table>
    </div>
    <Form
      :modalTitle.sync="modalTitle"
      :modalVisible.sync="modalVisible"
      :supplierObj="curOperation"
      @refreshList="getSupplierList()"
    ></Form>
  </div>
</template>

<script>
import Form from "./form.vue";
// 表头
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "微信名",
    dataIndex: "wxName",
    key: "wxName",
  },
  {
    title: "微信号",
    dataIndex: "wxNumber",
    key: "wxNumber",
    // width: 80,
  },
  {
    title: "主营业务",
    dataIndex: "mainBusiness",
    key: "mainBusiness",
    // ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];
export default {
  data() {
    return {
      supplierList: [
        // {
        //   key: "1",
        //   name: "John Brown",
        //   wxName: "Newaaa",
        //   wxNumber: "Newaaa",
        //   mainBusiness: "蔬菜",
        // },
        // {
        //   key: "2",
        //   name: "Jim Green",
        //   wxName: "dsdfsdsf",
        //   wxNumber: "dsdfsdsf",
        //   mainBusiness: "水果",
        // },
        // {
        //   key: "3",
        //   name: "Joe Black",
        //   wxName: "sdffsdfd",
        //   wxNumber: "sdffsdfd",
        //   mainBusiness: "肉类",
        // },
      ],
      columns,
      selectedRowKeys: [],
      // ModalText: "Content of the modal",
      modalVisible: false,
      modalTitle: "",
      curOperation: {}, //当前操作对象
    };
  },
  components: {
    Form,
  },
  mounted() {
    this.getSupplierList();
  },
  methods: {
    async getSupplierList() {
      const res = await this.$http
        .get("/supplier/getSuppliersList")
        .then((data) => {
          let res = data.data;
          if (res.code != 200) {

          } 
          else {
            let arr = [];
            res.data.forEach((element) => {
              let obj = {
                key: element.gid,
                mainBusiness: element.mainBusiness,
                name: element.name,
                wxName: element.wxName,
                wxNumber: element.wxNumber,
              };
              arr.push(obj);
            });
            this.supplierList = arr;
          }
        });
    },
    async onDelete(key) {
      let gid = key;
      let res = await this.$http.post("/supplier/deleteSuppliers", { gid });
      then(function (res) {
        console.log(res);
      });
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    showModal(obj = {}) {
      this.curOperation = obj;
      if (obj.key) {
        this.modalTitle = "修改供应商信息";
      } else {
        this.modalTitle = "新增供应商信息";
      }
      this.modalVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.supplier-page {
  width: 100%;
  height: 92vh;
  background: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  .operations-box {
    width: 80%;
    margin-top: 2vh;
    height: 6vh;
    background-color: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btn {
      margin-right: 2vw;
    }
  }
  .table-box {
    width: 80%;
    background-color: #fff;
    padding: 2vh 2vw;
    .edit-btn {
      margin-left: 10px;
    }
  }
}
</style>