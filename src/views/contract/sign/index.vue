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
          class="filter-item"
        ></el-option>
      </el-select>
      <!-- 输入框搜索 -->
      <el-input
        v-model="listQuery.keys"
        placeholder="ID、合同编号、负债编号、客户编号"
        style="width: 400px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-select
        v-model="listQuery.contractType"
        placeholder="合同类型"
        clearable
        class="filter-item"
        style="width: 200px"
      >
        <el-option
          v-for="item in $getEnumUtils.getEnum('ContractTypeEnmu')"
          :key="item.code"
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
      <!--新增BD按钮 -->
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
      <el-table-column label="合同编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.contractNo }}</span>
        </template>
      </el-table-column>
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
      <el-table-column label="产品类型" align="center">
        <template slot-scope="{ row }">
          <!-- <span>{{this.$enumUtils.toMsg('CardStateEnum',row.debtType)}}</span> -->
          <span>{{ productTypeFormat(row.productType) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同类型" align="center">
        <template slot-scope="{ row }">
          <span>{{ contractTypeFormat(row.contractType) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同模板编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.contractTemplateNo }}</span>
        </template>
      </el-table-column>

      <el-table-column label="pdf原件地址" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.pdfUrl }}</span>
        </template>
      </el-table-column>

      <el-table-column label="签约合同地址" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.signUrl }}</span>
        </template>
      </el-table-column>
      <!-- 类型 -->
      <el-table-column label="是否合同保全" align="center">
        <template slot-scope="{ row }">
          <span>{{ saveTypeFormat(row.supplierSave) }}</span>
        </template>
      </el-table-column>
      <!-- 时间 -->
      <!-- <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
      <el-table-column label="合同生成时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.contractCreatedTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="合同签约时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.contractSignTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同开始日期" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.startDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同结束日期" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.endDate }}</span>
        </template>
      </el-table-column>
      <!-- 签约状态 -->
      <el-table-column label="签约状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ signStateFormat(row.state) }}</span>
        </template>
      </el-table-column>
      <!-- 签约状态 -->
      <el-table-column label="创建时间" align="center" :formatter="dateFormat">
        <template slot-scope="{ row }">
          <span>{{ row.createdTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center" :formatter="dateFormat">
        <template slot-scope="{ row }">
          <span>{{ row.modifiedTime }}</span>
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
          <el-button
            v-if="row.state === 'SIGN_HANDLE' || row.state === 'UNSIGN'"
            size="mini"
            type="warning"
            @click="handleToVoid(row)"
            >作废</el-button
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
import { contractSignList, toVoidContractData } from '@/api/contract/sign'
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
          name: 'ID编号',
          value: 'id'
        },
        {
          name: '合同编号',
          value: 'contractNo'
        },
        {
          name: '负债编号',
          value: 'debtNo'
        },
        {
          name: '客户编号',
          value: 'clientNo'
        }
      ],
      validContractType: [
        {
          contractType: 'MLJ_LOAN',
          message: '美丽金借款合同'
        },
        {
          contractType: 'MLJ_SECRET',
          message: '美丽金隐私合同'
        },
        {
          contractType: 'MLJ_SERVICE',
          message: '美丽金服务合同'
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
      contractSignList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total

        this.listLoading = false
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

    // 合同作废点击事件
    handleToVoid(row) {
      this.$confirm('是否确认让该合同作废', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.toVoidContract(row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 通过API发送get请求,然后Mock拦截
    toVoidContract(row) {
      toVoidContractData(row.contractNo)
        .then(res => {
          if (res.code !== 0) throw res.data.msg
          row.state = 'VOID'
          this.$message({
            message: res.msg,
            type: 'success'
          })
        })
        .catch(err => {
          this.$message({
            message: '服务器被外星人吃啦-_-!',
            type: 'error'
          })
        })
    },
    // 合同类型格式
    contractTypeFormat: function(val) {
      return this.$enumUtils.toMsg('ContractTypeEnmu', val)
    },

    // 日期格式
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD')
    },

    // 产品类型格式
    productTypeFormat: function(val) {
      return this.$enumUtils.toMsg('ProductTypeEnmu', val)
    },
    // 是否保存合同
    saveTypeFormat: function(val) {
      return this.$enumUtils.toMsg('SaveContractEnmu', val)
    },
    // 签约状态格式
    signStateFormat: function(val) {
      return this.$enumUtils.toMsg('SignStateEnmu', val)
    }
  }
}
</script>
