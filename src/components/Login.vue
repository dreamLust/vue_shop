<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../../public/avatar.jpg" alt="">
      </div>
      <el-form :rules="loginFromRules" :model="loginFrom" label-width="80px" class="login-from" ref="loginFromRef">
        <el-form-item label="username" prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginFrom.username" placeholder="请输入账号">
          </el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model="loginFrom.password" placeholder="请输入密码" >
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="chickLoginFrom">登录</el-button>
          <el-button type="info" @click="resetLoginFrom">重置</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginFrom: {
        username: '',
        password: ''
      },
      loginFromRules: {
        username: [
          {required: true, message: '请输入登录名称', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码名称', trigger: 'blur'},
          {min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur'}
        ],

      }


    }
  },
  methods:{
    resetLoginFrom(){
      // console.log(this);

      this.$refs.loginFromRef.resetFields()
    },
    chickLoginFrom(){
      this.$refs.loginFromRef.validate(async valid=>{
        if(!valid) return;
        const result =await this.$http.post('login',this.loginFrom);
        console.log(result);

      })
    }


  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); //移动自身大小的百分比方向


  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    //background-color: #fff;
  }

  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
  }


}

.login-from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box; //

}

.btns {
  display: flex;
  justify-content: flex-end;
}

</style>