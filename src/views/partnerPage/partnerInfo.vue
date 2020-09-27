<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane name="first" label="基本信息">
        <el-form
          :model="partnerInfo"
          label-position="right"
          label-width="190px"
          :inline="true"
          :rules="rules"
          ref="partnerInfo"
          disabled
        >
          <!-- 新增内容 -->
          <el-card class="box-card" v-if="partnerInfo.state > 0">
            <div slot="header" class="clearfix">
              <span>审批结果</span>
            </div>
            <el-form-item label="审核状态">
              <span>{{ partnerSateFormat(partnerInfo.state) }}</span>
            </el-form-item>
            <div>
              <el-form-item label="备注">
                <el-input
                  cols="60"
                  style="resize: none;"
                  type="textarea"
                  v-model="partnerInfo.auditResult"
                />
              </el-form-item>
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基本信息</span>
            </div>
            <el-form-item label="商户注册名称" prop="regName">
              <el-input style="width:190px" v-model="partnerInfo.regName" />
            </el-form-item>

            <el-form-item label="实际营业名称" prop="realName">
              <el-input style="width:190px" v-model="partnerInfo.realName" />
            </el-form-item>

            <el-form-item label="成立时间" prop="establishDateStr">
              <el-date-picker
                :editable="false"
                type="date"
                placeholder="选择日期"
                v-model="partnerInfo.establishDateStr"
                style="width:190px"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="注册资本(万元)" prop="regAmt">
              <el-input
                style="width:190px"
                v-model="partnerInfo.regAmt"
                oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,4})?).*$/g, '$1')"
                maxlength="9"
              />
            </el-form-item>

            <el-form-item label="营业用地面积(平方米)" prop="addressSize">
              <el-input
                style="width:190px"
                v-model="partnerInfo.addressSize"
                oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,4})?).*$/g, '$1')"
                maxlength="9"
              />
            </el-form-item>

            <el-form-item label="所属行业" prop="companyIndustry">
              <el-select
                style="width:190px"
                clearable
                v-model="partnerInfo.companyIndustry"
                placeholder="所属行业"
              >
                <el-option
                  v-for="item in $getEnumUtils.getEnum('industryEnmu')"
                  :key="item.code"
                  :label="item.message"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="营业用地性质" prop="addressNature">
              <el-select
                style="width:190px"
                clearable
                v-model="partnerInfo.addressNature"
                placeholder="营业用地性质"
              >
                <el-option
                  v-for="item in $getEnumUtils.getEnum('useNatureEnmu')"
                  :key="item.code"
                  :label="item.message"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="员工人数" prop="employeesNumber">
              <el-input
                style="width:190px"
                v-model="partnerInfo.employeesNumber"
                oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,4})?).*$/g, '$1')"
                maxlength="7"
              />
            </el-form-item>

            <el-form-item label="预计月均交易金额(万元)" prop="monthSales">
              <el-input
                style="width:190px"
                v-model="partnerInfo.monthSales"
                oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,4})?).*$/g, '$1')"
                maxlength="9"
              />
            </el-form-item>

            <el-form-item label="经营范围" prop="bizScope">
              <el-input style="width:190px" v-model="partnerInfo.bizScope" />
            </el-form-item>

            <el-form-item label="分支机构情况" prop="branchStatus">
              <el-select
                style="width:190px"
                clearable
                v-model="partnerInfo.branchStatus"
                placeholder="分支机构情况"
              >
                <el-option
                  v-for="item in $getEnumUtils.getEnum('branchEnmu')"
                  :key="item.code"
                  :label="item.message"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="商户性质" prop="bizProperty">
              <el-select
                style="width:190px"
                clearable
                v-model="partnerInfo.bizProperty"
                placeholder="商户性质"
              >
                <el-option
                  v-for="item in $getEnumUtils.getEnum('partnerNatureEnmu')"
                  :key="item.code"
                  :label="item.message"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <div>
              <el-form-item label="注册地址" prop="registerAddressList">
                <el-cascader
                  style="width:290px"
                  v-model="partnerInfo.registerAddressList"
                  :options="options"
                  :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
              </el-form-item>

              <el-form-item prop="registerAddressListDetail">
                <el-input
                  style="width:390px"
                  v-model="partnerInfo.registerAddressListDetail"
                  placeholder="请输入详细地址"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="实际营业地址" prop="businessAddressList">
                <el-cascader
                  style="width:290px"
                  v-model="partnerInfo.businessAddressList"
                  :options="options"
                  :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
              </el-form-item>
              <el-form-item prop="businessAddressListDetail">
                <el-input
                  style="width:390px"
                  v-model="partnerInfo.businessAddressListDetail"
                  placeholder="请输入详细地址"
                />
              </el-form-item>
            </div>

            <el-form-item label="商户优先级" prop="grade">
              <el-select
                style="width:190px"
                clearable
                v-model="partnerInfo.grade"
                placeholder="商户优先级"
              >
                <el-option
                  v-for="item in $getEnumUtils.getEnum('partnerGradeEnmu')"
                  :key="item.code"
                  :label="item.message"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="医疗许可证到期日" prop="medicalLicenseExpire">
              <el-date-picker
                :editable="false"
                type="date"
                placeholder="选择日期"
                v-model="partnerInfo.medicalLicenseExpire"
                style="width:190px"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="合作协议到期日" prop="coopAgreementExpire">
              <el-date-picker
                :editable="false"
                type="date"
                placeholder="选择日期"
                v-model="partnerInfo.coopAgreementExpire"
                style="width:190px"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="租借场地合同到期日" prop="leaseExpire">
              <el-date-picker
                :editable="false"
                type="date"
                placeholder="选择日期"
                v-model="partnerInfo.leaseExpire"
                style="width:190px"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="纬度(°)" prop="latitude">
              <el-input style="width:190px" v-model="partnerInfo.latitude" />
            </el-form-item>
            <el-form-item label="经度(°)" prop="longitude">
              <el-input style="width:190px" v-model="partnerInfo.longitude" />
            </el-form-item>
            <el-form-item label="营业执照到期日" prop="instLicenceExpire">
              <el-input
                style="width:190px"
                v-model="partnerInfo.instLicenceExpire"
              />
            </el-form-item>
            <el-form-item>
              <el-checkbox-group
                @change="instLicenceExpireChange"
                v-model="instLicenceExpireValue"
              >
                <el-checkbox label="长期" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <div>
              <el-form-item
                label="机构经营模式(医院营销活动方案)"
                prop="managemantMode"
              >
                <el-input
                  cols="60"
                  style="resize: none;"
                  type="textarea"
                  v-model="partnerInfo.managemantMode"
                />
              </el-form-item>
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>证照信息</span>
            </div>
            <el-form-item label="统一社会信用代码" prop="instLicence">
              <el-input style="width:190px" v-model="partnerInfo.instLicence" />
            </el-form-item>
            <el-form-item label="开户许可证">
              <el-input
                style="width:190px"
                v-model="partnerInfo.openAccPermit"
              />
            </el-form-item>
            <el-form-item label="机构信用代码">
              <el-input
                style="width:190px"
                v-model="partnerInfo.instOrganizationCode"
              />
            </el-form-item>
          </el-card>
        </el-form>

        <el-form
          :model="partnerContacts"
          label-position="right"
          label-width="170px"
          :inline="true"
          :rules="rules"
          ref="partnerContactsInfo"
          disabled
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>联系人信息</span>
            </div>
            <el-form-item label="法定代表人" prop="reprName">
              <el-input
                style="width:190px"
                v-model="partnerContacts.reprName"
              />
            </el-form-item>
            <el-form-item label="身份证号码" prop="reprIdNo">
              <el-input
                style="width:190px"
                v-model="partnerContacts.reprIdNo"
                maxlength="18"
              />
            </el-form-item>
            <el-form-item label="联系人姓名" prop="linkerName">
              <el-input
                style="width:190px"
                v-model="partnerContacts.linkerName"
              />
            </el-form-item>
            <el-form-item label="联系人职位" prop="linkerPosition">
              <el-input
                style="width:190px"
                v-model="partnerContacts.linkerPosition"
              />
            </el-form-item>
            <el-form-item label="联系电话" prop="linkerTel">
              <el-input
                style="width:190px"
                v-model="partnerContacts.linkerTel"
                oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,4})?).*$/g, '$1')"
                maxlength="11"
              />
            </el-form-item>
            <el-form-item label="法人手机号">
              <el-input
                style="width:190px"
                v-model="partnerContacts.reprTel"
                oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,4})?).*$/g, '$1')"
                maxlength="11"
              />
            </el-form-item>
          </el-card>
        </el-form>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>附件信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <AppendixImg
                title="医院照片"
                :dialogStatus="dialogStatus"
                :imagesData="imagesData.hospital.enclosureRos"
                fileType="hospital"
              ></AppendixImg>
            </el-col>
            <el-col :span="8">
              <AppendixImg
                title="租房合同"
                :dialogStatus="dialogStatus"
                :imagesData="imagesData.renting.enclosureRos"
                fileType="renting"
              ></AppendixImg>
            </el-col>
            <el-col :span="8">
              <AppendixImg
                title="营业执照"
                :dialogStatus="dialogStatus"
                :imagesData="imagesData.businessLicense.enclosureRos"
                fileType="businessLicense"
              ></AppendixImg>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <AppendixImg
                title="医疗许可证"
                :dialogStatus="dialogStatus"
                :imagesData="imagesData.medicalLicense.enclosureRos"
                fileType="medicalLicense"
              ></AppendixImg>
            </el-col>
            <el-col :span="8">
              <AppendixImg
                title="手术单"
                :dialogStatus="dialogStatus"
                :imagesData="imagesData.operationList.enclosureRos"
                fileType="operationList"
              ></AppendixImg>
            </el-col>
            <el-col :span="8">
              <AppendixImg
                title="法人身份"
                :dialogStatus="dialogStatus"
                :imagesData="imagesData.legalPerson.enclosureRos"
                fileType="legalPerson"
              ></AppendixImg>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <AppendixImg
                title="对私账户身份证"
                :dialogStatus="dialogStatus"
                :imagesData="imagesData.privateAccount.enclosureRos"
                fileType="privateAccount"
              ></AppendixImg>
            </el-col>
            <el-col :span="8">
              <AppendixImg
                title="银行卡"
                :dialogStatus="dialogStatus"
                :imagesData="imagesData.bankCard.enclosureRos"
                fileType="bankCard"
              ></AppendixImg>
            </el-col>
            <el-col :span="8">
              <AppendixImg
                title="合同协议"
                :dialogStatus="dialogStatus"
                :imagesData="imagesData.contractAgreement.enclosureRos"
                fileType="contractAgreement"
              ></AppendixImg>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <AppendixImg
                title="债权协议"
                :dialogStatus="dialogStatus"
                :imagesData="imagesData.debtAgreement.enclosureRos"
                fileType="debtAgreement"
              ></AppendixImg>
            </el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ partnerSateFormat(partnerInfo.state) }}</span>
          </div>
          <el-form
            :model="partnerInfo"
            :rules="rules"
            ref="approvalResult"
            disabled
          >
            <el-form-item label="审核状态">
              <span>{{ partnerSateFormat(partnerInfo.state) }}</span>
            </el-form-item>
            <div>
              <el-form-item label="备注" prop="memo">
                <el-input
                  cols="60"
                  style="resize: none;"
                  type="textarea"
                  v-model="partnerInfo.memo"
                  placeholder="请填写审核备注"
                />
              </el-form-item>
            </div>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="收款信息" name="second">
        <el-card class="box-card">
          <div>
            <el-button
              type="primary"
              @click="getPartnerCard({ partnerNo: partnerInfo.partnerNo })"
              >刷新</el-button
            >
          </div>
        </el-card>

        <el-card
          class="box-card"
          v-for="(item, index) in partnerCard"
          :key="index"
        >
          <el-form
            :model="item"
            label-position="right"
            label-width="170px"
            :inline="true"
            :rulels="rules"
            disabled
          >
            <el-form-item label="对公/对私账号">
              <el-select
                style="width:190px"
                v-model="item.settleType"
                placeholder="对公/对私账号(必填)"
              >
                <el-option
                  v-for="item in settleTypeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="银行账户户名">
              <el-input
                placeholder="银行账户户名(必填)"
                style="width:190px"
                v-model="item.cardName"
              />
            </el-form-item>
            <el-form-item label="银行账户身份证">
              <el-input
                placeholder="银行账户身份证(必填)"
                style="width:190px"
                v-model="item.cardCertNo"
              />
            </el-form-item>

            <el-form-item label="银行账号">
              <el-input
                oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,4})?).*$/g, '$1')"
                placeholder="银行账号(必填)"
                style="width:190px"
                v-model="item.cardNo"
              />
            </el-form-item>

            <el-form-item label="银行账户开户行">
              <el-select
                style="width:190px"
                v-model="item.bankName"
                placeholder="银行账户开户行(必填)"
              >
                <el-option
                  v-for="item in supportingBanksList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="银行预留手机号码">
              <el-input
                oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,4})?).*$/g, '$1')"
                placeholder="银行预留手机号码(必填)"
                style="width:190px"
                v-model="item.reservePhone"
              />
            </el-form-item>

            <el-form-item label="支行名">
              <el-input
                placeholder="支行名(必填)"
                style="width:190px"
                v-model="item.openSubBankName"
              />
            </el-form-item>
            <el-form-item label="银行账号联行号">
              <el-input
                placeholder="银行账号联行号(必填)"
                style="width:190px"
                v-model="item.openSubBankCode"
              />
            </el-form-item>
            <el-form-item label="银行账号开户行所在地">
              <el-cascader
                style="width:350px"
                v-model="item.openAddress"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                placeholder="银行账号开户行所在地(必填)"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="美丽金费率" name="third">
        <el-card
          class="box-card"
          v-for="(item, index) in partnerRateData"
          :key="index"
        >
          <div slot="header" class="clearfix">
            <span>{{ item.type }}</span>
          </div>
          <el-row type="flex">
            <el-col>
              <div class="grid-content bg-purple">期数</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple">日利率(%..)</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple">月利率(%..)</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple">年利率(%..)</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple">罚息利率(%..)</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple">综合利率(%..)</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple">服务费利率(%..)</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple">保证金利率(%..)</div>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            v-for="(item2, index2) in item.data"
            :key="index2"
          >
            <el-col>
              <div class="grid-content">
                {{ item2.periodValue }}
              </div>
            </el-col>

            <el-col>
              <div class="grid-content">
                <el-input
                  v-model="item2.dayFeeRate"
                  oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                ></el-input>
              </div>
            </el-col>
            <el-col>
              <div class="grid-content">
                <el-input
                  v-model="item2.monthFeeRate"
                  oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                ></el-input>
              </div>
            </el-col>
            <el-col>
              <div class="grid-content">
                <el-input
                  v-model="item2.feeRate"
                  oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                ></el-input>
              </div>
            </el-col>
            <el-col>
              <div class="grid-content">
                <el-input
                  v-model="item2.overdueRate"
                  oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                ></el-input>
              </div>
            </el-col>
            <el-col>
              <div class="grid-content">
                <el-input
                  v-model="item2.compositeInterestRate"
                  oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                ></el-input>
              </div>
            </el-col>
            <el-col>
              <div class="grid-content">
                <el-input
                  v-model="item2.serviceRate"
                  oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                ></el-input>
              </div>
            </el-col>
            <el-col>
              <div class="grid-content">
                <el-input
                  v-model="item2.depositRate"
                  oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import getArea from '../../utils/area'
import AppendixImg from './appendixImg'
import {
  getPartnerDetailData,
  getPartnerCardData,
  getPartnerContactsData,
  getPartnerRateData,
  getBankCodeListData,
  getPartnerAppendixData,
  getRateTemplateData
} from '../../api/partnerPage/partnerInfo'
import moment from 'moment'
import { getAdminUserNo } from '@/utils/auth'
import { checkPartnerAppendixLength } from '@/utils'

export default {
  name: 'partnerDialog',
  components: {
    AppendixImg
  },

  data() {
    return {
      isRefresh: false,
      supportingBanksList: [],
      settleTypeOption: [
        {
          value: '0',
          label: '对公'
        },
        {
          value: '1',
          label: '对私'
        }
      ],
      partnerRateData: [], // 费率表数据
      isInitRateData: false, //是否是旧数据，用来判断是否展示input
      isUseOptions: [
        {
          value: 0,
          label: '是'
        },
        {
          value: 1,
          label: '否'
        }
      ],
      options: [],

      activeName: 'first',
      imagesData: {
        hospital: {
          enclosureRos: []
          //医院照片
        },
        renting: {
          enclosureRos: []
          //租房合同
        },
        businessLicense: {
          enclosureRos: []
          //营业执照
        },
        medicalLicense: {
          enclosureRos: []
          //医疗许可证
        },
        operationList: {
          enclosureRos: []
          //手术单
        },
        legalPerson: {
          enclosureRos: []
          //法人
        },
        privateAccount: {
          enclosureRos: []
          //私人账户
        },
        bankCard: {
          enclosureRos: []
          //银行卡
        },
        contractAgreement: {
          enclosureRos: []
          //合同协议
        },
        debtAgreement: {
          enclosureRos: []
          //债权协议
        }
      },

      rules: {
        regName: [
          {
            required: true,
            message: '商户注册名称是必须!',
            trigger: 'blur'
          }
        ],
        realName: [
          {
            required: true,
            message: '实际营业名称是必须!',
            trigger: 'blur'
          }
        ],
        state: [
          {
            required: true,
            message: '状态是必须!',
            trigger: 'blur'
          }
        ],
        saleCode: [
          {
            required: true,
            message: '归属BD是必须!',
            trigger: 'blur'
          }
        ],
        instLicence: [
          {
            required: true,
            message: '统一社会信用代码必须!',
            trigger: 'blur'
          }
        ],
        grade: [
          {
            required: true,
            message: '商户等级是必须!',
            trigger: 'blur'
          }
        ],
        bizProperty: [
          {
            required: true,
            message: '商户性质是必须!',
            trigger: 'blur'
          }
        ],
        coopAgreementExpire: [
          {
            required: true,
            message: '合作(协议)到期时间是必须!',
            trigger: 'blur'
          }
        ],
        establishDateStr: [
          {
            required: true,
            message: '成立时间是必须!',
            trigger: 'blur'
          }
        ],
        postCode: [
          {
            required: true,
            message: '邮政编码是必须!',
            trigger: 'blur'
          }
        ],
        optLimit: [
          {
            required: true,
            message: '经营年限是必须!',
            trigger: 'blur'
          }
        ],
        companyIndustry: [
          {
            required: true,
            message: '所属行业是必须!',
            trigger: 'blur'
          }
        ],
        regAmt: [
          {
            required: true,
            message: '注册资本是必须!',
            trigger: 'blur'
          }
        ],
        latitude: [
          {
            required: true,
            message: '纬度是必须!',
            trigger: 'blur'
          }
        ],
        longitude: [
          {
            required: true,
            message: '经度是必须!',
            trigger: 'blur'
          }
        ],
        addressSize: [
          {
            required: true,
            message: '营业用地面积是必须!',
            trigger: 'blur'
          }
        ],
        addressNature: [
          {
            required: true,
            message: '营业用地性质是必须!',
            trigger: 'blur'
          }
        ],
        employeesNumber: [
          {
            required: true,
            message: '员工人数是必须!',
            trigger: 'blur'
          }
        ],
        monthSales: [
          {
            required: true,
            message: '预计月均交易金额是必须!',
            trigger: 'blur'
          }
        ],
        bizScope: [
          {
            required: true,
            message: '经营范围是必须!',
            trigger: 'blur'
          }
        ],
        branchStatus: [
          {
            required: true,
            message: '分支机构情况是必须!',
            trigger: 'blur'
          }
        ],
        openAccPermit: [
          {
            required: true,
            message: '开户许可证是必须!',
            trigger: 'blur'
          }
        ],
        instTaxNo: [
          {
            required: true,
            message: '税务登记证号是必须!',
            trigger: 'blur'
          }
        ],
        instOrganizationCode: [
          {
            required: true,
            message: '机构代码证号是必须!',
            trigger: 'blur'
          }
        ],
        medicalLicenseExpire: [
          {
            required: true,
            message: '医疗许可证到期日是必须!',
            trigger: 'blur'
          }
        ],
        instLicenceExpire: [
          {
            required: true,
            message: '营业执照到期日期是必须!',
            trigger: 'change'
          }
        ],
        registerAddress: [
          {
            required: true,
            message: '注册地址是必须!',
            trigger: 'blur'
          }
        ],
        businessAddress: [
          {
            required: true,
            message: '营业地址是必须!',
            trigger: 'blur'
          }
        ],
        leaseExpire: [
          {
            required: true,
            message: '租赁场所合同到期日必须!',
            trigger: 'blur'
          }
        ],

        linkerNexusCode: [
          {
            required: true,
            message: '联系人类型必须!',
            trigger: 'blur'
          }
        ],
        reprName: [
          {
            required: true,
            message: '法定代表人姓名必须!',
            trigger: 'blur'
          }
        ],
        reprIdNo: [
          {
            required: true,
            message: '法定代表人身份证号码必须!',
            trigger: 'blur'
          }
        ],
        reprTel: [
          {
            required: true,
            message: '法人手机号码必须!',
            trigger: 'blur'
          }
        ],
        linkerPosition: [
          {
            required: true,
            message: '联系人职位必须!',
            trigger: 'blur'
          }
        ],
        linkerName: [
          {
            required: true,
            message: '联系人姓名必须!',
            trigger: 'blur'
          }
        ],
        linkerTel: [
          {
            required: true,
            message: '联系电话必须!',
            trigger: 'blur'
          }
        ],

        linkerRmail: [
          {
            required: true,
            message: '联系人邮箱必须!',
            trigger: 'blur'
          }
        ],
        registerAddressList: [
          {
            required: true,
            message: '注册地址必须!',
            trigger: 'blur'
          }
        ],
        businessAddressList: [
          {
            required: true,
            message: '营业地址必须!',
            trigger: 'blur'
          }
        ],
        registerAddressListDetail: [
          {
            required: true,
            message: '注册详细地址必须!',
            trigger: 'blur'
          }
        ],
        businessAddressListDetail: [
          {
            required: true,
            message: '营业详细地址必须!',
            trigger: 'blur'
          }
        ],
        memo: [
          {
            required: true,
            message: '请填写备注!',
            trigger: 'blur'
          }
        ]
      },
      instLicenceExpireValue: false, //营业执照到期日
      partnerInfo: {
        partnerNo: '', //商户编号
        regName: '', //商户注册名称
        realName: '', //实际营业名称
        state: '', //状态
        saleCode: '', //归属BD
        grade: '', //商户等级
        bizProperty: '', //商户性质
        coopAgreementExpire: '', //合作(协议)到期时间
        establishDateStr: '', //成立时间(这个会发现和数据库的不一致，多了个str，是当时按照后端的需求改的)
        postCode: '', //邮政编码
        optLimit: '', //经营年限
        companyIndustry: '', //所属行业
        regAmt: '', //注册资本
        latitude: '', //纬度
        longitude: '', //经度
        addressSize: '', //营业用地面积
        addressNature: '', //营业用地性质
        employeesNumber: '', //员工人数
        monthSales: '', //预计月均交易金额
        bizScope: '', //经营范围
        branchStatus: '', //分支机构情况
        instLicence: '', //统一社会信用代码
        openAccPermit: '', //开户许可证
        instTaxNo: '', //税务登记证号
        instOrganizationCode: '', //机构代码证号
        medicalLicenseExpire: '', //医疗许可证到期日
        instLicenceExpire: '', //营业执照到期日期
        managemantMode: '', //机构经营模式
        registerAddress: '', //注册地址
        businessAddress: '', //营业地址
        regionCode: '', //区域code
        regionName: '', //区域名称
        leaseExpire: '', //租赁场所合同到期日
        auditResult: '', //审核结果
        version: '', //版本
        memo: '', //备注
        registerAddressList: [],
        businessAddressList: [],
        registerAddressListDetail: '',
        businessAddressListDetail: ''
      },
      partnerContacts: {
        partnerNo: '', //商户编号
        linkerNexusCode: '', //联系人类型
        reprName: '', //法定代表人姓名
        reprIdNo: '', //法定代表人身份证号码
        reprTel: '', //法人手机号码
        linkerPosition: '', //联系人职位
        linkerName: '', //联系人姓名
        linkerTel: '', //联系电话
        linkerRmail: '', //联系人邮箱
        isDelete: '' //状态
      },
      partnerCard: [], // 银行卡列表

      dialogStatus: {
        action: 'info',
        partnerNo: '1283240860074512384'
      }
    }
  },
  created() {
    this.options = getArea()
    if (this.dialogStatus.partnerNo) {
      // 获取合作商信息
      this.getPartnerDetail({ partnerNo: this.dialogStatus.partnerNo })
      // 获取银行卡列表
      this.getPartnerCard({ partnerNo: this.dialogStatus.partnerNo })
      // 获取商户费率表
      this.getPartnerRate({ partnerNo: this.dialogStatus.partnerNo })
      //获取商户联系人
      this.getPartnerContacts({ partnerNo: this.dialogStatus.partnerNo })
      // 获取商户附件信息
      this.getPartnerAppendix({ partnerNo: this.dialogStatus.partnerNo })
    }
    // 获取支付的银行卡列表
    getBankCodeListData().then(res => {
      if (res.data) {
        res.data.map(item => {
          let obj = {}
          obj.value = item.bankName + '/' + item.bankCode
          obj.label = item.bankName
          this.supportingBanksList.push(obj)
        })
      }
    })
  },
  methods: {
    // 获取商户附件信息
    getPartnerAppendix(payload) {
      getPartnerAppendixData(payload).then(res => {
        if (res.code === 0) {
          for (var item of res.data) {
            if (
              !item.enclosureType ||
              !item.enclosureRos ||
              !item.enclosureRos.length
            ) {
              break
            }
            item.partnerNo = this.dialogStatus.partnerNo
            this.imagesData[item.enclosureType] = item
          }
        }
      })
    },
    // 修改营业执照到期日为长期或者是空
    instLicenceExpireChange(value) {
      this.partnerInfo.instLicenceExpire = value ? '长期' : ''
    },

    getPartnerDetail(payload) {
      getPartnerDetailData(payload).then(res => {
        res.data.registerAddressList = res.data.registerAddress
          .split('/')
          .splice(0, 3) //截取字符串并删除第四个元素
        res.data.businessAddressList = res.data.businessAddress
          .split('/')
          .splice(0, 3) //截取字符串并删除第四个元素

        res.data.registerAddressListDetail = res.data.registerAddress.substring(
          res.data.registerAddress.lastIndexOf('/') + 1,
          res.data.registerAddress.length
        )

        res.data.businessAddressListDetail = res.data.businessAddress.substring(
          res.data.businessAddress.lastIndexOf('/') + 1,
          res.data.businessAddress.length
        )

        this.partnerInfo = res.data

        this.$nextTick(() => {
          this.$refs['partnerInfo'].clearValidate()
        })
      })
    },
    getPartnerContacts(payload) {
      getPartnerContactsData(payload).then(res => {
        if (res.data && res.data.length) {
          this.partnerContacts = res.data[0]
        }
        this.$nextTick(() => {
          this.$refs['partnerContactsInfo'].clearValidate()
        })
      })
    },
    deleteRate(item, index) {
      item.splice(index, 1)
    },
    getPartnerRate(payload) {
      getPartnerRateData(payload).then(res => {
        if (res.code === 0 && res.data && res.data.length > 0) {
          // 加上是否原始数据字段
          res.data.map(item => {
            item.data.map(item2 => {
              item2.isInitRateData = true
            })
          })

          this.partnerRateData = res.data
        } else {
          // 合作商费率为空，获取费率模板
          getRateTemplateData().then(res => {
            // 加上是否原始数据字段
            res.data.map(item => {
              item.data.map(item2 => {
                item2.serviceRate = item2.serviceTariff
                item2.depositRate = item2.depositRatio
                item2.isInitRateData = true
              })
            })
            this.partnerRateData = res.data
          })
        }
      })
    },

    getPartnerCard(payload) {
      getPartnerCardData(payload).then(res => {
        if (res.data && res.data.length) {
          res.data.map(item => {
            item.noToEdit = true // 遍历银行卡添加是否正在编辑的属性，以便后面编辑
            item.isOldDta = true // 遍历银行卡添加是否是旧数据的属性，以便后面做添加
            //整理地址以便显示
            item.openAddress = [
              item.openProvName,
              item.openCityName,
              item.openAreaName
            ]
          })
        }

        this.partnerCard = res.data
      })
    },

    onCloose(val) {
      console.log(val)
      this.close(val)
    },
    partnerSateFormat: function(val) {
      return this.$enumUtils.toMsg('partnerSateEnum', val)
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
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}

.block {
  text-align: center;
}

.el-image {
  border: solid 1px #dcd9d9;
  height: 230px;
  width: 230px;
}
.upload-btn {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
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
  padding-left: 10px;
  max-height: 42px;
  line-height: 42px;
  overflow: hidden;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.isRequired {
  color: red;
}

.el-icon-circle-close {
  color: white;
}
</style>
