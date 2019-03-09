<template>
  <div>
    <el-table
      :data="articleLists"
      fit
      border
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="_id"
        type="selection"
        width="36"
      ></el-table-column>
      <el-table-column
        prop="articleName"
        label="博客标题"
      ></el-table-column>
      <el-table-column
        prop="articleClasses"
        label="博客类别"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建日期"
      ></el-table-column>
      <el-table-column
        prop="clickTimes"
        label="点击量"
      ></el-table-column>
      <el-table-column label="操作">
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
            @click="deleteRow(scope.$index,scope.row)"
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
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import url from "@/api.config.js";
export default {
  data() {
    return {
      articleLists: [],
      currentPage: 1,
      total: 0,
      pageSize: 10
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      this.$axios({
        url: url.getArticleList,
        method: "post",
        data: { currentPage: this.currentPage, pageSize: this.pageSize }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.articleLists = response.data.message.data;
            this.total = response.data.message.total;
          } else {
            console.log("获取数据失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    editRow(index, row) {
      this.$router.push({
        name: "blogAdd",
        params: {
          id: row._id
        }
      });
    },
    deleteRow(index, row) {
      this.$axios({
        url: url.deleteArticle,
        method: "post",
        data: { _id: row._id }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.getAllArticleList();
            this.getArticleList();
          } else {
            console.log("获取数据失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getArticleList(this.currentPage, this.pageSize);
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


