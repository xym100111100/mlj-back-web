import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    debtNo: i,
    clientNo: /[1-9]{12}/,
    clientName: '@cname',
    certNo: '450981123456789',
    'debtType|1': ['0', '1', '2'],
    'state|1': ['AState', 'BState', 'CState'],
    debtAmt: /[1-8]{5}/,
    startDate: '@datetime("yyyy-MM-dd")',
    endDate: '@datetime("yyyy-MM-dd")',
    overdueAmt: /[1-9]{2}/,
    overdueRate: 0.03,

    // 逾期详情
    clientBean: {
      clientCell: /^1(5|3|7|8)[0-9]{9}$/,
      certNo: /[1-9]{7}/
    },
    repayAmt: '9999',
    workAddress: '广西南宁龙光世纪',
    topAmt: '10000',
    'limitType|1': ['D', 'M', 'Y'],
    'limitUnit|1': ['D', 'M', 'Y'],
    debtLimit: '24',
    'repayType|1': ['SETTLED', 'PART'],
    memo: '法外狂徒-张三'
  }))
}

export default [{
    url: '/loan/getOverdueLoanList',
    type: 'get',
    response: config => {
      const {
        importance,
        title,
        page = 1,
        limit = 20,
        sort,
        debtType,
        state
      } = config.query

      let mockList = List.filter(item => {
        // console.log(item);
        if (importance && item.importance !== +importance) return false
        if (debtType && item.debtType !== debtType) return false
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
  // 获取逾期信息
  // {
  //   url: '/loan/getOverduInfo',
  //   type: 'get',
  //   response: config => {
  //     return {
  //       code: 0,
  //       data: {
  //         // debtNo: '',
  //         state: '',
  //         debtAmt: '@increment',
  //         clientBean: {
  //           clientCell: /^1(5|3|7|8)[0-9]{9}$/,
  //           certNo: /[1-9]{7}/,
  //           clientName: '@cname',
  //         },
  //         debtLimit: '24',
  //         repayType: '支付宝',
  //         workAddress: '广西南宁龙光世纪',
  //         endDate: '@datetime("yyyy-MM-dd")',
  //         startDate: '@datetime("yyyy-MM-dd")',
  //         topAmt: '@increment',
  //         rate: '0.03',
  //         memo: '法外狂徒张三',
  //         repayAmt: '9999',
  //         overdueAmt: '999',
  //         'limitUnit|1': ['D', 'M', 'Y'],
  //         'limitType|1': ['D', 'M', 'Y'],
  //         overdueRate: 0.025,
  //         // -----------Dialog
  //         loanNo: '@increment',
  //         'loanType|1': ['NEW'],
  //         status: '',
  //         lendCardBean: {
  //           ownerName: '李四'
  //         },
  //         bankCardId: '6217003450002231141',
  //         'debtType|1': ['0', '1', '2'],
  //         'state|1': ['AState', 'BState', 'CState'],
  //       }
  //     }
  //   }
  // },
  {
    code: 0,
    // 客户授信详情页面基础信息-授信信息部分
    url: `/loan/getOverduInfo`,
    type: 'get',
    response: config => {
      const {
        debtNo
      } = config.query
      // console.log(debtNo)
      let overduData
      List.map(item => {
        if (item.debtNo == debtNo) {
          overduData = item
        }
      })
      // console.log(debtNo)
      return {
        code: 0,
        data: overduData
      }
    }
  },

  {
    code: 0,
    url: '/loan/overdueDetail',
    type: "get",
    response: config => {
      return {
        code: 0,
        data: [{
          backedNo: '@increment',
          'bizType|1': ['REMIND', 'COLLECT'],
          bizNo: /[1-9]{9}/,
          backedDate: '@datetime("yyyy-MM-dd")',
          backedTime: '@datetime("yyyy-MM-dd A HH:mm:ss")',
          backedAmt: '999',
          bankAccount: /[1-9]{15}/,
          bankOwner: /[1-9]{10}/,
          result: '部分还款',
          confirmer: '@cname',
          confirmTime: '@datetime("yyyy-MM-dd A HH:mm:ss")',
          confirmDesc: '@cparagraph(1)',
          memo: '法外狂徒-张三',
          clientName: '张三'
        }]
      }
    }
  },
  {
    code: 0,
    url: '/loanRecord/getInfo',
    type: "get",
    response: config => {
      return {
        code: 0,
        msg: '获取失败',
        data: {
          loanNo: '9999911111',
          lendCardBean: {
            ownerName: '@cname'
          },
          clientBean: {
            clientName: '@cname',
            certNo: /[1-9]{15}/,
            clientCell: /^1(5|3|7|8)[0-9]{9}$/
          },
          loanAmt: /[1-9]{4}/,
          backAmt: /[1-9]{4}/,
          rateAmt: 0.03,
          serviceAmt: '1000',
          loanLife: '24',
          memo: '',
          userAttachList: [{
            attachUrl: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
          }],
          loanAttachList: [{
            attachUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          }],
          raiseAttachList: [{
            attachUrl: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
          }]
        }
      }
    }
  },
  // repayBacked的拦截
  // 还款信息
  {
    code: 0,
    url: '/loanBacked/getBackedInfo',
    type: "get",
    response: config => {
      return {
        code: 0,
        msg: '获取失败',
        data: {
          backedNo: '123456789',
          'backedType|1': ['REMIND', 'COLLECT'],
          'status|1': ['SUBMITED', 'AUDITED', 'FAIL', 'CANCELED'],
          bankAccount: /[1-9]{15}/,
          bankOwner: '@cname',
          repayAmt: '10000',
          repayDate: '@datetime("yyyy-MM-dd)',
          backAttachList: [{
            attachUrl: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
          }],
          // 还款方式
          'repayTtype|1': ['TRANSFER', 'PROTOCOL']
        }
      }
    }
  }
]
