<template>
  <div class="content-text">
    <h2>逾期信息</h2>
    <div class="content-table">
      <table id="content">
        <!-- 1行 -->
        <tr>
          <th>逾期编号：</th>
          <td>
            <span >
              {{ debtClient.debtNo }}
            </span>
          </td>
          <th>客户姓名：</th>
          <td>
            <span >
              {{ this.$route.query.clientName }}
            </span>
          </td>
          <th>产品类型：</th>
          <td>
            <span>
              {{ debtClient.productType }}
            </span>
          </td>
        </tr>


        <tr>
          <th>已还款金额：</th>
          <td>
            <span>{{ debtClient.repayAmt }}</span>
          </td>
          <th>逾期罚息金额：</th>
          <td>
            <span>{{ debtClient.overdueAmt }}</span>
          </td>
          <th>逾期罚息比例百分比：</th>
          <td>
            <span>{{ debtClient.overdueRate * 100 }}%</span>
          </td>
        </tr>
        <!-- 4行 -->
        <tr>
          <th>期限类型：</th>
          <td>
            <span>{{ debtLimitTypeFormat(debtClient.limitType) }}</span>
            <!-- 期限类型(D-日，M-月，Y-年) -->
          </td>
          <th>借款期限：</th>
          <td>{{ debtClient.debtLimit }}</td>

          <th>期限单位：</th>
          <td>{{ debtLimitTypeFormat(debtClient.limitUnit) }}</td>
        </tr>
        <!-- 6行 -->
        <tr>
          <th>还款方式：</th>
          <td colspan="3">{{ repayTypeFormat(debtClient.repayType) }}</td>
        </tr>

        <!-- 7行 -->

        <tr>
          <th>开始日期：</th>
          <td>{{ debtClient.startDate }}</td>
          <th>工作详细地址：</th>
          <td>{{ debtClient.workAddress }}</td>
        </tr>
        <!-- 10行 -->
        <tr>
          <th>备注：</th>
          <td>{{ debtClient.memo }}</td>
        </tr>
      </table>

      <div class="btn">
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment'

import { getInfoData, repayDetailData } from '@/api/overdue'
import { getClientLoanDetailsData } from '@/api/loan'
export default {
  name: 'InfoDetail',

  data() {
    return {
     debtClient: {
        clientNo: '', //客户编号
        clientName: '', //客户名称
        accNo: '', //负债账户编号
        state: '', //负债账户状态
        debtAmt: '', //负债金额
        frozenAmt: '', //冻结金额
        createdTime: '', //创建时间
        modifiedTime: '', //修改时间
        monthlyRepay: '', //当月还款金额
        monthlyRepaymentTime: '', //当月账单截止时间
        debtNo: '', //负债编号
        debtState: '', //负债状态
        remindState: '', //提醒状态
        partnerName: '', // 合作商名称
        operationNo: '', //手术项目编号
        operationName: '', //手术项目名称
        productType: '', //产品类型
        debtAmt: '', //借款金额
        repayAmt: '', //已还款金额
        debtInterest: '', //借款利率百分比
        debtLimit: '', //借款期限
        debtPurpose: '', //借款用途
        serviceFeeAmt: '', //服务费金额
        overdueAmt: '', //逾期罚息金额
        depositTotal: '', //保证金总额
        firstMonthRepayAmt: '', //首月还款金额
        overdueRate: '', //逾期罚息比例百分比
        repayType: '', //还款方式
        applyTime: '', //申请时间
        verifyTime: '', //确认时间
        contractTime: '', //签约时间
        withholdState: '', //代扣状态
        limitType: '', //期限类型
        limitUnit: '', //期限单位
        debtDate: '', //放款日期
        startDate: '', //开始日期
        endDate: '', //截止日期
        loanCardId: '', //放款银行卡卡号
        bankCardId: '', //扣款银行卡卡号
        createdTime: '', //创建时间
        modifiedTime: '' //修改时间
      }
    }
  },
  created() {
    getClientLoanDetailsData({ debtNo: this.$route.query.debtNo }).then(res => {
      console.log(res)
      this.debtClient = res.data
    })
  },
  methods: {
    debtTypeFormat: function(val) {
      return this.$enumUtils.toMsg('DebtTypeEnmu', val)
    },
    // 负债状态格式
    debtStateFormat: function(val) {
      return this.$enumUtils.toMsg('DebtStateEnmu', val)
    },
    // 期限类型
    debtLimitTypeFormat: function(val) {
      return this.$enumUtils.toMsg('debtLimitEnmu', val)
    },
    //
    repayTypeFormat: function(val) {
      return this.$enumUtils.toMsg('BackedModeEnum', val)
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
