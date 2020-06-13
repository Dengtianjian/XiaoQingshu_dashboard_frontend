<template>
  <div id="postPublish">
    <el-alert
      title="目前仅可以发布资讯"
      type="warning"
      :closable="false"
      show-icon
    >
    </el-alert>
    <el-form class="post-form" ref="form" :model="postForm" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="postForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          v-model="postForm.content"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 50 }"
        ></el-input>
      </el-form-item>
      <el-form-item label="发布人">
        <el-input v-model="postForm.author"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          action=""
          list-type="picture-card"
          :on-remove="removePostImage"
          :file-list="postForm.imageUrl"
          :multiple="true"
          :limit="12"
          :before-upload="uploadPostImage"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publishPost">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postForm: {
        title: "",
        content: "",
        author: null,
        images: [],
        imageUrl: []
      }
    };
  },
  methods: {
    uploadPostImage(file) {
      this.$http
        .post("post", "uploadPostImage", {
          image: file
        })
        .then(image => {
          this.postForm.imageUrl.push({
            url: image["download_url"],
            name: file.name,
            fileid: image["fileid"]
          });
          this.postForm.images.push(image.fileid);
        });
      return false;
    },
    publishPost() {
      this.$http
        .post("post", "savePost", {
          title: this.postForm.title,
          content: this.postForm.content,
          images: this.postForm.images.join(","),
          _author: this.postForm.author,
          sort: "news"
        })
        .then(res => {
          this.$message({
            message: "发布成功",
            type: "success"
          });
        });
    },
    removePostImage() {}
  }
};
</script>

<style>
.post-form {
  margin-top: 30px;
}
</style>
