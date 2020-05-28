<template>
  <div id="signIn">
    <el-form class="signin-form" ref="form" :model="signinForm" label-width="80px" @submit.native.prevent="signinSubmit">
      <el-form-item label="用户名">
        <el-input v-model="signinForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="signinForm.password" clearable show-password></el-input>
      </el-form-item>
      <el-button class="signin-form-submit" type="primary" native-type="submit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: "pure",
  data(){
    return {
      signinForm:{
        username:"",
        password:""
      }
    }
  },
  methods:{
    signinSubmit(e){
      console.log(this.signinForm);
    }
  }
};
</script>

<style>

</style>

<style lang="less" scoped>
#signIn {
  height:100vh;
  overflow:hidden;
}
.signin-form {
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin: auto;
  padding:40px;
  width: 50%;
  height: 300px;
  text-align:center;
  background:white;
  box-sizing:border-box;
  .signin-form-submit {
    width:14vw;
  }
}
</style>
