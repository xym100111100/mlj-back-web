<template>
  <div>
    <el-dialog
      class="common-dialog"
      title="借款详情"
      :visible.sync="dialogStatus.dialogVisible"
      width="1350px"
    >
      <div style="height:700px;overflow-y: scroll;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>项目信息</span>
          </div>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">借款编号</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.createdTime }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">借款申请时间</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.creditType }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">借款状态</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.state }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">医院名称</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.clientName }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">项目金额(元)</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.cell }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">借款金额</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.certNo }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">申请期数</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.educationCode }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">申请项目</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.maritalCode }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">还款方式</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.age }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">还款来源</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.workIndustryCode }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">手术时间</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.workProvinceName }}</div>
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
            <span>客户基本信息</span>
          </div>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">姓名</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.clientName }}</div>
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
              <div class="grid-content">{{ basicsInfo.educationCode }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">婚姻状况</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.maritalCode }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">年龄</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.age }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">工作行业</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.workIndustryCode }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">工作城市</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.workProvinceName }}</div>
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
              <div class="grid-content">{{ basicsInfo.liveProvinceName }}</div>
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
                  <el-button type="text">
                    {{
                    basicsInfo.idCardAddress
                    }}
                  </el-button>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">对应BD</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.bdName }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">收入</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.familyMonthlyIncome }}</div>
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
                <el-button @click="showContacts" type="text">点击查看</el-button>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">工作地址</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.workAddress }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">是否需要提交补充资料</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.isSupplement }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">客户GPS</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ basicsInfo.GPS }}</div>
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
            <span>客户身份信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12" v-for="(item, index) in identityList" :key="index">
              <div class="img-box">
                <div>
                  <span class="demonstration">{{ item.name }}</span>
                </div>
                <el-image
                  :src="item.path"
                  :preview-src-list="
                    (list = identityList.map(item => item.path))
                  "
                ></el-image>
              </div>
            </el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>合作商收款信息</span>
          </div>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">收款金额(元)</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">1000.00</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">合作商名称</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">华美整容</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">收款人</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">王维</div>
            </el-col>
          </el-row>

            <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">开户行</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">农业银行</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">收款账号</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">4165465413546841316165</div>
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
            <span>还款卡信息</span>
          </div>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">还款人</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">王维</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">开户行</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">中国银行</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">还款卡卡号</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">1654613156461643654</div>
            </el-col>
          </el-row>

        </el-card>




        <el-card class="box-card">
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
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>授信附件信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8" v-for="(item, index) in creditAppendixList" :key="index">
              <div class="img-box">
                <div>
                  <span class="demonstration">{{ item.name }}</span>
                </div>
                <el-image
                  :src="item.path"
                  :preview-src-list="
                    (list = creditAppendixList.map(item => item.path))
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
      rules: {
        artificialAmt: [
          {
            required: true,
            message: '必须填写是纯数字的金额',
            pattern: '^[0-9]*$'
          }
        ],
        artificialLimit: [
          {
            required: true,
            message: '必须选择期限'
          }
        ]
      },

      approvalResult: {
        clientApplyAmt: 1000, //客户申请金额
        clientApplyLimit: 3, //用户申请期限
        remainDebtAmt: 3322, //剩余未还金额
        systemAmt: 1000, //机审建议额度
        artificialLimit: 3, //人审期限
        artificialAmt: 500, //人审建议额度
        partnerGrade: 'A' //商户等级
      },
      identityList: [
        //客户身份信息
      ],
      faceList: [
        //人脸信息
      ],
      creditAppendixList: [
        //授信附件信息
      ],

      basicsInfo: {
        createdTime: '', //创建时间、申请时间
        creditType: '', //授信类型
        state: '', //状态
        clientName: '', //客户姓名
        cell: '', //手机号码
        certNo: '', //身份证号
        educationCode: '', //学历
        maritalCode: '', //婚姻状况
        age: '', //年龄
        liveProvinceName: '', //居住省份/城市
        addressDetail: '', //居住详细地址
        firmName: '', //公司名称
        workProvinceName: '', //工作省份/城市
        workAddress: '', //工作详细地址
        wechatNo: '', //微信
        idCardAddress: '', //户籍地
        bdName: '', //bd名称
        contactsName: '', //紧急联系人名字
        kinship: '', //与客户关系
        contactsCell: '', //紧急联系人电话
        isSupplement: '', //是否需要补充材料
        familyMonthlyIncome: '', //收入、月收入
        workIndustryCode: '', //工作行业
        GPS: ''
      },
      partnerInfo: {
        regName: '', //医院名称/合作商名称
        debtLimit: '', //借款期限
        GPS: '',
        operationProjectName: '', //项目名称
        grade: '', //商家等级
        clientApplyAmt: '', //申请金额
        operationProjectAmt: '' //项目金额
      }
    }
  },
  created() {
    // 获取基础信息
    getClinetBasicsInfoData().then(res => {
      this.basicsInfo = res.data
    })
    // 获取项目信息
    getOperationData().then(res => {
      this.partnerInfo = res.data
    })
    //获取审批结果
    getApprovalResultData().then(res => {
      this.approvalResult = res.data
    })
    // 获取授信附件
    getAppendixData().then(res => {
      this.identityList = res.data.identityList
      this.faceList = res.data.faceList
      this.creditAppendixList = res.data.creditAppendixList
    })
  },
  methods: {
    showContacts() {
      const { href } = this.$router.resolve({
        path: '/approval/preliminary'
      })
      window.open(href, '_blank')
    },
   
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
</style>
