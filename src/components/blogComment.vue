<template>
  <el-table :data="tableData" border stripe style="width: 100%">
    <el-table-column type="selection" width="36"></el-table-column>
    <el-table-column prop="date" label="评论时间" width="180"></el-table-column>
    <el-table-column prop="name" label="评论内容" width="180"></el-table-column>
    <el-table-column prop="category" label="回复内容" width="180"></el-table-column>
    <el-table-column prop="content" label="评论名字"></el-table-column>
    <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-service"
          circle
          @click="editRow(scope.$index,scope.row)"
          title="回复"
        ></el-button>
        <el-button
          size="medium"
          type="danger"
          icon="el-icon-delete"
          circle
          @click="deleteRow(scope.$index, tableData)"
          title="删除"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          category: "1",
          content: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          category: "1",
          content: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          category: "1",
          content: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          category: "1",
          content: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    editRow(index, row) {
      console.log(index, row);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
  }
};
</script>

