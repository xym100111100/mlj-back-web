<template>
  <div class="content-text">
    <h2>客户信息</h2>
    <div class="content-table">
      <table id="content">
        <!-- --- -->
        <tr>
          <th>真实姓名：</th>
          <td>{{ clinetPersonData .realName }}</td>
          <th>客户用户名：</th>
          <td>{{ clinetPersonData .userName }}</td>
          <th>用户昵称：</th>
          <td>{{ clinetPersonData .nickName }}</td>
        </tr>
        <!-- --- -->
        <tr>
          <th>手机号码：</th>
          <td>{{ clinetPersonData .cell }}</td>
          <th>微信：</th>
          <td>{{ clinetPersonData .wechatNo }}</td>
          <th>qq：</th>
          <td>{{ clinetPersonData .qq }}</td>
        </tr>
        <!-- --- -->
        <tr>
          <th>邮箱：</th>
          <td>{{ clinetPersonData .email }}</td>
          <th>出生年月：</th>
          <td>{{ clinetPersonData .birthday }}</td>
          <th>学历：</th>
          <td>{{ clinetPersonData .educationCode }}</td>
        </tr>
        <!-- --- -->
        <tr>
          <th>已绑定的产品类型：</th>
          <td>{{ clinetPersonData .alreadyProductType }}</td>
          <th>婚姻状况：</th>
          <td>{{ clinetPersonData .maritalCode }}</td>
          <th>性别：</th>
          <td>{{ clinetPersonData .sex }}</td>
        </tr>
        <!-- --- -->
        <tr>
          <th>客户状态：</th>
          <td>{{ clinetPersonData .state }}</td>

          <th>家庭月收入：</th>
          <td>{{ clinetPersonData .familyMonthlyIncome }}</td>
          <th>工作省名称：</th>
          <td>{{ clinetPersonData .workProvinceName }}</td>
        </tr>
        <!-- --- -->
        <tr>
          <th>工作城市：</th>
          <td>{{ clinetPersonData .workCityCode }}</td>
          <th>工作详细地址：</th>
          <td>{{ clinetPersonData .workAddress }}</td>
          <th>工作行业：</th>
          <td>{{ clinetPersonData .workIndustryCode }}</td>
        </tr>
        <!-- --- -->
        <tr>
          <th>公司全名：</th>
          <td>{{ clinetPersonData .firmName }}</td>
          <th>公司电话：</th>
          <td>{{ clinetPersonData .companyPhone }}</td>
          <th>工作市名称：</th>
          <td>{{ clinetPersonData .workCityName }}</td>
        </tr>
        <!-- --- -->
        <tr>
          <th>工作区名称：</th>
          <td>{{ clinetPersonData .workAreaName }}</td>
          <th>居住省名称：</th>
          <td>{{ clinetPersonData .liveProvinceName }}</td>
          <th>居住市名称：</th>
          <td>{{ clinetPersonData .liveCityName }}</td>
        </tr>
        <!-- --- -->
        <tr>
          <th>居住区名称：</th>
          <td>{{ clinetPersonData .liveAreaName }}</td>
          <th>居住详细地址：</th>
          <td>{{ clinetPersonData .addressDetail }}</td>
          <th>车牌号：</th>
          <td>{{ clinetPersonData .licensePlate }}</td>
        </tr>
        <!-- --- -->
        <tr>
          <th>创建时间：</th>
          <td>{{ clinetPersonData .createdTime }}</td>
          <th>修改时间：</th>
          <td>{{ clinetPersonData .modifiedTime }}</td>
          <th>首次登陆时间：</th>
          <td>{{ clinetPersonData .firstLogin }}</td>
        </tr>
        <!-- --- -->
        <tr>
          <th>最后登陆时间：</th>
          <td>{{ clinetPersonData .lastLogin }}</td>
        </tr>
      </table>

      <div class="btn">
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import loanInfoDialog from '../loan/LoanInfoDialog'

import moment from 'moment'

import {
  getClientDetailData
} from '@/api/client'

export default {
  name: 'ClientInfoDetail',
  data() {
    return {
      clinetPersonData : {
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
      }
    }
  },
  created() {
    getClientDetailData({ clientNo: this.$route.query.clientNo }).then(res => {
      if (res.code === 0) {
        this.clinetPersonData  = res.data
      }
    })
  },

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.content-text {
  width: 95%;
  margin: auto;
}

.content-text h2 {
  margin: 45px 0 0.8em;
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
</style>
