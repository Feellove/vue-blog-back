<template>
  <div>
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
        label="博客标签"
        prop="tags"
      >
        <el-tag
          :key="tag"
          v-for="tag in ruleForm.tags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput"
        >+增加</el-button>
      </el-form-item>
      <el-form-item
        label="博客类别"
        prop="classesId"
      >
        <el-select
          v-model="ruleForm.classesId"
          placeholder="请选择类别"
        >
          <el-option
            v-for="(v,index) in classes"
            :key="index"
            :label="v.classesName"
            :value="v._id"
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
  </div>
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
        placeholder: "请编辑文章...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向
            [
              {
                size: [
                  "10px",
                  "12px",
                  "14px",
                  "16px",
                  "18px",
                  "20px",
                  "22px",
                  "24px",
                  "26px",
                  "32px",
                  "48px"
                ]
              }
            ], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式
            ["clean"], //清除字体样式
            ["image", "video"] //上传图片、上传视频
          ]
        }
      },
      actionUrl: "",
      inputVisible: false,
      inputValue: "",
      ruleForm: {
        id: "",
        articleImgurl: "",
        articleUrl: "",
        name: "",
        desc: "",
        classesId: "",
        content: "",
        tags: []
      },
      rules: {
        name: [{ required: true, message: "请输入标题", trigger: "blur" }],
        desc: [{ required: true, message: "请输入简介内容", trigger: "blur" }],
        articleImgurl: [
          { required: true, message: "请选择图片", trigger: "blur" }
        ],
        classesId: [
          { required: true, message: "请选择类别", trigger: "change" }
        ],
        content: [
          { required: true, message: "请编辑文章...", trigger: "blur" }
        ],
        classesName: [
          { required: true, message: "请输入类名", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      classes: []
    };
  },
  created() {
    this.getClasses();
    this.actionUrl = url.upload;
    let id = this.$route.params.id;
    console.log(id);
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
            this.ruleForm.classesId = response.data.message.classesId;
            this.ruleForm.tags = response.data.message.tags;
            this.ruleForm.content = response.data.message.articleContent;
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
                classesId: this.ruleForm.classesId,
                tags: this.ruleForm.tags,
                articleContent: this.ruleForm.content
              }
            })
              .then(response => {
                console.log(response);
                if (response.data.code == 200 && response.data.message) {
                  this.$message({
                    showClose: true,
                    message: "更新成功",
                    type: "success"
                  });
                  this.$router.push({
                    name: "blogList"
                  });
                } else {
                  this.$message({
                    showClose: true,
                    message: "更新失败",
                    type: "success"
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
            console.log(this.ruleForm.tags);
            this.$axios({
              url: url.addArticle,
              method: "post",
              data: {
                articleName: this.ruleForm.name,
                articleDesc: this.ruleForm.desc,
                articleImgurl: this.ruleForm.articleImgurl,
                classesId: this.ruleForm.classesId,
                tags: this.ruleForm.tags,
                articleContent: this.ruleForm.content
              }
            })
              .then(response => {
                if (response.data.code == 200 && response.data.message) {
                  this.$message({
                    showClose: true,
                    message: "创建成功",
                    type: "success"
                  });
                  this.$router.push({
                    name: "blogList"
                  });
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
                  message: "创建失败",
                  type: "error"
                });
              });
          }
        } else {
          this.$message({
            showClose: true,
            message: "提交错误",
            type: "error"
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getClasses() {
      this.$axios({
        url: url.getClasses,
        method: "post",
        data: {}
      })
        .then(response => {
          if (response.data.code === 200 && response.data.message) {
            this.classes = response.data.message;
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
    handleClose(tag) {
      this.ruleForm.tags.splice(this.ruleForm.tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.ruleForm.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
