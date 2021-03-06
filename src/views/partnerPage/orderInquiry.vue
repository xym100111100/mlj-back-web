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
          placeholder="查询内容"
          style="width: 200px;"
          @keyup.enter.native="handleFilter"
        />
        <!-- 借款状态 -->
        <el-select v-model="listQuery.state" placeholder="借款状态" clearable>
          <el-option
            v-for="item in clientDebtState"
            :key="item.code"
            :label="item.message"
            :value="item.code"
          />
        </el-select>
        <!-- 创建日期 -->
        <el-form-item>
          <el-date-picker
            v-model="listQuery.expirationDate"
            type="daterange"
            range-separator="至"
            start-placeholder="创建日期开始"
            end-placeholder="创建日期结束"
          ></el-date-picker>
        </el-form-item>
        <el-button
          v-waves
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
          >搜索</el-button
        >
        <!--新增BD按钮 -->
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
      <el-table-column label="订单编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.debtNo }}</span>
        </template>
      </el-table-column>

      <el-table-column label="对应产品" align="center">
        <template slot-scope="{ row }">
          <span>{{ productTypeEnmuFormat(row.productType) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="订单日期" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createdTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户姓名" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.clientName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户身份证" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.certNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="借款金额(元)" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.debtAmt / 100 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="借款期数(月)" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.debtLimit }}</span>
        </template>
      </el-table-column>

      <el-table-column label="借款状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ clientDebtStateFormat(row.state) }}</span>
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
          <el-button size="mini" type="primary" @click="getLoanInfoDetail(row)"
            >详情</el-button
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
  </div>
</template>

<script>
import moment from 'moment'
import { loanReCordList } from '@/api/partnerPage/orderInquiry'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import Vue from 'vue'
export default {
  name: 'sign',
  components: {
    Pagination
  },
  directives: {
    waves
  },
  data() {
    return {
      dialogStatus: {
        dialogVisible: false,
        debtNo: '',
        clientNo: ''
      },
      // 表单绑定数据
      queryModel: {},
      options: [
        {
          name: '订单编号',
          value: 'debtNo'
        },
        {
          name: '对应产品',
          value: 'product'
        },
        {
          name: '客户姓名',
          value: 'clientName'
        },
        {
          name: '客户身份证',
          value: 'certNo'
        }
      ],
      clientDebtState: [
        {
          code: '8',
          message: '回款中'
        },
        {
          code: '9',
          message: '已回款'
        },
        {
          code: '10',
          message: '已逾期'
        }
      ],
      vloadState: this.$getEnumUtils.getEnum('RealAuthStateEnmu'),
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        keys: undefined,
        searchType: undefined,
        expirationDate: undefined,
        endDate: undefined,
        startDate: undefined,
        state: undefined
      },
      temp: {
        id: undefined,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published',
        code: ''
      }
    }
  },

  created() {
    this.getList()
  },
  methods: {
    clientDebtStateFormat: function(val) {
      return this.$enumUtils.toMsg('DebtStatusEnum', val)
    },
    productTypeEnmuFormat: function(val) {
      return this.$enumUtils.toMsg('ProductTypeEnmu', val)
    },
    getList() {
      this.listLoading = true
      if (
        this.listQuery.expirationDate &&
        this.listQuery.expirationDate.length > 0
      ) {
        this.listQuery.startDate = moment(
          this.listQuery.expirationDate[0]
        ).format('YYYY-MM-DD')

        this.listQuery.endDate = moment(
          this.listQuery.expirationDate[1]
        ).format('YYYY-MM-DD')
      } else {
        this.listQuery.endDate = undefined
        this.listQuery.startDate = undefined
      }
      const {
        page,
        limit,
        keys,
        searchType,
        endDate,
        startDate,
        state
      } = this.listQuery
      loanReCordList({
        page,
        limit,
        keys,
        searchType,
        endDate,
        startDate,
        state
      }).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
        console.log(this.list)
      })
    },
    handleFilter(e) {
      // 如果不是点击页数改查询的话就将查询页数改为1
      if (e && !e.page) {
        this.listQuery.page = 1
      }
      this.getList()
    },
    // 详情页面点击跳转
    getLoanInfoDetail(row) {
      const { href } = this.$router.resolve({
        path: '/partnerPage/orderInquiryDialog?debtNo=' + row.debtNo
      })
      window.open(href, '_blank')
    }
  }
}
</script>
