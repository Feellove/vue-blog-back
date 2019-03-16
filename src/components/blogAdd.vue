<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item
      label="博客标题"
      prop="name"
    >
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item
      label="博客头像"
      prop="articleUrl"
    >
      <el-upload
        class="avatar-uploader"
        :action="actionUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="ruleForm.articleUrl"
          :src="ruleForm.articleUrl"
          class="avatar"
        >
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        ></i>
      </el-upload>
    </el-form-item>
    <el-form-item
      label="博客简介"
      prop="desc"
    >
      <el-input
        type="textarea"
        v-model="ruleForm.desc"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="博客类别"
      prop="region"
    >
      <el-select
        v-model="ruleForm.region"
        placeholder="请选择类别"
      >
        <el-option
          label="前端"
          value="前端"
        ></el-option>
        <el-option
          label="后端"
          value="后端"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label="博客内容"
      prop="content"
    >
      <quill-editor
        v-model="ruleForm.content"
        class="editor"
        ref="quillEditor"
        :options="editorOption"
        @ready="onEditorReady($event)"
      ></quill-editor>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
      >立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import url from "@/api.config.js";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      editorOption: {
        placeholder: "请编辑文章..."
      },
      actionUrl: "",
      ruleForm: {
        id: "",
        articleImgurl: "",
        articleUrl:"",
        name: "",
        desc: "",
        region: "",
        content: ""
      },
      rules: {
        name: [{ required: true, message: "请输入标题", trigger: "blur" }],
        desc: [{ required: true, message: "请输入简介内容", trigger: "blur" }],
        articleImgurl: [
          { required: true, message: "请选择图片", trigger: "blur" }
        ],
        region: [{ required: true, message: "请选择类别", trigger: "change" }],
        content: [{ required: true, message: "请编辑文章...", trigger: "blur" }]
      }
    };
  },
  created() {
    this.actionUrl = url.upload;
    let id = this.$route.params.id;
    if (id) {
      this.ruleForm.id = id;
      this.getRuleForm(this.ruleForm.id);
    }
  },
  mounted() {},
  computed: {
    edtior() {
      return this.$refs.quillEditor.quill;
    }
  },
  methods: {
    onEditorReady(editor) {
      console.log(editor);
    },
    onEditorChange({ editor, html, text }) {
      console.log(html);
      this.ruleForm.content = html;
    },
    handleAvatarSuccess(res, file) {
      if (file.response.code === 200) {
        console.log(file.response.filename);
        this.ruleForm.articleImgurl =
          "./static/public/uploads/" + file.response.filename.filename;
      }
      this.ruleForm.articleUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    getRuleForm(id) {
      this.$axios({
        url: url.getOneArticle,
        method: "post",
        data: { _id: id }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.ruleForm.name = response.data.message.articleName;
            this.ruleForm.desc = response.data.message.articleDesc;
            this.ruleForm.articleImgurl = response.data.message.articleImgurl;
            this.ruleForm.region = response.data.message.articleClasses;
            this.ruleForm.content = response.data.message.articleContent;
            console.log(response.data.message);
          } else {
            console.log("获取数据失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.id) {
            this.$axios({
              url: url.updateArticle,
              method: "post",
              data: {
                _id: this.ruleForm.id,
                articleName: this.ruleForm.name,
                articleDesc: this.ruleForm.desc,
                articleImgurl: this.ruleForm.articleImgurl,
                articleClasses: this.ruleForm.region,
                articleContent: this.ruleForm.content
              }
            })
              .then(response => {
                console.log(response);
                if (response.data.code == 200 && response.data.message) {
                  console.log("更新成功");
                } else {
                  console.log("更新失败");
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            this.$axios({
              url: url.addArticle,
              method: "post",
              data: {
                articleName: this.ruleForm.name,
                articleDesc: this.ruleForm.desc,
                articleImgurl: this.ruleForm.articleImgurl,
                articleClasses: this.ruleForm.region,
                articleContent: this.ruleForm.content
              }
            })
              .then(response => {
                console.log(response);
                if (response.data.code == 200 && response.data.message) {
                  console.log("创建成功");
                } else {
                  console.log("创建失败");
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.ql-container {
  min-height: 250px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 196px;
  height: 170px;
  line-height: 170px;
  text-align: center;
}
.avatar {
  width: 196px;
  height: 170px;
  display: block;
  object-fit: cover;
}
</style>
