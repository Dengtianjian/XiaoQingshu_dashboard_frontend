<template>
  <div id="userAdd">
    <el-form
      :model="userForm"
      class="user-form"
      label-width="80px"
      label-position="left"
    >
      <el-form-item label="头像">
        <el-upload
          class="user-form-avatar-button"
          action=""
          drag
          :before-upload="uploadUserAvatar"
          :limit="1"
          :show-file-list="false"
          label-position="top"
        >
          拖拽文件到这里或者点击这里上传
        </el-upload>
        <img
          class="user-form-avatar-preview"
          :src="userForm.avatarUrl"
          v-show="userForm.avatarUrl"
          wdith="100px"
        />
      </el-form-item>
      <el-form-item label="用户名" required>
        <el-input v-model="userForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" required>
        <el-input v-model="userForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" required>
        <el-input v-model="userForm.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户组" required>
        <el-select v-model="userForm.group" placeholder="请选择">
          <el-option
            v-for="item in group"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="saveUser">保存</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.group = this.$store.state.user.userGroup;
  },
  data() {
    return {
      users: [],
      showUserForm: true,
      userForm: {
        avatar: "",
        avatarUrl: "",
        username: "",
        password: "",
        nickname: "",
        group: ""
      },
      group: []
    };
  },
  methods: {
    uploadUserAvatar(file) {
      const uploadLoading = this.$loading({
        lock: true,
        text: "上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$http
        .post("user", "uploadUserAvatar", {
          avatar: file
        })
        .then(avatar => {
          this.userForm.avatar = avatar.fileid;
          this.userForm.avatarUrl = avatar.download_url;
          uploadLoading.close();
        });
      return false;
    },
    saveUser() {
      let form = this.userForm;
      let userData = {
        avatar_url: form.avatar,
        group: form.group,
        nickname: form.nickname,
        username: form.username,
        password: form.password
      };
      if (!form.nickname || !form.username || !form.password || !form.group) {
        this.$message({
          message: "请输入必填写",
          type: "warning"
        });
        return;
      }
      this.$http.post("user", "saveUser", userData).then(res => {
        this.$message({
          message: "添加成功",
          type: "success"
        });
      });
    }
  }
};
</script>

<style>
.user-form-avatar-button {
  display: inline-block;
}
.user-form-avatar-preview {
  display: inline-block;
  margin-left: 20px;
  width: 180px;
  border: 2px solid #eee;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
