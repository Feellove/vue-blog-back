<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="博客标题" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="博客类别" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="类别一" value="shanghai"></el-option>
        <el-option label="类别二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="创建时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="博客内容" prop="content">
      <quill-editor
        v-model="ruleForm.content"
        class="editor"
        ref="quillEditor"
        :options="editorOption"
        @ready="onEditorReady($event)"
      ></quill-editor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
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
        name: "",
        region: "",
        date1: "",
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
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
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
  computed: {
    edtior() {
      console.log(this.$refs.quillEditor.quill);
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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
