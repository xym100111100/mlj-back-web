<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 添加筛选条件框 -->
      <el-form :inline="true" :model="queryModel" class="demo-form-inline">
        <el-select
          clearable
          v-model="listQuery.searchType"
          placeholder="查询条件"
          class="filter-item"
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
          placeholder="负债编号、客户编号、客户名称、证件号码"
          style="width: 400px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />


        <!-- 截止日期 -->
        <el-form-item>
          <el-date-picker
            v-model="repayDate"
            type="daterange"
            range-separator="至"
            start-placeholder="还款截止开始日期"
            end-placeholder="还款截止结束日期"
          ></el-date-picker>
        </el-form-item>

        <!--按钮 -->

        <!-- <el-button v-waves class="filter-item" @click="reset" type="primary"
          >重置</el-button
        > -->
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
    >
      <el-table-column label="负债编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.debtNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.clientNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.clientName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证件号码" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.certNo }}</span>
        </template>
      </el-table-column>


      <el-table-column label="借款金额" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.debtAmt }}</span>
        </template>
      </el-table-column>

      <!-- 添加相关的逾期信息 -->
      <el-table-column label="逾期罚息金额" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.debtAmt * row.overdueRate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="逾期罚息比例百分比" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.overdueRate * 100 }}% </span>
        </template>
      </el-table-column>

      <el-table-column label="还款截止日期" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.endDate }}</span>
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
          <!-- <el-button
            size="mini"
            type="primary"
            @click="getOverdueInfoDetail(row)"
            >详情</el-button
          > -->
          <el-button size="mini" type="success" @click="searchLinkers(row)"
            >通讯录</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getOverDueList"
    />

    <!--窗口组件-->
    <template>
      <!-- 通讯录 -->
      <linkersDialog
        v-if="ui.linkersDialog.visible"
        :clientName="ui.linkersDialog.clientName"
        :linkerType="ui.linkersDialog.linkerType"
        :dialogVisible="ui.linkersDialog.visible"
        :dialogVisible.sync="ui.linkersDialog.visible"
        :clientNo="ui.linkersDialog.clientNo"
      >
      </linkersDialog>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import { getOverDueListData } from '@/api/overdue'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import linkersDialog from './linkersDialog'
import Vue from 'vue'

export default {
  name: 'sign',
  components: {
    Pagination,
    linkersDialog
  },
  directives: {
    waves
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
          name: '负债编号',
          value: 'debtNo'
        },
        {
          name: '客户编号',
          value: 'clientNo'
        },
        {
          name: '客户名称',
          value: 'clientName'
        },
        {
          name: '证件号码',
          value: 'certNo'
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
      textMap: {
        update: '编辑',
        create: '新增合同'
      },
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
        linkersDialog: {
          visible: false,
          clientName: '',
          linkerType: '',
          clientNo:''
        }
      }
    }
  },

  created() {
    this.getOverDueList()
  },
  methods: {
    getOverDueList() {
      this.listLoading = true
      getOverDueListData(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      // console.log(this.listQuery.state)
      this.getOverDueList()
    },
    // 负债状态格式
    debtStateFormat: function(val) {
      return this.$enumUtils.toMsg('DebtStateEnmu', val)
    },
    // 详情页面点击跳转
    getOverdueInfoDetail(row) {
      this.$router.push({
        path: 'overdueRecordDetail',
        query: {
          debtNo: row.debtNo,
          clientName: row.clientName
        }
      })
    },
    // 通讯录
    searchLinkers(row) {
      this.ui.linkersDialog = {
        visible: true,
        debtNo: row.debtNo,
        clientName: row.clientName,
        clientNo:row.clientNo
      }
    },
    // 重置操作
    reset() {
      this.listQuery.searchType = ''
      this.listQuery.keys = ''
      this.listQuery.debtType = ''
      this.listQuery.state = ''
      this.beginDate = ''
      this.repayDate = ''
    }
  }
}
</script>
