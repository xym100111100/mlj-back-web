// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到
import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    // id: '@increment',
    // timestamp: +Mock.Random.date('T'),
    // author: '@first',
    // reviewer: '@first',
    // title: '@title(5, 10)',
    // content_short: 'mock data',
    // content: baseContent,
    // forecast: '@float(0, 100, 2, 2)',
    // importance: '@integer(1, 3)',
    // 'type|1': ['CN', 'US', 'JP', 'EU'],
    // 'status|1': ['published', 'draft'],
    // display_time: '@datetime',
    // comment_disabled: true,
    // pageviews: '@integer(300, 5000)',
    // image_uri,
    // platforms: ['a-platform'],
    // 'state|1': ['ENABLED', 'UNABLED']
    id: i + 1,
    contractNo: '@increment',
    debtNo: '@increment',
    clientNo: '@increment',
    // 产品类型
    'debtType|1': ['AType', 'BType', 'CType'],
    // 合同类型
    'contractType|1': ['LOANED', 'PRIVACY', 'SERVICE'],
    contractTemplatNo: '@increment',
    pdfUrl: '@url("http", "baidu.com")',
    signUrl: '@url("http", "baidu.com")',
    'supplierSave|1': ['YES', 'NO'],
    contractCreatedTime: '@datetime("yyyy-MM-dd")',
    contractSignTime: '@datetime("yyyy-MM-dd")',
    startDate: '@datetime("yyyy-MM-dd")',
    endDate: '@datetime("yyyy-MM-dd")',
    'state|1': ['SIGN', 'VOID'],
    createdTime: '@datetime("yyyy-MM-dd")',
    modifiedTime: '@datetime("yyyy-MM-dd")',
    memo: '法外狂徒-张三'
  }))
}

export default [

  // sign 信息列表
  {
    url: '/contract/getContractSignList',
    type: 'get',
    response: config => {
      const {
        importance,
        title,
        page = 1,
        limit = 20,
        sort,
        contractType
      } = config.query

      let mockList = List.filter(item => {
        // console.log(item);
        if (importance && item.importance !== +importance) return false
        if (contractType && item.contractType !== contractType) return false
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
    url: '/contract/modifyContractSignState',
    type: "get",
    response: config => {
      {
        const {
          id
        } = config.query

        List.map((item, index) => {
          if (item.id == id) {
            item.state = 'VOID'
          }
        })
        return {
          code: 0,
          msg: "合同作废成功"
        }
      }
    }
  }
]
