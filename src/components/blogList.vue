<template>
  <div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column type="selection" width="36"></el-table-column>
      <el-table-column prop="date" label="创建日期" width="180"></el-table-column>
      <el-table-column prop="name" label="博客标题" width="180"></el-table-column>
      <el-table-column prop="category" label="博客类别" width="180"></el-table-column>
      <el-table-column prop="content" label="博客内容"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editRow(scope.$index,scope.row)"
            title="编辑"
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
    <el-pagination
      class="page_box"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next"
      :total="400"
    ></el-pagination>
  </div>
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
      ],
      currentPage: 1
    };
  },
  methods: {
    editRow(index, row) {
      console.log(index, row);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style scoped>
.page_box {
  padding: 20px 0;
}
</style>


