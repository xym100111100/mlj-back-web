<template>
  <div>
    <el-dialog
      class="common-dialog"
      title="借款详情"
      :visible.sync="dialogStatus.dialogVisible"
      width="90%"
    >
      <div style="height:700px;overflow-y: scroll;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>客户信息</span>
          </div>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">姓名</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.realName }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">手机号码</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.cell }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">身份证号码</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.certNo }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">学历</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">
                {{ educationCodeFormat(basicsInfo.educationCode) }}
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">婚姻状况</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">
                {{ maritalCodeFormat(basicsInfo.maritalCode) }}
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">工作地址</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.workAddress }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">工作行业</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">
                {{ basicsInfo.workIndustryCode }}
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">工作城市</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.workCityName }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">公司全称</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.firmName }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">居住城市</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.liveCityName }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">居住地址</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.addressDetail }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">微信</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.wechatNo }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">户籍地</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="basicsInfo.idCardAddress"
                  placement="top-start"
                >
                  <el-button type="text">{{
                    basicsInfo.idCardAddress
                  }}</el-button>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">对应BD</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.salesmanName }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">收入</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">
                {{ basicsInfo.familyMonthlyIncome }}
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">紧急联系人姓名</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.contactsName }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">紧急联系人关系</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.kinship }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">紧急联系人电话</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.contactsCell }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">通讯录</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">
                <el-button @click="showContacts" type="text"
                  >点击查看</el-button
                >
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content"></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content"></div>
            </el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>合作商收款信息</span>
          </div>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">合作商名称</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ loanInfo.partnerName }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">收款人</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ loanInfo.partnerCardName }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">开户行</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ loanInfo.partnerBankName }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">收款账号</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ loanInfo.loanCardId }}</div>
            </el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>还款卡信息</span>
          </div>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">还款人</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ loanInfo.clienCardName }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">开户行</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ loanInfo.clientBankName }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">还款卡卡号</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ loanInfo.bankCardId }}</div>
            </el-col>
          </el-row>
        </el-card>

        <!-- <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>人脸信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12" v-for="(item, index) in faceList" :key="index">
              <div class="img-box">
                <div>
                  <span class="demonstration">{{ item.name }}</span>
                </div>
                <el-image
                  :src="item.path"
                  :preview-src-list="(list = faceList.map(item => item.path))"
                ></el-image>
              </div>
            </el-col>
          </el-row>
        </el-card> -->

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>授信附件信息</span>
          </div>
          <el-row :gutter="20">
            <el-col
              :span="8"
              v-for="(item, index) in creditAppendixInfo"
              :key="index"
            >
              <div class="img-box">
                <div>
                  <span class="demonstration">{{ item.name }}</span>
                </div>
                <el-image
                  :src="item.path"
                  :preview-src-list="
                    (list = creditAppendixInfo.map(item => item.path))
                  "
                ></el-image>
              </div>
            </el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>补充附件信息</span>
          </div>
          <el-row :gutter="20">
            <el-col
              :span="8"
              v-for="(item, index) in clientAppendixInfo"
              :key="index"
            >
              <div class="img-box">
                <div>
                  <span class="demonstration">{{ item.name }}</span>
                </div>
                <el-image
                  :src="item.path"
                  :preview-src-list="
                    (list = clientAppendixInfo.map(item => item.path))
                  "
                ></el-image>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getClinetBasicsInfoData,
  getAppendixData,
  getOperationData,
  getApprovalResultData,
  modifyRecordData
} from '@/api/credit'
import { getClientCardData } from '@/api/client'
import { getPartnerCardData } from '@/api/partner'
import { getDebtInfoData } from '@/api/loan'

export default {
  name: 'LoanInfoDialog',
  props: {
    dialogStatus: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      clientRealAuthInfo: [
        //客户身份信息
      ],
      faceList: [
        //人脸信息
      ],
      creditAppendixInfo: [
        //授信附件信息
      ],
      clientAppendixInfo: [
        //补充附件信息
      ],
      basicsInfo: {
        createdTime: '', //创建时间、申请时间
        creditType: '', //授信类型
        state: '', //状态
        realName: '', //客户姓名
        cell: '', //手机号码
        certNo: '', //身份证号
        educationCode: '', //学历
        maritalCode: '', //婚姻状况
        age: '', //年龄
        liveCityName: '', //居住省份/城市
        addressDetail: '', //居住详细地址
        firmName: '', //公司名称
        workCityName: '', //工作省份/城市
        workAddress: '', //工作详细地址
        wechatNo: '', //微信
        idCardAddress: '', //户籍地
        salesmanName: '', //bd名称
        contactsName: '', //紧急联系人名字
        kinship: '', //与客户关系
        contactsCell: '', //紧急联系人电话
        isSupplement: '', //是否需要补充材料
        familyMonthlyIncome: '', //收入、月收入
        workIndustryCode: '', //工作行业
        latitude: '', //维度
        longitude: '', //经度
        GPS: ''
      },
      operationInfo: {
        //项目信息
        debtNo: '', //借款编号
        applyTime: '', //申请时间
        state: '', //借款状态
        regName: '', //医院名称/合作商名称
        debtAmt: '', //借款金额
        debtLimit: '', //借款期限
        operationName: '', //申请项目、可能是个多个
        repayType: '' //还款方式
      },
      partnerCardInfo: {
        //合作商信息
        partnerName: '', //合作商名称
        linkerName: '', //合作商联系人
        bankName: '', //开户行
        cardNo: '' //银行卡卡号
      },
      backCardInfo: {
        //还款卡信息
        realName: '', //客户名字
        bankName: '', //开户行
        cardNo: '' //银行卡卡号
      },
      loanInfo: {
        loanCardId: '', //放款卡银行卡卡号
        partnerCardName: '', //放款卡账户名字
        partnerBankName: '', //放款卡银行名字
        bankCardId: '', //还款卡卡号
        clientBankName: '', //还款卡银行名字
        clienCardName: '', //还款卡账户名字
        partnerName: '', //合作商名称
        operationName: [], //手术项目名称
        state: '', //借款状态
        debtAmt: '', //借款金额
        debtLimit: '', //借款期数
        repayType: '', //还款方式
        debtNo: '', //借款编号
        debtDate: '' //借款时间
      }
    }
  },
  created() {
    console.log(this.dialogStatus.clientNo)
    console.log(this.dialogStatus.debtNo)
    // 获取基础信息
    getClinetBasicsInfoData({
      clientNo: this.dialogStatus.clientNo
    }).then(res => {
      this.basicsInfo = res.data
    })

    // 获取借款方式
    getDebtInfoData({ debtNo: this.dialogStatus.debtNo }).then(res => {
      this.loanInfo = res.data
    })

    // 获取授信附件
    getAppendixData({
      clientNo: this.dialogStatus.clientNo,
      debtNo: this.dialogStatus.debtNo
    }).then(res => {
      this.clientRealAuthInfo = res.data.clientRealAuthInfo
      this.creditAppendixInfo = res.data.creditAppendixInfo
      this.clientAppendixInfo = res.data.clientAppendixInfo
    })
  },
  methods: {
    maritalCodeFormat: function(val) {
      return this.$enumUtils.toMsg('maritalCodeEnmu', val)
    },
    educationCodeFormat: function(val) {
      return this.$enumUtils.toMsg('educationCodeEnmu', val)
    },
    // 还款方式
    backedModeFormat: function(val) {
      return this.$enumUtils.toMsg('BackedModeEnum', val)
    },
    birthdayFormatToAge: function(val) {
      if (val) {
        let birthdayGetTime = new Date(val).getFullYear()
        let nowDateGetTime = new Date().getFullYear()

        return nowDateGetTime - birthdayGetTime
      }
    },
    workIndustryCodeFormat: function(val) {
      return this.$enumUtils.toMsg('industryEnmu', val)
    },

    clientDebtStateFormat: function(val) {
      return this.$enumUtils.toMsg('DebtStatusEnum', val)
    },

    showContacts() {
      const { href } = this.$router.resolve({
        path: '/loan/linkersDialog?clientNo=' + this.dialogStatus.clientNo
      })
      window.open(href)
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
