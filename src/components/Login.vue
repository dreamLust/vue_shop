<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../../public/avatar.jpg" alt="">
      </div>
      <el-form :rules="loginFromRules" :model="loginFrom" label-width="80px" class="login-from" ref="loginFromRef">
        <el-form-item label="用户账号" prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginFrom.username" placeholder="请输入账号">
          </el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model="loginFrom.password"
                    placeholder="请输入密码">
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
        username: 'admin',
        password: '123456'
      },
      loginFromRules: {
        username: [
          {required: true, message: '请输入登录名称', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码名称', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur'}
        ],

      }


    }
  },
  methods: {
    resetLoginFrom() {
      // console.log(this);

      this.$refs.loginFromRef.resetFields()//elementui清除表单中所有内容
    },
    chickLoginFrom() {
      this.$refs.loginFromRef.validate(async valid => {
        if (!valid) return;
        const {data: res} = await this.$http.post('login', this.loginFrom);

        if (res.meta.status !== 200) return this.$message.error('登录失败!')
        this.$message.success('登录成功');
        console.log(res);
        window.sessionStorage.setItem("token", res.data.token);//记录token
        this.$router.push('/home')

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