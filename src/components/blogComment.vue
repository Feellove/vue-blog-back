<template>
  <div>
    <el-table
      :data="commentLists"
      fit
      border
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="_id"
        label="用户名"
      ></el-table-column>
      <el-table-column
        prop="commentContent"
        label="评论内容"
      ></el-table-column>
      <el-table-column
        prop="commentreply"
        label="回复内容"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="openDialog(scope.row._id)"
            title="回复"
          ></el-button>
          <el-button
            size="medium"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="delComment(scope.row._id)"
            title="删除"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="回复"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="commentForm"
        :rules="rules"
        ref="commentForm"
      >
        <el-form-item
          label="回复内容"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            v-model="commentForm.commentreply"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editComment('commentForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import url from "@/api.config.js";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      commentForm: {
        id: "",
        commentreply: ""
      },
      rules: {
        commentrply: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      commentLists: []
    };
  },
  created() {
    this.getCommentLists();
  },
  methods: {
    getCommentLists() {
      this.$axios({
        url: url.getMessage,
        method: "post",
        data: {}
      })
        .then(response => {
          if (response.data.code === 200 && response.data.message) {
            this.commentLists = response.data.message;
          } else {
            this.$message({
              showClose: true,
              message: "获取失败",
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
    delComment(id) {
      this.$axios({
        url: url.delMessage,
        method: "post",
        data: {
          id: id
        }
      })
        .then(response => {
          if (response.data.code === 200 && response.data.message) {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            this.getCommentLists();
          } else {
            this.$message({
              showClose: true,
              message: "删除失败",
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
    editComment(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            url: url.updateMessage,
            method: "post",
            data: {
              id: this.commentForm.id,
              commentreply: this.commentForm.commentreply
            }
          })
            .then(response => {
              if (response.data.code === 200 && response.data.message) {
                this.$message({
                  showClose: true,
                  message: "回复成功",
                  type: "success"
                });
                this.dialogFormVisible = false;
                this.getCommentLists();
              } else {
                this.$message({
                  showClose: true,
                  message: "回复失败",
                  type: "error"
                });
              }
            })
            .catch(error => {
              this.$message({
                showClose: true,
                message: error,
                type: "success"
              });
            });
        }
      });
    },

    openDialog(id) {
      this.dialogFormVisible = true;
      this.commentForm.id = id;
    }
  }
};
</script>
