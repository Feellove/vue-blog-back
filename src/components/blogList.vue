<template>
  <div v-loading="loading">
    <div class="create_btn">
      <el-button
        type="primary"
        @click="newArticle"
      >新建文章</el-button>
    </div>
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
        prop="articleDesc"
        label="博客简介"
      ></el-table-column>
      <el-table-column label="博客图片">
        <template slot-scope="scope">
          <img
            :src="scope.row.articleImgurl"
            class="a_img"
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="classesId.classesName"
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
      <el-table-column
        prop="tags"
        label="标签"
      >
        <template slot-scope="scope">
          <el-tag
            type="primary"
            disable-transitions
            v-for="(tag,index) in scope.row.tags"
            :key="index"
          >{{tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editArticle(scope.$index,scope.row)"
            title="编辑"
          ></el-button>
          <el-button
            size="medium"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteArticle(scope.$index,scope.row)"
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
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
export default {
  data() {
    return {
      articleLists: [],
      currentPage: 1,
      total: 0,
      pageSize: 10,
      loading: true
    };
  },
  beforeCreate() {},
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
            this.articleLists.forEach((v, k) => {
              this.articleLists[k].createTime = moment(v.createTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            });
            this.total = response.data.message.total;
            this.loading = false;
          } else {
            this.$message({
              showClose: true,
              message: "获取数据失败",
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
        });
    },
    newArticle() {
      this.$router.push({
        name: "blogAdd"
      });
    },
    editArticle(index, row) {
      this.$router.push({
        name: "blogAdd",
        params: {
          id: row._id
        }
      });
    },
    deleteArticle(index, row) {
      this.$axios({
        url: url.deleteArticle,
        method: "post",
        data: { _id: row._id }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
             this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            this.getArticleList();
          } else {
            this.$message({
              showClose: true,
              message: "删除失败",
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.getArticleList(this.currentPage, this.pageSize);
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
  text-align: right;
}
.a_img {
  width: 60px;
  height: 54px;
  object-fit: cover;
}
.create_btn {
  text-align: right;
  margin-bottom: 20px;
}
</style>


