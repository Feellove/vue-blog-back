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
      label="博客类别"
      prop="region"
    >
      <el-select
        v-model="ruleForm.region"
        placeholder="请选择活动区域"
      >
        <el-option
          label="类别一"
          value="1"
        ></el-option>
        <el-option
          label="类别二"
          value="2"
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
        placeholder: "Hello"
      },
      ruleForm: {
        id: '',
        name: "",
        region: "",
        content: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        content: [
          {
            required: true,
            message: "请输入详细内容",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    let id = this.$route.params.id;
    console.log(id);
    if (id) {
      this.ruleForm.id = id
      console.log(this.ruleForm.id);
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
    getRuleForm(id) {
      this.$axios({
        url: url.getOneArticle,
        method: "post",
        data: { _id: id }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.ruleForm.name = response.data.message.articleName;
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
