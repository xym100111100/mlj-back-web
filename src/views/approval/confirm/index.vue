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
          placeholder="业务编号、客户编号、客户名称、证件号码"
          style="width: 400px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <!-- 授信状态 -->
        <el-select
          v-model="listQuery.status"
          placeholder="负债状态"
          clearable
          class="filter-item"
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
          class="filter-item"
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
      @sort-change="sortChange"
    >
      <!-- 实名认证字段 -->
      <!-- bizNo -->
      <el-table-column label="负债编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.debtNo }}</span>
        </template>
      </el-table-column>
      <!-- 客户编号 -->
      <el-table-column label="客户编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.clientNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户姓名" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.clientName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.cell }}</span>
        </template>
      </el-table-column>
      <!-- product_type 产品类型 -->
      <el-table-column label="产品类型" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.productType }}</span>
        </template>
      </el-table-column>

      <el-table-column label="借款金额" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.debtAmt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="放款金额" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.raiseAmt }}</span>
        </template>
      </el-table-column>

      <el-table-column label="负债状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ clientDebtStateFormat(row.status) }}</span>
        </template>
      </el-table-column>
      <!-- BD -->
      <el-table-column label="对应BD" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.salesmanId }}</span>
        </template>
      </el-table-column>

      <!-- 时间 -->
      <el-table-column label="申请时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.applyTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.memo }}</span>
        </template>
      </el-table-column>

      <!-- 操作按钮区域 -->
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
            >查看详情</el-button
          >
          <el-button
            v-waves
            v-if="row.status === '1'"
            size="mini"
            type="success"
            @click="changeDebtState(row, '2', '是否通过审核？此操作无法恢复!')"
            >通过</el-button
          >
          <el-button
            v-waves
            v-if="row.status === '1'"
            size="mini"
            type="danger"
            @click="changeDebtState(row, '3', '是否拒绝通过？此操作无法恢复!')"
            >拒绝</el-button
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

    <!--窗口组件-->
    <template>
      <!-- 详情 creditNo-->
      <preliminaryDialog
        v-if="ui.preliminaryDialog.visible"
        :cell="ui.preliminaryDialog.cell"
        :urls="ui.preliminaryDialog.urls"
        :clientNo="ui.preliminaryDialog.clientNo"
        :clientName="ui.preliminaryDialog.clientName"
        :overdueDate="ui.preliminaryDialog.overdueDate"
        :validDate="ui.preliminaryDialog.validDate"
        :debtNo="ui.preliminaryDialog.debtNo"
        :linkerType="ui.preliminaryDialog.linkerType"
        :dialogVisible="ui.preliminaryDialog.visible"
        :dialogVisible.sync="ui.preliminaryDialog.visible"
      >
      </preliminaryDialog>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import {
  PreliminaryListData,
  allowPass,
  refusePass
} from '@/api/approval/preliminary'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import preliminaryDialog from '../preliminary/preliminaryDialog'
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
      // 开始日期数据类型
      beginDate: '',
      // 截止日期
      repayDate: '',
      // 表单绑定数据
      queryModel: {},
      options: [
        {
          name: '业务编号',
          value: 'bizNo'
        },
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
          status: '0',
          message: '已提交'
        },
        {
          status: '1',
          message: '审核中'
        },
        {
          status: '2',
          message: '审核通过'
        },
        {
          status: '3',
          message: '审核拒绝'
        }
      ],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        keys: undefined,
        sort: '+id',
        searchType: undefined,
        status: undefined
      },
      importanceOptions: [1, 2, 3],

      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
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
      dialogPvVisible: false,
      pvData: [],
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
      downloadLoading: false,
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
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },

    // 日期格式
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD')
    },

    // 授信状态格式 clientCreditStateFormat
    clientCreditStateFormat: function(val) {
      return this.$enumUtils.toMsg('ClientCreditStateEnmu', val)
    },
    clientDebtStateFormat: function(val) {
      return this.$enumUtils.toMsg('DebtStatusEnum', val)
    },

    getCreditDetail(row) {
      this.ui.preliminaryDialog = {
        visible: true,
        debtNo: row.debtNo,
        clientName: row.clientName,
        clientNo: row.clientNo,
        cell: row.cell,
        urls: row.urls,
        overdueDate: row.overdueDate,
        validDate: row.validDate
      }
    },
    // 控制按钮
    changeDebtState(row, type, msg) {
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const doAction = type === '2' ? allowPass : refusePass

          doAction(row.debtNo).then(res => {
            if (res.code === 0) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              row.status = type
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
