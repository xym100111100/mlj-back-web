<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.keys"
        placeholder="注册名称"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
      <!-- 工单状态 -->
      <el-select v-model="listQuery.state" placeholder="工单状态" clearable>
        <el-option
          v-for="item in $getEnumUtils.getEnum('workOrderStateEnmu')"
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
      <!-- 工单类型 -->
      <el-select
        v-model="listQuery.workOrderType"
        placeholder="工单类型"
        clearable
      >
        <el-option
          v-for="item in $getEnumUtils.getEnum('workOrderTypeEnmu')"
          :key="item.code"
          :label="item.message"
          :value="item.code"
        />
      </el-select>
      <!-- 新增工单 -->
      <el-button
        v-waves
        type="primary"
        icon="el-icon-edit"
        @click="createWorkOrder('create', listQuery.workOrderType)"
        >新增工单</el-button
      >
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
      <el-table-column label="工单编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.workOrderNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商户注册名称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.regName }}</span>
        </template>
      </el-table-column>
      <!-- 工单类型(0-放款卡可切换状态变更，1-商户基本信息变更，2-商户联系人信息变更，3-商户附件信息变更，4-商户合作协议变更) -->
      <el-table-column label="工单类型" align="center">
        <template slot-scope="{ row }">
          <span>{{ workOrderTypeFormat(row.workOrderType) }}</span>
        </template>
      </el-table-column>

      <!-- 待补充BD名称 -->
      <!-- <el-table-column label="BD名称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.operatorName }}</span>
        </template>
      </el-table-column> -->

      <!-- 工单状态  工单创建 工单执行完成 工单拒绝 -->
      <el-table-column label="工单状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ workOrderStateFormat(row.state) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ dateFormatText(row.createdTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="180px"
      >
        <template slot-scope="{ row }">
          <el-button
            v-if="row.state == 0 || row.state == 2"
            type="info"
            v-waves
            size="mini"
            @click="showDialog('info', row)"
            >查看</el-button
          >
          <el-button
            v-if="row.state == 1 || row.state == 3"
            type="primary"
            v-waves
            size="mini"
            @click="showDialog('edit', row)"
            >编辑</el-button
          >

          <el-button
            type="success"
            v-waves
            v-if="row.state == 1 || row.state == 3 || row.state == 4"
            size="mini"
            @click="changeWorkOrderState(row, '提交工单', 2)"
            >提交</el-button
          >

          <el-button
            v-waves
            v-if="row.state !== 0 && row.state !== 4"
            type="danger"
            size="mini"
            @click="changeWorkOrderState(row, '作废工单', 0)"
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

    <loanCardStatusDialog
      :getListData="getListDataOpt"
      v-if="dialogStatus.allTabDialogVisible"
      :dialogStatus="dialogStatus"
      :dialogClose="dialogClose"
    ></loanCardStatusDialog>
  </div>
</template>
<script>
import {
  fetchList,
  deleteData,
  addPartnerData,
  updateData,
  upAndDownData,
  // 提交和作废
  submitLoanCardData,
  submitBasicInfoOrderData,
  submitContactInfoOrderData,
  submitAppendixData
} from '@/api/workOrder'
import waves from '@/directive/waves'
import Vue from 'vue'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import moment from 'moment'
import getArea from '../../utils/area'
import loanCardStatusDialog from './common/loanCardStatusDialog'

export default {
  name: 'client',
  components: {
    Pagination,
    loanCardStatusDialog
  },

  directives: {
    waves
  },

  data() {
    return {
      // 弹框数据
      dialogStatus: {
        allTabDialogVisible: false,
        model: undefined,
        activeName: undefined,
        determineButton: false,
        cancelButton: false,
        closeButton: false,
        dialogTitle: undefined,
        submitWorkOrder: true,
        disableOptions: false,
        doActionData: undefined,
        workOrderType: undefined,
        doActions: undefined,
        partnerNoHide: false,
        // 附件
        action: undefined
        // partnerNo: ''
      },
      // 初始化数据
      temp: {
        workOrderNo: undefined, //工单编号
        regName: undefined, //商户注册名称
        operatorName: undefined, //归属BD
        workOrderType: undefined, //工单类型
        state: undefined, //工单状态
        createdTime: undefined //申请时间
      },
      // 开始日期数据类型
      tableKey: 0,
      list: undefined,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        keys: undefined,
        type: undefined,
        searchType: undefined,
        state: undefined,
        workOrderType: undefined
      },
      dialogFormVisible: false,
      showPartnerRate: false,
      downloadLoading: false,
      // 弹框组件
      loanCardDialogVisible: false, // 卡状态
      basicDialogVisible: false, // 客户基本信息变更
      // 卡状态表单数据
      loanStatus: {
        regName: undefined, // 商户注册名称
        workOrderType: undefined, // 工单类型
        beforeUpdateData: undefined, // 更新前数据
        afterUpdateData: undefined, // 更新后数据
        voucherUrl: undefined, // 附件URL
        reason: undefined
      },
      // 银行卡状态表单的验证
      loanStatusRules: {
        regName: [
          {
            required: true,
            message: '商户注册名称是必须!'
          }
        ],
        workOrderType: [
          {
            required: true,
            message: '请选择工单类型'
          }
        ],
        afterUpdateData: [
          {
            required: true,
            message: '请填入更新后数据!'
          }
        ],
        voucherUrl: [
          {
            required: true,
            message: '请选择上传的文件'
          }
        ],
        reason: [
          {
            required: true,
            message: '请填写提交原因'
          }
        ]
      },
      // 商户基本信息校验规则
      basicChangeRules: {
        regName: [
          {
            required: true,
            message: '商户注册名称是必须!'
          }
        ],
        workOrderType: [
          {
            required: true,
            message: '请选择工单类型'
          }
        ],
        realName: [
          {
            required: true,
            message: '请填写实际营业名称!'
          }
        ],
        regAmt: [
          {
            required: true,
            message: '请填写注册资本'
          }
        ],
        establishDate: [
          {
            required: true,
            message: '请选择成立日期'
          }
        ],
        registerAddress: [
          {
            required: true,
            message: '请选择注册地址'
          }
        ],
        businessAddress: [
          {
            required: true,
            message: '请选择营业地址'
          }
        ],
        longitude: [
          {
            required: true,
            message: '请填写经度'
          }
        ],
        latitude: [
          {
            required: true,
            message: '请填写纬度'
          }
        ],
        addressSize: [
          {
            required: true,
            message: '请选择用地性质'
          }
        ],
        bizProperty: [
          {
            required: true,
            message: '请选择商户性质'
          }
        ],
        employeesNumber: [
          {
            required: true,
            message: '请填写员工人数'
          }
        ],
        companyIndustry: [
          {
            required: true,
            message: '请选择所属行业'
          }
        ],
        branchStatus: [
          {
            required: true,
            message: '请选择分支机构情况'
          }
        ],
        managemantMode: [
          {
            required: true,
            message: '请说明机构经营模式'
          }
        ],
        bizScope: [
          {
            required: true,
            message: '请填写经营范围'
          }
        ],
        monthSales: [
          {
            required: true,
            message: '请输入预计月均收入'
          }
        ]
      },
      // 图片地址
      srcList: [
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
      ],
      src: '',
      // 预览URL
      dialogVisible: false,
      // 地址选择options
      options: [],
      // 商户基本信息变更
      basicChange: {
        workOrderNo: undefined, // 工单编号
        workOrderType: undefined, //工单类型
        regName: undefined, // 商户注册名称
        realName: undefined, // 实际营业名称
        establishDate: undefined, // 成立时间
        regAmt: undefined, // 注册资本
        registerAddress: undefined, // 注册地址
        businessAddress: undefined, // 营业地址
        latitude: undefined, // 纬度
        longitude: undefined, // 经度
        bizProperty: undefined, // 商户性质
        addressSize: undefined, // 营业用地面积
        addressNature: undefined, // 营业用地性质
        employeesNumber: undefined, // 员工人数
        bizScope: undefined, // 经营范围
        branchStatus: undefined, // 分支机构情况
        managemantMode: undefined, // 经营模式
        reason: undefined, // 提交原因
        companyIndustry: undefined, // 所属行业
        monthSales: undefined // 月均交易金额
      }
    }
  },
  created() {
    this.getList()
    this.options = getArea()
  },

  methods: {
    partnerRate(val) {
      console.log(val)
      this.showPartnerRate = true
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
    dialogClose() {
      this.dialogStatus.allTabDialogVisible = false
      this.handleFilter()
    },
    handleFilter() {
      this.getList()
    },

    // 点击选择新建工单页面 新增合作商
    createWorkOrder(action, model) {
      console.log(model)
      this.dialogStatus.dialogTitle = action
      this.dialogStatus.closeButton = false
      this.dialogStatus.submitWorkOrder = true
      this.dialogStatus.disableOptions = false
      this.dialogStatus.determineButton = false
      this.dialogStatus.cancelButton = false
      this.dialogStatus.workOrderNo = null
      switch (model) {
        case undefined || '':
          this.$notify({
            message: '请选择工单类型',
            type: 'info'
          })
          break
        case 0:
          this.dialogStatus.allTabDialogVisible = true
          this.dialogStatus.model = 0
          this.dialogStatus.activeName = '0'
          this.dialogStatus.doActionData = 'loanStatus'
          this.dialogStatus.workOrderType = 0
          this.dialogStatus.action = 'add'
          this.dialogStatus.partnerNoHide = false
          break
        case 1:
          this.dialogStatus.allTabDialogVisible = true
          this.dialogStatus.model = 1
          this.dialogStatus.activeName = '1'
          this.dialogStatus.doActionData = 'basicChange'
          this.dialogStatus.workOrderType = 1
          this.dialogStatus.partnerNoHide = false

          break
        case 2:
          this.dialogStatus.allTabDialogVisible = true
          this.dialogStatus.model = 2
          this.dialogStatus.activeName = '2'
          this.dialogStatus.doActionData = 'linkerChange'
          this.dialogStatus.workOrderType = 2
          this.dialogStatus.partnerNoHide = false

          break
        case 3:
          this.dialogStatus.allTabDialogVisible = true
          this.dialogStatus.model = 3
          this.dialogStatus.activeName = '3'
          this.dialogStatus.doActionData = 'appendixChange'
          this.dialogStatus.workOrderType = 3
          this.dialogStatus.action = 'add'
          this.dialogStatus.partnerNoHide = false
          // this.dialogStatus.partnerNo = 3
          break
        case 4:
          this.dialogStatus.allTabDialogVisible = true
          this.dialogStatus.model = 4
          this.dialogStatus.activeName = '4'
          this.dialogStatus.doActionData = 'loanStatusRules'
          this.dialogStatus.partnerNoHide = false
          this.dialogStatus.workOrderType = 4
      }
    },

    // 时间格式
    dateFormatText: function(param) {
      return moment(param).format('YYYY-MM-DD')
    },
    // regNameFormat 商户注册名格式
    regNameFormat: function(val) {
      return this.$enumUtils.toMsg('regNameEnmu', val)
    },
    // 工单类型
    workOrderTypeFormat: function(val) {
      return this.$enumUtils.toMsg('workOrderTypeEnmu', val)
    },
    // 工单状态
    workOrderStateFormat: function(val) {
      return this.$enumUtils.toMsg('workOrderStateEnmu', val)
    },

    // 点击删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },

    // 点击重置按钮
    resetForm(loanStatusRef) {
      this.$refs.loanStatusRef.resetFields()
      this.$nextTick(() => {
        this.$refs['loanStatusRef'].clearValidate()
      })
    },

    // 查看 -- 编辑点击事件
    showDialog(action, row) {
      this.dialogStatus.dialogTitle = action
      this.dialogStatus.allTabDialogVisible = true
      this.dialogStatus.model = row.workOrderType
      this.dialogStatus.activeName = row.workOrderType + ''
      this.dialogStatus.workOrderNo = row.workOrderNo

      if (action === 'info') {
        this.dialogStatus.determineButton = false
        this.dialogStatus.cancelButton = false
        this.dialogStatus.closeButton = true
        this.dialogStatus.submitWorkOrder = false
        this.dialogStatus.disableOptions = true
      } else if (action === 'edit') {
        this.dialogStatus.determineButton = true
        this.dialogStatus.cancelButton = true
        this.dialogStatus.closeButton = false
        this.dialogStatus.submitWorkOrder = false
        this.dialogStatus.disableOptions = false
        this.dialogStatus.partnerNoHide = true // 提交页面不给选择商户注册名称
      }
    },
    //   接收子组件传过来的
    getListDataOpt(getListData) {
      console.log(getListData)
      this.list = getListData
    },
    // 点击提交事件
    changeWorkOrderState(row, msg, state) {
      let doSubmitAction
      switch (row.workOrderType) {
        case 0:
          doSubmitAction = submitLoanCardData
          break
        case 1:
          doSubmitAction = submitBasicInfoOrderData
          break
        case 2:
          doSubmitAction = submitContactInfoOrderData
          break
        case 3:
          doSubmitAction = submitAppendixData
          break
        // case 4:
        //   doSubmitAction = submitLoanCardData
      }
      this.$confirm('是否进行' + msg + '操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          doSubmitAction({ workOrderNo: row.workOrderNo, state: state }).then(
            res => {
              if (res.code === 0) {
                this.$notify({
                  message: res.data,
                  type: 'success'
                })
                row.state = state
              } else {
                this.$notify({
                  message: res.msg,
                  type: 'error'
                })
              }
            }
          )
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消操作'
          })
        })
    }
  }
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>
