// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到

import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    originIndex: '@increment',
    clientName: '@cname',
    certNo: "450521199602206131",
    topAmt: '@float(0, 100, 2, 2)',
    rate: '@float(0, 100, 2, 2)',
    clientCell: "18278904219",
    gmtCreated: "1992-02-03",
    'originType|1': ['EXCEL', 'HTTP', 'ESALE'],

    id: i,
    clientNo: '@increment' + ' ',
    salesmanId: '@cname',
    userName: '@first',
    nickName: '@first',
    realName: '@first',
    sex: '@integer(1, 2)',
    wxId: '@title(3, 8)',
    cell: "18278904219",
    birthday: "2019-02-20",
    'state|1': ['TEMP', 'INVALID', 'VALID', 'AUTHED', 'FREEZE', 'LOGOFF'],
    certNo: "450521199602206131",
    createdTime:'1999-05-16'

  }))
}

export default [

  // 分页获取客户列表
  {
    url: '/client/getClientList',
    type: 'post',
    response: config => {
      const {
        importance,
        state,
        title,
        page = 1,
        limit = 20,
        sort
      } = config.body

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (state && item.state !== state) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

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

  // 分页获取客户列表
  {
    url: '/client/getInfo',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: {
          appSign: true,
          clientNo: '007007007',
          clientCell: '1008611',
          applyAddress: '广西南宁',
          cardBean: {
            openBankName: '招商银行',
            bankAccount: '621700345000112111',
            openSubBankName: '南宁分行'
          },
          clientName: '张三',
          clientNo: "222",
          originType: 'HTTP',
          workAddress: '龙光世纪',
          topAmt: '10000',
          rate: '0.01',
          life: '30',
          memo: '贷款',
          certNo: '452521111222122'
        }
      }
    }
  },
  {
    code: 0,
    url: '/loanRecord/getPageList',
    type: "get",
    response: config => {
      return {
        code: 0,
        data: [{
          loanNo: '00001',
          clientBean: {
            clientName: '张三',
            certNo: '4535352211223111',
            clientCell: '1008611',
          },
          loanAmt: '9999',
          'status|1': ['INIT', 'SUBMITED', 'RAISECONFIRM', 'AUDITED', 'REPAYCONFIRM', 'SETTLED', 'OVERDUED', 'CANCELED'],
          startDate: '2020-03-21',
          endDate: '2021-03-23',
          memo: '第一次借贷',

        }, {
          loanNo: '00002',
          clientBean: {
            clientName: '张三',
            certNo: '4535352211223111',
            clientCell: '1008611',
          },
          loanAmt: '9999',
          'status|1': ['INIT', 'SUBMITED', 'RAISECONFIRM', 'AUDITED', 'REPAYCONFIRM', 'SETTLED', 'OVERDUED', 'CANCELED'],
          startDate: '2020-03-21',
          endDate: '2021-03-23',
          memo: '第一次借贷',

        }]
      }
    }
  },
  {
    code: 0,
    url: '/client/isCardSign',
    type: "get",
    response: config => {
      {
        return {
          code: 0,
          msg: true,
          data: true
        }
      }
    }
  },
  {
    url: '/client/cardList',
    type: "get",
    response: config => {
      {
        return {
          code: 0,
          msg: true,
          data: [
            {
              clientName:"猫咪",
              bankName:'清秀支行',
              cardNo:'6230580000278777540'
            }
          ]
        }
      }
    }
  },
  {
    url: '/client/getClientContactList',
    type: "get",
    response: config => {
      {
        return {
          code: 0,
          msg: true,
          data: [
            {
              contactsName:'老妈',
              contactsCell:'18278904219',
              kinship:'子母'
            },
            {
              contactsName:'老爸',
              contactsCell:'18278904219',
              kinship:'子父'
            },
          ]
        }
      }
    }
  },
  {
    code: 0,
    url: '/client/getSignLog',
    type: "get",
    response: config => {
      {
        return {
          code: 0,
          msg: "正确"
        }
      }
    }
  },
  {
    code: 0,
    url: '/client/unBind',
    type: "get",
    response: config => {
      {
        return {
          code: 0,
          msg: "解绑成功"
        }
      }
    }
  },
  {
    code: 0,
    url: '/client/frozen',
    type: "get",
    response: config => {
      {
        const {
          id
        } = config.query

        List.map((item, index) => {
          if (item.id == id) {
            item.state = 'FROZEN'
          }
        })
        return {
          code: 0,
          msg: "冻结成功"
        }
      }
    }
  },
  // 借款计算页面
  {
    code: 0,
    msg: '借款计算页面出错',
    url: '/client/calculate/list',
    type: "get",
    response: config => {
      {
        const {
          clientNo
        } = config.query
        let calculateList
        List.map(item => {
          if (item.clientNo == clientNo) {
            calculateList = item
          }
        })

        return {
          code: 0,
          data: calculateList
        }
      }
    }
  },

  {
    code: 0,
    msg: '借款计算页面出错',
    url: '/client/getAmtInfo',
    type: "get",
    response: config => {

      return {
        code: 0,
        data: {
          debtAmt: '',
          backAmt: '',
          rateAmt: '',
          serviceAmt: '',
        }
      }

    }
  },
  {
    url: '/client/getCertificateInfoList',
    type: "get",
    response: config => {
      return {
        code: 0,
        data: {
          clientNo: '11', //客户编号
          bdName: '王雪情', //客服名(bd名称)
          userName: '张飞', //客户用户名
          nickName: 'umbrelaa', //用户昵称
          realName: '真名', //真实姓名
          sex: '1', //性别
          wxId: 'xym1001111', //微信id
          cell: '1827890222', //手机号码
          birthday: '2015-02-02', //出生年月
          alreadyProductType: 'dd', //已绑定的产品类型
          firstLogin: '2015-02-02', //首次登陆时间
          lastLogin: '2015-02-02', //最后登陆时间
          deviceId: '2222', //设备指纹ID
          clientImgUrl: 'httt', //客户头像地址
          state: '1', //客户状态
          createdTime: '2015-02-02', //创建时间
          modifiedTime: '2015-02-02', //修改时间
          maritalCode: '1', //婚姻状况
          educationCode: '幼儿园', //学历
          wechatNo: 'umbrella', //微信
          workIndustryCode: 'it', //工作行业
          workCityCode: '北京', //工作城市
          workAddress: '北京幸福里', //工作详细地址
          firmName: '保护伞', //公司全名
          addressCode: '广西', //居住地区
          addressDetail: '广西万秀', //居住详细地址
          workProvinceName: '广西', //工作省名称
          workCityName: '南宁', //工作市名称
          workAreaName: '青秀区', //工作区名称
          liveProvinceName: '广西', //居住省名称
          liveCityName: '南宁', //居住市名称
          liveAreaName: '西乡塘', //居住区名称
          email: '253274870@qq.com', //邮箱
          companyPhone: '077228373', //公司电话
          qq: '253274870', //qq
          familyMonthlyIncome: '1000000', //家庭月收入
          licensePlate: 'A10303' //车牌号
        }
      }

    }
  }
]
