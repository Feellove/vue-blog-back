<template>
  <div>
    <div class="create_btn">
      <el-button
        type="primary"
        @click="openDialog(false)"
      >新建类别</el-button>
    </div>
    <el-table
      :data="classesList"
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
        prop="classesName"
        label="类别名称"
      ></el-table-column>
      <el-table-column
        prop="classesDesc"
        label="类别简介"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="openDialog(scope.row._id)"
            title="编辑"
          ></el-button>
          <el-button
            size="medium"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="delClasses(scope.row._id)"
            title="删除"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="classesForm.id?'编辑类别':'新建类别'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="classesForm"
        :rules="rules"
        ref="classesForm"
      >
        <el-form-item
          label="类别名称"
          :label-width="formLabelWidth"
          prop="classesName"
        >
          <el-input
            v-model="classesForm.classesName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="类别描述"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            v-model="classesForm.classesDesc"
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
          @click="classesForm.id?addClasses('classesForm'):editClasses('classesForm')"
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
      // title: "",
      formLabelWidth: "120px",
      classesForm: {
        id: "",
        classesName: "",
        classesDesc: ""
      },
      rules: {
        classesName: [
          { required: true, message: "请输入类别名称", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      classesList: []
    };
  },
  created() {
    this.getClasses();
  },
  methods: {
    addClasses(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            url: url.addClasses,
            method: "post",
            data: {
              classesName: this.classesForm.classesName,
              classesDesc: this.classesForm.classesDesc
            }
          })
            .then(response => {
              if (response.data.code === 200 && response.data.message) {
                this.$message({
                  showClose: true,
                  message: "创建成功",
                  type: "success"
                });
                this.dialogFormVisible = false;
                this.getClasses();
              } else {
                this.$message({
                  showClose: true,
                  message: "创建失败",
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
        }
      });
    },
    editClasses(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            url: url.updateClasses,
            method: "post",
            data: {
              id: this.classesForm.id,
              classesName: this.classesForm.classesName,
              classesDesc: this.classesForm.classesDesc
            }
          })
            .then(response => {
              if (response.data.code === 200 && response.data.message) {
                this.$message({
                  showClose: true,
                  message: "更新成功",
                  type: "success"
                });
                this.dialogFormVisible = false;
                this.getClasses();
              } else {
                this.$message({
                  showClose: true,
                  message: "更新失败",
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
    getClasses() {
      this.$axios({
        url: url.getClasses,
        method: "post",
        data: {}
      })
        .then(response => {
          if (response.data.code === 200 && response.data.message) {
            this.classesList = response.data.message;
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
    delClasses(id) {
      this.$axios({
        url: url.delClasses,
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
            this.getClasses();
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
    openDialog(id) {
      if (id) {
        this.dialogFormVisible = true;
        this.classesForm.id = id;
        this.$axios({
          url: url.getOneClasses,
          method: "post",
          data: { id: id }
        })
          .then(response => {
            if (response.data.code === 200 && response.data.message) {
              this.classesForm.classesDesc =
                response.data.message[0].classesDesc;
              this.classesForm.classesName =
                response.data.message[0].classesName;
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
      } else {
        this.dialogFormVisible = true;
        this.classesForm.classesName = "";
        this.classesForm.classesDesc = "";
      }
    }
  }
};
</script>
<style>
.create_btn {
  text-align: right;
  margin-bottom: 20px;
}
</style>
