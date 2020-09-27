<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 添加筛选条件框 -->
      <el-select
        clearable
        v-model="listQuery.searchType"
        placeholder="查询条件"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- 输入框搜索 -->
      <el-input
        v-model="listQuery.keys"
        placeholder="BD编号、BD名称、手机号"
        style="width: 400px;"
        @keyup.enter.native="handleFilter"
      />

      <el-button
        v-waves
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        >搜索</el-button
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
      <el-table-column
        label="BD编号"
        prop="salesmanId"
        sortable="custom"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.salesmanId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="BD名称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.salesmanName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.parentId }}</span>
        </template>
      </el-table-column>
<!-- 
      <el-table-column label="业务员编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.salesmanId }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="手机号码">
        <template slot-scope="{ row }">
          <span>{{ row.cell }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center" :formatter="dateFormat">
        <template slot-scope="{ row }">
          <span>{{ row.modifiedTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" :formatter="dateFormat">
        <template slot-scope="{ row }">
          <span>{{ row.createdTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.memo }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="160px"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="showForm('update', row)"
            >编辑</el-button
          > 
          <el-button size="mini" type="danger" @click="handleDelete(row)"
            >删除</el-button
          > 
        </template> 
      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 500px; margin-left:50px;"
      >
        <!-- 上级编号 -->
        <el-form-item label="上级编号" prop="parentId">
          <el-input v-model="temp.parentId" />
        </el-form-item>
        <!-- BD名称 -->
        <el-form-item label="BD名称" prop="salesmanName">
          <el-input v-model="temp.salesmanName" />
        </el-form-item>
        <!-- 业务员编号 -->
        <el-form-item label="业务员编号" prop="salesmanId">
          <el-input v-model="temp.salesmanId" />
        </el-form-item>
        <!-- 手机号码 -->
        <el-form-item label="手机号码" prop="cell">
          <el-input v-model="temp.cell" />
        </el-form-item>

        <!--备注信息 -->
        <el-form-item label="备注" prop="memo">
          <el-input v-model="temp.memo" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : handleUpdate()"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'

import { fetchList, bdDelete, updateData, addData } from '@/api/bdManage'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Vue from 'vue'

export default {
  name: 'client',
  components: {
    Pagination
  },
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      options: [
        {
          name: 'BD编号',
          value: 'id'
        },
        {
          name: 'BD名称',
          value: 'username'
        },
        {
          name: '手机号码',
          value: 'mobile'
        }
      ],

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        keys: undefined,
        searchType: undefined
      },

      temp: {
        salesmanId: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published',
        code: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '查看详情'
      },

      rules: {
        type: [
          {
            required: true,
            message: 'type is required',
            trigger: 'change'
          }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          {
            required: true,
            message: 'title is required',
            trigger: 'blur'
          }
        ]
      },
      downloadLoading: false
    }
  },

  created() {
    this.getList()
    // console.log(this.$enumUtils)
  },
  methods: {
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 重置表单操作
    resetTemp() {
      this.temp = {
        salesmanId: undefined,
        parentId: '',
        salesmanName: '',
        salesmanId: '',
        cell: '',
        memo: ''
      }
    },

    // 新增BD操作
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.salesmanId = new Date().getTime()
          this.temp.createdTime = moment(new Date()).format('YYYY-MM-DD')
          this.temp.modifiedTime = moment(new Date()).format('YYYY-MM-DD')
          addData(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              message: '创建成功',
              type: 'success'
              // duration: 2000
            })
          })
        }
      })
    },
    showForm(mode, row) {
      this.temp = {
        ...row
      }
      this.dialogStatus = mode
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 修改操作
    handleUpdate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = {
            ...this.temp
          }
          updateData(tempData).then(res => {
            const index = this.list.findIndex(
              v => v.salesmanId === this.temp.salesmanId
            )
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

    // 删除操作
    handleDelete(val) {
      // 后台删除请求
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await bdDelete({
            salesmanId: val.salesmanId
          }).then(response => {
            if (response.code === 0) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })

              this.list.map((item, index) => {
                if (item.salesmanId == val.salesmanId) {
                  this.list.splice(index, 1)
                }
              })
            }
          })
        })
        .catch(err => err)
    },

    // 日期格式
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD')
    }
  }
}
</script>
