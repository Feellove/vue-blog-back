<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <template v-for="item in items">
          <el-menu-item
            :index="item.index"
            :key="item.index"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-setting",
          index: "blogList",
          title: "博客列表"
        },
        // {
        //   icon: "el-icon-setting",
        //   index: "blogAdd",
        //   title: "新建博客"
        // },
        {
          icon: "el-icon-setting",
          index: "blogClasses",
          title: "类别管理"
        },
        {
          icon: "el-icon-setting",
          index: "blogComment",
          title: "评论管理"
        }
      ]
    };
  },
  computed: {
    activeIndex() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>
