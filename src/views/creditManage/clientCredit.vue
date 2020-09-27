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
          placeholder="ID、客户编号、客户名称、证件号码"
          style="width: 400px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <!-- 实名认证状态 -->
        <el-select
          v-model="listQuery.state"
          placeholder="实名认证状态"
          clearable
          class="filter-item"
          style="width: 200px"
        >
          <el-option
            v-for="item in validClientCreditState"
            :key="item.state"
            :label="item.message"
            :value="item.state"
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
      <el-table-column label="授信编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.creditNo }}</span>
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

      <el-table-column label="授信额度" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.creditLines }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ clientCreditStateFormat(row.creditState) }}</span>
        </template>
      </el-table-column>

      <!-- 时间 -->
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.clientCreatedTime }}</span>
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
        min-width="160px"
      >
        <template slot-scope="{ row }">
          <el-button size="mini" type="primary" @click="getCreditDetail(row)"
            >查看详情</el-button
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
      <clientCreditDialog
        v-if="ui.clientCreditDialog.visible"
        :creditNo="ui.clientCreditDialog.creditNo"
        :linkerType="ui.clientCreditDialog.linkerType"
        :dialogVisible="ui.clientCreditDialog.visible"
        :dialogVisible.sync="ui.clientCreditDialog.visible"
      >
      </clientCreditDialog>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import { clientCreditListData } from '@/api/information/clientCredit'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import clientCreditDialog from '../../common/clientCreditDialog'
import Vue from 'vue'

export default {
  name: 'sign',
  components: {
    Pagination,
    clientCreditDialog
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
          name: '授信编号',
          value: 'creditNo'
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
          state: '0',
          message: '未实名'
        },
        {
          state: '1',
          message: '实名中'
        },
        {
          state: '2',
          message: '未授信'
        },
        {
          state: '3',
          message: '授信中'
        },
        {
          state: '4',
          message: '已授信'
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
        sort: '+id',
        searchType: undefined
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
        clientCreditDialog: {
          visible: false,
          clientNo: '',
          clientName: '',
          creditNo: '',
          linkerType: ''
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
      clientCreditListData(this.listQuery).then(response => {
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

    // 实名认证状态格式
    clientCreditStateFormat: function(val) {
      return this.$enumUtils.toMsg('ClientCreditStateEnmu', val)
    },

    getCreditDetail(row) {
      this.$router.push({
        path: '/information/clientCreditDialog',
        query: {
          creditNo: row.creditNo,
          clientNo: row.clientNo,
          debtNo:row.debtNo
        }
      })
    }
  }
}
</script>
