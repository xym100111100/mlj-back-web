<template>
  <div>
    <el-dialog
      class="common-dialog"
      title="客户详情"
      :visible.sync="dialogStatus.dialogVisible"
      width="1350px"
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
              <div class="grid-content">{{ educationCodeFormat( basicsInfo.educationCode) }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">婚姻状况</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{ maritalCodeFormat(basicsInfo.maritalCode) }}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">工作地址</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content"> {{ basicsInfo.workAddress }}</div>
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
                  <el-button type="text">{{ basicsInfo.idCardAddress }}</el-button>
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
            <el-col :span="12" v-for="(item, index) in clientRealAuthInfo" :key="index">
              <div class="img-box">
                <div>
                  <span class="demonstration">{{ item.name }}</span>
                </div>
                <el-image
                  :src="item.path"
                  :preview-src-list="
                    (list = clientRealAuthInfo?clientRealAuthInfo.map(item => item.path):[])
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
      clientRealAuthInfo: [
        //客户身份信息
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
        latitude:'',//维度
        longitude:'',//经度
        GPS: ''
      },

    }
  },
  created() {
    // 获取基础信息
    getClinetBasicsInfoData({clientNo:this.dialogStatus.clientNo}).then(res => {
      this.basicsInfo = res.data
    })

    // 获取授信附件
    getAppendixData({clientNo:this.dialogStatus.clientNo}).then(res => {
      this.clientRealAuthInfo = res.data.clientRealAuthInfo

    })
  },
  methods: {
        maritalCodeFormat: function(val) {
      return this.$enumUtils.toMsg('maritalCodeEnmu', val)
    },
    educationCodeFormat: function(val) {
      return this.$enumUtils.toMsg('educationCodeEnmu', val)
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
</style>
