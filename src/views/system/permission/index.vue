<template>
  <div class="app-container">
    <el-button type="primary" @click="listPermission">查询</el-button>
    <el-button type="primary" @click="showForm('create', '', false)"
      >添加权限</el-button
    >
    <el-table
      :data="permissionList"
      style="width: 100%;margin-top:30px;"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="permissionNo" label="权限编号"> </el-table-column>
      <el-table-column prop="permissionValue" label="权限值"> </el-table-column>
      <el-table-column prop="permissionName" label="权限名称">
      </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column prop="permissionDescribe" label="备注">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="showForm('update', scope.row)"
            >编辑
          </el-button>
          <!-- <el-button
            type="primary"
            size="small"
            @click="showForm('create', scope.row, true)"
            >添加子节点
          </el-button> -->
          <el-button type="danger" size="small" @click="deletePermission(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position=""
        label-width="100px"
        style="width: 400px; margin-left:18%;"
      >
        <el-form-item label="权限名称" prop="realName">
          <el-input v-model="temp.permissionName" />
        </el-form-item>
                <el-form-item label="权限值" prop="realName">
          <el-input v-model="temp.permissionValue" />
        </el-form-item>

        <el-form-item label="路径" prop="realName">
          <el-input v-model="temp.path" />
        </el-form-item>

        <el-form-item label="备注" prop="cell">
          <el-input v-model="temp.permissionDescribe" />
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
  </div>
</template>

<script>
import path from 'path'
import { deepClone, filterAsyncRoutes, arrangementUrl } from '@/utils'
import {
  getRoutes,
  getRoles,
  addRole,
  deleteRole,
  updateRole
} from '@/api/role'
import {
  listPermissionData,
  createPermissionData,
  updatePermissionData,
  deletePermissionData
} from '@/api/permission'

import { asyncRoutes, constantRoutes } from '@/router'
import Vue from 'vue'
export default {
  data() {
    return {
      isShowPermissionNo: false,
      permissionList: [],
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      dialogFormVisible: false,
      temp: {
        permissionNo: '',
        permissionName: '',
        path: '',
        permissionDescribe: '',
        permissionValue:''
      }
    }
  },

  created() {
    this.listPermission()
  },
  methods: {
    handleUpdate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = {
            ...this.temp
          }
          updatePermissionData(tempData).then(res => {
            const index = this.permissionList.findIndex(
              v => v.permissionNo === this.temp.permissionNo
            )
            if (res.code === 0) {
              // this.permissionList[index] = tempData
              // Vue.set(this.permissionList, index, this.permissionList[index])
              this.listPermission()
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
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createPermissionData(this.temp).then(res => {
            if (res.code === 0) {
              this.listPermission()
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
    resetTemp() {
      this.temp = {
        permissionNo: '',
        permissionName: '',
        path: '',
        permissionDescribe: '',
        permissionValue:''
      }
    },
    showForm(mode, row, addChildren) {
      this.dialogStatus = mode
      this.isShowPermissionNo = addChildren
      if (addChildren) {
        this.resetTemp()
        this.dialogFormVisible = true
        this.temp.parentNo = row.permissionNo
        this.temp.parentName = row.permissionName
      } else {
        this.dialogFormVisible = true
        this.resetTemp()
        if (mode !== 'create') {
          this.temp = {
            ...row
          }
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }
      }
    },
    listPermission() {
      listPermissionData().then(res => {
        this.permissionList = res.data
      })
    },
    deletePermission({ $index, row }) {
      this.$confirm('删除后将无法恢复', '警告', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletePermissionData(row.permissionNo).then(res => {
            this.listPermission()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(err => {
          console.error(err)
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
