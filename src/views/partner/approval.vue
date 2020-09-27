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
        placeholder="实际营业名称"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />

      <el-select v-model="listQuery.state" placeholder="状态" clearable>
        <el-option
          v-for="item in partnerStateData"
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
      stripe
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="实际营业名称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.realName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册机构名称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.regName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机构商户编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.partnerNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商户性质" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.bizProperty }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人姓名" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.linkerName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系人电话" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.linkerTel }}</span>
        </template>
      </el-table-column>
      <!-- BD -->
      <el-table-column label="归属BD" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.saleCode }}</span>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ isShelveseEnumFormat(row.state) }}</span>
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
            type="success"
            v-waves
            size="mini"
            @click="showForm('info', row)"
            >查看</el-button
          >
          <el-button
            v-if="row.state === 1"
            type="primary"
            v-waves
            size="mini"
            @click="showForm('edit', row)"
            >审核</el-button
          >
          <el-button
            v-waves
            v-if="row.state === 5"
            type="warning"
            size="mini"
            @click="handleChange('4', row, '是否进行上架操作')"
            >上架</el-button
          >
          <el-button
            v-waves
            v-if="row.state === 4"
            type="warning"
            size="mini"
            @click="handleChange('5', row, '是否进行下架操作')"
            >下架</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <PartnerDialog
      v-if="dialogStatus.dialogVisible"
      :close="partnerDialogClose"
      :dialogStatus="dialogStatus"
      :showApprovalResult="true"
    ></PartnerDialog>
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
import {
  fetchList,
  deleteData,
  addPartnerData,
  updateData,
  upAndDownData
} from '@/api/approval'
import waves from '@/directive/waves'
import Vue from 'vue'
import PartnerDialog from './partnerDialog'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import moment from 'moment'

export default {
  name: 'client',
  components: {
    Pagination,
    PartnerDialog
  },

  directives: {
    waves
  },

  data() {
    return {
      partnerStateData: [
        {
          message: '待审核',
          code: '1'
        },
        {
          message: '已拒绝',
          code: '2'
        },
        {
          message: '已打回',
          code: '3'
        },
        {
          message: '已上架',
          code: '4'
        },
        {
          message: '已下架',
          code: '5'
        }
      ],
      dialogStatus: {
        dialogVisible: false,
        action: 'add',
        showSaveButtob: false, // 显示提交保存按钮
        showSexamineButton: false, // 显示提交审核按钮
        showOtherTab: false, //显示除基本信息外的另外tab
        showApprovalResult: false //显示审核按钮
      },
      // 初始化数据
      temp: {
        partnerNo: '', //商户编号
        regName: '', //商户注册名称
        realName: '', //实际营业名称
        saleCode: '', //归属BD
        grade: '', //商户等级
        bizProperty: '', //商户性质
        coopAgreementExpire: '', //合作(协议)到期时间
        establishDate: '', //成立时间
        shelvesReason: '', //原因
        postCode: '', //邮政编码
        optLimit: '', //经营年限
        companyIndustry: '', //所属行业
        regAmt: '', //注册资本
        addressSize: '', //营业用地面积
        addressNature: '', //营业用地性质
        employeesNumber: '', //员工人数
        monthSales: '', //预计月均交易金额
        bizScope: '', //经营范围
        branchStatus: '', //分支机构情况
        instLicence: '', //统一社会信用代码
        instTaxNo: '', //税务登记证号
        instOrganizationCode: '', //机构代码证号
        medicalLicenseExpire: '', //医疗许可证到期日
        managemantMode: '', //机构经营模式
        regionCode: '', //区域code
        regionName: '', //区域名称
        state: '',
        leaseExpire: '', //租赁场所合同到期日
        version: '' //版本
      },
      // 开始日期数据类型

      options: [
        {
          name: '注册营业名称',
          value: 'regName'
        },
        {
          name: '实际营业名称',
          value: 'realName'
        }
      ],
      tableKey: 0,
      list: undefined,
      total: 0,
      listLoading: true,
      listQuery: {
        expirationDate: undefined,
        page: 1,
        limit: 10,
        keys: undefined,
        type: undefined,
        searchType: '',
        state: '',
        realName: undefined
      },

      dialogFormVisible: false,
      showPartnerRate: false
    }
  },
  created() {
    this.getList()
  },

  methods: {
    partnerDialogClose(val) {
      if(val){
        this.handleFilter()
      }
      this.dialogStatus.dialogVisible = false
    },
    showForm(action, val) {
      this.dialogStatus.dialogVisible = true
      this.dialogStatus.action = action
      if (action === 'info') {
        this.dialogStatus.showSaveButtob = false
        this.dialogStatus.showSexamineButton = false
        this.dialogStatus.showOtherTab = true
        this.dialogStatus.partnerNo = val.partnerNo
      } else if (action === 'edit') {
        this.dialogStatus.showSaveButtob = false
        this.dialogStatus.showSexamineButton = false
        this.dialogStatus.showOtherTab = true
        this.dialogStatus.partnerNo = val.partnerNo
      }
      if (val.state === 1) {
        this.dialogStatus.showApprovalResult = true
      } else {
        this.dialogStatus.showApprovalResult = false
      }
    },

    partnerRate(val) {
      this.showPartnerRate = true
    },

    getList() {
      this.listLoading = true
      this.listQuery.regName = ''
      this.listQuery.realName = ''
      this.listQuery[this.listQuery.searchType] = this.listQuery.keys
 
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
    // 删除操作
    handleDelete(val) {
      deleteData({
        id: val.id
      }).then(response => {
        if (response.result === true) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.list.map((item, index) => {
            if (item.id == val.id) {
              this.list.splice(index, 1)
            }
          })
        } else {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        }
      })
    },

    // 新增商户操作
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.coopAgreementExpire = moment(
            this.temp.coopAgreementExpire
          ).format('YYYY-MM-DD')

          addPartnerData(this.temp).then(() => {
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

    // 编辑点击事件
    handleUpdate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = {
            ...this.temp
          }
          // 合约时间
          this.temp.coopAgreementExpire = moment(
            this.temp.coopAgreementExpire
          ).format('YYYY-MM-DD')
          // 医疗许可证到期日
          this.temp.createdTime = moment(this.temp.medicalLicenseExpire).format(
            'YYYY-MM-DD'
          )
          // 租赁场所合同到期日
          this.temp.modifideTime = moment(this.temp.leaseExpire).format(
            'YYYY-MM-DD'
          )
          updateData(tempData).then(res => {
            const index = this.list.findIndex(
              v => v.partnerNo === this.temp.partnerNo
            )
            if (res.code === 0) {
              this.list[index] = tempData
              Vue.set(this.list, index, this.list[index])
              this.dialogFormVisible = false
              this.$notify({
                message: res.msg,
                type: 'success'
              })
            } else {
              this.$notify({
                title: res.msg,
                message: '修改失败',
                type: 'error'
              })
            }
          })
        }
      })
    },
    // 上架和下架点击事件
    handleChange(state, row, msg) {
      this.$confirm('是否确认' + msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          upAndDownData({ partnerNo: row.partnerNo, state }).then(res => {
            if (res.code === 0) {
              this.$message({
                message: res.data,
                type: 'success'
              })
              row.state = state
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },

    isShelveseEnumFormat: function(val) {
      return this.$enumUtils.toMsg('partnerSateEnum', val)
    },
    resetTemp() {},
    // 时间格式
    dateFormatText: function(param) {
      return moment(param).format('YYYY-MM-DD')
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
