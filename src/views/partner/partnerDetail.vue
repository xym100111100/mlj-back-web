<template>
  <div class="content-text">
    <h2>合作商信息</h2>
    <div class="content-table">
      <table id="content">
        <!-- --------- -->
        <tr>
          <td>合作商编号</td>
          <td>
            <!-- <el-input v-model="partner.partnerNo" style="width: 200px;" /> -->
            <span>{{ partner.partnerNo }}</span>
          </td>
          <td>合作商注册名称</td>
          <td>
            <!-- <el-input v-model="partner.regName" style="width: 200px;" /> -->
            <span>{{ partner.regName }}</span>
          </td>
          <td>实际营业名称</td>
          <td>
            <!-- <el-input v-model="partner.realName" style="width: 200px;" /> -->
            <span>{{ partner.realName }}</span>
          </td>
        </tr>
        <!-- --------- -->
        <tr>
          <!-- <td>是否上架</td>
          <td>
            <span>{{ partner.isShelves }}</span>
          </td> -->
          <td>归属BD</td>
          <td>
            <span>{{ partner.saleCode }}</span>
          </td>
          <td>合作商等级</td>
          <td>
            <span>{{ partner.grade }}</span>
          </td>
        </tr>
        <!-- --------- -->
        <tr>
          <td>合作商性质</td>
          <td>
            <span>{{ partner.bizProperty }}</span>
          </td>
          <td>合作(协议)到期时间</td>
          <td>
            <span>{{ dateFormatText(partner.coopAgreementExpire) }}</span>
          </td>
          <td>成立时间</td>
          <td>
            <span>{{ partner.establishDate }}</span>
          </td>
        </tr>
        <!-- --------- -->
        <tr>
          <td>邮政编码</td>
          <td>
            <span>{{ partner.postCode }}</span>
          </td>
          <td>经营年限</td>
          <td>
            <span>{{ partner.optLimit }}</span>
          </td>
        </tr>
        <!-- --------- -->
        <tr>
          <td>所属行业</td>
          <td>
            <span>{{ partner.companyIndustry }}</span>
          </td>
          <td>注册资本</td>
          <td>
            <span>{{ partner.regAmt }}</span>
          </td>
          <td>营业用地面积</td>
          <td>
            <span>{{ partner.addressSize }}</span>
          </td>
        </tr>
        <!-- --------- -->
        <tr>
          <!-- <td>是否上架</td>
          <td>
            <span>{{ partner.isShelves }}</span>
          </td> -->
          <td>归属BD</td>
          <td>
            <span>{{ partner.saleCode }}</span>
          </td>
          <td>合作商等级</td>
          <td>
            <span>{{ partner.grade }}</span>
          </td>
        </tr>
        <!-- --------- -->
        <tr>
          <td>营业用地性质</td>
          <td>
            <span>{{ partner.addressNature }}</span>
          </td>
          <td>员工人数</td>
          <td>
            <span>{{ partner.employeesNumber }}</span>
          </td>
          <td>预计月均交易金额</td>
          <td>
            <span>{{ partner.monthSales }}</span>
          </td>
        </tr>
        <!-- --------- -->
        <tr>
          <td>经营范围</td>
          <td>
            <span>{{ partner.bizScope }}</span>
          </td>
          <td>分支机构情况</td>
          <td>
            <span>{{ partner.branchStatus }}</span>
          </td>
          <td>统一社会信用代码</td>
          <td>
            <span>{{ partner.instLicence }}</span>
          </td>
        </tr>
        <!-- --------- -->
        <tr>
          <td>税务登记证号</td>
          <td>
            <span>{{ partner.instTaxNo }}</span>
          </td>
          <td>机构代码证号</td>
          <td>
            <span>{{ partner.instOrganizationCode }}</span>
          </td>
          <td>医疗许可证到期日</td>
          <td>
            <span>{{ partner.medicalLicenseExpire }}</span>
          </td>
        </tr>
        <!-- --------- -->
        <tr>
          <td>机构经营模式</td>
          <td>
            <span>{{ partner.managemantMode }}</span>
          </td>
          <td>区域code</td>
          <td>
            <span>{{ partner.regionCode }}</span>
          </td>
          <td>区域名称</td>
          <td>
            <span>{{ partner.regionName }}</span>
          </td>
        </tr>
        <!-- --------- -->
        <tr>
          <td>租赁场所合同到期日</td>
          <td>
            <span>{{ partner.leaseExpire }}</span>
          </td>
          <td>创建时间</td>
          <td>
            <span>{{ partner.createdTime }}</span>
          </td>
          <td>修改时间</td>
          <td>
            <span>{{ partner.modifideTime }}</span>
          </td>
        </tr>
      </table>
    </div>
    <h2>银行卡信息</h2>
    <el-button type="primary" v-waves icon="el-icon-plus" @click="addCard()"
      >添加银行卡</el-button
    >
    <el-scrollbar>
      <div class="system-list">
        <el-table :data="records" stripe style="width: 100%">
          <!-- <el-table-column prop="partnerNo" label="合作商编号" /> -->
          <el-table-column prop="cardNo" label="银行卡卡号" />
          <el-table-column prop="bankName" label="银行卡开户行" />
          <!-- 卡状态有效无效 -->
          <el-table-column prop="state" label="卡状态" :formatter="cardState" />
          <el-table-column
            prop="createdTime"
            label="创建时间"
            :formatter="dateFormat"
          />
        </el-table>
      </div>
    </el-scrollbar>
    <el-dialog title="添加银行卡" :visible.sync="dialogVisible" width="50%">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="right"
        label-width="260px"
        :inline="true"
      >
        <!-- 新增银行卡内容 -->
        <el-form-item label="银行卡类型">
          <el-input style="width:290px" v-model="temp.cardNo" />
        </el-form-item>
        <el-form-item label="银行卡卡号">
          <el-input style="width:290px" v-model="temp.cardNo" />
        </el-form-item>
        <el-form-item label="银行账户名">
          <el-input style="width:290px" v-model="temp.cardNo" />
        </el-form-item>
        <el-form-item label="银行账户身份证号码">
          <el-input style="width:290px" v-model="temp.cardNo" />
        </el-form-item>
        <el-form-item label="预留手机号码">
          <el-input style="width:290px" v-model="temp.cardNo" />
        </el-form-item>
        <el-form-item label="银行卡开户行">
          <el-input style="width:290px" v-model="temp.cardNo" />
        </el-form-item>
        <el-form-item label="银行卡开户行编号">
          <el-input style="width:290px" v-model="temp.cardNo" />
        </el-form-item>
        <el-form-item label="银行账号开户网点编号">
          <el-input style="width:290px" v-model="temp.cardNo" />
        </el-form-item>
        <el-form-item label="银行账号开户网点名称">
          <el-input style="width:290px" v-model="temp.cardNo" />
        </el-form-item>
        <el-form-item label="银行账号开户行所在省编码">
          <el-input style="width:290px" v-model="temp.cardNo" />
        </el-form-item>
        <el-form-item label="银行账号开户行所在省">
          <el-input style="width:290px" v-model="temp.cardNo" />
        </el-form-item>
        <el-form-item label="银行账号开户行所在市编码">
          <el-input style="width:290px" v-model="temp.cardNo" />
        </el-form-item>
        <el-form-item label="银行账号开户行所在市">
          <el-input style="width:290px" v-model="temp.cardNo" />
        </el-form-item>
        <el-form-item label="银行账号开户行所在市编码">
          <el-input style="width:290px" v-model="temp.cardNo" />
        </el-form-item>
        <el-form-item label="银行账号开户行所在市编码">
          <el-input style="width:290px" v-model="temp.cardNo" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import moment from 'moment'
import {
  partnerCardData,
  unBindData,
  getPartnerDetailData
} from '@/api/partner'

export default {
  name: 'PartnerDetailData',
  directives: {
    waves
  },
  data() {
    return {
      records: [],
      dialogVisible: false,
      partner: {
        partnerNo: '', //合作商编号
        regName: '', //合作商注册名称
        realName: '', //实际营业名称
        isShelves: '', //是否上架
        saleCode: '', //归属BD
        grade: '', //合作商等级
        bizProperty: '', //合作商性质
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
        leaseExpire: '', //租赁场所合同到期日
        createdTime: '', //创建时间
        modifideTime: '', //修改时间
        version: '' //版本
      },
      temp: {
        settle_type: '',
        card_no: ''
      },
      ui: {
        clientContactDialog: {
          visible: false
        },
        loanInfoDialog: {
          visible: false,
          loanType: '',
          type: '',
          client: {},
          loanRecord: {}
        },
        contactList: {
          clientNo: this.$route.query.name
        },
        loanInfoShowDialog: {
          visible: false,
          loanRecord: {}
        }
      }
    }
  },
  mounted: function() {
    this.getPartnerDetail({ partnerNo: this.$route.query.partnerNo })
    this.partnerCardDetail({ partnerNo: this.$route.query.partnerNo })
  },
  computed: {
    haveBank: function() {
      return false
    }
  },

  methods: {
    // 获取合作商信息详情
    getPartnerDetail(val) {
      getPartnerDetailData(val).then(response => {
        if (response.code !== 0) throw response.msg
        this.partner = response.data
      })
    },

    confirm(client) {
      this.$confirm('确认解绑该客户的银行卡吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.unBind(client)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    unBind(client) {
      unBindData(client.clientNo)
        .then(res => {
          if (res.code !== 0) throw res.data.msg
          this.$message({
            message: res.msg,
            type: 'success'
          })
          // this.getInfo(this.$route.query.name)
        })
        .catch(err => {
          this.$message({
            message: '服务器被外星人吃啦-_-!',
            type: 'error'
          })
        })
    },
    goBack() {
      this.$router.push({
        path: '/client/index',
        query: {
          searchType: this.$route.query.searchType,
          searchContent: this.$route.query.searchContent,
          originType: this.$route.query.originType,
          State: this.$route.query.State,
          originIndex: this.$route.query.originIndex,
          page: this.$route.query.page
        }
      })
    },

    partnerCardDetail(val) {
      partnerCardData(val)
        .then(res => {
          if (res.code !== 0) throw res.msg
          this.records = res.data
        })
        .catch(err => {
          this.$message({
            message: '服务器被外星人吃啦-_-!',
            type: 'error'
          })
        })
    },

    continueLoanRecord(client) {
      this.ui.loanInfoDialog = {
        visible: true,
        type: 'ADD',
        loanType: 'CONTINUE',
        client: client,
        loanRecord: {}
      }
    },
    editLoanRecord(record) {
      this.ui.loanInfoDialog = {
        visible: true,
        type: 'EDIT',
        loanType: record.loanType,
        client: this.client,
        loanRecord: record
      }
    },

    loanStatusFormat(row, column) {
      var loanStatus = row[column.property]
      return this.$enumUtils.toMsg('LoanStatusEnum', loanStatus)
    },
    nullFormat(row, column) {
      var param = row[column.property]
      if (param == null || param == '') {
        return ' '
      }
      return param
    },
    // 时间格式
    dateFormatText: function(param) {
      return moment(param).format('YYYY-MM-DD')
    },
    // 日期格式
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD hh:mm:ss')
    },
    // 状态格式
    cardState: function(row, column) {
      var state = row[column.property]
      if (state == undefined) {
        return ''
      }
      return this.$enumUtils.toMsg('cardStateEnmu', state)
    },
    // 添加银行卡
    addCard() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.content-text {
  width: 95%;
  margin: auto;
}

.content-text h2 {
  margin: 45px 0 0.8em;
  padding-bottom: 0.7em;
  border-bottom: 1px solid #ddd;
  color: #47484b;
}

.content-table label {
  font-size: 20px;
  color: #64656f;
}

.content-table table {
  width: 95%;
  border-spacing: 0px 15px;
}

.content-table table th {
  color: #64656f;
  text-align: right;
  font-size: 18px;
}

.content-table table td {
  color: #64656f;
  text-align: left;
  font-size: 18px;
}
</style>
