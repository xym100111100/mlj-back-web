<template>
  <div>
    <div class="content-text" style="height:100%">
      <el-scrollbar >
        <div class="content-table">
          <h3>负债信息</h3>
          <table>
            <!-- --- -->
            <tr>
              <th>负债状态：</th>
              <td>
                <span>
                  {{ debtTypeFormat(debtClient.debtState) }}
                </span>
              </td>
              <th>借款金额：</th>
              <td>
                <span>
                  {{ debtClient.debtAmt }}
                </span>
              </td>
              <th>借款用途：</th>
              <td>
                <span>
                  {{ debtClient.debtPurpose }}
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

              <th>期限单位：</th>
              <td>
                <span>
                  {{ debtClient.limitUnit }}
                </span>
              </td>
              <th>期限类型：</th>
              <td>
                <span>
                  {{ debtClient.limitType }}
                </span>
              </td>
            </tr>

            <!-- --- -->
            <tr>
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
              <th>手术项目名称：</th>
              <td>
                <span>
                  {{ debtClient.operationName }}
                </span>
              </td>
            </tr>

            <!-- --- -->
            <tr>
              <th>借款利率百分比：</th>
              <td>
                <span>
                  {{ debtClient.debtInterest }}
                </span>
              </td>
              <th>服务费金额：</th>
              <td>
                <span>
                  {{ debtClient.serviceFeeAmt }}
                </span>
              </td>
              <th>保证金总额：</th>
              <td>
                <span>
                  {{ debtClient.depositTotal }}
                </span>
              </td>
            </tr>

            <!-- --- -->
            <tr>
              <th>首月还款金额：</th>
              <td>
                <span>
                  {{ debtClient.firstMonthRepayAmt }}
                </span>
              </td>
              <th>逾期罚息比例百分比：</th>
              <td>
                <span>
                  {{ debtClient.overdueRate }}
                </span>
              </td>
              <th>还款方式：</th>
              <td>
                <span>
                  {{ debtClient.repayType }}
                </span>
              </td>
            </tr>

            <!-- --- -->
            <tr>
              <th>申请时间：</th>
              <td>
                <span>
                  {{ debtClient.applyTime }}
                </span>
              </td>
              <th>确认时间：</th>
              <td>
                <span>
                  {{ debtClient.verifyTime }}
                </span>
              </td>
            </tr>
          </table>

          <div class="btn">
            <el-button type="primary" @click="$router.go(-1)" >返回</el-button>
          </div>
          <h3>基础信息</h3>
          <table>
            <!-- --- -->
            <tr>
              <th>真实姓名：</th>
              <td>{{ clinetData.realName }}</td>
              <th>客户用户名：</th>
              <td>{{ clinetData.userName }}</td>
              <th>用户昵称：</th>
              <td>{{ clinetData.nickName }}</td>
            </tr>
            <!-- --- -->
            <tr>
              <th>手机号码：</th>
              <td>{{ clinetData.cell }}</td>
              <th>微信：</th>
              <td>{{ clinetData.wechatNo }}</td>
              <th>qq：</th>
              <td>{{ clinetData.qq }}</td>
            </tr>
            <!-- --- -->
            <tr>
              <th>邮箱：</th>
              <td>{{ clinetData.email }}</td>
              <th>出生年月：</th>
              <td>{{ clinetData.birthday }}</td>
              <th>学历：</th>
              <td>{{ clinetData.educationCode }}</td>
            </tr>
            <!-- --- -->
            <tr>
              <th>已绑定的产品类型：</th>
              <td>{{ clinetData.alreadyProductType }}</td>
              <th>婚姻状况：</th>
              <td>{{ clinetData.maritalCode }}</td>
              <th>性别：</th>
              <td>{{ clinetData.sex }}</td>
            </tr>
            <!-- --- -->
            <tr>
              <th>客户状态：</th>
              <td>{{ clinetData.state }}</td>

              <th>家庭月收入：</th>
              <td>{{ clientStateFormat(clinetData.familyMonthlyIncome )}}</td>
              <th>工作省名称：</th>
              <td>{{ clinetData.workProvinceName }}</td>
            </tr>
            <!-- --- -->
            <tr>
              <th>工作城市：</th>
              <td>{{ clinetData.workCityCode }}</td>
              <th>工作详细地址：</th>
              <td>{{ clinetData.workAddress }}</td>
              <th>工作行业：</th>
              <td>{{ clinetData.workIndustryCode }}</td>
            </tr>
            <!-- --- -->
            <tr>
              <th>公司全名：</th>
              <td>{{ clinetData.firmName }}</td>
              <th>公司电话：</th>
              <td>{{ clinetData.companyPhone }}</td>
              <th>工作市名称：</th>
              <td>{{ clinetData.workCityName }}</td>
            </tr>
            <!-- --- -->
            <tr>
              <th>工作区名称：</th>
              <td>{{ clinetData.workAreaName }}</td>
              <th>居住省名称：</th>
              <td>{{ clinetData.liveProvinceName }}</td>
              <th>居住市名称：</th>
              <td>{{ clinetData.liveCityName }}</td>
            </tr>
            <!-- --- -->
            <tr>
              <th>居住区名称：</th>
              <td>{{ clinetData.liveAreaName }}</td>
              <th>居住详细地址：</th>
              <td>{{ clinetData.addressDetail }}</td>
              <th>车牌号：</th>
              <td>{{ clinetData.licensePlate }}</td>
            </tr>
            <!-- --- -->
            <tr>
              <th>创建时间：</th>
              <td>{{ clinetData.createdTime }}</td>
              <th>修改时间：</th>
              <td>{{ clinetData.modifiedTime }}</td>
              <th>首次登陆时间：</th>
              <td>{{ clinetData.firstLogin }}</td>
            </tr>
            <!-- --- -->
            <tr>
              <th>最后登陆时间：</th>
              <td>{{ clinetData.lastLogin }}</td>
            </tr>
          </table>

          <h3>客户身份证信息</h3>
          <el-collapse v-model="isActive">
            <el-collapse-item title="查看客户身份证信息" name="1">
              <div>
                <el-row :gutter="20">
                  <el-col
                    :span="11"
                    v-for="(item, i) in clientUrlList"
                    :key="i"
                  >
                    <div class="grid-content">
                      <el-image
                        :preview-src-list="
                          (url = clientUrlList.map(item => item.path))
                        "
                        :src="item.path"
                        style="width: 300px; height: 200px;display: inline-block; vertical-align: middle;"
                        fit="cover"
                      ></el-image>
                    </div>
                    <div class="grid-content1">
                      <span>{{ item.name }}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- 授信附件信息 -->
          <h3>授信附件信息</h3>
          <el-collapse v-model="isActive">
            <el-collapse-item title="查看授信附件信息" name="1">
              <div>
                <el-row :gutter="20">
                  <el-col :span="8" v-for="(item, i) in creditUrlList" :key="i">
                    <div class="grid-content">
                      <el-image
                        :src="item.path"
                        :preview-src-list="
                          (url = creditUrlList.map(item => item.path))
                        "
                        style="width: 70%; height: 100%;display: inline-block; vertical-align: middle;"
                      ></el-image>
                    </div>
                    <div class="grid-content1">
                      <span>{{ item.name }}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>

          <!-- 客户附件信息 -->
          <h3>客户附件信息</h3>
          <el-collapse v-model="isActive">
            <el-collapse-item title="查看授信附件信息" name="1">
              <div>
                <el-row :gutter="20">
                  <el-col :span="8" v-for="(item, i) in clientRecord" :key="i">
                    <div class="grid-content">
                      <el-image
                        :preview-src-list="
                          (url = clientRecord.map(item => item.path))
                        "
                        :src="item.path"
                        style="width: 70%; height: 100%;display: inline-block; vertical-align: middle;"
                        fit="cover"
                      ></el-image>
                    </div>
                    <div class="grid-content1">
                      <span>{{ item.name }}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>

import { getClientDetailData, getClientMaterialData } from '@/api/client'
import { getClientLoanDetailsData } from '@/api/loan'

export default {
  name: 'clientCreditDialog',
  props: {
    dialogVisible: {
      type: Boolean
    },
    linkerType: {
      type: String
    },
    clientNo: {
      type: String
    },
    clientName: {
      type: String
    },
    certNo: {
      type: String
    },
    creditNo: {
      type: String
    }
  },
  data() {
    return {
      isActive: ['1'],
      // urls: [],
      srcList: [],
      creditDetailImage: [],
      clientRealAuthImage: [],
      dataForm: {},
      certificateInfo: [],
      clinetData: {
        clientNo: '', //客户编号
        bdName: '', //客服名(bd名称)
        userName: '', //客户用户名
        nickName: '', //用户昵称
        realName: '', //真实姓名
        sex: '', //性别
        wxId: '', //微信id
        cell: '', //手机号码
        birthday: '', //出生年月
        alreadyProductType: '', //已绑定的产品类型
        firstLogin: '', //首次登陆时间
        lastLogin: '', //最后登陆时间
        deviceId: '', //设备指纹ID
        clientImgUrl: '', //客户头像地址
        state: '', //客户状态
        createdTime: '', //创建时间
        modifiedTime: '', //修改时间
        maritalCode: '', //婚姻状况
        educationCode: '', //学历
        wechatNo: '', //微信
        workIndustryCode: '', //工作行业
        workCityCode: '', //工作城市
        workAddress: '', //工作详细地址
        firmName: '', //公司全名
        addressCode: '', //居住地区
        addressDetail: '', //居住详细地址
        workProvinceName: '', //工作省名称
        workCityName: '', //工作市名称
        workAreaName: '', //工作区名称
        liveProvinceName: '', //居住省名称
        liveCityName: '', //居住市名称
        liveAreaName: '', //居住区名称
        email: '', //邮箱
        companyPhone: '', //公司电话
        qq: '', //qq
        familyMonthlyIncome: '', //家庭月收入
        licensePlate: '' //车牌号
      },
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
    // this.getClientDetail({ creditNo: this.$route.query.creditNo })
    // this.getCreditDetail({ creditNo: this.$route.query.creditNo })
    getClientDetailData({ clientNo: this.$route.query.clientNo }).then(res => {
      if (res.code === 0) {
        this.clinetData = res.data
      }
    })
    getClientLoanDetailsData({
      debtNo: this.$route.query.debtNo,
      clientNo: this.$route.query.clientNo
    }).then(res => {
      if (res.code === 0) {
        res.data.operationName = res.data.operationName.join(',')
        this.debtClient = res.data
      }
    })
    getClientMaterialData({
      clientNo: this.$route.query.clientNo,
      debtNo: this.$route.query.debtNo
    }).then(res => {
      // 将授信附件信息这里成每三个一组

      var result = []
      for (var i = 0; i < res.data.creditDetailImage.length; i += 3) {
        result.push(res.data.creditDetailImage.slice(i, i + 3))
      }
      console.log(result)

      this.creditDetailImage = result
      this.clientRealAuthImage = res.data.clientRealAuthImage
      this.certificateInfo = res.data.certificateInfo
    })
  },
  methods: {
    changeDebtState(type, msg) {
      this.$confirm(msg, '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then()
        .catch(err => {
          console.error(err)
        })
    },
    // 点击关闭按钮
    handleClose() {
      this.visible = false
      setTimeout(() => {
        this.$emit('update:dialogVisible', false)
      }, 100)
    },
    // 授信状态格式
    clientCreditStateFormat: function(val) {
      return this.$enumUtils.toMsg('ClientCreditStateEnmu', val)
    },
    // 负债状态
    debtTypeFormat: function(val) {
      return this.$enumUtils.toMsg('DebtStatusEnum', val)
    },
    // 授信类型格式
    creditTypeFormat: function(val) {
      return this.$enumUtils.toMsg('creditTypeEnmu', val)
    },
    // 还款方式
    backedModeFormat: function(val) {
      return this.$enumUtils.toMsg('BackedModeEnum', val)
    },
    // 学历格式
    educationCodeFormat: function(val) {
      return this.$enumUtils.toMsg('educationCodeEnmu', val)
    },
    // 婚姻情况
    maritalCodeFormat: function(val) {
      return this.$enumUtils.toMsg('maritalCodeEnmu', val)
    },
    // 点击通讯录触发详情页面
    creditLinker() {}
  }
}
</script>
<style lang="stylus" scoped>
.content-text {
  width: 95%;
  margin: auto;
}

.content-text h3 {
  margin: 10px 0 0.8em;
  padding-bottom: 0.7em;
  border-bottom: 2px solid #ddd;
  color: #47484b;
}

.content-table label {
  font-size: 22px;
  color: #64656f;
}

.content-table table {
  width: 95%;
  border-spacing: 0px 15px;
}

.content-table table th {
  color: #64656f;
  text-align: right;
  font-size: 14px;
}

.content-table table td {
  color: #64656f;
  text-align: left;
  font-size: 14px;
}

.el-row {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.grid-content {
  min-height: 100px;
  text-align: center;

  
}

.grid-content1 {
  min-height: 30px;
  text-align: center;
  font-size: medium;
}

.el-image {
  display: inline-block;
  text-align: center;
  background-size: 100%;
    border: solid 1px #dcd9d9;
  height: 230px;
  width: 230px;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}

.customHeight {
  height: 70%;
  top: '5vh';
}

.grid-content img {

  background:red
}
</style>
