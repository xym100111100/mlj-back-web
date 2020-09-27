<template>
  <div class="content-text">
    <h2>负债信息</h2>
    <div class="content-table">
      <table id="content">
        <!-- --- -->
        <tr>
          <th>客户编号：</th>
          <td>
            <span>
              {{ debtClient.clientNo }}
            </span>
          </td>
          <th>客户名称：</th>
          <td>
            <span>
              {{ debtClient.clientName }}
            </span>
          </td>
          <th>负债账户编号：</th>
          <td>
            <span>
              {{ debtClient.accNo }}
            </span>
          </td>
        </tr>
        <!-- --- -->
        <tr>
          <th>负债账户状态：</th>
          <td>
            <span>
              {{ debtClient.state }}
            </span>
          </td>
          <th>负债金额：</th>
          <td>
            <span>
              {{ debtClient.debtAmt }}
            </span>
          </td>
          <th>冻结金额：</th>
          <td>
            <span>
              {{ debtClient.frozenAmt }}
            </span>
          </td>
        </tr>
        <!-- --- -->
        <tr>
          <th>创建时间：</th>
          <td>
            <span>
              {{ debtClient.createdTime }}
            </span>
          </td>
          <th>修改时间：</th>
          <td>
            <span>
              {{ debtClient.modifiedTime }}
            </span>
          </td>
        </tr>
        <!-- --- -->
        <tr>
          <th>负债编号：</th>
          <td>
            <span>
              {{ debtClient.debtNo }}
            </span>
          </td>
          <th>负债状态：</th>
          <td>
            <span>
              {{ debtClient.debtState }}
            </span>
          </td>
        </tr>

        <!-- --- -->
        <tr>
          <th>提醒状态：</th>
          <td>
            <span>
              {{ debtClient.remindState }}
            </span>
          </td>
          <th>合作商名称：</th>
          <td>
            <span>
              {{ debtClient.partnerName }}
            </span>
          </td>
          <th>产品类型：</th>
          <td>
            <span>
              {{ debtClient.productType }}
            </span>
          </td>
        </tr>

        <!-- --- -->
        <tr>
          <th>借款金额：</th>
          <td>
            <span>
              {{ debtClient.debtAmt }}
            </span>
          </td>
          <th>已还款金额：</th>
          <td>
            <span>
              {{ debtClient.repayAmt }}
            </span>
          </td>
          <th>借款利率百分比：</th>
          <td>
            <span>
              {{ debtClient.debtInterest }}
            </span>
          </td>
        </tr>

        <!-- --- -->
        <tr>
          <th>借款期限：</th>
          <td>
            <span>
              {{ debtClient.debtLimit }}
            </span>
          </td>
          <th>借款用途：</th>
          <td>
            <span>
              {{ debtClient.debtPurpose }}
            </span>
          </td>
          <th>服务费金额：</th>
          <td>
            <span>
              {{ debtClient.serviceFeeAmt }}
            </span>
          </td>
        </tr>

        <!-- --- -->
        <tr>
          <th>保证金总额：</th>
          <td>
            <span>
              {{ debtClient.depositTotal }}
            </span>
          </td>
          <th>首月还款金额：</th>
          <td>
            <span>
              {{ debtClient.firstMonthRepayAmt }}
            </span>
          </td>
        </tr>

        <!-- --- -->
        <tr>
          <th>还款方式：</th>
          <td>
            <span>
              {{ debtClient.repayType }}
            </span>
          </td>
          <th>申请时间：</th>
          <td>
            <span>
              {{ debtClient.applyTime }}
            </span>
          </td>
        </tr>

        <!-- --- -->
        <tr>
          <th>确认时间：</th>
          <td>
            <span>
              {{ debtClient.verifyTime }}
            </span>
          </td>
          <th>签约时间：</th>
          <td>
            <span>
              {{ debtClient.contractTime }}
            </span>
          </td>
          <th>代扣状态：</th>
          <td>
            <span>
              {{ debtClient.withholdState }}
            </span>
          </td>
        </tr>

        <!-- --- -->
        <tr>
          <th>期限类型：</th>
          <td>
            <span>
              {{ debtClient.limitType }}
            </span>
          </td>
          <th>期限单位：</th>
          <td>
            <span>
              {{ debtClient.limitUnit }}
            </span>
          </td>
          <th>放款日期：</th>
          <td>
            <span>
              {{ debtClient.debtDate }}
            </span>
          </td>
        </tr>

        <!-- --- -->
        <tr>
          <th>开始日期：</th>
          <td>
            <span>
              {{ debtClient.startDate }}
            </span>
          </td>
          <th>截止日期：</th>
          <td>
            <span>
              {{ debtClient.endDate }}
            </span>
          </td>
          <th>放款银行卡卡号：</th>
          <td>
            <span>
              {{ debtClient.loanCardId }}
            </span>
          </td>
        </tr>
        <!-- --- -->
        <tr>
          <th>扣款银行卡卡号：</th>
          <td>
            <span>
              {{ debtClient.bankCardId }}
            </span>
          </td>
          <th>创建时间：</th>
          <td>
            <span>
              {{ debtClient.createdTime }}
            </span>
          </td>
          <th>修改时间：</th>
          <td>
            <span>
              {{ debtClient.modifiedTime }}
            </span>
          </td>
        </tr>
        <!-- --- -->
        <tr>
          <th>手术项目名称：</th>
          <td>
            <span>
              {{ debtClient.operationName }}
            </span>
          </td>
        </tr>
      </table>

      <div class="btn">
        <el-button @click="$router.go(-1)" type="primary">返回</el-button>
      </div>
    </div>

    <h2>还款计划</h2>
    <el-scrollbar>
      <div class="system-list">
        <el-table :data="records" stripe style="width: 100%">
          <el-table-column prop="planNo" label="计划编号" />
          <el-table-column prop="currentPeriod" label="当前期数" />
          <el-table-column prop="currentDay" label="当前天数" />
          <el-table-column prop="repayState" label="还款状态" />
          <el-table-column prop="periodAmt" label="本金" />
          <el-table-column prop="interestAmt" label="利息" />
          <el-table-column prop="overdueAmt" label="罚息金额" />
          <el-table-column prop="serviceFeeAmt" label="服务费金额" />
          <el-table-column prop="repayDate" label="实际还款日期" />
          <el-table-column prop="startDate" label="还款开始日期" />
          <el-table-column prop="endDate" label="还款结束日期" />
          <el-table-column prop="totalPeriod" label="总期数" />
          <el-table-column prop="createdTime" label="创建时间" />
          <el-table-column prop="memo" label="备注" />
        </el-table>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import loanInfoDialog from '../loan/LoanInfoDialog'
import moment from 'moment'
import loanInfoShowDialog from './loanInfoShowDialog'
import {
  getInfoData,
  getLoadDebtPlanData
} from '@/api/loan'

export default {
  name: 'InfoDetail',
  components: {
    loanInfoDialog,
    loanInfoShowDialog
  },
  data() {
    return {
      records: [],
      debtClient: {
        clientNo: '', //客户编号
        clientName: '', //客户名称
        accNo: '', //负债账户编号
        state: '', //负债账户状态
        debtAmt: '', //负债金额
        frozenAmt: '', //冻结金额
        createdTime: '', //创建时间
        modifiedTime: '', //修改时间
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
    getInfoData({ debtNo: this.$route.query.debtNo }).then(res => {
      if (res.code !== 0) throw res.msg
      // 手术项目是个数组，将其转为字符串
      res.data.operationName = res.data.operationName.join(',')
      this.debtClient = res.data
    })

    getLoadDebtPlanData({ debtNo: this.$route.query.debtNo }).then(res=>{
         if (res.code !== 0) throw res.msg
         if(res.data  && res.data.records){
            this.records = res.data.records
         }
     
    })
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
