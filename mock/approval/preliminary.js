// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到
import Mock from 'mockjs'
const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    debtNo: /[0-9]{6}/,
    clientNo: '14133331' + i,
    clientName: '@cname',
    'state|1': ['0', '1', '2', '3'],
    debtAmt: /[0-9]{5}/,
    raiseAmt: /[0-9]{4}/,
    salesmanId: '007007007',
    applyTime: '@datetime("yyyy-MM-dd")',
    cell: /^1(5|3|7|8)[0-9]{9}$/,
    'productType|1': ['丽人贷', '有钱花', '美丽金'],
    memo: '法外狂徒-张三',
    bdName:'@cname',

    // title: '客户授信详情页面',
    'creditTypeName|1': ['0', '1', '2'],
    // 项目详情
    serviceFeeAmt: '2000',
    regName: '淘宝网',
    debtLimit: '36',
    debtName: '美容手术',
    operationProjectNo: /[0-9]{12}/,
    // 授信信息凭证
    clientCreditDetail: [{
      creditUrlPath: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      creditTypeName: '支付宝'
    }, {
      creditUrlPath: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      creditTypeName: '花呗截图'
    }, {
      creditUrlPath: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      creditTypeName: '芝麻积分'
    }, {
      creditUrlPath: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      creditTypeName: '支付宝'
    }, {
      creditUrlPath: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      creditTypeName: '支付宝'
    }, {
      creditUrlPath: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      creditTypeName: '支付宝'
    }],
    overdueDate: '2015-05-22',
    validDate: '2010-05-22至2015-05-22',
    urls: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', 'http://res.nntest.jqtianxia.cn/client/1265544344312614912/alipay_1591329387934.jpg?Expires=1591953064&OSSAccessKeyId=LTAI4Fkgm8PgTAhfbo6pMHxh&Signature=XGIcW6WHKxkcBwUMEtf24UTF9gc%3D']
  }))
}

export default [{
    url: '/loan/getClientDebtList',
    type: 'get',
    response: config => {
      const {
        importance,
        title,
        page = 1,
        limit = 20,
        sort,
        status
      } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (status && item.status !== status) return false
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
  }, {
    code: 0,
    url: '/preliminary/allow',
    type: "get",
    response: config => {
      {
        return {
          code: 0,
          msg: "通过审核"
        }
      }
    }
  },
  {
    code: 0,
    url: '/preliminary/refuse',
    type: "get",
    response: config => {
      {
        return {
          code: 0,
          msg: '拒绝通过审核'
        }
      }
    }
  },
]
