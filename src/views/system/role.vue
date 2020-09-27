<template>
  <div class="app-container">
    <el-button type="primary" @click="getRoles">查询</el-button>
    <el-button type="primary" @click="handleAddRole">添加角色</el-button>
    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="角色编号" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleNo }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否启用" width="220">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isEnabled"
            @change="changeIsEnabled(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="备注">
        <template slot-scope="scope">
          {{ scope.row.roleDescription }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType === 'edit' ? '编辑角色' : '新角色'"
    >
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="名字">
          <el-input v-model="role.roleName" placeholder="角色名字" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="role.roleDescription"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="请使用适当的词描述该角色"
          />
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            @check="oncheck"
            ref="tree"
            :check-strictly="true"
            :data="routesData2"
            :default-checked-keys="role.permissionNos"
            show-checkbox
            node-key="permissionNo"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone, filterAsyncRoutes, arrangementUrl } from '@/utils'
import {
  addRoleData,
  deleteRoleData,
  updateRoleData,
  getRolesData,
  enableAdminRoleData
} from '@/api/role'

import { listPermissionData } from '@/api/permission'

const defaultRole = {
  roleNo: '',
  roleName: '',
  roleDescription: '',
  isEnabled: true,
  permissionNos: []
}

export default {
  data() {
    return {
      routesData2: [],
      checkedKeys: [],
      role: Object.assign({}, defaultRole),
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new'
    }
  },

  created() {
    this.getRoles()
    listPermissionData().then(res => {
      res.data.map(item => {
        let obj = {}
        obj.label = item.permissionName
        obj.permissionNo = item.permissionNo
        this.routesData2.push(obj)
      })
    })
  },
  methods: {
    oncheck(a, b) {
      this.role.permissionNos = b.checkedKeys
    },
    changeIsEnabled(val) {
      enableAdminRoleData({
        roleNo: val.roleNo,
        isEnabled: val.isEnabled ? 0 : 1,
      }).then(res => {
        this.$notify({
          title: '修改',
          message: val.isEnabled
            ? val.roleName + ' 已启用'
            : val.roleName + ' 已禁用',
          type: 'success'
        })
      })
    },
    getRoles() {
      getRolesData().then(res => {
        if (res.code === 0 && res.data) {
          res.data.map(item => {
            item.isEnabled = item.isEnabled === 0 ? false : true
          })
          this.rolesList = res.data
        }
      })
    },

    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      // 这一步很重要，没有这步的话，选中的节点将不会被清除
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.role = row
      // 这一步很重要，没有这步的话，选中的节点将不会备设置
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(row.myPermissions)
      })
    },
    handleDelete({ $index, roleNo }) {
      this.$confirm('删除角色后将无法恢复，建议使用禁用角色', '警告', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(res => {
          deleteRoleData(roleNo).then(res => {
            if (res.code === 0) {
              this.rolesList.splice($index, 1)
              this.$message({
                type: 'success',
                message: '删除角色成功!'
              })
            }
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    confirmRole() {
      this.role.isEnabled = this.role.isEnabled === true ? 1 : 0
      let doAction = this.dialogType === 'edit' ? updateRoleData : addRoleData
      doAction(this.role).then(res => {
        if (res.code === 0) {
          this.dialogVisible = false
          this.getRoles()
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
