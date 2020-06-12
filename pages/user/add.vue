<template>
  <div id="userAdd">
    <el-form :model="userForm" class="user-form">
      <el-form-item label="头像" label-width="50">
        <el-upload
          class="user-form-avatar-button"
          action=""
          drag
          :before-upload="uploadUserAvatar"
          :limit="1"
          :show-file-list="false"
        >
          拖拽文件到这里或者点击这里上传
        </el-upload>
        <img
          class="user-form-avatar-preview"
          :src="userForm.avatarUrl"
          :show="userForm.avatarUrl"
          wdith="100px"
        />
      </el-form-item>
      <el-form-item label="用户名" label-width="50">
        <el-input v-model="userForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="50">
        <el-input v-model="userForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" label-width="50">
        <el-input v-model="userForm.nickname" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      showUserForm: true,
      userForm: {
        avatar: "",
        avatarUrl: "",
        username: "",
        password: "",
        nickname: ""
      }
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
  border:2px solid #eee;
  border-radius:4px;
  box-sizing: border-box;
}
</style>
