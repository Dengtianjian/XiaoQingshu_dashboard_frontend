<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="3">
            <img
              class="header-logo"
              src="https://res.wx.qq.com/community/dist/community/images/logo_miniprogram_013191.png"
          /></el-col>
          <el-col :span="21">
            <nav>
              <el-menu
                class="el-menu-demo"
                mode="horizontal"
                background-color="transparent"
                @select="navNavSelect"
                :default-active="`${navigatorActiveIndex}`"
              >
                <template v-for="(navItem, navItemIndex) in navigator">
                  <el-menu-item
                    :key="navItem['path']"
                    :index="`${navItemIndex}`"
                  >
                    {{ navItem["title"] }}
                  </el-menu-item>
                </template>
              </el-menu>
            </nav>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="page-container">
        <el-aside width="175px">
          <el-menu class="el-menu-vertical-demo" background-color="transparent">
            <template v-for="(navItem, navItemIndex) in navigatorChildren">
              <el-menu-item :key="navItemIndex" :index="`${navItemIndex}`">
                <i class="el-icon-menu"></i>
                {{ navItem["title"] }}
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-main class="main-container">
          <nuxt />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  middleware:[
    "auth"
  ],
  data() {
    return {
      navigator: [
        {
          path: "/",
          title: "首页",
          children: []
        },
        {
          path: "/user",
          title: "用户",
          children: []
        },
        {
          path: "/post",
          title: "帖子",
          children: []
        },
        {
          path: "/school",
          title: "学校",
          children: []
        },
        {
          path: "/class",
          title: "班级",
          children: [{ path: "/class", title: "列表" }]
        }
      ],
      navigatorActiveIndex: 0
    };
  },
  methods: {
    navNavSelect(e) {
      this.navigatorActiveIndex = e;
      let selected = this.navigator[this.navigatorActiveIndex];
      this.$router.push(selected.path);
    }
  },
  computed: {
    navigatorChildren() {
      let selected = this.navigator[this.navigatorActiveIndex];
      if (selected.hasOwnProperty("children")) {
        return selected.children;
      }
      return [];
    }
  }
};
</script>

<style>
body {
  background-color: #f7f7f7;
  padding: 0;
  margin: 0;
}

.el-menu {
  border: none !important;
}
</style>

<style scoped>
.header-logo {
  height: 60px;
}
.page-container {
  margin-top: 20px;
}
.main-container {
  padding: 10px;
  margin: 0 50px 0 10px;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
}

/* 主导航 */
.main-nav-link {
  text-decoration: none;
}
</style>
