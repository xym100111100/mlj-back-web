<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 添加筛选条件框 -->
      <el-form :inline="true" :model="queryModel" class="demo-form-inline">
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
          placeholder="对应产品、客户姓名、手机号码、对应BD"
          style="width: 400px;"
          @keyup.enter.native="handleFilter"
        />
        <!-- 授信状态 -->
        <el-select
          v-model="listQuery.state"
          placeholder="认证状态"
          clearable
          style="width: 200px"
        >
          <el-option
            v-for="item in validClientCreditState"
            :key="item.status"
            :label="item.message"
            :value="item.status"
          />
        </el-select>

        <el-button
          v-waves
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
          >搜索</el-button
        >
      </el-form>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <!-- 实名认证字段 -->
      <!-- bizNo -->
      <el-table-column label="对应产品" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.debtNo }}</span>
        </template>
      </el-table-column>
      <!-- 客户编号 -->
      <el-table-column label="客户姓名" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.clientNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.bdName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="对应BD" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.clientName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实名认证" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.cell }}</span>
        </template>
      </el-table-column>
      <!-- product_type 产品类型 -->
      <el-table-column label="基本信息认证" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.productType }}</span>
        </template>
      </el-table-column>

      <el-table-column label="工作信息认证" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.debtAmt }}</span>
        </template>
      </el-table-column>

      <el-table-column label="信贷认证" align="center">
        <template slot-scope="{ row }">
          <span>{{ clientDebtStateFormat(row.state) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="190px"
      >
        <template slot-scope="{ row }">
          <el-button
            v-waves
            size="mini"
            type="primary"
            @click="getCreditDetail(row)"
            >操作</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <preliminaryDialog
      v-if="dialogStatus.dialogVisible"
      :dialogStatus="dialogStatus"
      :creditRecordNo="dialogStatus.creditRecordNo"
    ></preliminaryDialog>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog width="60%" title="身份证信息" :visible.sync="dialogFormVisible">
      <el-row :gutter="20">
        <el-col :span="12" v-for="(item, index) in authInfo" :key="index">
          <div>
            <el-image :src="item"></el-image>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import {
  PreliminaryListData,
  modifyDebtStateData
} from '@/api/approval/preliminary'
import { getRealAuthInfoData } from '@/api/information/realName'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import preliminaryDialog from './preliminaryDialog'

import Vue from 'vue'

export default {
  name: 'sign',
  components: {
    Pagination,
    preliminaryDialog
  },
  directives: {
    waves
  },
  data() {
    return {
      authInfo: [],

      dialogStatus: {
        dialogVisible: false,
        creditRecordNo: ''
      },
      dialogFormVisible: false,
      // 表单绑定数据
      queryModel: {},
      options: [
        {
          name: '客户编号',
          value: 'clientNo'
        },
        {
          name: '客户名字',
          value: 'clientName'
        },
        {
          name: '手机号码',
          value: 'cell'
        }
      ],

      validClientCreditState: [
        {
          realNameAuth: '2',
          message: '基本信息认证'
        },
        {
          state: '2',
          message: '工作信息认证'
        },
        {
          state: '3',
          message: '信贷认证'
        }
      ],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        keys: undefined,
        searchType: undefined,
        state: undefined
      },
      temp: {
        name: ''
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
      ui: {
        preliminaryDialog: {
          visible: false,
          clientNo: '',
          clientName: '',
          debtNo: '',
          linkerType: '',
          cell: '',
          urls: [],
          validDate: '',
          overdueDate: ''
        }
      }
    }
  },

  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      PreliminaryListData(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    // 授信状态格式 clientCreditStateFormat
    clientCreditStateFormat: function(val) {
      return this.$enumUtils.toMsg('ClientCreditStateEnmu', val)
    },
    clientDebtStateFormat: function(val) {
      return this.$enumUtils.toMsg('DebtStatusEnum', val)
    },

    getCreditDetail(row) {
      this.dialogStatus.dialogVisible = true
      this.dialogStatus.creditRecordNo = 111111
    },

    changeDebtState(row, type, msg) {
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          modifyDebtStateData({ debtNo: row.debtNo, state: type }).then(res => {
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
          })
        })
        .catch(err => err)
    }
  }
}
</script>
