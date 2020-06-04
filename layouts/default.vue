<template>
  <div class="home" v-if="loaded">
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
                @select="mainNavSelect"
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
          <el-menu
            class="el-menu-vertical-demo"
            background-color="transparent"
            @select="navChildSelect"
          >
            <template v-for="(navItem, navIndex) in navigatorChildren">
              <el-menu-item :key="navItem['path']" :index="`${navIndex}`">
                <i
                  :class="[navItem['icon'] ? navItem['icon'] : 'el-icon-menu']"
                ></i>
                {{ navItem["title"] }}
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-main class="main-container">
          <el-tabs
            type="card"
            v-model="pageTabsSelectedPath"
            closable
            :before-leave="switchTab"
            @tab-remove="removeTab"
          >
            <el-tab-pane
              :key="item.path"
              v-for="item in pageTabs"
              :label="item.title"
              :name="item.name"
            >
              <nuxt keep-alive :key="item['path']" />
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  // middleware:[
  //   "auth"
  // ],
  async beforeMount() {
    if (localStorage.token) {
      let token = localStorage.token;
      await this.$http
        .post("user", "verify", {
          token
        })
        .then(res => {
          this.$store.commit("user/updateUser", res);
        });
    }
    if (
      !this.$store.state.user ||
      !this.$store.state.user.token ||
      !this.$store.state.user.user_id
    ) {
      this.$router.replace("/user/signin");
      return;
    }
    this.loaded = true;
  },
  data() {
    return {
      loaded: false,
      navigator: [
        {
          path: "/",
          title: "首页",
          children: [
            {
              path: "/extensions/quotes",
              title: "语录",
              icon: "el-icon-magic-stick"
            }
          ]
        },
        {
          path: "/user",
          title: "用户",
          children: [
            {
              path: "/user",
              title: "管理",
              icon: "qcdb qcdb-friendfill"
            }
          ]
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
        },
        {
          path: "/extensions",
          title: "扩展",
          children: [
            {
              path: "/extensions/quotes",
              title: "语录",
              icon: "el-icon-magic-stick"
            }
          ]
        }
      ],
      navigatorActiveIndex: 0,
      pageTabs: {},
      tabIndex: 0,
      pageTabsSelectedPath: "/"
    };
  },
  methods: {
    mainNavSelect(e) {
      this.navigatorActiveIndex = e;
      let selected = this.navigator[this.navigatorActiveIndex];
      this.$set(this.pageTabs, selected.path, {
        title: selected.title,
        name: selected.path
      });
      this.pageTabsSelectedPath = selected.path;
      // this.$router.push(selected.path);
    },
    navChildSelect(childIndex) {
      let mainIndex = this.navigatorActiveIndex;
      let selected = this.navigator[mainIndex]["children"][childIndex];
      this.$set(this.pageTabs, selected.path, {
        title: selected.title,
        name: selected.path
      });
      this.pageTabsSelectedPath = selected.path;
      // this.$router.push(selected.path);
    },
    switchTab(e) {
      this.$router.push(e);
    },
    removeTab(e) {
      this.$delete(this.pageTabs, e);
      let switchPath = "/";
      if (e == this.pageTabsSelectedPath) {
        if (Object.keys(this.pageTabs).length > 0) {
          switchPath = this.pageTabs[Object.keys(this.pageTabs)[0]]["name"];
        }
        this.pageTabsSelectedPath = switchPath;
      }
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
  },
  watch: {
    "$route.name"() {
      console.log(this.$route);
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
