// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到
import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    clientNo: i,
    accNo: i,
    'state|1': ['0', '1', '2'],
    clientName: '@cname',
    debtAmt: '450981123456789',
    debtAmt: '@increment',
    frozenAmt: '@increment',
    monthlyRepay:'@increment',
    'version|1':['v1', 'v2', 'v3'],
    createdTime: '@datetime("yyyy-MM-dd")',
    modifiedTime: '@datetime("yyyy-MM-dd")',
    monthlyRepaymentTime: '@datetime("yyyy-MM-dd")',
  }))
}

export default [
 
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
    code: 0,
    url: '/loan/loanRepayDetail',
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
          backedType: '',
          bankAccount: /[1-9]{15}/,
          bankOwner: /[1-9]{10}/,
          result: '',
          attach: '@string("lower", 5, 20)',
          confirmer: '@cname',
          confirmTime: '@datetime("yyyy-MM-dd A HH:mm:ss")',
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
      console.log(clientNo,loanAmt,loanLife)
      let rateAmt =  loanAmt * 0.01 * loanLife 
      return {
        code: 0,
        data: {
          loanAmt:loanAmt , // 合同金额
          backAmt: loanAmt  - rateAmt - 2, // 到账金额
          rateAmt: rateAmt , // 利息
          serviceAmt: 2 // 服务费
        }
      }
    }

  },
  {
    url: '/primary',
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
  }

]
