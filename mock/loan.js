// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到
import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({

    clientNo: i,
    debtNo: i,
    operationNo: i,
    'operationName|1': ['换头', '换手'],
    product: '美丽金',
    clientName: '@cname',
    cell: '18278904219',
    debtAmt: /[1-8]{4}/,
    loanTerm: /[1-8]{5}/,
    bdName: '@cname',
    productType: 'P001',
    createdTime: '@datetime("yyyy-MM-dd")',
    // 借条状态
    'state|1': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    'repayState|1': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    // 点击详情--负债信息部分
    clientBean: {
      clientCell: /^1(5|3|7|8)[0-9]{9}$/,
      certNo: /[1-9]{7}/,
    },
    cardBean: {
      openBankName: '广西农信',
      bankAccount: /[1-9]{15}/,
      openSubBankName: '广西南宁分行'
    },
    operationName: ['手术项目'],
    debtLimit: '@increment',
    repayType: 'A',
    workAddress: '广西南宁龙光世纪',
    endDate: '@datetime("yyyy-MM-dd")',
    startDate: '@datetime("yyyy-MM-dd")',
    topAmt: '@increment',
    rate: '0.03',
    memo: '法外狂徒张三',
    'debtType|1': ['0', '1', '2'],
    'repayType|1': ['A', 'B'],
    // -----------Dialog----查看详情
    loanNo: '@increment',
    'loanType|1': ['NEW'],
    status: '',
    lendCardBean: {
      ownerName: '李四'
    },
    bankCardId: '6217003450002231141',
    loanLife: /[1-9]{3}/,
    backAmt: /[1-9]{4}/,
    rateAmt: 0.03,
    serviceAmt: /[1-9]{4}/,
    loanAmt: /[1-9]{4}/,
    userAttachList: [{
      attachUrl: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
    }, {
      attachUrl: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
    }],
    loanAttachList: [{
      attachUrl: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
    }],
    raiseAttachList: [{
      attachUrl: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
    }],
    backAttachList: [{
      attachUrl: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
    }]
  }))
}

export default [{
    url: '/loan/getLoanPageList',
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
  {
    code: 0,
    url: `/loan/getDebtInfo`,
    type: 'get',
    response: config => {
      const {
        debtNo
      } = config.query
      let loanData
      List.map(item => {
        if (item.debtNo == debtNo) {
          loanData = item
        }
      })
      return {
        code: 0,
        data: loanData
      }
    }
  },
  {

    url: `/repay/getRepayDetail`,
    type: 'get',
    response: config => {
      const {
        debtNo
      } = config.query

      return {
        code: 0,
        data: {
          //借款信息
          cardName: '徐亚明', //银行账户姓名
          openSubBankName: '清秀支行', //银行账号开户网点名称
          cardNo: '3243243254325435', //还款银行卡号
          bdName: '杰克', //对应BD
          debtNo: debtNo, //借款编号
          operationName: '换头', //申请项目、可能是个多个
          debtAmt: '1233', //借款金额
          debtLimit: '12',//借款期数
          interestAmt: '0.3', //借款利率
          startDate: '2020-02-02', //起息日
          endDate: '20202-09-02', //截止日
          clientName: '徐亚明',
        }
      }
    }
  },
  {
    url: `/loan/debtPlan`,
    type: 'get',
    response: config => {
      const {
        debtNo
      } = config.query
      return {
        code: 0,
        data: [
        {
          planNo:'1',
          currentPeriod:'3',
          currentDay:'2',
          periodAmt:'1000',
          interestAmt:'22',
          overdueAmtl:'10',
          serviceFeeAmt:'11',
          overdueAmt:'33',
          repayDate:'2020-02-02',
          startDate:'2020-02-02',
          endDate:'2020-02-02',
          repayState:'UN_BACK'
        },
        {
          planNo:'2',
          currentPeriod:'6',
          currentDay:'2',
          periodAmt:'1000',
          interestAmt:'22',
          overdueAmtl:'10',
          overdueAmt:'33',
          serviceFeeAmt:'11',
          repayDate:'2020-02-02',
          startDate:'2020-02-02',
          endDate:'2020-02-02',
          repayState:'UN_BACK'
        },

        ]
      }
    }
  },
  {
    code: 0,
    url: '/loan/getSignLog',
    type: "get",
    response: config => {
      {
        return {
          code: 0,
          msg: "正确",

        }
      }
    }
  },
  {
    url: '/partner/getBankCodeList',
    type: "get",
    response: config => {
      {
        return {
          code: 0,
          msg: "正确",
          data: [{
              "bindBankNo": "1",
              "bankName": "建设银行",
              "bankCode": "CCB",
              "bankBackColor": "#3875DF",
              "logo": "http://res.jqtianxia.cn/bankicons/CCB_logo.png",
              "whiteLogo": "http://res.jqtianxia.cn/bankicons/CCB_bank_new_logo.png",
              "textLogo": null
            },
            {
              "bindBankNo": "2",
              "bankName": "工商银行",
              "bankCode": "ICBC",
              "bankBackColor": "#38BFB5",
              "logo": "http://res.jqtianxia.cn/bankicons/ICBC_logo.png",
              "whiteLogo": "http://res.jqtianxia.cn/bankicons/ICBC_bank_new_logo.png",
              "textLogo": null
            },
            {
              "bindBankNo": "3",
              "bankName": "平安银行",
              "bankCode": "PINAGAN",
              "bankBackColor": "#E85279",
              "logo": "http://res.jqtianxia.cn/bankicons/PINAGAN_logo.png",
              "whiteLogo": "http://res.jqtianxia.cn/bankicons/PINAGAN_bank_new_logo.png",
              "textLogo": null
            },
            {
              "bindBankNo": "4",
              "bankName": "农业银行",
              "bankCode": "ABC",
              "bankBackColor": "#795AB4",
              "logo": "http://res.jqtianxia.cn/bankicons/ABC_logo.png",
              "whiteLogo": "http://res.jqtianxia.cn/bankicons/ABC_bank_new_logo.png",
              "textLogo": null
            },
            {
              "bindBankNo": "5",
              "bankName": "招商银行",
              "bankCode": "CMB",
              "bankBackColor": "#FBB849",
              "logo": "http://res.jqtianxia.cn/bankicons/CMB_logo.png",
              "whiteLogo": "http://res.jqtianxia.cn/bankicons/CMB_bank_new_logo.png",
              "textLogo": null
            },
          ]
        }
      }
    }
  },
  {
    code: 0,
    url: '/loan/getRepaymentDetail',
    type: "get",
    response: config => {
      return {
        code: 0,
        data: [{
          backedNo: '@increment',
          'bizType|1': ['AType', 'BType', 'CType', 'DType'],
          bizNo: /[1-9]{9}/,
          backedDate: '@datetime("yyyy-MM-dd")',
          backedTime: '@datetime("yyyy-MM-dd A HH:mm:ss")',
          'backedType|1': ['REMIND', 'COLLECT'],
          bankAccount: /[1-9]{15}/,
          bankOwner: /[1-9]{10}/,
          result: '',
          attach: '@string("lower", 5, 20)',
          confirmer: '@cname',
          confirmTime: '@datetime("yyyy-MM-dd  HH:mm:ss")',
          confirmDesc: '@cparagraph(1)',
          memo: '法外狂徒-张三'
        }, {
          backedNo: '@increment',
          'bizType|1': ['AType', 'BType', 'CType', 'DType'],
          bizNo: /[1-9]{9}/,
          backedDate: '@datetime("yyyy-MM-dd")',
          backedTime: '@datetime("yyyy-MM-dd A HH:mm:ss")',
          'backedType|1': ['REMIND', 'COLLECT'],
          bankAccount: /[1-9]{15}/,
          bankOwner: /[1-9]{10}/,
          result: '',
          attach: '@string("lower", 5, 20)',
          confirmer: '@cname',
          confirmTime: '@datetime("yyyy-MM-dd  HH:mm:ss")',
          confirmDesc: '@cparagraph(1)',
          memo: '法外狂徒-张三'
        }]
      }
    }
  },
  {
    code: 0,
    msg: '错误!!',
    url: '/client/getClientContactList',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: [{
          linker: '@cname',
          linkPhone: /^1(5|3|7|8)[0-9]{9}$/,
          callCount: '3'
        }]
      }
    }

  },
  {
    url: '/loanRecord/getAmtInfo/',
    type: 'get',
    response: config => {
      const {
        clientNo, // 客户编号
        loanAmt, // 合同金额
        loanLife, // 天数
      } = config.query
      console.log(clientNo, loanAmt, loanLife)
      let rateAmt = loanAmt * 0.01 * loanLife
      return {
        code: 0,
        data: {
          loanAmt: loanAmt, // 合同金额
          backAmt: loanAmt - rateAmt - 2, // 到账金额
          rateAmt: rateAmt, // 利息
          serviceAmt: 2 // 服务费
        }
      }
    }

  },

]
