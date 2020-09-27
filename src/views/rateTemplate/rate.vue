<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        class="filter-item"
        v-model="listQuery.keys"
        placeholder="请输入搜索的产品类型"
        style="width: 360px;"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        type="primary"
        class="filter-item"
        icon="el-icon-search"
        @click="handleFilter"
        >搜索</el-button
      >
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="showForm('create')"
        >添加</el-button
      >
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      stripe
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="还款方式" align="center">
        <template slot-scope="{ row }">
          <span>{{ repayTypeFormat(row.repayType) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品类型" align="center">
        <template slot-scope="{ row }">
          <span>{{ productTypeFormat(row.productType) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="期限类型" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.periodType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="期限周期" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.periodUnit }}</span>
        </template>
      </el-table-column>

      <el-table-column label="日利息具体值" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.dayFeeRate * 100 }} %</span>
        </template>
      </el-table-column>
      <el-table-column label="月利息具体值" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.monthFeeRate * 100 }} %</span>
        </template>
      </el-table-column>

      <el-table-column label="综合利率" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.compositeInterestRate * 100 }} %</span>
        </template>
      </el-table-column>

      <el-table-column label="罚息比例" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.overdueRate * 100 }} %</span>
        </template>
      </el-table-column>

      <el-table-column label="罚息类型" align="center">
        <template slot-scope="{ row }">
          <span>{{ overdueTypeFormat(row.overdueType) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="期限具体值" align="center" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.periodValue }}</span>
        </template>
      </el-table-column>

      <el-table-column label="利年化率" align="center" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.feeRate * 100 }} %</span>
        </template>
      </el-table-column>
      <el-table-column label="保证金比例" align="center" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.depositRatio * 100 }} %</span>
        </template>
      </el-table-column>

      <el-table-column label="服务费率" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.serviceTariff * 100 }} %</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="180px"
      >
        <template slot-scope="{ row }">
          <!-- <el-button type="info" size="mini" @click="showDetails(row)" v-waves
            >查看详情</el-button
          > -->
          <el-button
            type="primary"
            size="mini"
            @click="showForm('update', row)"
            v-waves
            >编辑</el-button
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
    <!-- 弹框公用 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      close-on-press-escape
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="140px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="合作商编号" prop="partnerNo">
          <el-input v-model="temp.partnerNo" :disabled="isDisable" />
        </el-form-item>
        <!-- 还款方式 -->
        <el-form-item label="还款方式" prop="repayType">
          <el-select
            v-model="temp.repayType"
            placeholder="选择还款方式"
            clearable
            class="filter-item"
          >
            <el-option
              v-for="item in repayTypeEnum"
              :key="item.message"
              :label="item.message"
              :value="item.repayType"
            />
          </el-select>
        </el-form-item>
        <!-- 产品类型 -->
        <el-form-item label="产品类型" prop="productType">
          <el-select
            v-model="temp.productType"
            placeholder="选择产品类型"
            clearable
            class="filter-item"
          >
            <el-option
              v-for="item in productTypeEnum"
              :key="item.message"
              :label="item.message"
              :value="item.productType"
            />
          </el-select>
        </el-form-item>
        <!-- 期限类型 -->
        <el-form-item label="期限类型" prop="periodType">
          <el-select
            v-model="temp.periodType"
            placeholder="选择期限类型"
            clearable
            class="filter-item"
          >
            <el-option
              v-for="item in periodTypeEnum"
              :key="item.message"
              :label="item.message"
              :value="item.periodType"
            />
          </el-select>
        </el-form-item>
        <!-- feeRateType 费率类型 -->
        <el-form-item label="费率类型" prop="feeRateType">
          <el-select
            v-model="temp.feeRateType"
            placeholder="费率类型"
            clearable
            class="filter-item"
          >
            <el-option
              v-for="item in feeRateTypeEnum"
              :key="item.message"
              :label="item.message"
              :value="item.feeRateType"
            />
          </el-select>
        </el-form-item>
        <!-- 罚息类型 -->
        <el-form-item label="罚息类型" prop="overdueType">
          <el-select
            v-model="temp.overdueType"
            placeholder="罚息类型"
            clearable
            class="filter-item"
          >
            <el-option
              v-for="item in $getEnumUtils.getEnum('OverdueTypeEnum')"
              :key="item.message"
              :label="item.message"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <!--  -->
        <el-form-item label="期限周期" prop="periodUnit">
          <el-input v-model="temp.periodUnit" />
        </el-form-item>
        <el-form-item label="期限具体值" prop="periodValue">
          <el-input v-model="temp.periodValue" />
        </el-form-item>
        <el-form-item label="罚息具体值" prop="overdueRate">
          <el-input v-model="temp.overdueRate" />
        </el-form-item>
        <el-form-item label="利息具体值" prop="feeRate">
          <el-input v-model="temp.feeRate" />
        </el-form-item>
        <!-- 保证金类型 -->
        <el-form-item label="保证金类型" prop="depositType">
          <el-select
            v-model="temp.depositType"
            placeholder="保证金类型"
            clearable
            class="filter-item"
          >
            <el-option
              v-for="item in depositTypeEnum"
              :key="item.message"
              :label="item.message"
              :value="item.depositType"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="保证金具体值" prop="depositRate">
          <el-input v-model="temp.depositRate" />
        </el-form-item>
        <el-form-item label="服务费率" prop="serviceTariff">
          <el-input v-model="temp.serviceRate" />
        </el-form-item>
      </el-form>

      <!--  -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : handleUpdate()"
          >确认</el-button
        >
      </div>
    </el-dialog>

    <addRateDialog
      v-if="dialogStatus.dialogVisible"
      :close="rateDialogClose"
      :dialogStatus="dialogStatus"
    ></addRateDialog>
  </div>
</template>

<script>
import { fetchList, addRateData, updateData, rateDelete } from '@/api/rate'
import waves from '@/directive/waves'
import Vue from 'vue'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import moment from 'moment'
import addRateDialog from './addRateDialog'
import rate from '../../../mock/rate'

export default {
  name: 'client',
  components: {
    Pagination,
    addRateDialog
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
      // 合作商编号的修改禁用
      isDisable: false,
      // 初始化数据
      temp: {
        partnerNo: '', // 合作商编号
        repayType: '', // 还款方式
        feeRateType: '', // 费率类型
        productType: '', // 产品类型
        periodValue: '', // 期限具体值
        periodType: '', // 期限类型
        periodUnit: '', // 期限周期
        overdueType: '', // 罚息类型
        overdueRate: '', // 罚息具体值
        feeRate: '', // 利息具体值
        serviceRate: '', // 服务费具体值
        depositType: '', // 保证金类型
        depositRate: '', // 保证金具体值
        state: '', // 状态
        createdTime: '', // 创建时间
        modifyiedTime: '', // 修改时间
        version: null // 版本
      },
      // 开始日期数据类型

      options: [
        {
          name: '合作商编号',
          value: 'partnerNo'
        },
        {
          name: '还款方式',
          value: 'repayType'
        },
        {
          name: '产品类型',
          value: 'productType'
        },
        {
          name: '期限类型',
          value: 'periodType'
        }
      ],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        endDate: undefined,
        keys: undefined,
        limit: 10,
        overdueType: '0',
        page: 1,
        searchType: undefined,
        startDate: undefined
      },
      overdueTypeEnum: [{ message: '按逾期本金百分比', overdueType: 0 }],
      // depositTypeEnum 保证金类型
      depositTypeEnum: [{ message: '按本金百分比', depositType: 1 }],

      feeRateTypeEnum: [
        {
          feeRateType: 'ANNUAL',
          message: '按年化'
        },
        {
          feeRateType: 'ONCE',
          message: '按次'
        },
        {
          feeRateType: 'FIX',
          message: '按固定金额'
        }
      ],
      // repayType
      repayTypeEnum: [
        {
          repayType: 'A',
          message: '等本等金'
        },
        {
          repayType: 'B',
          message: '等额本息'
        },
        {
          repayType: 'C',
          message: '等额本金'
        },
        {
          repayType: 'D',
          message: '到期还本付息'
        },
        {
          repayType: 'E',
          message: '按月还息到期还本'
        }
      ],
      // productTypeEnum
      productTypeEnum: [
        { productType: 'P001', message: 'P001' },
        { productType: 'P002', message: 'P002' },
        { productType: 'P003', message: 'P003' }
      ],
      // periodTypeEnum
      periodTypeEnum: [
        { periodType: 'D', message: '天' },
        { periodType: 'M', message: '月' },
        { periodType: 'Y', message: '年' }
      ],
      temp: {
        id: undefined,
        remark: '',
        timestamp: new Date(),
        keys: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
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
        partnerNo: [
          { required: true, message: '请输入合作商编号', trigger: 'blur' },
          { min: 6, max: 9, message: '长度在 6 到 9 之间', trigger: 'blur' }
        ],
        regName: [
          { required: true, message: '请输入合作商注册名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        realName: [
          {
            required: true,
            message: '请输入合作商实际营业名称',
            trigger: 'blur'
          },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        coopAgreementExpire: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ]
      },
      downloadLoading: false,

      // 添加弹框的数据
      dialogStatus: {
        dialogVisible: false,
        activeName: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    clientOriginFormat: function(val) {
      return this.$enumUtils.toMsg('ClientOriginTypeEnum', val)
    },
    clientStateFormat: function(val) {
      return this.$enumUtils.toMsg('ClientStateEnum', val)
    },
    statusFormat: function(row, column) {
      var originType = row['originType']
      return this.$enumUtils.toMsg('ClientOriginTypeEnum', originType)
    },
    getList() {
      this.listLoading = true
      if (
        this.listQuery.expirationDate &&
        this.listQuery.expirationDate.length > 0
      ) {
        this.listQuery.startData = moment(
          this.listQuery.expirationDate[0]
        ).format('YYYY-MM-DD')

        this.listQuery.endDate = moment(
          this.listQuery.expirationDate[1]
        ).format('YYYY-MM-DD')
      } else {
        this.listQuery.endDate = undefined
        this.listQuery.startData = undefined
      }

      fetchList(this.listQuery).then(response => {
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
    // 新增合作商操作
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.coopAgreementExpire = moment(
            this.temp.coopAgreementExpire
          ).format('YYYY-MM-DD')
          console.log(this.temp)
          addRateData(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              message: '创建成功',
              type: 'success'
            })
          })
        }
      })
    },
    // 点击显示弹框
    showForm(mode, row) {
      if (mode == 'create') {
        this.dialogStatus.dialogVisible = true
        this.dialogStatus.activeName = 'create'
      } else if (mode == 'edit') {
        this.dialogFormVisible = true
        this.isDisable = true
        this.temp = {
          ...row
        }
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      }
    },
    // 还款方式 repayType
    repayTypeFormat: function(val) {
      return this.$enumUtils.toMsg('BackedTransferTypeEnum', val)
    },
    // 编辑操作
    handleUpdate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = {
            ...this.temp
          }
          updateData(tempData).then(res => {
            const index = this.list.findIndex(
              v => v.rateTemplateNo === this.temp.rateTemplateNo
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

    // 罚息类型格式 overdueType
    overdueTypeFormat: function(val) {
      return this.$enumUtils.toMsg('OverdueTypeEnum', val)
    },
    // debtLimitEnmu 期限类型
    periodTypeFormat: function(val) {
      return this.$enumUtils.toMsg('debtLimitEnmu', val)
    },
    // feeRateType 费率类型
    productTypeFormat: function(val) {
      return this.$enumUtils.toMsg('ProductTypeEnmu', val)
    },
    // state 费率模板的 状态
    feeRateStateFormat: function(val) {
      return this.$enumUtils.toMsg('feeRateStateEnmu', val)
    },
    // depositTypeFormmat 保证金类型格式
    depositTypeFormmat: function(val) {
      return this.$enumUtils.toMsg('depositTypeEnmu', val)
    },
    // 弹框关闭
    rateDialogClose() {
      console.log('弹框关闭')
    }
  }
}
</script>
<style scoped>
.filter-container {
  padding: 0;
  margin: 0;
}
</style>
