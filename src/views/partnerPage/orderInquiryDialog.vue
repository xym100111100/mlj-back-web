<template>
  <div>
    <el-dialog
      class="common-dialog"
      :visible.sync="dialogVisible"
      @close="closeDialog"
      fullscreen
    >
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>借款信息</span>
          </div>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">客户姓名</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ clientLoadInfo.bankCardName }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">身份证号码</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">
                {{ clientLoadInfo.bankName }}
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">分期金额</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ clientLoadInfo.bankCardId }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">已返款金额</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">
                {{ clientLoadInfo.bdName }}
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">未返款总额</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">
                {{ clientLoadInfo.debtNo }}
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">应返款总额</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ clientLoadInfo.operationName }}</div>
            </el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>还款计划</span>
          </div>
          <el-table :data="clientLoadInfo.debtPlan">
            <el-table-column prop="planNo" label="计划编号" />
            <el-table-column prop="currentPeriod" label="当前期数" />
            <el-table-column prop="currentDay" label="当前天数" />
            <el-table-column label="本金">
              <template slot-scope="{ row }">
                <span>{{ row.periodAmt / 100 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="利息">
              <template slot-scope="{ row }">
                <span>{{ row.interestAmt / 100 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="overdueAmt" label="罚息金额">
              <template slot-scope="{ row }">
                <span>{{ row.overdueAmt / 100 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="服务费金额">
              <template slot-scope="{ row }">
                <span>{{ row.serviceFeeAmt / 100 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="repayDate" label="实际还款日期" />
            <el-table-column prop="startDate" label="还款开始日期" />
            <el-table-column prop="endDate" label="还款结束日期" />
            <el-table-column label="还款状态">
              <template slot-scope="{ row }">
                <span>{{ debtStatusEnumFormat(row.repayState) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRepaymentData, confirmRepayData } from '@/api/repay'

export default {
  name: 'LoanInfoDialog',
  props: {},
  data() {
    return {
      dialogVisible: true,
      clientLoadInfo: {
        debtPlan: [], //还款计划
        //借款信息
        bankCardName: '', //银行账户姓名
        bankName: '', //银行账号开户网点名称
        bankCardId: '', //还款银行卡号
        bdName: '', //对应BD
        debtNo: '', //借款编号
        operationName: '', //申请项目、可能是个多个
        debtAmt: '', //借款金额
        debtLimit: '', //借款期数
        debtInterest: '', //借款利率
        startDate: '', //起息日
        endDate: '', //截止日
        clientName: ''
      }
    }
  },
  created() {
    this.getRepayment()
  },
  methods: {
    getRepayment() {
      getRepaymentData({ debtNo: this.$route.query.debtNo }).then(res => {
        if (res.code === 0) {
          this.clientLoadInfo = res.data
        }
      })
    },
    closeDialog() {
      window.close()
    },

    confirmRepayment(val) {
      console.log(val.repayState)
      this.$confirm('确认还款已到账？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          confirmRepayData({ planNo: val.planNo }).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              // 重新刷新接界面
              this.getRepayment()
            }
          })
        })
        .catch(err => err)
    },
    debtStatusEnumFormat: function(val) {
      return this.$enumUtils.toMsg('repaymentStatusEnum', val)
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
  font-size: 13px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
  font-weight: 700;
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}

.el-row {
}
.el-col {
}

.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  height: 42px;
  line-height: 42px;
  padding-left: 10px;
  overflow: hidden;
  font-size: 13px;
}
.text-right {
  text-align: right;
}
.text-left {
  text-align: left;
}
.row-bg {
  background-color: #f9fafc;
}

.img-box {
  text-align: center;
  max-height: 387px;
}
.el-image {
  border: solid 1px #dcd9d9;
  height: 230px;
  width: 230px;
}

.el-icon-circle-close {
  color: white;
}
</style>
