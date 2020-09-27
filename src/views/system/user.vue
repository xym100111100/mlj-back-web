<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.searchType"
        placeholder="查询条件"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in searchTypeEnum"
          :key="item.name"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="listQuery.keys"
        placeholder="编号 名称 姓名 手机 邮箱"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!-- 用户状态 -->
      <el-select
        v-model="listQuery.state"
        placeholder="用户状态"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in userStateEnum"
          :key="item.name"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <!-- 用户类型 -->
      <el-select
        v-model="listQuery.associatedUserType"
        placeholder="用户类型"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in $getEnumUtils.getEnum('UserTypeEnmu')"
          :key="item.message"
          :label="item.message"
          :value="item.code"
        />
      </el-select>

      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        >搜索</el-button
      >
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="showForm('create')"
        >添加</el-button
      >
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="用户编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.adminUserNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名称" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.realName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.cell }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户状态" align="center" width="95">
        <template slot-scope="{ row }">
          <span>{{ userStateFormat(row.state) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户类型" align="center" width="95">
        <template slot-scope="{ row }">
          <span>{{ userTypeFormat(row.associatedUserType) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            v-if="row.state !== 'LOCK' && row.state !== 'LOGOFF'"
            size="mini"
            @click="showForm('update', row)"
            type="primary"
            >编辑</el-button
          >
          <el-button
            v-if="row.state !== 'LOCK' && row.state !== 'LOGOFF'"
            size="mini"
            type="warning"
            @click="changeUserState(row, 'LOCK', '是否锁定该用户？')"
            >锁定</el-button
          >
          <el-button
            v-if="row.state !== 'LOGOFF'"
            size="mini"
            type="danger"
            @click="
              changeUserState(row, 'LOGOFF', '是否注销该用户？此操作无法恢复!')
            "
            >注销</el-button
          >
          <el-button
            size="mini"
            v-if="row.state === 'LOCK'"
            type="danger"
            @click="changeUserState(row, 'NORMAL', '是否恢复该用户')"
            >恢复</el-button
          >
          <br />
          <p></p>
          <el-button
            size="mini"
            v-if="row.state !== 'LOCK' && row.state !== 'LOGOFF'"
            type="success"
            @click="showRoleForm(row)"
            >设置角色</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      @close="dialogClose('dataFormRef')"
    >
      <el-form
        ref="dataFormRef"
        :rules="dataFormRules"
        :model="temp"
        label-position="left"
        label-width="120px"
        style="width: 400px; margin-left:18%;"
        status-icon
      >
        <el-form-item label="上级BD" prop="parentId" v-if="selectParentId">
          <el-select
            v-model="temp.parentId"
            class="filter-item"
            placeholder="请选择上级BD"
          >
            <el-option
              v-for="item in parentIdEnmu"
              :key="item.salesmanName"
              :label="item.salesmanName"
              :value="item.salesmanId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <!-- 隐藏 -->
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="temp.password" :disabled="isDisable" />
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item
          label="确认用户密码"
          prop="passwordVerify"
          v-if="dialogStatus === 'create'"
        >
          <el-input v-model="temp.passwordVerify" :disabled="isDisable" />
        </el-form-item>

        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="temp.realName" />
        </el-form-item>

        <el-form-item label="手机号码" prop="cell">
          <el-input
            v-model="temp.cell"
            oninput="this.value=this.value.replace(/[^\d.]/g,'');"
          />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select
            v-model="temp.sex"
            class="filter-item"
            placeholder="请选择性别"
          >
            <el-option
              v-for="item in $getEnumUtils.getEnum('SexTypeEnmu')"
              :key="item.message"
              :label="item.message"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

        <!-- 选择用户类型 -->
        <el-form-item label="用户类型" prop="associatedUserType">
          <el-select
            v-model="temp.associatedUserType"
            placeholder="用户类型"
            clearable
            class="filter-item"
            @change="selectBD(temp.associatedUserType)"
            :disabled="isDisable"
          >
            <el-option
              v-for="item in $getEnumUtils.getEnum('UserTypeEnmu')"
              :key="item.message"
              :label="item.message"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : handleUpdate()"
          >确认</el-button
        >
      </div>
    </el-dialog>

    <el-dialog :title="ruleFormTitle" :visible.sync="ruleFormVisible">
      <div style="text-align: center">
        <el-transfer
          style="text-align: left; display: inline-block"
          @change="changeUserRole"
          :button-texts="['删除', '添加']"
          :titles="['所有角色', '用户现有角色']"
          v-model="urserRoleValue"
          :data="roleData"
        ></el-transfer>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  createArticle,
  updateData,
  addUserRoleData,
  delUserRoleData,
  selectBDEnumData,
  changeStateData,
  getUserRoleData
} from '@/api/user'
import { getRolesData } from '@/api/role'
import { getUserRoleNos } from '@/utils/auth'
import waves from '@/directive/waves' // waves directive
import Vue from 'vue'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'client',
  components: {
    Pagination
  },
  directives: {
    waves
  },
  data() {
    // 自定义校验 -- 确认密码
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.temp.passwordVerify !== '') {
          this.$refs.dataFormRef.validateField('passwordVerify')
        }
        callback()
      }
    }

    var validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.temp.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      // 控制显示与隐藏
      isDisable: false,
      // 上级BD控制显示
      selectParentId: false,
      userInfo: {},
      roleData: [],
      urserRoleValue: [],
      ruleFormTitle: '',
      ruleFormVisible: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        keys: undefined,
        version: undefined,
        state: undefined,
        searchType: undefined
      },
      temp: {
        id: '',
        adminUserNo: '', // 关联的用户编号
        associatedUserType: '', //关联的用户类型
        username: '',
        password: '',
        passwordVerify: '',
        realName: '',
        cell: '',
        email: '',
        sex: '',
        state: '',
        version: '',
        // 上级编号
        parentId: '1234'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      // 上级编号
      parentIdEnmu: [],
      userStateEnum: [
        {
          name: '正常',
          value: 'NORMAL'
        },
        {
          name: '锁定',
          value: 'LOCK'
        },
        {
          name: '注销',
          value: 'LOGOFF'
        }
      ],
      searchTypeEnum: [
        {
          name: '用户编号',
          value: 'adminUserNo'
        },
        {
          name: '用户名称',
          value: 'username'
        },
        {
          name: '邮箱',
          value: 'email'
        },
        {
          name: '手机号码',
          value: 'cell'
        }
      ],
      // 弹框校验规则
      dataFormRules: {
        username: [
          {
            required: true,
            message: '请填写用户名',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            validator: validatePassword,
            trigger: 'blur'
          }
        ],
        passwordVerify: [
          {
            required: true,
            validator: validatePassword2,
            trigger: 'blur'
          }
        ],
        associatedUserType: [
          {
            required: true,
            message: '请选择用户类型',
            trigger: 'blur'
          }
        ],
        // 真实姓名
        realName: [
          {
            required: true,
            message: '请输入用户真实姓名!',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字符'
          }
        ],
        // 手机号码
        cell: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: ['change', 'blur']
          }
        ],
        // 邮箱
        email: [
          {
            required: true, //是否必填
            message: '请输入邮箱地址', //错误提示信息
            trigger: 'blur' //检验方式（blur为鼠标点击其他地方，）
          },
          {
            type: 'email', //要检验的类型（number，email，date等）
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        // 性别
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: ['blur', 'change']
          }
        ]
        // 上级BD
        // parentId: [
        //   {
        //     required: true,
        //     message: '请选择上级BD',
        //     trigger: ['blur', 'change']
        //   }
        // ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    userTypeFormat: function(val) {
      return this.$enumUtils.toMsg('UserTypeEnmu', val)
    },
    userStateFormat: function(val) {
      return this.$enumUtils.toMsg('UserStatusEnum', val)
    },
    changeUserRole(value, direction, userRoleNos,a) {
        addUserRoleData({
          adminUserNo: this.userInfo.adminUserNo,
          userRoleNos:value
        }).then(res => {
          if (res.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          }
        })
      // if (direction === 'left') {
      //   delUserRoleData({
      //     adminUserNo: this.userInfo.adminUserNo,
      //     userRoleNos
      //   }).then(res => {
      //     if (res.code !== 0) {
      //       this.$message({
      //         message: '服务器被外星人吃啦-_-!',
      //         type: 'error'
      //       })
      //       // 再查询一遍以便恢复界面删除失败前的用户角色
      //       this.showRoleForm(this.userInfo)
      //     }
      //   })
      // } else {
      //   addUserRoleData({
      //     adminUserNo: this.userInfo.adminUserNo,
      //     userRoleNos
      //   }).then(res => {
      //     if (res.code !== 0) {
      //       this.$message({
      //         message: '服务器被外星人吃啦-_-!',
      //         type: 'error'
      //       })
      //       // 再查询一遍以便恢复界面添加失败前的用户角色
      //       this.showRoleForm(this.userInfo)
      //     }
      //   })
      // }
    },
    showRoleForm(row) {
      this.userInfo = row
      this.ruleFormVisible = true
      this.ruleFormTitle = '设置' + row.username + '角色'
      // 获取角色信息
      getRolesData().then(res => {
        if (res.code === 0) {
          const data = []
          res.data.map(item => {
            data.push({
              key: item.roleNo,
              label: item.roleName
            })
          })
          this.roleData = data
        } else {
          this.$message({
            message: '服务器被外星人吃啦-_-!',
            type: 'error'
          })
        }
      })
      // 获取用户现有角色
      getUserRoleData({ adminUserNo: row.adminUserNo }).then(res => {
        this.urserRoleValue = res.data
      })
    },

    clientOriginFormat: function(val) {
      return this.$enumUtils.toMsg('ClientOriginTypeEnum', val)
    },

    statusFormat: function(row, column) {
      var originType = row['originType']
      return this.$enumUtils.toMsg('ClientOriginTypeEnum', originType)
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        if (response.data && response.data.records) {
          this.list = response.data.records
          this.total = response.data.total
        } else {
          this.list = []
          this.total = 0
        }
        this.listLoading = false
      })
    },
    handleFilter(e) {
      // 如果不是点击页数改查询的话就将查询页数改为1
      if (e && !e.page) {
        this.listQuery.page = 1
      }
      this.getList()
    },
    // 改变用户状态
    changeUserState(row, type, msg) {
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          changeStateData({ adminUserNo: row.adminUserNo, state: type }).then(
            res => {
              if (res.code === 0) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                row.state = type
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
              }
            }
          )
        })
        .catch(err => err)
    },

    resetTemp() {
      this.temp = {
        id: '',
        adminUserNo: '', // 关联的用户编号
        associatedUserType: '', //关联的用户类型
        username: '',
        password: '',
        password: '',
        realName: '',
        cell: '',
        email: '',
        sex: '',
        state: '',
        version: ''
      }
    },

    createData() {
      this.$refs['dataFormRef'].validate(valid => {
        console.log(this.temp)
        if (valid) {
          createArticle(this.temp).then(res => {
            if (res.code === 0) {
              this.handleFilter()
              this.dialogFormVisible = false
              this.$notify({
                title: '提示',
                message: res.msg,
                type: 'success'
              })
            } else {
              this.$notify({
                title: '提示',
                message: res.msg,
                type: 'error'
              })
            }
          })
        }
      })
    },
    showForm(mode, row) {
      this.dialogStatus = mode
      this.dialogFormVisible = true
      this.resetTemp()
      if (mode !== 'create') {
        this.temp = {
          ...row
        }
        console.log(this.temp)
        this.$nextTick(() => {
          this.$refs['dataFormRef'].clearValidate()
        })
        this.isDisable = true
      } else {
        this.isDisable = false
      }
    },
    handleUpdate() {
      this.$refs['dataFormRef'].validate(valid => {
        if (valid) {
          const tempData = {
            ...this.temp
          }
          updateData(tempData).then(res => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            if (res.code === 0) {
              this.list[index] = tempData
              Vue.set(this.list, index, this.list[index])
              this.dialogFormVisible = false
              this.$notify({
                message: '修改成功',
                type: 'success'
              })
            } else {
              this.$notify({
                title: '修改失败',
                message: '修改失败',
                type: 'error'
              })
            }
          })
        }
      })
    },
    // 选择用户类型 控制显示上级BD选择
    selectBD(val) {
      console.log(val)
      if (val === 2) {
        this.selectParentId = true
        selectBDEnumData()
          .then(res => {
            if (res.code !== 0) throw res.msg
            this.parentIdEnmu = res.data
          })
          .catch(err => err)
      } else {
        this.selectParentId = false
      }
    },
    // 清除表单验证
    dialogClose(dataFormRef) {
      this.$refs[dataFormRef].resetFields()
    }
  }
}
</script>
