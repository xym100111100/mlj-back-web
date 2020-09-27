<template>
  <div>
    <el-dialog
      :title="textMap[dialogStatus.dialogTitle]"
      :visible.sync="dialogStatus.allTabDialogVisible"
      width="70%"
      @close="dialogClose"
    >
      <div style="height:900px;overflow-y: scroll;">
        <el-tabs v-model="dialogStatus.activeName">
          <el-tab-pane
            label="放款卡切换状态变更"
            name="0"
            v-if="this.dialogStatus.model === 0"
          >
            <el-card class="box-card" shadow="always">
              <div slot="header" class="clearfix">
                <span>放款卡切换状态变更</span>
              </div>
              <!-- 放款卡状态信息 -->
              <el-form
                :model="loanStatus"
                label-position="right"
                label-width="170px"
                :inline="true"
                :rules="loanStatusRules"
                ref="workOrderRefs"
                :disabled="this.dialogStatus.disableOptions"
              >
                <el-form-item label="商户注册名称" prop="partnerNo">
                  <el-select
                    v-model="loanStatus.partnerNo"
                    placeholder="请选择"
                    style="width:460px"
                    @change="getParterBankList"
                    :disabled="this.dialogStatus.partnerNoHide"
                  >
                    <el-option
                      v-for="item in regNameOptions"
                      :key="item.partnerNo"
                      :label="item.regName"
                      :value="item.partnerNo"
                    >
                    </el-option>
                    <!-- regName 后面还是需要 在change中获取 -->
                  </el-select>
                </el-form-item>
                <el-form-item label="工单类型" prop="workOrderType">
                  <!-- workOrderTypeEnmu -->
                  <el-select
                    v-model="dialogStatus.workOrderType"
                    clearable
                    disabled
                    placeholder="请选择工单类型"
                    style="width:460px"
                  >
                    <el-option
                      v-for="item in $getEnumUtils.getEnum('workOrderTypeEnmu')"
                      :key="item.code"
                      :label="item.message"
                      :value="item.code"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="更新前数据" prop="beforeUpdateData">
                  <el-input
                    style="width:460px"
                    v-model="loanStatus.beforeUpdateData"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="更新后数据" prop="afterUpdateData">
                  <el-select
                    v-model="loanStatus.afterUpdateData"
                    clearable
                    placeholder="请选择更新后数据"
                    style="width:460px"
                  >
                    <el-option
                      v-for="item in afterUpdateDataOpt"
                      :key="item.cardCertNo"
                      :label="item.message"
                      :value="item.cardCertNo"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <br />

                <el-form-item label="附件" prop="voucherUrl">
                  <AppendUpload
                    title="附件图片"
                    :dialogStatus="dialogStatus"
                    :imagesData="imagesData2.loanCard.enclosureRos"
                    fileType="loanCard"
                  ></AppendUpload>
                </el-form-item>
                <br />

                <el-form-item label="提交原因" prop="reason">
                  <el-input
                    style="width:460px"
                    type="textarea"
                    :rows="4"
                    placeholder="请说明提交原因"
                    v-model="loanStatus.reason"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>

          <el-tab-pane
            label="商户基本信息变更"
            name="1"
            v-if="this.dialogStatus.model === 1"
          >
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>商户基本信息变更</span>
              </div>
              <!-- 商户基本信息 -->
              <el-form
                :model="basicChange"
                label-position="right"
                label-width="170px"
                :inline="true"
                :rules="basicChangeRules"
                ref="workOrderRefs"
                :disabled="this.dialogStatus.disableOptions"
              >
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="商户注册名称" prop="partnerNo">
                      <el-select
                        v-model="basicChange.partnerNo"
                        placeholder="请选择"
                        style="width:190px"
                        @change="getParterBasic"
                        :disabled="this.dialogStatus.partnerNoHide"
                      >
                        <el-option
                          v-for="item in regNameOptions"
                          :key="item.partnerNo"
                          :label="item.regName"
                          :value="item.partnerNo"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="工单类型" prop="workOrderType">
                  <!-- workOrderTypeEnmu -->
                  <el-select
                    v-model="dialogStatus.workOrderType"
                    clearable
                    placeholder="请选择工单类型"
                    style="width:190px"
                    disabled
                  >
                    <el-option
                      v-for="item in $getEnumUtils.getEnum('workOrderTypeEnmu')"
                      :key="item.code"
                      :label="item.message"
                      :value="item.code"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="商户注册名称" prop="regName">
                      <el-input
                        style="width:190px"
                        v-model="basicChange.regName"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="实际营业名称" prop="realName">
                      <el-input
                        style="width:190px"
                        v-model="basicChange.realName"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="注册资本(万元)" prop="regAmt">
                      <el-input
                        style="width:190px"
                        v-model="basicChange.regAmt"
                        oninput="this.value=this.value.replace(/[^\d.]/g,'');"
                        maxlength="5"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="成立日期" prop="establishDate">
                      <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="basicChange.establishDate"
                        style="width:190px"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="注册地址" prop="registerAddressList">
                      <el-cascader
                        style="width:190px"
                        v-model="basicChange.registerAddressList"
                        :options="AreaSelect"
                        :props="{ expandTrigger: 'hover' }"
                      ></el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="注册地址详情"
                      prop="registerAddressListDetail"
                    >
                      <el-input
                        style="width:190px"
                        v-model="basicChange.registerAddressListDetail"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="营业地址" prop="businessAddressList">
                      <el-cascader
                        style="width:190px"
                        v-model="basicChange.businessAddressList"
                        :options="AreaSelect"
                        :props="{ expandTrigger: 'hover' }"
                      ></el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="营业地址详情"
                      prop="businessAddressListDetail"
                    >
                      <el-input
                        style="width:190px"
                        v-model="basicChange.businessAddressListDetail"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="经度(°)" prop="longitude">
                      <el-input
                        style="width:190px"
                        v-model="basicChange.longitude"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="纬度(°)" prop="latitude">
                      <el-input
                        style="width:190px"
                        v-model="basicChange.latitude"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="营业用地面积(㎡)" prop="addressSize">
                      <el-input
                        style="width:190px"
                        v-model="basicChange.addressSize"
                        oninput="this.value=this.value.replace(/[^\d.]/g,'');"
                        maxlength="5"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="营业用地性质" prop="addressNature">
                      <el-select
                        v-model="basicChange.addressNature"
                        clearable
                        placeholder="请选择营业用地性质"
                        style="width:190px"
                      >
                        <el-option
                          v-for="item in $getEnumUtils.getEnum('useNatureEnmu')"
                          :key="item.code"
                          :label="item.message"
                          :value="item.code"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="商户性质" prop="bizProperty">
                      <el-select
                        v-model="basicChange.bizProperty"
                        clearable
                        placeholder="请选择商户性质"
                        style="width:190px"
                      >
                        <el-option
                          v-for="item in $getEnumUtils.getEnum(
                            'merchantNatureEnmu'
                          )"
                          :key="item.code"
                          :label="item.message"
                          :value="item.code"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="员工人数" prop="employeesNumber">
                      <el-input
                        style="width:190px"
                        v-model="basicChange.employeesNumber"
                        oninput="this.value=this.value.replace(/[^\d.]/g,'');"
                        maxlength="5"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="经营范围" prop="bizScope">
                      <el-input
                        style="width:190px"
                        v-model="basicChange.bizScope"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="分支机构情况" prop="branchStatus">
                      <el-select
                        v-model="basicChange.branchStatus"
                        clearable
                        placeholder="请选择分支机构情况"
                        style="width:190px"
                      >
                        <el-option
                          v-for="item in $getEnumUtils.getEnum('branchEnmu')"
                          :key="item.code"
                          :label="item.message"
                          :value="item.code"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="机构经营模式" prop="managemantMode">
                  <el-input
                    style="width:540px"
                    type="textarea"
                    :rows="4"
                    placeholder="请说明机构经营模式"
                    v-model="basicChange.managemantMode"
                  ></el-input>
                </el-form-item>

                <el-form-item label="提交原因" prop="reason">
                  <el-input
                    style="width:540px"
                    type="textarea"
                    :rows="4"
                    placeholder="请说明提交原因"
                    v-model="basicChange.reason"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>

          <el-tab-pane
            label="商户联系人信息变更"
            name="2"
            v-if="this.dialogStatus.model === 2"
          >
            <!-- 商户联系人的卡片 -->
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>商户联系人信息变更</span>
              </div>
              <!-- 添加信息部分 -->
              <el-form
                :model="linkerChange"
                label-position="right"
                label-width="170px"
                :inline="true"
                :rules="linkerChangRules"
                ref="workOrderRefs"
                :disabled="this.dialogStatus.disableOptions"
              >
                <el-form-item label="商户注册名称" prop="partnerNo">
                  <el-select
                    v-model="linkerChange.partnerNo"
                    placeholder="请选择商户名称"
                    style="width:190px"
                    @change="getlinkerChangeList"
                    :disabled="this.dialogStatus.partnerNoHide"
                  >
                    <el-option
                      v-for="item in regNameOptions"
                      :key="item.partnerNo"
                      :label="item.regName"
                      :value="item.partnerNo"
                    >
                      <!-- V-model 绑定了item 添加一个临时变量进行操作 在后面的change方法中 -->
                    </el-option>
                  </el-select>
                </el-form-item>
                <!-- 工单类型 -->
                <el-form-item label="工单类型" prop="workOrderType">
                  <el-select
                    v-model="dialogStatus.workOrderType"
                    placeholder="工单类型"
                    clearable
                    disabled
                    style="width:190px"
                  >
                    <el-option
                      v-for="item in $getEnumUtils.getEnum('workOrderTypeEnmu')"
                      :key="item.code"
                      :label="item.message"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <!-- 联系人信息 --- 联系人名字 --- 联系人职位 --- 联系人电话 -->
                <br />
                <el-form-item label="联系人名字" prop="linkerName">
                  <el-input
                    style="width:190px"
                    v-model="linkerChange.linkerName"
                  />
                </el-form-item>

                <el-form-item label="联系人职位" prop="linkerPosition">
                  <el-input
                    style="width:190px"
                    v-model="linkerChange.linkerPosition"
                  />
                </el-form-item>

                <el-form-item label="联系人电话" prop="linkerTel">
                  <el-input
                    style="width:190px"
                    v-model="linkerChange.linkerTel"
                  />
                </el-form-item>
                <br />
                <!-- 提交原因 -->
                <el-form-item label="提交原因" prop="reason">
                  <el-input
                    style="width:560px"
                    type="textarea"
                    :rows="4"
                    placeholder="请说明提交原因"
                    v-model="linkerChange.reason"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
          <el-tab-pane
            label="商户附件信息变更"
            name="3"
            v-if="this.dialogStatus.model === 3"
          >
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>商户附件信息变更</span>
              </div>
              <el-form
                :model="appendixChange"
                label-position="right"
                label-width="170px"
                :inline="true"
                :rules="appendixChangeRules"
                ref="workOrderRefs"
                :disabled="this.dialogStatus.disableOptions"
              >
                <!-- 添加信息部分 -->
                <el-form-item label="商户注册名称" prop="regName">
                  <el-select
                    v-model="appendixChange.partnerNo"
                    placeholder="请选择商户名称"
                    style="width:190px"
                    :disabled="this.dialogStatus.partnerNoHide"
                    @change="getAppendixChangeOpt"
                  >
                    <el-option
                      v-for="item in regNameOptions"
                      :key="item.partnerNo"
                      :label="item.regName"
                      :value="item.partnerNo"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <br />
                <!-- 工单类型 -->
                <el-form-item label="工单类型" prop="workOrderType">
                  <el-select
                    v-model="dialogStatus.workOrderType"
                    placeholder="工单类型"
                    clearable
                    disabled
                    style="width:190px"
                  >
                    <el-option
                      v-for="item in $getEnumUtils.getEnum('workOrderTypeEnmu')"
                      :key="item.code"
                      :label="item.message"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <br />
                <!-- 附件 -->
                <!-- 商户注册名称 -->
                <!-- 医院照片 -->
                <el-row :gutter="20">
                  <el-col :span="8">
                    <AppendUpload
                      title="医院照片"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData1.hospital.enclosureRos"
                      fileType="hospital"
                    ></AppendUpload>
                  </el-col>

                  <el-col :span="8">
                    <AppendUpload
                      title="医院照片"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData.hospital.enclosureRos"
                      fileType="hospital"
                    ></AppendUpload>
                  </el-col>
                  <el-col :span="8">
                    <div class="messageData"></div>
                  </el-col>
                </el-row>
                <!-- 租房合同 -->
                <el-row :gutter="20">
                  <el-col :span="8">
                    <AppendUpload
                      title="租房合同"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData1.renting.enclosureRos"
                      fileType="renting"
                    ></AppendUpload>
                  </el-col>

                  <el-col :span="8">
                    <AppendUpload
                      title="租房合同"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData.renting.enclosureRos"
                      fileType="renting"
                    ></AppendUpload>
                  </el-col>
                  <el-col :span="8">
                    <div class="messageData">
                      <span class="demonstration">租赁场所合同到期日期 </span>
                      <el-date-picker
                        v-model="appendixChange.leaseExpire"
                        type="datetime"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                      >
                      </el-date-picker>
                    </div>
                  </el-col>
                </el-row>
                <!-- 营业执照 -->
                <el-row :gutter="30">
                  <el-col :span="8">
                    <AppendUpload
                      title="营业执照"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData1.businessLicense.enclosureRos"
                      fileType="businessLicense"
                    ></AppendUpload>
                  </el-col>

                  <el-col :span="8">
                    <AppendUpload
                      title="营业执照"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData.businessLicense.enclosureRos"
                      fileType="businessLicense"
                    ></AppendUpload>
                  </el-col>
                  <el-col :span="8">
                    <div class="messageData">
                      <span class="demonstration">营业执照到期日期</span>
                      <el-date-picker
                        v-model="appendixChange.instLicenceExpire"
                        type="datetime"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                      >
                      </el-date-picker>
                    </div>
                  </el-col>
                </el-row>
                <!-- 医疗许可证 -->
                <el-row :gutter="20">
                  <el-col :span="8">
                    <AppendUpload
                      title="医疗许可证"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData1.medicalLicense.enclosureRos"
                      fileType="medicalLicense"
                    ></AppendUpload>
                  </el-col>

                  <el-col :span="8">
                    <AppendUpload
                      title="医疗许可证"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData.medicalLicense.enclosureRos"
                      fileType="medicalLicense"
                    ></AppendUpload>
                  </el-col>
                  <el-col :span="8">
                    <div class="messageData">
                      <span class="demonstration">医疗许可证到期日期 </span>
                      <!-- v-model="appendixChange.medicalLicenseExpire" -->
                      <el-date-picker
                        v-model="appendixChange.medicalLicenseExpire"
                        type="datetime"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                      >
                      </el-date-picker>
                    </div>
                  </el-col>
                </el-row>
                <!-- 手术单 -->
                <el-row :gutter="20">
                  <el-col :span="8">
                    <AppendUpload
                      title="手术单"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData1.operationList.enclosureRos"
                      fileType="operationList"
                    ></AppendUpload>
                  </el-col>

                  <el-col :span="8">
                    <AppendUpload
                      title="手术单"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData.operationList.enclosureRos"
                      fileType="operationList"
                    ></AppendUpload>
                  </el-col>
                  <el-col :span="8">
                    <div class="messageData"></div>
                  </el-col>
                </el-row>
                <!-- 法人证件 -->
                <el-row :gutter="20">
                  <el-col :span="8">
                    <AppendUpload
                      title="法人证件"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData1.legalPerson.enclosureRos"
                      fileType="legalPerson"
                    ></AppendUpload>
                  </el-col>

                  <el-col :span="8">
                    <AppendUpload
                      title="法人证件"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData.legalPerson.enclosureRos"
                      fileType="legalPerson"
                    ></AppendUpload>
                  </el-col>
                  <el-col :span="8">
                    <!-- <div class="messageData"> -->
                    <span> 法人姓名:</span>
                    <el-input
                      class="inputCss"
                      v-model="appendixChange.reprName"
                      placeholder="请输入法人姓名"
                      size="small"
                      style="width: 240px"
                    ></el-input>
                    <br />
                    <span> 身份证号:</span>
                    <el-input
                      v-model="appendixChange.reprIdNo"
                      placeholder="请输入身份证号"
                      size="small"
                      style="width: 240px"
                      oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                    ></el-input>
                    <!-- </div> -->
                  </el-col>
                </el-row>

                <!-- 对私账户身份证 -->
                <el-row :gutter="20">
                  <el-col :span="8">
                    <AppendUpload
                      title="对私账户身份证"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData1.privateAccount.enclosureRos"
                      fileType="privateAccount"
                    ></AppendUpload>
                  </el-col>

                  <el-col :span="8">
                    <AppendUpload
                      title="对私账户身份证"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData.privateAccount.enclosureRos"
                      fileType="privateAccount"
                    ></AppendUpload>
                  </el-col>
                  <el-col :span="8">
                    <div class="messageData"></div>
                  </el-col>
                </el-row>

                <!--  银行卡-->
                <el-row :gutter="20">
                  <el-col :span="8">
                    <AppendUpload
                      title="银行卡"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData1.bankCard.enclosureRos"
                      fileType="bankCard"
                    ></AppendUpload>
                  </el-col>

                  <el-col :span="8">
                    <AppendUpload
                      title="银行卡"
                      :dialogStatus="dialogStatus"
                      :imagesData="imagesData.bankCard.enclosureRos"
                      fileType="bankCard"
                    ></AppendUpload>
                  </el-col>
                  <el-col :span="8">
                    <div class="messageData"></div>
                  </el-col>
                </el-row>
                <br />
                <!-- 提交原因 -->
                <el-form-item label="提交原因" prop="reason">
                  <el-input
                    style="width:600px"
                    type="textarea"
                    :rows="4"
                    placeholder="请说明提交原因"
                    v-model="appendixChange.reason"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>

          <el-tab-pane
            label="商户合作协议变更"
            name="4"
            v-if="this.dialogStatus.model === 4"
          >
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>商户合作协议变更</span>
              </div>
              <el-form
                :model="cooperationChange"
                label-position="right"
                label-width="170px"
                :inline="true"
                :rules="cooperationChangeRules"
                ref="workOrderRefs"
                :disabled="this.dialogStatus.disableOptions"
              >
                <!-- 添加信息部分 -->
                <el-form-item label="商户注册名称" prop="regName">
                  <el-select
                    v-model="cooperationChange.regName"
                    placeholder="请选择商户名称"
                    @change="
                      cooperationChangeList({
                        regName: cooperationChange.regName
                      })
                    "
                    :disabled="this.dialogStatus.partnerNoHide"
                  >
                    <el-option
                      v-for="item in regNameOptions"
                      :key="item.partnerNo"
                      :label="item.regName"
                      :value="item.partnerNo"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <br />
                <!-- 工单类型 -->
                <el-form-item label="工单类型" prop="workOrderType">
                  <el-select
                    v-model="dialogStatus.workOrderType"
                    placeholder="工单类型"
                    clearable
                    disabled
                  >
                    <el-option
                      v-for="item in $getEnumUtils.getEnum('workOrderTypeEnmu')"
                      :key="item.code"
                      :label="item.message"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <br />

                <!-- 合同类型  -- 合同附件 -->
                <el-form-item label="合同类型" prop="contractType">
                  <el-select
                    v-model="cooperationChange.contractType"
                    placeholder="合同类型"
                    clearable
                  >
                    <el-option
                      v-for="item in $getEnumUtils.getEnum('ContractTypeEnmu')"
                      :key="item.code"
                      :label="item.message"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <br />
                <el-form-item label="合同附件" props="contractEnclosure">
                  <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false"
                  >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{ file }">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url"
                        alt=""
                      />
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                  <el-dialog :visible.sync="pictureDialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                  </el-dialog>
                </el-form-item>
                <br />

                <!-- 提交原因 -->
                <el-form-item label="提交原因" prop="reason">
                  <el-input
                    style="width:560px"
                    type="textarea"
                    :rows="4"
                    placeholder="请说明提交原因"
                    v-model="cooperationChange.reason"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button
          v-if="this.dialogStatus.cancelButton"
          @click="dialogStatus.allTabDialogVisible = false"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="addWorkOrderList('workOrderRefs', dialogStatus.model)"
          v-if="this.dialogStatus.submitWorkOrder"
          >新 建 工 单</el-button
        >
        <el-button
          type="primary"
          v-if="this.dialogStatus.determineButton"
          @click="editWorkOrderOpt('workOrderRefs', dialogStatus.model)"
          >完成编辑</el-button
        >
        <el-button
          type="primary"
          v-if="this.dialogStatus.closeButton"
          @click="dialogStatus.allTabDialogVisible = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getParterBankListData, // 放款卡切换状态 change
  getParterBasicData, // 商户基本信息 change
  getlinkerChangeListData, // 商户联系人信息变更的change
  cooperationChangeData, // 商户合作协议信息变更的change
  getAppendixChangeData, // 商户附件信息变更点击change
  // 点击查看--提交获取到对应信息
  getLoanCardDetailsData,
  getBasicChangeData,
  getLinkerChangeData,
  getAppendixData,
  getCooperationChangeData,
  // 提交点击 -- 改变工单状态
  submitWorkOrderData,
  getRegNameOptionsData, // 获取商户注册名称
  // 点击新建工单按钮的新建操作 5 个
  addLoanCardOrderData, // 点击新建放款卡工单
  addBasicInfoOrderData, // 点击新建商户基本信息工单
  addContactInfoOrderData, // 点击新建联系人信息工单
  addAppendixChangeData, // 点击新建附件信息变更工单
  // 点击编辑工单
  editLoanCardOrderData,
  editBasicInfoOrderData,
  editContactInfoOrderData,
  editAppendixData
} from '@/api/workOrder'
import getArea from '../../../utils/area'
import AppendUpload from './appendUpload'
import moment from 'moment'
export default {
  name: 'loanCardStatusDialog',
  components: {
    AppendUpload
  },
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
  created() {
    this.AreaSelect = getArea()
    if (this.dialogStatus.workOrderNo) {
      switch (this.dialogStatus.model) {
        case 0:
          // 放款卡可切换状态变更
          this.getLoanCardDetails({
            workOrderNo: this.dialogStatus.workOrderNo
          })

          break
        case 1:
          // 商户基本信息查看
          this.getbasicChangeDetails({
            workOrderNo: this.dialogStatus.workOrderNo
          })
          break
        case 2:
          // 商户联系人信息查看
          this.getlinkerChangeDetails({
            workOrderNo: this.dialogStatus.workOrderNo
          })
          break
        case 3:
          // 商户附件信息变更
          this.getappendixChangeDetails({
            workOrderNo: this.dialogStatus.workOrderNo
          })
          break
        case 4:
          // 商户合作协议查看 getcooperationChangeDetails
          this.getcooperationChangeDetails({
            workOrderNo: this.dialogStatus.workOrderNo
          })
          break
      }

      // 商户注册名称信息
      this.getRegNameOptions()
    } else {
      this.getRegNameOptions()
    }
  },
  data() {
    return {
      checked: true,
      dialogVisible: true,
      // 数据模拟
      // 放款卡状态数据
      loanStatus: {
        regName: undefined,
        afterUpdateData: undefined,
        beforeUpdateData: '',
        reason: undefined,
        workOrderType: undefined,
        partnerNo: undefined,
        voucherUrl: ''
      },
      // 基本信息数据
      basicChange: {
        regName: undefined,
        workOrderType: undefined,
        realName: undefined,
        regAmt: undefined,
        establishDate: '',
        registerAddress: undefined,
        businessAddress: undefined,
        longitude: undefined,
        latitude: undefined,
        addressSize: undefined,
        addressNature: undefined,
        bizProperty: undefined,
        employeesNumber: undefined,
        monthSales: undefined,
        companyIndustry: undefined,
        bizScope: undefined,
        branchStatus: undefined,
        managemantMode: undefined,
        reason: undefined,
        workOrderType: 2,
        state: undefined
      },
      // 商户联系人数据
      linkerChange: {
        regName: undefined,
        workOrderType: '商户联系人信息变更',
        linkerPosition: undefined,
        linkerName: undefined,
        linkerTel: undefined,
        reason: undefined,
        partnerNo: undefined,
        state: undefined
      },

      // 附件信息数据
      appendixChange: {
        // adminUserNo: undefined,
        instLicenceExpire: undefined,
        leaseExpire: undefined,
        medicalLicenseExpire: undefined,
        operatorName: undefined,
        partnerModifyEnclosure: [],
        partnerNo: undefined,
        reason: undefined,
        regName: undefined,
        reprIdNo: undefined,
        reprName: undefined,
        state: undefined
        // workOrderNo: undefined
      },
      // 合作协议变更数据
      cooperationChange: {
        regName: undefined,
        workOrderType: undefined,
        contractType: undefined,
        reason: undefined
      },
      // 放款银行卡状态校验规则 --- 第一个面板
      loanStatusRules: {
        reason: [
          {
            required: true,
            message: '请填写提交原因',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 40,
            message: '长度在 3 到 40 个字符',
            trigger: 'blur'
          }
        ],
        partnerNo: [
          {
            required: true,
            message: '请选择商户活动名称',
            trigger: 'change'
          }
        ]
      },

      // 商户基本信息变更表单校验规则
      basicChangeRules: {
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
            message: '请填写商户实际名称!',
            trigger: 'blur'
          }
        ],
        regAmt: [
          {
            required: true,
            message: '请输入注册资本(万元)',
            trigger: 'blur'
          }
        ],
        establishDate: [
          {
            required: true,
            message: '请选择成立日期!',
            trigger: 'blur'
          }
        ],
        registerAddressList: [
          {
            required: true,
            message: '请选择注册地址!',
            trigger: 'blur'
          }
        ],
        businessAddressList: [
          {
            required: true,
            message: '请选择营业地址!',
            trigger: 'blur'
          }
        ],
        longitude: [
          {
            required: true,
            message: '请填写经度!',
            trigger: 'blur'
          }
        ],
        latitude: [
          {
            required: true,
            message: '请填写纬度!',
            trigger: 'blur'
          }
        ],
        addressSize: [
          {
            required: true,
            message: '请填写营业用地面积!',
            trigger: 'blur'
          }
        ],
        addressNature: [
          {
            required: true,
            message: '请选择营业用地性质!',
            trigger: 'blur'
          }
        ],
        bizProperty: [
          {
            required: true,
            message: '请选择商户性质!',
            trigger: 'blur'
          }
        ],
        employeesNumber: [
          {
            required: true,
            message: '请填写员工人数!',
            trigger: 'blur'
          }
        ],
        monthSales: [
          {
            required: true,
            message: '预计月均交易金额(万元)!',
            trigger: 'blur'
          }
        ],
        companyIndustry: [
          {
            required: true,
            message: '请选择所属行业!',
            trigger: 'blur'
          }
        ],
        bizScope: [
          {
            required: true,
            message: '请填写经营范围!',
            trigger: 'blur'
          }
        ],
        branchStatus: [
          {
            required: true,
            message: '请选择分支机构情况!',
            trigger: 'blur'
          }
        ],
        managemantMode: [
          {
            required: true,
            message: '请说明机构经营模式',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 40,
            message: '长度在 3 到 40 个字符',
            trigger: 'blur'
          }
        ],
        reason: [
          {
            required: true,
            message: '请说明提交原因',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 40,
            message: '长度在 3 到 40 个字符',
            trigger: 'blur'
          }
        ]
      },
      // 商户联系人表单校验规则
      linkerChangRules: {
        // 可以在pattern中书写正则，并且配合elementUI进行表单验证。
        // pattern 属性规定用于验证输入字段的模式。模式指的是正则表达式。
        partnerNo: [
          {
            required: true,
            message: '商户注册名称是必须!',
            trigger: 'blur'
          }
        ],
        linkerName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字符'
          },
          {
            pattern: /^[\u4E00-\u9FA5]+$/,
            message: '用户名只能为中文',
            trigger: 'blur'
          }
        ],
        linkerTel: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: ['change', 'blur']
          }
        ],
        linkerPosition: [
          {
            required: true,
            message: '请输入职位名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 5 个字符'
          }
        ],
        reason: [
          {
            required: true,
            message: '请说明提交原因',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 40,
            message: '长度在 5 到 40 个字符'
          }
        ]
      },
      // 商户附件信息变更表单信息
      appendixChangeRules: {
        partnerNo: [
          {
            required: true,
            message: '请选择商户活动名称',
            trigger: 'change'
          }
        ]
      },
      // 商户合作协议变更表单数据校验
      cooperationChangeRules: {
        partnerNo: [
          {
            required: true,
            message: '请选择商户活动名称',
            trigger: ['blur', 'change']
          }
        ],
        contractType: [
          {
            required: true,
            message: '请选择合同类型',
            trigger: ['blur', 'change']
          }
        ],
        reason: [
          {
            required: true,
            message: '请说明提交原因',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 40,
            message: '长度在 5 到 40 个字符'
          }
        ]
      },

      // 查看图片数据
      dialogImageUrl: '',
      pictureDialogVisible: false,
      disabled: false,
      // 弹框动态标题
      textMap: {
        create: '工单新建',
        info: '工单详情',
        edit: '工单编辑'
      },
      // 弹框商户注册名称数据
      regNameTemp: [],
      regNameOptions: [],
      // 更新后的数据
      afterUpdateDataOpt: [],
      // 回显图片数组
      imagesData1: {
        // 附件信息变更----------------------------------------------
        // 医院信息
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
      // 上传图片数组 附件变更
      imagesData: {
        // 附件信息变更----------------------------------------------
        // 医院信息
        hospital: {
          enclosureRos: []
          // 医院照片
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
        }
        // contractAgreement: {
        //   enclosureRos: []
        // },
        // debtAgreement: {
        //   enclosureRos: []
        // }
      },
      // 上传放款卡变更 图片
      imagesData2: {
        loanCard: {
          enclosureRos: []
        }
      }
      // 控制隐藏图片的上传和编辑按钮
    }
  },
  methods: {
    // 图片上传查看大图点击事件

    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.pictureDialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    // 商户基本信息请求
    getParterBasic(val) {
      getParterBasicData({ partnerNo: val })
        .then(res => {
          //  下面是处理地址信息
          // 注册地址
          res.data.registerAddressList = res.data.registerAddress
            .split('/')
            .splice(0, 3) //截取字符串并删除第四个元素
          // 营业地址
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
          if (res.code !== 0) throw res.msg
          res.data.establishDate = res.data.establishDateStr
          this.basicChange = res.data
        })
        .catch(err => err)
    },
    // getParterBankList 放款卡切换状态
    getParterBankList(val) {
      console.log(val)
      getParterBankListData({ partnerNo: val })
        .then(res => {
          if (res.code !== 0) throw res.msg
          res.data.forEach(item => {
            let afterObj = {}
            afterObj.cardCertNo = item.cardCertNo
            afterObj.message = item.cardCertNo
            this.afterUpdateDataOpt.push(afterObj)
          })
          this.loanStatus.beforeUpdateData = res.data[0].cardCertNo
          let loanRegName = this.regNameOptions.find((item, index) => {
            return item.partnerNo === val
          })
          this.loanStatus.regName = loanRegName.regName
        })
        .catch(err => err)
    },
    // 商户合作协议变更change点击事件
    cooperationChangeList(val) {
      cooperationChangeData(val)
        .then(res => {
          if (res.code !== 0) throw res.msg
          this.cooperationChange = res.data
        })
        .catch(err => err)
    },
    // 商户联系人点击change事件
    getlinkerChangeList(val) {
      // console.log(typeof val)
      getlinkerChangeListData({ partnerNo: val })
        .then(res => {
          if (res.code !== 0) throw res.msg
          let regNameData = this.regNameOptions.find((item, index) => {
            return item.partnerNo === val
          })
          this.linkerChange = { ...res.data[0], regName: regNameData.regName }
        })
        .catch(err => err)
    },
    // 商户附件信息点击change事件
    getAppendixChangeOpt(val) {
      getAppendixChangeData({ partnerNo: this.appendixChange.partnerNo })
        .then(res => {
          if (res.code == 0) {
            for (var item of res.data) {
              if (
                !item.enclosureType ||
                !item.enclosureRos ||
                !item.enclosureRos.length
              ) {
                break
              }
              this.imagesData1[item.enclosureType] = item
            }
            let appendixName = this.regNameOptions.find((item, index) => {
              return item.partnerNo === val
            })
            this.appendixChange.regName = appendixName.regName
          }
        })
        .catch(err => err)
    },

    // 新增工单 -- 弹框点击确定 -- 校验表单 -- 提交工单
    // /workOrder/addBasicInfoOrder
    addWorkOrderList(workOrderRefs, model) {
      let doActions
      console.log(model)
      switch (model) {
        case 0:
          this.loanStatus.voucherUrl = this.imagesData2.loanCard.enclosureRos[0].enclosureUrl
          doActions = addLoanCardOrderData
          break
        case 1:
          this.basicChange.establishDate = moment(
            this.basicChange.establishDate
          ).format('YYYY-MM-DD')
          doActions = addBasicInfoOrderData
          this.basicChange.registerAddress =
            this.basicChange.registerAddressList.join('/') +
            '/' +
            this.basicChange.registerAddressListDetail
          this.basicChange.businessAddress =
            this.basicChange.businessAddressList.join('/') +
            '/' +
            this.basicChange.businessAddressListDetail
          break
        case 2:
          doActions = addContactInfoOrderData
          break
        case 3:
          for (var i in this.imagesData) {
            console.log(this.imagesData[i])
            this.imagesData[i].enclosureRos.map(item2 => {
              this.appendixChange.partnerModifyEnclosure.push(item2)
            })
          }
          doActions = addAppendixChangeData
          break
        case 4:
          doActions = addLoanCardOrderData
          break
      }
      this.$refs['workOrderRefs'].validate(valid => {
        if (valid) {
          doActions(this[this.dialogStatus.doActionData])
            .then(res => {
              if (res.code === 0) {
                this.dialogStatus.allTabDialogVisible = false
                this.$refs[workOrderRefs].resetFields()
                this.dialogClose()
                this.$notify({
                  message: '创建成功',
                  type: 'success'
                })
              } else {
                this.$notify({
                  title: '提示',
                  message: '失败!!',
                  type: 'error'
                })
              }
            })
            .catch(err => err)
        }
      })
    },
    // 点击查看和提交加载
    // 点击查看放款卡信息
    getLoanCardDetails(val) {
      getLoanCardDetailsData(val)
        .then(res => {
          if (res.code !== 0) throw res.msg
          this.loanStatus = res.data
          this.loanStatus.partnerNo = res.data.regName
          this.imagesData2.loanCard.enclosureRos.push({
            enclosureUrl: res.data.voucherUrl
          })
          console.log(this.imagesData2.loanCard.enclosureRos)
        })
        .catch(err => err)
    },
    // 点击查看商户基础信息
    getbasicChangeDetails(val) {
      getBasicChangeData(val)
        .then(res => {
          //  下面是处理地址信息
          // 注册地址
          res.data.registerAddressList = res.data.registerAddress
            .split('/')
            .splice(0, 3) //截取字符串并删除第四个元素
          // 营业地址
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
          if (res.code !== 0) throw res.msg
          this.basicChange = res.data
          // 在点击提交的时候可以看到商户注册名称的回显

          this.basicChange.partnerNo = res.data.regName
        })
        .catch(err => err)
    },
    // 点击查看商户联系人信息
    getlinkerChangeDetails(val) {
      getLinkerChangeData(val)
        .then(res => {
          if (res.code !== 0) throw res.msg
          this.linkerChange = res.data
          // 在点击提交的时候可以看到商户注册名称的回显
          this.linkerChange.partnerNo = res.data.regName
        })
        .catch(err => err)
    },
    // 点击查看商户附件信息  编辑
    getappendixChangeDetails(val) {
      getAppendixData(val)
        .then(res => {
          console.log(res.data)
          if (res.code !== 0) throw res.msg
          this.appendixChange = res.data
          // 回显第一列
          this.getAppendixChangeOpt(this.appendixChange.partnerNo)
          // 在点击提交的时候可以看到商户注册名称的回显
          res.data.partnerModifyEnclosure.map(item => {
            this.imagesData[item.enclosureType].enclosureRos.push(item)
          })
        })
        .catch(err => err)
    },

    // 点击查看商户合作协议变更
    getcooperationChangeDetails(val) {
      getCooperationChangeData(val)
        .then(res => {
          if (res.code !== 0) throw res.msg
          this.cooperationChange = res.data
          // 在点击提交的时候可以看到商户注册名称的回显
          this.cooperationChange.partnerNo = res.data.regName
        })
        .catch(err => err)
    },

    // 点击完成编辑操作
    editWorkOrderOpt(workOrderRefs, model) {
      console.log(model)
      this.$confirm('是否确认完成编辑', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let submitActions
          switch (model) {
            case 0:
              this.loanStatus.state = 1
              this.loanStatus.voucherUrl = this.imagesData2.loanCard.enclosureRos[0].enclosureUrl
              submitActions = editLoanCardOrderData(this.loanStatus)

              break
            case 1:
              this.basicChange.state = 1
              this.basicChange.establishDate = moment(
                this.basicChange.establishDate
              ).format('YYYY-MM-DD')
              submitActions = editBasicInfoOrderData(this.basicChange)
              this.basicChange.registerAddress =
                this.basicChange.registerAddressList.join('/') +
                '/' +
                this.basicChange.registerAddressListDetail
              this.basicChange.businessAddress =
                this.basicChange.businessAddressList.join('/') +
                '/' +
                this.basicChange.businessAddressListDetail
              break
            case 2:
              this.linkerChange.state = 1
              submitActions = editContactInfoOrderData(this.linkerChange)
              break
            case 3:
              // 完成编辑之前先对要上传的图片数组进行重置
              this.appendixChange.state = 1
              this.appendixChange.partnerModifyEnclosure = []
              console.log(this.appendixChange.partnerModifyEnclosure)
              for (var i in this.imagesData) {
                this.imagesData[i].enclosureRos.map(item2 => {
                  this.appendixChange.partnerModifyEnclosure.push(item2)
                })
              }
              submitActions = editAppendixData(this.appendixChange)
              break
            // case 4:
            //   submitActions = editLoanCardOrderData
            //   break
          }

          submitActions.then(res => {
            if (res.code === 0) {
              this.$notify({
                message: '编辑成功',
                type: 'success'
              })
              this.dialogClose()
            } else {
              this.$notify({
                message: '编辑失败',
                type: 'error'
              })
            }
          })
        })
        .catch(err => err)
    },

    // 弹框created 请求regName 商户注册名称
    getRegNameOptions() {
      getRegNameOptionsData().then(res => {
        if (res.code == 0) {
          this.regNameTemp = res.data
          // console.log(this.regNameTemp)
          this.regNameTemp.forEach(item => {
            let tempObj = {}
            tempObj.partnerNo = item.partnerNo
            tempObj.regName = item.regName
            this.regNameOptions.push(tempObj)
          })
        }
      })
    }
  }
}
</script>
<style scoped>
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
.el-image image {
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
.inputCss {
  margin-bottom: 30px;
}

.messageData {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
