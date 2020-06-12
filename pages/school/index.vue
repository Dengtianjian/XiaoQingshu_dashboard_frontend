<template>
  <div id="schoolIndex">
    <el-row>
      <el-col :span="2" :offset="22">
        <el-button type="primary" @click="showSchoolFormDialog = true">
          增加
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="schools" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="200"> </el-table-column>
      <el-table-column prop="name" label="名称" width="200"> </el-table-column>
      <el-table-column label="logo" width="100">
        <template slot-scope="scope">
          <img :src="scope.row['logo']" alt="" width="50px" />
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="100"> </el-table-column>
      <el-table-column prop="classes" label="班级数" width="80">
      </el-table-column>
      <el-table-column prop="students" label="学生数" width="80">
      </el-table-column>
      <el-table-column prop="posts" label="帖子数" width="80">
      </el-table-column>
      <el-table-column label="操作"> </el-table-column>
    </el-table>
    <el-dialog title="增加学校" :visible="showSchoolFormDialog">
      <el-form :model="schoolForm">
        <el-form-item label="名称" label-width="100">
          <el-input v-model="schoolForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="100">
          <el-select v-model="schoolForm.type" placeholder="请选择">
            <el-option
              v-for="item in schoolType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="logo" label-width="100"> </el-form-item>
        <el-upload
          class="school-logo-upload-button"
          :show-file-list="false"
          :limit="1"
          name="logo"
          action="http://127.0.0.88/?module=school&method=uploadSchoolLogo"
          :before-upload="uploadSchoolLogo"
        >
          <img
            v-if="schoolForm.logoUrl"
            :src="schoolForm.logoUrl"
            class="school-logo-preview"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSchoolFormDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveSchoolInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$http
      .get("school", "getAllSchool", {
        limit: 10,
        page: 0
      })
      .then(schools => {
        this.schools = schools;
      });
  },
  data() {
    return {
      schools: [],
      showSchoolFormDialog: false,
      schoolType: [
        {
          value: "official",
          label: "官方"
        },
        {
          value: "primary",
          label: "小学"
        },
        {
          value: "juniorHigh",
          label: "初中"
        },
        {
          value: "high",
          label: "高中"
        },
        {
          value: "university",
          label: "大学"
        }
      ],
      schoolForm: {
        name: "",
        logo: "",
        logoUrl: "",
        type: ""
      }
    };
  },
  methods: {
    uploadSchoolLogo(file) {
      const uploadLoading = this.$loading({
        lock: true,
        text: "上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$http
        .post("school", "uploadSchoolLogo", {
          logo: file
        })
        .then(file => {
          this.schoolForm.logoUrl = file["download_url"];
          this.schoolForm.logo = file["fileid"];
          uploadLoading.close();
        });
      return false;
    },
    saveSchoolInfo() {
      this.$http
        .post("school", "saveSchoolInfo", {
          logo: this.schoolForm.logo,
          name: this.schoolForm.name,
          type: this.schoolForm.type
        })
        .then(school => {
          this.schools.unshift({
            _id: school._id,
            logo: this.schoolForm.logoUrl,
            name: this.schoolForm.name,
            type: this.schoolForm.type,
            posts: 0,
            students: 0,
            classes: 0
          });
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.showSchoolFormDialog = false;
          this.schoolForm = {
            name: "",
            logo: "",
            logoUrl: "",
            type: ""
          };
        });
    }
  }
};
</script>

<style>
.school-logo-upload-button {
  display: block;
  width: 100px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 40px;
  border: 1px solid #eee;
}
.school-logo-preview {
  width: 160px;
  height: 160px;
}
</style>
