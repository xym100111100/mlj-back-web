<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        clearable
        v-model="listQuery.searchType"
        placeholder="查询条件"
      >
        <el-option
          v-for="item in searchOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input
        v-model="listQuery.keys"
        placeholder="查询内容"
        style="width: 200px;"
        @keyup.enter.native="getList"
      />

      <el-select v-model="listQuery.state" placeholder="状态" clearable>
        <el-option
          v-for="item in $getEnumUtils.getEnum('partnerSateEnum')"
          :key="item.code"
          :label="item.message"
          :value="item.code"
        />
      </el-select>

      <el-button v-waves type="primary" icon="el-icon-search" @click="getList"
        >搜索</el-button
      >
      <el-button
        v-waves
        type="primary"
        icon="el-icon-edit"
        @click="showForm('add')"
        >新增合作商</el-button
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
      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ isShelveseEnumFormat(row.state) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            type="success"
            v-waves
            size="mini"
            @click="showForm('info', row)"
            >查看详情</el-button
          >
          <el-button
            v-if="row.state === 0 || row.state === 3"
            type="primary"
            v-waves
            size="mini"
            @click="showForm('edit', row)"
            >编辑</el-button
          >
          <el-button
            v-if="row.state === 4 || row.state === 5"
            v-waves
            type="warning"
            size="mini"
            @click="showCardDialog(row)"
            >添加银行卡</el-button
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
    <PartnerDialog
      v-if="dialogStatus.dialogVisible"
      :close="partnerDialogClose"
      :dialogStatus="dialogStatus"
    ></PartnerDialog>

    <!-- 添加银行卡 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="55%">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>添加银行卡</span>
        </div>
        <div class="text item">
          <el-form
            ref="addBankForm"
            :model="cardInfo"
            label-width="160px"
            inline
            class="elfrom"
            :rules="rules"
          >
            <el-form-item label="银行卡类型" prop="settleType">
              <el-select
                style="width:190px"
                v-model="cardInfo.settleType"
                placeholder="银行卡类型"
                clearable
              >
                <el-option
                  v-for="item in $getEnumUtils.getEnum('settleTypeEnmu')"
                  :key="item.code"
                  :label="item.message"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="银行账户户名" prop="cardName">
              <el-input
                style="width:190px"
                v-model="cardInfo.cardName"
              ></el-input>
            </el-form-item>
            <br />
            <el-form-item label="银行卡身份证" prop="cardCertNo">
              <el-input
                style="width:190px"
                v-model="cardInfo.cardCertNo"
              ></el-input>
            </el-form-item>
            <el-form-item label="银行账号" prop="cardNo">
              <el-input
                style="width:190px"
                v-model.number="cardInfo.cardNo"
                oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,4})?).*$/g, '$1')"
              ></el-input>
            </el-form-item>
            <br />
            <!--银行账户开户行  -->
            <el-form-item label="银行账户开户行" prop="bankName">
              <el-select
                style="width:190px"
                v-model="cardInfo.bankName"
                placeholder="银行账户开户行"
                clearable
              >
                <el-option
                  v-for="item in $getEnumUtils.getEnum('BackedListEnum')"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="支行编号" prop="bankCode">
              <el-input
                style="width:190px"
                v-model="cardInfo.bankCode"
              ></el-input>
            </el-form-item>
            <el-form-item label="银行账号联行号" prop="openSubBankCode">
              <el-input
                style="width:190px"
                v-model="cardInfo.openSubBankCode"
              ></el-input>
            </el-form-item>
            <el-form-item label="支行名" prop="openSubBankName">
              <el-input
                style="width:190px"
                v-model="cardInfo.openSubBankName"
              ></el-input>
            </el-form-item>

            <el-form-item label="银行预留手机号码" prop="reservePhone">
              <el-input
                style="width:190px"
                v-model.number="cardInfo.reservePhone"
                oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,4})?).*$/g, '$1')"
              ></el-input>
            </el-form-item>
            <el-form-item label="银行所在地址">
              <el-cascader
                style="width:300px"
                v-model="cardInfo.openAddress"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addBank">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, upAndDownData, addBankData } from '@/api/partner'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import moment from 'moment'
import PartnerDialog from './partnerDialog'
import getArea from '../../utils/area'

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
      rules: {
        settleType: [
          {
            required: true,
            message: '银行卡类型必须且全部为数字!'
          }
        ],
        cardName: [
          {
            required: true,
            message: '银行账户户名必须!'
          }
        ],
        cardCertNo: [
          {
            required: true,
            message: '银行卡身份证必须!'
          }
        ],
        cardNo: [
          {
            required: true,
            type: 'number',
            message: '银行账号必须且全部为数字!'
          }
        ],
        bankName: [
          {
            required: true,
            message: '法银行账户开户行必须!'
          }
        ],
        bankCode: [
          {
            required: true,
            message: '支行编号必须!'
          }
        ],
        openSubBankName: [
          {
            required: true,
            message: '支行名!'
          }
        ],
        openSubBankCode: [
          {
            required: true,
            message: '银行账号联行号必须!'
          }
        ],
        reservePhone: [
          { required: true, message: '手机号码不能为空' },
          { type: 'number', message: '手机号码必须为数字值' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确手机格式',
            trigger: 'change'
          }
        ]
      },
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
        shelvesReason: '', //上下架原因
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
      isDisabled: undefined,
      // 开始日期数据类型

      searchOptions: [
        {
          name: '商户注册名称',
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
        searchType: undefined,
        state: undefined
      },

      dialogFormVisible: false,
      showshowForm: false,

      textMap: {
        update: '修改',
        create: '新增'
      },

      downloadLoading: false,

      // 添加银行卡弹框
      dialogVisible: false,
      // 弹框表单数据
      cardInfo: {
        partnerNo: '', //商户编号
        settleType: '', // 银行卡类型
        cardName: '', // 银行卡账户名
        cardNo: '', // 银行卡账号
        cardCertNo: '', // 银行卡身份证
        reservePhone: '', //预留手机号
        bankName: '', // 开户行名字
        openSubBankName: '', // 支行名 ,
        openSubBankCode: '', // 联行号
        bankCode: '', // 银行开户行编号
        cardOwnerMobile: '', // 放款号码
        // 银行账号开户行所在地,
        openAddress: ''
      }
    }
  },
  created() {
    this.getList()
    this.options = getArea()
  },
  methods: {
    resetCardInfo() {
      this.cardInfo = {
        partnerNo: '', //商户编号
        settleType: '', // 银行卡类型
        cardName: '', // 银行卡账户名
        cardNo: '', // 银行卡账号
        cardCertNo: '', // 银行卡身份证
        reservePhone: '', //预留手机号
        bankName: '', // 开户行名字
        openSubBankName: '', // 支行名,
        openSubBankCode: '', // 联行号
        bankCode: '', // 银行开户行编号
        cardOwnerMobile: '', // 放款号码
        // 银行账号开户行所在地,
        openAddress: ''
      }
    },
    addBank() {
      this.$refs['addBankForm'].validate(valid => {
        if (valid) {
          if (this.cardInfo.openAddress && this.cardInfo.openAddress.length) {
            this.cardInfo.openProvName = this.cardInfo.openAddress[0]
            this.cardInfo.openCityName = this.cardInfo.openAddress[1]
            this.cardInfo.openAreaName = this.cardInfo.openAddress[2]
          }

          addBankData(this.cardInfo).then(res => {
            this.dialogVisible = false
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          })
        }
      })
    },
    partnerDialogClose(Refresh) {
      if (Refresh) {
        this.getList()
      }
      this.dialogStatus.dialogVisible = false
    },
    showForm(action, val) {
      this.dialogStatus.dialogVisible = true
      this.dialogStatus.action = action
      if (action === 'add') {
        this.dialogStatus.showSaveButtob = true
        this.dialogStatus.showSexamineButton = false
        this.dialogStatus.showOtherTab = false
        this.dialogStatus.partnerNo = ''
        this.dialogStatus.state = -1
      } else if (action === 'info') {
        this.dialogStatus.showSaveButtob = false
        this.dialogStatus.showSexamineButton = false
        this.dialogStatus.showOtherTab = true
        this.dialogStatus.state = val.state
        this.dialogStatus.partnerNo = val.partnerNo
      } else if (action === 'edit') {
        this.dialogStatus.showSaveButtob = true
        this.dialogStatus.showSexamineButton = true
        this.dialogStatus.showOtherTab = true
        this.dialogStatus.state = val.state
        this.dialogStatus.partnerNo = val.partnerNo
      }
    },
    getList(e) {
      // 如果不是点击页数改查询的话就将查询页数改为1
      if (e && !e.page) {
        this.listQuery.page = 1
      }

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

    // 编辑点击事件
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

    // 重置
    resetTemp() {
      this.temp = {
        partnerNo: '', //商户编号
        regName: '', //商户注册名称
        realName: '', //实际营业名称
        saleCode: '', //归属BD
        grade: '', //商户等级
        bizProperty: '', //商户性质
        coopAgreementExpire: '', //合作(协议)到期时间
        establishDate: '', //成立时间
        shelvesReason: '', //上下架原因
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
      }
    },
    // 时间格式
    dateFormatText: function(param) {
      return moment(param).format('YYYY-MM-DD')
    },
    // 显示添加银行卡弹框
    showCardDialog(row) {
      this.resetCardInfo()
      this.cardInfo.partnerNo = row.partnerNo
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['addBankForm'].clearValidate()
      })
    },
    isShelveseEnumFormat: function(val) {
      return this.$enumUtils.toMsg('partnerSateEnum', val)
    }
  }
}
</script>
<style lang="stylus" scoped>

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
}
</style>
