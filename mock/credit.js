// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到
import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    creditRecordNo: i,
    clientNo:i,
    productName: '美丽金',
    clientName: '@cname',
    cell: '18278904219',
    bdname: '@cname',
    artificialAmt: /[1-8]{4}/,
    createdTime: '@datetime("yyyy-MM-dd")',
    'creditType|1': ['1', '2'],
    'state|1': ['0', '1', '2', '3', '4'],
    clientNo:new Date().getTime()
  }))
}

export default [{
    url: '/credit/getNormalCreditRecordList',
    type: 'post',
    response: config => {
      const data = config.body
      const {
        state,
        title,
        limit,
        page
      } = data

      let mockList = List.filter(item => {
        if (state && item.state !== state) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })


      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 0,
        data: {
          total: mockList.length,
          records: pageList
        }
      }

    }
  },
  {
    url: '/client/getClientBaseInfo',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: {
          realName:'杰克',
          educationCode:2,
          createdTime: new Date(), //创建时间、申请时间
          creditType: '普通授信', //授信类型
          state: '1', //状态
          clientName: '王旭强', //客户姓名
          cell: '1820798017934', //手机号码
          certNo: '450521199602206131', //身份证号
          educationCode: '博士', //学历
          maritalCode: '1', //婚姻状况
          age: '13', //年龄
          liveProvinceName: '广东省深圳市', //居住省份/城市
          addressDetail: '幸福里520号', //居住详细地址
          firmName: '保护伞公司', //公司名称
          workProvinceName: '广西北海市', //工作省份/城市
          workAddress: '1022号房', //工作详细地址
          wechatNo: 'xym100111100', //微信
          idCardAddress: '广西合浦县山口镇永安村', //户籍地
          salesmanName: '小茗同学', //bd名称
          contactsName: '你爸', //紧急联系人名字
          kinship: '上帝', //与客户关系
          contactsCell: '1892899373', //紧急联系人电话
          isSupplement: '是', //是否需要补充材料
          familyMonthlyIncome: '12222', //收入、月收入
          workIndustryCode: '杀人', //工作行业
          GPS: '1111.1111.1111,1111.1111.111',
          clientNo:new Date().getTime(),
          workCityName:'广东',
          liveCityName:'广西'
        }
      }

    }
  },
  {
    url: '/credit/getCreditItemsInfo',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: {
          GPS: '111.111.111，111.1111.111',
          operationProjectName: '换头', //项目名称
          grade: 'A', //商家等级
          clientApplyAmt: '20000', //申请金额
          operationProjectAmt: '39000', //项目金额
          debtNo: '32342', //借款编号
          applyTime: '1993-02-16', //申请时间
          state: '1', //借款状态
          regName: '整容院', //医院名称/合作商名称
          debtAmt: '100', //借款金额
          debtLimit: '6', //借款期限
          operationName: '换头', //申请项目、可能是个多个
          repayType: '线下还款' //还款方式
        }
      }

    }
  },
  {
    url: '/credit/ApprovalResult',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: {
          clientApplyAmt: 1000, //客户申请金额
          clientApplyLimit: 3, //用户申请期限
          remainDebtAmt: 3322, //剩余未还金额
          systemAmt: 1000, //机审建议额度
          artificialLimit: 3, //人审期限
          artificialAmt: '', //人审建议额度
          partnerGrade: 'A', //商户等级
          isSupplement: '1' //是否需要补充材料
        }
      }

    }
  },
  {
    url: '/credit/creditAudit',
    type: 'put',
    response: config => {
      const {creditRecordNo,state} = config.body
      console.log(creditRecordNo,state)
      List.map(item=>{
        if(item.creditRecordNo == creditRecordNo){
          item.state = state
        }
      })
      return {
        code: 0, 
        data: '',
        msg:'审核通过'
      }

    }
  },




]
