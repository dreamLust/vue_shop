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
      <el-aside :width=" isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse"><--></div>
        <el-menu text-color="#fff"
                 :unique-opened=true
                 active-text-color="#409EFF"
                 background-color="#333744"
                 default-active="2"
                 class="el-menu-vertical-demo"
                 :collapse=isCollapse
                 :collapse-transition=false
                 :default-active="activePath"
                 router>
          <!--              @open="handleOpen"-->
          <!--                @close="handleClose"-->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <!--              图标icon-->
              <i class="el-icon-user-solid"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!--                二级导航栏-->

            <el-menu-item :index="'/'+subItem.path"
                          v-for="subItem in item.children"
                          :key="subItem.id"
                            @click="keepAlive('/'+subItem.path)">
              <template slot="title">
                <!--              图标icon-->
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--主体-->
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>


</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      menulist: [],
      isCollapse: false,
      activePath:''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem("activePath")
  },
  methods: {
    outHome() {
      window.sessionStorage.clear()
      this.$router.push('/login')

    },
    async getMenuList() {
      const {data: res} = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.menulist = res.data
      console.log(res)
    },

    //点击实现侧边栏收缩
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
      console.log(this.isCollapse)
    },
    keepAlive(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
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

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;


}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4A5064;
  color: #ffffff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
}
</style>