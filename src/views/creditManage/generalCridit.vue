<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 添加筛选条件框 -->
      <el-form :inline="true" class="demo-form-inline">
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
          placeholder="请输入、不支持模糊查询 "
          style="width: 300px;"
          @keyup.enter.native="handleFilter"
        />
        <!-- 授信状态 -->
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
        <!--新增BD按钮 -->

        <el-select
          v-model="listQuery.state"
          placeholder="授信状态"
          clearable
          style="width: 200px"
        >
          <el-option
            v-for="item in $getEnumUtils.getEnum('ClientCreditStateEnmu')"
            :key="item.code"
            :label="item.message"
            :value="item.code"
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
      <el-table-column label="授信编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.creditRecordNo }}</span>
        </template>
      </el-table-column>
      <!-- 客户编号 -->
      <el-table-column label="对应产品" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.productName }}</span>
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
      <el-table-column label="对应BD" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.bdname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="授信额度(元)" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.artificialAmt / 100 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createdTime }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="授信类型" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.creditType }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="授信状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ clientCreditStateFormat(row.state) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="190px"
      >
        <template slot-scope="{ row }">
          <el-button v-waves size="mini" type="primary" @click="showForm(row)"
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
      @pagination="handleFilter"
    />

    <creditDialog
      v-if="dialogStatus.dialogVisible"
      :dialogStatus="dialogStatus"
      :dialogClose="dialogClose"
    ></creditDialog>
  </div>
</template>

<script>
import moment from 'moment'
import { creditRecordData } from '@/api/credit'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import creditDialog from './creditDialog'

export default {
  name: 'sign',
  components: {
    Pagination,
    creditDialog
  },
  directives: {
    waves
  },
  data() {
    return {
      dialogStatus: {
        dialogVisible: false,
        creditRecordNo: '',
        state: '',
        clientNo: ''
      },
      options: [
        {
          name: '授信编号',
          value: 'creditRecordNo'
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

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        expirationDate: '',
        page: 1,
        limit: 10,
        keys: '',
        searchType: '',
        state: ''
      }
    }
  },

  created() {
    this.handleFilter()
  },
  methods: {
    dialogClose() {
      this.handleFilter()
    },
    handleFilter(e) {
      // 如果不是点击页数改查询的话就将查询页数改为1
      if (e && !e.page) {
        this.listQuery.page = 1
      }
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

      creditRecordData({
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
      })
    },
    // 授信状态格式 clientCreditStateFormat
    clientCreditStateFormat: function(val) {
      return this.$enumUtils.toMsg('ClientCreditStateEnmu', val)
    },
    clientDebtStateFormat: function(val) {
      return this.$enumUtils.toMsg('DebtStatusEnum', val)
    },

    showForm(row) {
      this.dialogStatus.dialogVisible = true
      this.dialogStatus.creditRecordNo = row.creditRecordNo
      this.dialogStatus.state = row.state
      this.dialogStatus.clientNo = row.clientNo
    }
  }
}
</script>
