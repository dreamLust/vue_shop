<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容"
                    v-model="queryInfo.query"
                    @input="searchUsers"
                    clearable
                    @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userlist" border style="width: 100%" stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.mg_state"
                @change="updateUserStatus(scope.row)">
            </el-switch>
          </template>

        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" v-model="scope.row.username"
                       @click="showModifyUserInfomation(scope.row.id)"></el-button>

            <el-button type="danger" icon="el-icon-delete" @click="showDeleteUserInfomation(scope.row.id)"></el-button>
            <el-tooltip class="item" effect="dark" content="修改角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" v-model="scope.row.role_name">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页框-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1,2,5,20]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
      <!--      弹出框-->
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" @close="addDialogClosed">

        <el-form :model="addForm"
                 :rules="addFormRules"
                 ref="addFormRef"
                 label-width="100px"
                 class="demo-ruleForm">

          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
          title="修改用户信息"
          :visible.sync="modifyUserInfomation">
        <el-form :model="fixedFrom"
                 :rules="FixedFormRules"
                 ref="fixedFormRef"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="fixedFrom.username" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="电话" prop="mobile">
            <el-input v-model="fixedFrom.mobile"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="fixedFrom.email"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="modifyUserInfomation = false">取 消</el-button>
          <el-button type="primary" @click="fixedMessage">确 定</el-button>
        </div>
      </el-dialog>

<!--      <el-dialog title="修改用户身份" :visible.sync="modifyUserIdentity">-->

<!--        <el-form :model="addForm"-->
<!--                 :rules="addFormRules"-->
<!--                 ref="addFormRef"-->
<!--                 label-width="100px"-->
<!--                 class="demo-ruleForm">-->
<!--          <el-form-item label="活动区域">-->
<!--            <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--              <el-option label="区域一" value="shanghai"></el-option>-->
<!--              <el-option label="区域二" value="beijing"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->


<!--        </el-form>-->
<!--        <div slot="footer" class="dialog-footer">-->
<!--          <el-button @click="addDialogVisible = false">取 消</el-button>-->
<!--          <el-button type="primary" @click="addUser">确 定</el-button>-->
<!--        </div>-->
<!--      </el-dialog>-->

    </el-card>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    const checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }

    // 验证手机号的规则
    const checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0,
      addDialogVisible: false,
      modifyUserInfomation: false,
      // 添加用户表单
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },

      // 添加表单验证规则对象
      addFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '用户名的长度在3-10个字符之间', trigger: 'blur'}],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 16, message: '请输入账号用户名',}],
        email: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [{
          required: true, message: '目前只支持中国大陆的手机号码', trigger: 'blur'
        },
          {validator: checkMobile, trigger: 'blur'}
        ]
      },
      fixedFrom: {},
      FixedFormRules: {
        email: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '目前只支持中国大陆的手机号码', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ]
      }

    }
  },
  created() {
    this.getUserList()
  },

  methods: {
    async getUserList() {
      const {data: res} = await this.$http.get('users', {params: this.queryInfo})
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.userlist = res.data.users
      this.total = res.data.total
    },

    searchUsers() {
      this.$forceUpdate()
    },

    async updateUserStatus(userInfo) {

      const {data: res} = await this.$http.put(
          `users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新状态失败')
      }
      return this.$message.success('更新状态成功')


    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()

    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        const {data: res} = await this.$http.post
        ('users', this.addForm)

        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败！')
        }

        this.$message.success('添加用户成功！')

        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表数据
        this.getUserList()
      })
    },
    async showModifyUserInfomation(id) {
      const {data: res} = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败')
      }
      this.fixedFrom = res.data
      this.modifyUserInfomation = true
    },
    fixedMessage() {
      this.$refs.fixedFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        const {data: res} = await this.$http.put
        ('users/' + this.fixedFrom.id,
            {
              email: this.fixedFrom.email,
              mobile: this.fixedFrom.mobile
            })

        if (res.meta.status !== 200) {
          this.$message.error('修改信息失败！')
        }
        // 隐藏添加用户的对话框
        this.modifyUserInfomation = false
        this.$message.success('修改信息成功！')
// 重新获取用户列表数据
        this.getUserList()
      })
    },
    async showDeleteUserInfomation(id) {
      const {data: res} = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败')
      }

      this.$confirm('此操作将永久删除该用户数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: res} = await this.$http.delete('users/' + id)
        if (res.meta.status !== 200) return this.$message('删除失败')
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.queryInfo.pagenum = 1
        this.getUserList()


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

  }
}
</script>

<style lang="less" scoped>
.box-card {

  height: 1000px;
  width: 100%;

  .el-row {
    margin-bottom: 20px;
  }

}

.el-table {
  font-size: 12px;
}

.el-pagination {
  margin-top: 15px;
}
</style>