<template>
  <div id="userIndex">
    <el-table :data="users" style="width: 100%" row-key="_id" border>
      <el-table-column prop="_id" label="Openid" width="300"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="150">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="user-operate">
            <el-button size="mini" @click="showUserPopup(scope)"
              >查看</el-button
            >
            <el-button size="mini">修改用户组</el-button>
          </div></template
        >
      </el-table-column>
    </el-table>

    <el-dialog
      title="用户详细信息"
      :visible="showUserInfoDialog"
      width="80%"
      @close="showUserInfoDialog = false"
      v-if="showUserInfoDialog"
    >
      <!-- [OPENID] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          OpenId
        </el-col>
        <el-col :span="19">
          {{ users[showUserIndex]["_userid"] }}
        </el-col>
      </el-row>
      <!-- [头像] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          头像
        </el-col>
        <el-col :span="19">
          <img :src="users[showUserIndex]['avatar_url']" alt="" />
        </el-col>
      </el-row>
      <!-- [昵称] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          昵称
        </el-col>
        <el-col :span="19">
          {{ users[showUserIndex]["nickname"] }}
        </el-col>
      </el-row>
      <!-- [注册时间] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          注册时间
        </el-col>
        <el-col :span="19">
          {{ users[showUserIndex]["registation_date"] }}
        </el-col>
      </el-row>
      <!-- [用户组] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          用户组
        </el-col>
        <el-col :span="19">
          <section style="margin-bottom:20px;">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                更改用户组<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </section>
          <section>
            <el-row align="middle" class="user-info-child-item">
              <el-col :span="5" class="user-info-title">
                用户组ID
              </el-col>
              <el-col :span="19">
                {{ users[showUserIndex]["group"]["_id"] }}
              </el-col>
            </el-row>
            <el-row align="middle" class="user-info-child-item">
              <el-col :span="5" class="user-info-title">
                所需经验
              </el-col>
              <el-col :span="19">
                {{ users[showUserIndex]["group"]["experience"] }}
              </el-col>
            </el-row>
            <el-row align="middle" class="user-info-child-item">
              <el-col :span="5" class="user-info-title">
                图标
              </el-col>
              <el-col :span="19">
                {{ users[showUserIndex]["group"]["icon"] }}
              </el-col>
            </el-row>
            <el-row align="middle" class="user-info-child-item">
              <el-col :span="5" class="user-info-title">
                名称
              </el-col>
              <el-col :span="19">
                {{ users[showUserIndex]["group"]["name"] }}
              </el-col>
            </el-row>
            <el-row align="middle" class="user-info-child-item">
              <el-col :span="5" class="user-info-title">
                类型
              </el-col>
              <el-col :span="19">
                {{ users[showUserIndex]["group"]["type"] }}
              </el-col>
            </el-row>
          </section>
        </el-col>
      </el-row>
      <!-- [状态] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          状态
        </el-col>
        <el-col :span="19" class="user-info-content">
          <el-button
            class="user-status-operate-button"
            size="small"
            plain
            v-show="users[showUserIndex]['status'] == 'normal'"
            >正常</el-button
          >
          <el-button
            class="user-status-operate-button"
            size="small"
            plain
            v-show="users[showUserIndex]['status'] == 'deleted'"
            >已被删除</el-button
          >
          <el-button
            class="user-status-operate-button"
            size="small"
            plain
            v-show="users[showUserIndex]['status'] == 'closed'"
            >已被锁定</el-button
          >
          <el-dropdown
            class="user-status-operate-dropdown"
            @command="changeUserStatus"
            trigger="click"
          >
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="normal">恢复正常</el-dropdown-item>
              <el-dropdown-item command="deleted">删除</el-dropdown-item>
              <el-dropdown-item command="closed">锁定用户</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- [允许访问] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          允许访问
        </el-col>
        <el-col :span="19" class="user-info-content">
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            v-show="users[showUserIndex]['allow_access']"
            @click="users[showUserIndex]['allow_access'] = false"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-close"
            size="mini"
            @click="users[showUserIndex]['allow_access'] = true"
            v-show="users[showUserIndex]['allow_access'] == false"
          ></el-button>
        </el-col>
      </el-row>
      <!-- [允许发布内容] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          允许发布帖子
        </el-col>
        <el-col :span="19" class="user-info-content">
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            v-show="users[showUserIndex]['allow_post']"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-close"
            size="mini"
            v-show="users[showUserIndex]['allow_post'] == false"
          ></el-button>
        </el-col>
      </el-row>
      <!-- [允许评论] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          允许评论
        </el-col>
        <el-col :span="19" class="user-info-content">
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            v-show="users[showUserIndex]['allow_comment']"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-close"
            size="mini"
            v-show="users[showUserIndex]['allow_comment'] == false"
          ></el-button>
        </el-col>
      </el-row>
      <!-- [粉丝数] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          粉丝数
        </el-col>
        <el-col :span="19" class="user-info-content">
          {{ users[showUserIndex]["fans"] }}
        </el-col>
      </el-row>
      <!-- [成长值] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          成长值
        </el-col>
        <el-col :span="19" class="user-info-content">
          {{ users[showUserIndex]["expreience"] }}
        </el-col>
      </el-row>
      <!-- [积分] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          积分
        </el-col>
        <el-col :span="19" class="user-info-content">
          {{ users[showUserIndex]["credits"] }}
        </el-col>
      </el-row>
      <!-- [真实名字] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          真实名称
        </el-col>
        <el-col :span="19" class="user-info-content">
          {{ users[showUserIndex]["realname"] }}
        </el-col>
      </el-row>
      <!-- [学历] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          学历
        </el-col>
        <el-col :span="19" class="user-info-content">
          {{ users[showUserIndex]["education"] }}
        </el-col>
      </el-row>
      <!-- [生日] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          生日
        </el-col>
        <el-col :span="19" class="user-info-content">
          {{ users[showUserIndex]["birthday"] }}
        </el-col>
      </el-row>
      <!-- [性别] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          性别
        </el-col>
        <el-col :span="19" class="user-info-content">
          {{
            users[showUserIndex]["gender"] == "male"
              ? "男"
              : users[showUserIndex]["gender"] == "female"
              ? "女"
              : "保密"
          }}
        </el-col>
      </el-row>
      <!-- [个性签名] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          个性签名
        </el-col>
        <el-col :span="19" class="user-info-content">
          {{ users[showUserIndex]["statement"] }}
        </el-col>
      </el-row>
      <!-- [手机号码] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          手机号码
        </el-col>
        <el-col :span="19" class="user-info-content">
          {{ users[showUserIndex]["phone_number"] }}
        </el-col>
      </el-row>
      <!-- [邮箱] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          邮箱
        </el-col>
        <el-col :span="19" class="user-info-content">
          {{ users[showUserIndex]["email"] }}
        </el-col>
      </el-row>
      <!-- [已加入的学校] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          已加入学校
        </el-col>
        <el-col :span="19" class="user-info-content scroll-container-x">
          <template v-if="users[showUserIndex]['loadingJoinedSchool']">
            加载中...
          </template>
          <template
            v-for="schoolItem in users[showUserIndex]['joinedSchool']"
            v-else-if="users[showUserIndex]['loadingJoinedSchool'] == false"
          >
            <section class="user-joined-school-item" :key="schoolItem['_id']">
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  学校ID
                </el-col>
                <el-col :span="19">
                  {{ schoolItem["_id"] }}
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  名称
                </el-col>
                <el-col :span="19">
                  {{ schoolItem["name"] }}
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  校标
                </el-col>
                <el-col :span="19">
                  <img :src="schoolItem['logo']" width="70px" />
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  类型
                </el-col>
                <el-col :span="19">
                  {{ schoolItem["typeText"] }} ({{ schoolItem["type"] }})
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  帖子数
                </el-col>
                <el-col :span="19">
                  {{ schoolItem["posts"] }}
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  班级数
                </el-col>
                <el-col :span="19">
                  {{ schoolItem["classes"] }}
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  加入时间
                </el-col>
                <el-col :span="19">
                  {{ schoolItem["join_time"] }}
                </el-col>
              </el-row>
            </section>
          </template>
        </el-col>
      </el-row>
      <!-- [已加入的班级] -->
      <el-row class="user-info-item" align="middle">
        <el-col :span="5" class="user-info-title">
          已加入的班级
        </el-col>
        <el-col :span="19" class="user-info-content scroll-container-x">
          <template v-if="users[showUserIndex]['loadingJoinedClass']">
            加载中...
          </template>
          <template
            v-for="classItem in users[showUserIndex]['joinedClass']"
            v-else-if="users[showUserIndex]['loadingJoinedClass'] == false"
          >
            <section class="user-joined-class-item" :key="classItem['_id']">
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  班级ID
                </el-col>
                <el-col :span="19">
                  {{ classItem["_id"] }}
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  数字ID
                </el-col>
                <el-col :span="19">
                  {{ classItem["_numberid"] }}
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  名称
                </el-col>
                <el-col :span="19">
                  {{ classItem["profession"] }}
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  年级
                </el-col>
                <el-col :span="19">
                  {{ classItem["grade"] }}
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  班级号
                </el-col>
                <el-col :span="19">
                  {{ classItem["number"] }}
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  创建时间
                </el-col>
                <el-col :span="19">
                  {{ classItem["build_date"] }}
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  加入时间
                </el-col>
                <el-col :span="19">
                  {{ classItem["join_time"] }}
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  允许加入
                </el-col>
                <el-col :span="19">
                  <i
                    class="el-icon-check"
                    v-show="classItem['allow_join'] == true"
                  ></i>
                  <i
                    class="el-icon-close"
                    v-show="classItem['allow_join'] == false"
                  ></i>
                </el-col>
              </el-row>

              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  学生数
                </el-col>
                <el-col :span="19">
                  {{ classItem["students"] }}
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  相册照片数
                </el-col>
                <el-col :span="19">
                  {{ classItem["album_count"] }}
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  管理员ID
                </el-col>
                <el-col :span="19">
                  {{ classItem["_adminid"] }}
                </el-col>
              </el-row>
              <el-row align="middle" class="user-info-child-item">
                <el-col :span="5" class="user-info-title">
                  所属学校
                </el-col>
                <el-col :span="19">
                  {{ classItem["_schoolid"] }}
                </el-col>
              </el-row>
            </section>
          </template>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import Tools from "../../functions/tools";
import School from "@/functions/school";
export default {
  data() {
    return {
      users: [],
      showUserInfoDialog: false,
      showUserIndex: null,
      userGroup: {}
    };
  },
  beforeMount() {
    this.$http
      .post("user", "getUsers", {
        page: 1,
        limit: 10
      })
      .then(users => {
        users.forEach((item, index) => {
          // item['registation_date']=Tools.formatDate(item['registation_date']);
          item["loadDetail"] = false;
          item["loadingJoinedSchool"] = true;
          item["loadingJoinedClass"] = true;
          item["joinedSchool"] = [];
          item["joinedClass"] = [];
        });
        this.users.push(...users);
      });
  },
  methods: {
    async showUserPopup(e) {
      let index = e.$index;
      let userOpenId = e.row._id;
      if (this.users[index]["loadDetail"] === false) {
        let loading = this.$loading({
          lock: true,
          text: "获取数据中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        await this.$http
          .get("user", "getUser", {
            _id: userOpenId
          })
          .then(user => {
            for (let key in user) {
              user["registation_date"] = Tools.formatDate(
                user["registation_date"]
              );
              user["birthday"] = Tools.formatDate(user["birthday"]);
            }
            this.users[index] = user;
          });
        this.users[index]["group"] = await this.getUserGroup(
          this.users[index]["group"]
        );
        this.users[index]["loadDetail"] = true;
        this.users[index]["loadingJoinedSchool"] = true;
        await this.$http
          .get("user", "getUserJoinedSchool", {
            _id: userOpenId
          })
          .then(schools => {
            if (schools.length > 0) {
              schools.forEach(item => {
                item["join_time"] = Tools.formatDate(item["join_time"]);
                item["typeText"] = School.getType(item["type"]);
              });
            }
            this.users[index]["joinedSchool"] = schools;
            this.users[index]["loadingJoinedSchool"] = false;
          });
        this.users[index]["loadingJoinedClass"] = true;
        await this.$http
          .get("user", "getUserJoinedClass", {
            _id: userOpenId
          })
          .then(joinedClass => {
            joinedClass.forEach(item => {
              item["join_time"] = Tools.formatDate(item["join_time"]);
              item["build_date"] = Tools.formatDate(item["build_date"]);
            });
            this.users[index]["joinedClass"] = joinedClass;
            this.users[index]["loadingJoinedClass"] = false;
          });
        loading.close();
      }

      this.showUserIndex = index;
      this.showUserInfoDialog = true;
    },
    async getUserGroup(groupId) {
      if (!this.userGroup.hasOwnProperty(groupId)) {
        let userGroup = [];
        await this.$http
          .get("user_group", "getGroup", {
            _groupid: groupId
          })
          .then(res => {
            userGroup = res;
          });
        this.userGroup[groupId] = userGroup;
        return userGroup;
      }
      return this.userGroup[groupId];
    },
    changeUserStatus(command) {
      this.users[this.showUserIndex]["status"] = command;
    }
  }
};
</script>

<style lang="less" scoped>
.user-info-item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  .user-info-title {
    display: flex;
    align-items: center;
  }
}
.user-info-child-item {
  padding: 10px 0;
  height: auto;
  border-bottom: 1px solid #eee;
}

.user-status-operate-button {
  margin-left: 0;
}
.user-status-operate-dropdown {
  margin-left: 20px;
}

/** 用户加入的学校列表 */
.user-joined-school-item,
.user-joined-class-item {
  display: inline-block;
  min-width: 400px;
  width: auto;
}

/* 横向 滚动容器 */
.scroll-container-x {
  overflow: scroll hidden;
  white-space: nowrap;
}
</style>
