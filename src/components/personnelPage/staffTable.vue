<template>
  <div class="staff-page">
    <div class="operations-box">
      <a-button class="btn" type="primary" @click="showModal()">
        新增
      </a-button>
      <a-button class="btn" @click="onDelete(selectedRowKeys)">批量删除</a-button>
    </div>
    <div class="table-box">
      <a-table
        :columns="columns"
        :data-source="staffList"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
      >
        <a slot="name" slot-scope="text">{{ text }}</a>
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            v-if="staffList.length"
            title="确定要删除该员工吗？"
            @confirm="() => onDelete([record.gid])"
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
      :curOperation="curOperation"
      @refreshList="getStaffList()"
      :parent="'staffTable'"
    ></Form>
  </div>
</template>

<script>
import { Message } from "element-ui";
import Form from "./form.vue";
import Service from "../../utils/service";

var service = Service();

// 表头
const columns = [
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
    title: "电话号码",
    dataIndex: "phone",
    key: "phone",
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
      staffList: [],
      columns,
      selectedRowKeys: [],
      modalVisible: false,
      modalTitle: "",
      curOperation: {}, //当前操作对象
      // 实体类型：stuff 员工，supplier 供应商
      entity: {
        entityType: "staff",
      },
    };
  },
  components: {
    Form,
  },
  mounted() {
    this.getStaffList();
  },
  methods: {
    getStaffList() {
      this.staffList = [];
      const url = "/entity/selectByFilter";
      service.doPost(url, this.entity).then((result) => {
        let arr = result.getData();
        arr.forEach((element) => {
          this.staffList.push({ ...element, key: element.gid });
        });
      });
    },
    onDelete(arr) {
      let gids = arr
      service.doPost("/entity/deleteByGid", { gids }).then((res) => {
        if (res.getCode() == 200) {
          Message({
            message: `删除成功！`,
            type: "success",
          });
          this.getStaffList();
        }
      });
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    showModal(obj = { entityType: "staff" }) {
      this.curOperation = { ...obj };
      if (this.curOperation.key) {
        this.modalTitle = "修改员工信息";
      } else {
        this.modalTitle = "新增员工信息";
      }
      this.modalVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.staff-page {
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