<template>
  <div class="app-container">
    <div class="filter-container">
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
      <el-input
        v-model="listQuery.keys"
        placeholder="查询内容"
        style="width: 300px;"
        @keyup.enter.native="handleFilter"
      />

      <el-select
        v-model="listQuery.state"
        placeholder="客户状态"
        clearable
        style="width: 130px"
      >
        <el-option
          v-for="item in $getEnumUtils.getEnum('clientStateEnmu')"
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
      <el-table-column label="客户编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.clientNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="对应BD" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.salesmanId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.realName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.cell }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createdTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ clientStateFormat(row.state) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
          v-if="row.state === 'AUTHED'"
            v-waves
            size="mini"
            type="primary"
            @click="getClientInfoDetail(row)"
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

    <calculateDialog
      v-if="dialogStatus.dialogVisible"
      :dialogStatus="dialogStatus"
    ></calculateDialog>
  </div>
</template>

<script>
import {
  fetchList,
  createArticle,
  updateArticle,
  frozenClientData
} from '@/api/client'
import waves from '@/directive/waves' // waves directive
import calculateDialog from './calculateDialog'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Client',
  components: {
    Pagination,
    calculateDialog
  },
  directives: {
    waves
  },

  data() {
    return {
      dialogStatus: {
        dialogVisible: false,
        clientNo: ''
      },

      options: [
        {
          name: '客户名称',
          value: 'userName'
        },
        {
          name: '客户编号',
          value: 'clientNo'
        },
        {
          name: '客户电话',
          value: 'cell'
        },
        {
          name: '对应BD',
          value: 'bdName'
        }
      ],

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        searchType: undefined,
        keys: undefined,
        state: undefined
      },

      temp: {
        id: undefined,
        searchType: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      textMap: {
        update: 'Edit',
        create: 'Create'
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
        calculateDialog: {
          visible: false,
          clientNo: ''
        }
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    frozen(row) {
      this.$confirm('是否确认冻结该客户:' + row.userName, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.frozenClient(row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    frozenClient(row) {
      frozenClientData(row.id)
        .then(res => {
          if (res.code !== 0) throw res.data.msg
          row.state = 'FROZEN'
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

    clientStateFormat: function(val) {
      return this.$enumUtils.toMsg('clientStateEnmu', val)
    },

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
    handleFilter(e) {
      // 如果不是点击页数改查询的话就将查询页数改为1
      if (e && !e.page) {
        this.listQuery.page = 1
      }
      this.getList()
    },
    getClientInfoDetail(row) {
      this.dialogStatus.dialogVisible = true
      this.dialogStatus.clientNo = row.clientNo
    }
  }
}
</script>
