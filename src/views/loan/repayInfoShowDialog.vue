<template>
  <el-dialog
    class="common-dialog"
    style="font-size: 25px"
    :title="title"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose"
  >
    <h2>借款信息</h2>
    <div class="content-table">
      <table>
        <tr>
          <th>借条编号：</th>
          <td>{{ loanRecord.loanNo }}</td>
        </tr>
        <tr>
          <th>出借人：</th>
          <td>{{ lendCardBean.ownerName }}</td>
        </tr>
        <tr>
          <th>客户名字 ：</th>
          <td>{{ clientBean.clientName }}</td>
          <th>证件号码：</th>
          <td>{{ clientBean.certNo }}</td>
          <th>手机号：</th>
          <td>{{ clientBean.clientCell }}</td>
        </tr>

        <tr>
          <th>合同金额：</th>
          <td>{{ loanRecord.loanAmt }} 元</td>
          <th>放款金额：</th>
          <td>{{ loanRecord.backAmt }} 元</td>
          <th>利息/服务费：</th>
          <td>
            {{ loanRecord.rateAmt * 100 }}% / {{ loanRecord.serviceAmt }} 元
          </td>
        </tr>
        <tr>
          <th>借款周期：</th>
          <td>{{ loanRecord.loanLife }} 天</td>
        </tr>

        <tr v-if="isOverdue">
          <th>案件编号：</th>
          <td>{{ loanCollect.collNo }}</td>
          <th>逾期天数：</th>
          <td>
            <span class="important_text">{{ loanCollect.overdueDays }}</span>
            天
          </td>
        </tr>
        <tr v-if="isOverdue">
          <th>催回本金：</th>
          <td>
            <span class="important_text">{{ loanCollect.periodAmt }}</span>
          </td>
          <th>催回罚息：</th>
          <td>
            <span class="important_text">{{ loanCollect.overdueAmt }}</span>
            /{{ loanCollect.remainAmt }}
          </td>
        </tr>
        <tr v-if="isOverdue">
          <th>违约责任：</th>
          <td colspan="5">{{ loanExtBean.dutyDesc }}</td>
        </tr>
        <tr>
          <th>备注：</th>
          <td colspan="5">{{ loanRecord.memo }}</td>
        </tr>

        <tr>
          <td colspan="6">
            <h2 style="font-size: 21px">还款信息</h2>
          </td>
        </tr>

        <tr>
          <th>还款编号：</th>
          <td>{{ repayBacked.backedNo }}</td>
        </tr>

        <tr>
          <th>还款方式：</th>
          <td>
            {{
              this.$enumUtils.toMsg(
                'BackedTransferTypeEnum',
                repayBacked.repayTtype
              )
            }}
          </td>
          <th>还款类别：</th>
          <td>
            {{
              this.$enumUtils.toMsg('BackedTypeEnum', repayBacked.backedType)
            }}
          </td>
          <th>还款状态：</th>
          <td>
            <span class="important_text">
              {{
                this.$enumUtils.toMsg('BackedStatusEnum', repayBacked.status)
              }}
            </span>
          </td>
        </tr>
        <tr>
          <th>还款金额：</th>
          <td>
            <span class="important_text">{{ repayBacked.repayAmt }}</span> 元
          </td>
          <th>还款时间：</th>
          <td>{{ repayBacked.repayDate }}</td>
          <th>是否签约：</th>
          <td>
            <span
              v-if="isCardSign"
              style="font-weight: bold;color: #ffa23b;font-size: 20px;"
              >签约成功</span
            >
            <span
              v-if="!isCardSign"
              style="font-weight: bold;color: #ff150c;font-size: 20px;"
              >未签约</span
            >
          </td>
        </tr>
        <tr>
          <th>回款账户：</th>
          <td>{{ repayBacked.bankOwner }}</td>
          <th>回款银行卡 ：</th>
          <td>{{ repayBacked.bankAccount }}</td>
        </tr>

        <tr>
          <td colspan="6">
            <h2 style="font-size: 21px">借款资料</h2>
          </td>
        </tr>
        <tr>
          <th>客户资料：</th>
          <td colspan="5">
            <template v-for="userAttach in userAttachs">
              <a :href="userAttach.attachUrl" target="_blank">
                <img :src="userAttach.attachUrl" width="150px" height="200px" />
              </a>
            </template>
          </td>
        </tr>
        <tr>
          <th>借款资料：</th>
          <td colspan="5">
            <template v-for="loanAttach in loanAttachs">
              <a :href="loanAttach.attachUrl" target="_blank">
                <img :src="loanAttach.attachUrl" width="150px" height="200px" />
              </a>
            </template>
          </td>
        </tr>
        <tr>
          <th>还款凭证：</th>
          <td colspan="5">
            <template v-for="backAttach in backAttachs">
              <a :href="backAttach.attachPath" target="_blank">
                <img :src="backAttach.attachUrl" width="150px" height="200px" />
              </a>
            </template>
          </td>
        </tr>
      </table>
    </div>

    <h2>操作意见</h2>
    <el-input type="textarea" v-model="memo"></el-input>

    <div slot="footer">
      <el-button type="danger" @click="handleClose">关 闭</el-button>
      <el-button type="primary" @click="reject">驳 回</el-button>
      <el-button type="primary" @click="submitClick">确认到账</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import * as moment from 'moment'
// import userCardSignComp from "../common/UserCardSignComp"
import { loanRecordData, BackedInfoData, loanCollectData } from '@/api/overdue'
export default {
  name: 'LoanRaiseDialog',
  components: {
    // 'userCardSignComp': userCardSignComp
  },
  props: {
    dialogVisible: {
      type: Boolean
    },
    modelType: {
      type: String
    },
    type: {
      type: String
    },
    loanNo: {
      type: String
    },
    backedNo: {
      type: String
    },
    backedType: {
      type: String
    },
    repayAmt: {
      type: Number
    }
  },
  data() {
    return {
      isOpen: true,
      isCardSign: false,
      rejectUrl: '',
      confirmUrl: '',
      title: '还款单-逾期还款',
      isOverdue: false,
      // isOverdue: true,
      loanRecord: {},
      lendCardBean: {},
      clientBean: {},
      repayBacked: {},
      loanExtBean: {},
      loanCollect: {},
      userAttachs: [],
      loanAttachs: [],
      backAttachs: [],
      memo: ''
    }
  },

  mounted() {
    // if (this.modelType == 'SHOW') {
    //   this.isOpen = false;
    // }

    this.getloanRecord()
    this.getBackedInfoList()

    // if (this.type == 'REMIND') {
    //   this.title = '还款单-提醒还款'
    //   this.rejectUrl = '/loanBacked/remindRefuse'
    //   this.confirmUrl = '/loanBacked/remindConfirm'
    // } else if (this.type == 'COLLECT') {
    //   this.title = "还款单-逾期还款"
    //   this.isOverdue = true;
    //   this.rejectUrl = '/loanBacked/collectRefuse'
    //   this.confirmUrl = '/loanBacked/collectConfirm'
    //   this.getloanCollect()
    // }
  },
  methods: {
    // 获取借款信息
    getloanRecord(val) {
      loanRecordData(val)
        .then(res => {
          if (res.code !== 0) throw res.msg
          this.loanRecord = res.data
          this.lendCardBean = this.loanRecord.lendCardBean
          this.clientBean = this.loanRecord.clientBean

          for (var i in this.loanRecord.userAttachList) {
            this.userAttachs[this.userAttachs.length] = {
              attachUrl: this.loanRecord.userAttachList[i].attachUrl
            }
          }
          for (var i in this.loanRecord.loanAttachList) {
            this.loanAttachs[this.loanAttachs.length] = {
              attachUrl: this.loanRecord.loanAttachList[i].attachUrl
            }
          }
          for (var i in this.loanRecord.raiseAttachList) {
            this.loanAttachs[this.loanAttachs.length] = {
              attachUrl: this.loanRecord.raiseAttachList[i].attachUrl
            }
          }

          this.$refs.c1.searchCardSign(this.clientBean.clientNo)
        })
        .catch(err => err)
    },
    // 还款信息
    getBackedInfoList(val) {
      BackedInfoData(val)
        .then(res => {
           console.log('222');
          if (res.code !== 0) throw res.msg
          this.repayBacked = res.data
          console.log(this.repayBacked);

          for (var i in this.repayBacked.backAttachList) {
            this.backAttachs[this.backAttachs.length] = {
              attachUrl: this.repayBacked.backAttachList[i].attachUrl
            }
          }

           if (res.data.backedTime == 'Invalid date') {
            this.repayBacked.repayDate = moment(res.data.backedDate).format(
              'YYYY-MM-DD'
            )
          } else {
            this.repayBacked.repayDate =
              moment(res.data.backedDate).format('YYYY-MM-DD') +
              ' ' +
              res.data.backedTime
          }

          setTimeout(() => {
            this.checkSingCard()
          }, 1000)
        })
        .catch(err => err)
    },

    getloanCollect(val) {
      loanCollectData(val)
        .then(res => {
          if (res.code !== 1) throw res.msg
          this.loanCollect = res.data
          this.loanExtBean = this.loanCollect.loanBean.loanExtBean
        })
        .catch(err => err)
    },

    checkSingCard() {
      this.isCardSign = this.$refs.c1.getCardSign(this.clientBean.clientNo)
    },
    reject() {
      this.$$post(this.rejectUrl, this.buildParam()).then(res => {
        if (res.data.code < 1) {
          this.$message.error(res.data.msg)
          return
        }
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.handleClose()
      })
    },
    submitClick() {
      // 还款确认
      this.$$post(this.confirmUrl, this.buildParam())
        .then(res => {
          if (res.data.code < 1) throw res.data.msg
          this.$$msg.suc(res.data.msg)
          this.handleClose()
        })
        .catch(err => this.$$msg.err(err))
    },
    /** 关闭处理 */
    handleClose() {
      this.visible = false
      setTimeout(() => {
        this.$emit('update:dialogVisible', false)
        this.$emit('refreshList')
      }, 100)
    },
    buildParam() {
      return {
        backedNo: this.backedNo,
        memo: this.memo
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.client-contact-dialog {
  .input {
    width: 60% margin auto;
  }
}

h2 {
  margin: 0px 0 0.3em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #ddd;
  color: #47484b;
}

.content-text {
  width: 95%;
  margin: auto;
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
