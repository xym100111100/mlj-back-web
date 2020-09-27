<template>
  <el-dialog
    class="common-dialog"
    title="借条详情"
    :visible.sync="dialogVisible"
    width="75%"
    :before-close="handleClose"
  >
    <div class="content-table">
      <table>
        <tr>
          <th>负债编号：</th>
          <td>{{ loanRecord.debtNo }}</td>
          <th>负债类型 ：</th>
          <td>
            {{ this.$enumUtils.toMsg('DebtTypeEnmu', loanRecord.debtType) }}
          </td>
          <th>负债状态：</th>
          <td>
            {{ this.$enumUtils.toMsg('DebtStatusEnum', loanRecord.state) }}
          </td>
        </tr>

        <tr>
          <th>客户姓名：</th>
          <td>{{ loanRecord.clientName }}</td>
          <th>证件号码：</th>
          <td>{{ loanRecord.cardCertNo }}</td>
          <th>手机号码：</th>
          <td>{{ loanRecord.cell }}</td>
        </tr>
        <!-- 银行卡判断-空就不显示 -->
        <tr>
          <th>银行名称：</th>
          <td>
            <span>
              {{ loanRecord.bankName }}
            </span>
          </td>
          <th>银行卡号：</th>
          <td>
            <span>
              {{ loanRecord.bankCardId }}
            </span>
          </td>
        </tr>
        <tr>
          <th>开户行：</th>
          <td colspan="3">
            <span>
              {{ loanRecord.openSubBankName }}
            </span>
          </td>
        </tr>

        <tr>
          <th>合同金额：</th>
          <td>{{ loanRecord.debtAmt }} 元</td>
          <th>放款金额：</th>
          <td>{{ loanRecord.debtAmt }} 元</td>
          <th>利息/服务费：</th>
          <td>
            {{ loanRecord.debtInterest }}% /
            {{ loanRecord.serviceFeeAmt / 100 }} 元
          </td>
        </tr>

        <tr>
          <th>借款日：</th>
          <td>{{ dateFormatText(loanRecord.startDate) }}</td>
          <th>还款日：</th>
          <td>{{ dateFormatText(loanRecord.endDate) }}</td>
          <th>借款周期：</th>
          <td>
            {{ loanRecord.debtLimit }}
            {{ limitTypeFormat(loanRecord.limitType) }}
          </td>
        </tr>

        <tr></tr>
        <tr>
          <th>扣款银行卡卡号：</th>
          <td>
            {{ loanRecord.bankCardId }}
          </td>
        </tr>
        <tr v-if="ImagesObj.clientRealAuthImage !== null">
          <th>客户资料：</th>
          <td colspan="5">
            <template v-for="userAttach in ImagesObj.clientRealAuthImage">
              <a :href="userAttach" target="_blank">
                <img :src="userAttach" width="150px" height="200px" />
              </a>
            </template>
          </td>
        </tr>

        <tr v-if="ImagesObj.creditDetailImage !== null">
          <th>授信资料：</th>
          <td colspan="5" id="loanImg">
            <template v-for="loanAttach in ImagesObj.creditDetailImage">
              <a :href="loanAttach" target="_blank">
                <img :src="loanAttach" width="150px" height="200px" />
              </a>
            </template>
          </td>
        </tr>
        <tr v-if="certificateInfo.length !== 0">
          <th>手术资料：</th>
          <td colspan="5" id="loanImg">
            <template v-for="loanAttach in ImagesObj.certificateInfo">
              <a :href="loanAttach.attachUrl" target="_blank">
                <img :src="loanAttach.attachUrl" width="150px" height="200px" />
              </a>
            </template>
          </td>
        </tr>
      </table>
    </div>

    <div slot="footer">
      <el-button type="primary" @click="handleClose">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">

import  moment from "moment";
import {getAllImagesData} from '@/api/loan'
export default {
  name: "LoanInfoShowDialog",
  props: {
    dialogVisible: {
      type: Boolean
    },
    loanRecord: {
      type: Object
    }
  },
  data() {
    return {
      ImagesObj:{},
      certificateInfo:[]
    }
  },
  created: function () {
    this.getAllImages({debtNo:this.loanRecord.debtNo,clientNo:this.loanRecord.clientNo});
  },
  methods: {
    // 获取客户的资料图片
    getAllImages(val){
        getAllImagesData(val).then(response => {
           console.log(response);
        if (response.code !== 0) throw response.msg
        this.ImagesObj = response.data
        this.certificateInfo = response.data.certificateInfo
      })
    },

    /** 关闭处理 */
    handleClose() {
      this.visible = false;
      setTimeout(() => {
        this.$emit('update:dialogVisible', false)
      }, 100);
    },
    // 字段日期格式
    dateFormatText: function (param) {
      return moment(param).format("YYYY-MM-DD");
    },
    // 期限类型
    limitTypeFormat: function(val) {
      return this.$enumUtils.toMsg('debtLimitEnmu', val)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

.common-dialog {
  .input {
    width 80%
    margin auto
  }
}

.content-text {
  width: 95%;
  margin: auto;
}

.content-text h2 {
  margin: 10px 0 0.8em;
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
#clientImg{
  display :flex;
  justify-content :space-around
}
</style>
