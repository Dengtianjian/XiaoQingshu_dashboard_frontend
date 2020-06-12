<template>
  <div id="userGroup">
    <el-row>
      <el-col :span="22"> {{ group.length }} 个用户组 </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="showGorupForm = true">增加</el-button>
      </el-col>
    </el-row>
    <main class="group-list">
      <el-row :gutter="20" class="group-list-header">
        <el-col :span="7">
          Id
        </el-col>
        <el-col :span="6">
          名称
        </el-col>
        <el-col :span="3">
          类型
        </el-col>
        <el-col :span="2">
          经验
        </el-col>
        <el-col :span="6">
          操作
        </el-col>
      </el-row>

      <template v-for="(groupItem, groupItemIndex) in group">
        <el-row :gutter="20" :key="groupItem['_id']" class="group-item">
          <el-col :span="7">
            {{ groupItem["_id"] }}
          </el-col>
          <el-col :span="6">
            {{ groupItem["name"] }}
          </el-col>
          <el-col :span="3">
            {{ groupItem["type"] }}
          </el-col>
          <el-col :span="2">
            {{ groupItem["experience"] }}
          </el-col>
          <el-col :span="6">
            <el-button
              type="danger"
              size="mini"
              @click="displayDeleteGroupDialog(groupItemIndex)"
              >删除</el-button
            >
          </el-col>
        </el-row>
      </template>
    </main>
    <el-dialog title="增加用户组" :visible="showGorupForm">
      <el-form :model="groupForm">
        <el-form-item label="名称" label-width="50">
          <el-input
            v-model="groupForm.name"
            autocomplete="off"
            placeholder="请输入用户组名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="50">
          <el-select v-model="groupForm.type" placeholder="请选择">
            <el-option
              v-for="item in groupType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所需经验值" label-width="50">
          <el-input
            v-model="groupForm.experience"
            type="number"
            placeholder="请输入用户升级所需经验"
            :min="0"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideGroupForm">取 消</el-button>
        <el-button type="primary" @click="saveGroup">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除用户组" :visible="showDeleteGroupDialog">
      <el-form :model="deleteGroupForm">
        <el-form-item label="删除后的用户所属用户组" label-width="50">
          <el-select v-model="deleteGroupForm.groupid" placeholder="请选择">
            <el-option
              v-for="item in group"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDeleteGroupDialog=false">取 消</el-button>
        <el-button type="primary" @click="deleteGroup">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$http.get("user_group", "getAllGroup").then(group => {
      this.group = group;
    });
  },
  data() {
    return {
      group: [],
      groupForm: {
        name: "",
        type: "",
        experience: 0
      },
      deleteGroupForm:{
        groupid:null
      },
      deleteGroupIndex: -1,
      groupType: [
        {
          label: "系统",
          value: "system"
        },
        {
          label: "学生",
          value: "student"
        }
      ],
      showGorupForm: false,
      showDeleteGroupDialog: false
    };
  },
  methods: {
    hideGroupForm() {
      this.showGorupForm = false;
      this.groupForm = {
        name: "",
        type: "",
        experience: 0
      };
    },
    saveGroup() {
      let groupData = {
        name: this.groupForm.name,
        type: this.groupForm.type,
        experience: this.groupForm.experience
      };
      this.$http.post("user_group", "saveGroup", groupData).then(group => {
        groupData["_id"] = group['_id'];
        groupData["icon"] = "";
        this.group.unshift(groupData);
        this.$message({
          message: "保存成功",
          type: "success"
        });
        this.hideGroupForm();
      });
    },
    displayDeleteGroupDialog(groupIndex) {
      this.deleteGroupIndex = groupIndex;
      this.showDeleteGroupDialog = true;
    },
    deleteGroup() {
      let select = this.group[this.deleteGroupIndex];
      let groupId = select["_id"];

      this.$http
        .post("user_group", "deleteGroup", {
          _groupid: groupId,
          _change_group:this.deleteGroupForm.groupid
        })
        .then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.group.splice(this.deleteGroupIndex, 1);
          this.showDeleteGroupDialog = false;
        });
    }
  }
};
</script>

<style>
.group-list-header {
  padding: 15px 10px;
  font-size: 16px;
  color: #999;
}
.group-item {
  padding: 10px;
  font-size: 14px;
  border-bottom: 1px solid #eee;
}
</style>
