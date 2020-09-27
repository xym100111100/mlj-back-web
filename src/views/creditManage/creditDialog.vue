<template>
  <div>
    <el-dialog
      class="common-dialog"
      title="授信"
      :visible.sync="dialogStatus.dialogVisible"
      width="90%"
      @close="onClose('partnerInfo')"
    >
      <div style="height:700px;overflow-y: scroll;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基础信息</span>
          </div>
          <el-row>
            <el-col :span="4"
              ><div class="grid-content bg-purple ">
                申请时间
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ partnerInfo.createdTime }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">授信类型</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                <!-- {{ partnerInfo.creditType }} 目前只有一种类型，故写死-->
                普通授信
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">授信状态</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ clientCreditStateFormat(partnerInfo.state) }}
              </div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="4"
              ><div class="grid-content bg-purple">姓名</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ basicsInfo.realName }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">手机号码</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">{{ basicsInfo.cell }}</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">身份证号码</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">{{ basicsInfo.certNo }}</div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="4"
              ><div class="grid-content bg-purple">学历</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ educationCodeFormat(basicsInfo.educationCode) }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">婚姻状况</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ maritalCodeFormat(basicsInfo.maritalCode) }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">工作地址</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ basicsInfo.workAddress }}
              </div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="4"
              ><div class="grid-content bg-purple">工作行业</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ basicsInfo.workIndustryCode }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">工作城市</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ basicsInfo.workCityName }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">公司全称</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ basicsInfo.firmName }}
              </div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="4"
              ><div class="grid-content bg-purple">居住城市</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ basicsInfo.liveCityName }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">居住地址</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ basicsInfo.addressDetail }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">微信</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ basicsInfo.wechatNo }}
              </div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="4"
              ><div class="grid-content bg-purple">户籍地</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
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
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">对应BD</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ basicsInfo.salesmanName }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">收入</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ basicsInfo.familyMonthlyIncome }}
              </div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="4"
              ><div class="grid-content bg-purple">紧急联系人姓名</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ basicsInfo.contactsName }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">紧急联系人关系</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">{{ basicsInfo.kinship }}</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">紧急联系人电话</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ basicsInfo.contactsCell }}
              </div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="4"
              ><div class="grid-content bg-purple">通讯录</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                <el-button @click="showContacts" type="text"
                  >点击查看</el-button
                >
              </div></el-col
            >

            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <span v-if="partnerInfo.isSupplement"
                  >是否需要提交补充资料</span
                >
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                <span v-if="partnerInfo.isSupplement">{{
                  partnerInfo.isSupplement === '0' ? '是' : '否'
                }}</span>
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple"></div
            ></el-col>
            <el-col :span="4"><div class="grid-content "></div></el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>项目信息</span>
          </div>

          <el-row>
            <el-col :span="4"
              ><div class="grid-content bg-purple ">
                医院名称
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ partnerInfo.partnerName }}
              </div></el-col
            >

            <el-col :span="4"
              ><div class="grid-content bg-purple ">
                申请项目
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{
                  partnerInfo.operationName
                    ? partnerInfo.operationName.join(',')
                    : ''
                }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple ">
                申请金额(元)
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ partnerInfo.clientApplyAmt / 100 }}
              </div></el-col
            >
          </el-row>

          <el-row>
            <el-col :span="4"
              ><div class="grid-content bg-purple ">
                借款期限
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ partnerInfo.clientApplyLimit }}期
              </div></el-col
            >

            <el-col :span="4"
              ><div class="grid-content bg-purple ">
                商家等级
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">{{ partnerInfo.grade }}</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple ">
                商户GPS
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content ">
                {{ partnerInfo.latitude }}{{ partnerInfo.latitude ? ',' : ''
                }}{{ partnerInfo.longitude }}
              </div></el-col
            >
          </el-row>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>客户身份信息</span>
          </div>
          <el-row :gutter="20">
            <el-col
              :span="12"
              v-for="(item, index) in clientRealAuthInfo"
              :key="index"
            >
              <div class="img-box">
                <div>
                  <span class="demonstration">{{ item.name }}</span>
                </div>
                <el-image
                  :src="item.path"
                  :preview-src-list="
                    (list = clientRealAuthInfo.map(item => item.path))
                  "
                ></el-image>
              </div>
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
            <span>客户附件信息</span>
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

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>审批结果</span>
          </div>
          <el-form
            :rules="rules"
            :model="partnerInfo"
            label-position="right"
            label-width="170px"
            ref="partnerInfo"
          >
            <el-form-item label="用户申请金额(元)">
              {{ partnerInfo.clientApplyAmt / 100 }}
            </el-form-item>
            <el-form-item label="用户申请期限">
              {{ partnerInfo.clientApplyLimit }}
            </el-form-item>
            <el-form-item label="剩余未还本金(元)">
              {{ partnerInfo.remainDebtAmt }}
            </el-form-item>
            <!-- <el-form-item label="机审建议金额">
              {{ partnerInfo.systemAmt }}
            </el-form-item> -->
            <el-form-item label="人审额度(元)" prop="artificialAmt">
              <el-input
                :disabled="dialogStatus.state !== '0'"
                v-model="partnerInfo.artificialAmt"
                style="width:200px"
              />
            </el-form-item>
            <el-form-item label="人审期限" prop="artificialLimit">
              <el-select
                :disabled="dialogStatus.state !== '0'"
                v-model="partnerInfo.artificialLimit"
                clearable
                class="filter-item"
                style="width:200px"
              >
                <el-option
                  v-for="item in $getEnumUtils.getEnum('limitEnmu')"
                  :key="item.code"
                  :label="item.message"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="合作商等级">
              A
            </el-form-item>
            <div>
              <el-form-item label="是否需要补充材料" prop="isSupplement">
                <el-select
                  :disabled="dialogStatus.state !== '0'"
                  clearable
                  v-model="partnerInfo.isSupplement"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="备注" >
                <el-input
                  v-model="partnerInfo.memo"
                  :disabled="dialogStatus.state !== '0'"
                  cols="60"
                  style="resize: none;"
                  type="textarea"
                />
              </el-form-item>

              <div v-if="dialogStatus.state === '0'">
              <!-- <div> -->
                <el-button @click="modifyRecord('审核通过', 1)" type="success"
                  >通过</el-button
                >
                <el-button @click="modifyRecord('审核拒绝', 3)" type="danger"
                  >拒绝</el-button
                >

                <el-button type="primary" @click="modifyRecord('审核驳回', 2)"
                  >驳回</el-button
                >
              </div>
            </div>
          </el-form>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import {
  getClinetBasicsInfoData,
  getOperationData,
  getAppendixData,
  modifyRecordData
} from '@/api/credit'
export default {
  name: 'creditDialog',
  props: {
    dialogStatus: {
      type: Object,
      required: true
    },
    dialogClose: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      rules: {
        artificialAmt: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        isSupplement: [
          {
            required: true,
            message: '必须选择是否需要补充材料',
            trigger: 'blur'
          }
        ],
        artificialLimit: [
          {
            required: true,
            message: '必须选择期限',
            trigger: 'blur'
          }
        ],
        memo: [
          {
            required: true,
            message: '请填写备注信息',
            trigger: 'blur'
          }
        ]
      },
      options: [
        {
          name: '是',
          value: 0
        },
        {
          name: '否',
          value: 1
        }
      ],

      clientRealAuthInfo: [
        //客户身份信息
      ],
      // faceList: [
      //   //人脸信息
      // ],
      creditAppendixInfo: [
        //授信附件信息
      ],
      clientAppendixInfo: [
        //客户附件信息
      ],

      basicsInfo: {
        realName: '', //客户姓名
        cell: '', //手机号码
        certNo: '', //身份证号
        education: '', //学历
        maritalCode: '', //婚姻状况
        birthday: '', //年龄
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
        clientNo: '', // 客户编号
        familyMonthlyIncome: '', //收入、月收入
        workIndustryCode: '', //工作行业
        latitude: '', //经度
        longitude: '', //维度
        GPS: ''
      },
      partnerInfo: {
        state: '', //状态
        creditType: '', //授信类型
        createdTime: '', //创建时间、申请时间
        partnerName: '', //医院名称/合作商名称
        clientApplyAmt: '', //借款期限
        GPS: '',
        operationName: '', //项目名称
        grade: '', //商家等级
        operationProjectAmt: '', //项目金额
        latitude: '', //经度
        longitude: '', //维度
        isSupplement: '',
        memo: '',
        artificialLimit: ''
      }
    }
  },
  created() {
    // 获取基础信息
    getClinetBasicsInfoData({ clientNo: this.dialogStatus.clientNo }).then(
      res => {
        this.basicsInfo = res.data
      }
    )
    // 获取项目信息
    getOperationData({ creditRecordNo: this.dialogStatus.creditRecordNo }).then(
      res => {
        console.log(res.data)
        if (res.data && res.data.createdTime) {
          res.data.createdTime = moment(res.data.createdTime).format(
            'YYYY-MM-DD'
          )
        }
        if (res.data.artificialAmt) {
          res.data.artificialAmt = res.data.artificialAmt / 100
        }
        this.partnerInfo = { ...res.data }
      }
    )

    // 获取授信附件
    getAppendixData({ clientNo: this.dialogStatus.clientNo }).then(res => {
      this.clientRealAuthInfo = res.data.clientRealAuthInfo
      // this.faceList = res.data.faceList
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
    // 授信状态格式 clientCreditStateFormat
    clientCreditStateFormat: function(val) {
      return this.$enumUtils.toMsg('ClientCreditStateEnmu', val)
    },
    workIndustryCodeFormat: function(val) {
      return this.$enumUtils.toMsg('industryEnmu', val)
    },

    showContacts() {
      const { href } = this.$router.resolve({
        path: '/loan/linkersDialog?clientNo=' + this.dialogStatus.clientNo
      })
      window.open(href)
    },

    modifyRecord(msg, state) {
      this.$confirm('是否' + msg + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (state === 3 && this.partnerInfo.memo == null) {
            this.$notify({
              message: '请填写备注信息!!',
              type: 'warning',
              duration: 2000
            })
          } else if (state === 3) {
            modifyRecordData({
              state,
              memo: this.partnerInfo.memo,
              clientNo: this.dialogStatus.clientNo,
              creditRecordNo: this.dialogStatus.creditRecordNo
            }).then(res => {
              this.dialogStatus.dialogVisible = false
              this.dialogClose()
              this.$message({
                type: 'success',
                message: msg + '成功'
              })
            })
          }
          if (state === 1) {
            this.$refs['partnerInfo'].validate(valid => {
              // 如果是通过的话，检查是否填写了金额和期限
              if (valid) {
                modifyRecordData({
                  state,
                  creditRecordNo: this.dialogStatus.creditRecordNo,
                  memo: this.partnerInfo.memo,
                  artificialAmt: this.partnerInfo.artificialAmt * 100,
                  isSupplement: this.partnerInfo.isSupplement,
                  artificialLimit: this.partnerInfo.artificialLimit,
                  clientNo: this.dialogStatus.clientNo
                }).then(res => {
                  this.dialogStatus.dialogVisible = false
                  this.dialogClose()
                  this.$message({
                    type: 'success',
                    message: msg + '成功'
                  })
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '请输入同意金额'
                })
                return false
              }
            })
          }
        })
        .catch(() => {})
    },
    // 表单校验
    onClose(partnerInfo) {
      this.$refs[partnerInfo].resetFields()
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
