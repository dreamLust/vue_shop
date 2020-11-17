<template>
  <!--  //头部-->
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="">
        <span>电商管理系统</span>
      </div>
      <el-button type="info" @click="outHome" class="out_home">退出登录</el-button>
    </el-header>
    <el-container>
      <!--      //侧边栏-->
      <el-aside width="200px">
        <el-menu text-color="#fff"
                 active-text-color="#fff"
                 background-color="lightblue"
                 default-active="2"
                 class="el-menu-vertical-demo">
          <!--              @open="handleOpen"-->
          <!--                @close="handleClose"-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <!--                二级导航栏-->
            <el-menu-item-group>
              <el-menu-item index="1-1">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--主体-->
      <el-main>
        <img src="../../public/avatar.jpg" alt="">
      </el-main>
    </el-container>
  </el-container>


</template>

<script>

export default {
  name: "Home",
  created() {
    this.getMenuList()
  },
  methods: {
    outHome() {
      window.sessionStorage.clear()
      this.$router.push('/login')

    },
    async getMenuList() {
      const {data: res} = await this.$http.get('menus')
      console.log(res)
    }
  }
}

</script>

<style lang="less" scoped>
.home-container {
  height: 100%;

}

.el-header {
  background-color: #ffecec;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-family: 黑体;
  font-size: 35px;
  color: mintcream;

  div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}


.el-aside {
  background-color: lightblue;
}

.el-main {
  background-color: #eaedf1;

  img {
    height: 100%;
    width: 100%;
  }
}

</style>