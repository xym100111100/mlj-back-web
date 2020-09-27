// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到

import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {

  List.push(Mock.mock({
    rateTemplateNo: '@increment', // .模板编号
    'repayType|1': ['TRANSFER', 'PROTOCOL'], // 还款方式
    'productType|1': ['P001', 'P002', 'P003'], // 产品类型
    "periodType|1": ['天', '月', '年'], // 期限类型  天 月 年
    'periodUnit|1': ['3', '6', '9', '12', '24', '36'],
    rateTemplate: /[0-3]{2}/, // 期限周期  30 3 
    overdueRate: 0.03,
    'overdueType|1': ['逾期罚息', '违约罚息'],
    periodValue: '6个月', // 期限具体
    feeRate: 0.02,
    depositRatio: 0.02,
    serviceTariff: 0.02,
    createdTime: '@datetime("yyyy-MM-dd")',
    modifiedTime: '@datetime("yyyy-MM-dd")',
    memo: '我是张三-法外狂徒',
  }))
}
const rateList = [{
    type: 'P001',
    data: [{
        rateTemplateNo: "1111",
        repayType: "A",
        productType: "P001",
        periodType: "M",
        periodUnit: 1,
        overdueRate: 36,
        overdueType: "1",
        periodValue: 3,
        feeRate: 32,
        dayFeeRate: 0.05,
        monthFeeRate: null,
        depositRatio: 45,
        serviceTariff: 8.4,
        createdTime: "2020-06-18 15:29:14",
        modifiedTime: "2020-07-13 15:15:19",
        version: null,
        memo: null,
        monthFeeRate: 0.2,
        compositeInterestRate: 0.2
      },
      {
        rateTemplateNo: "2222",
        repayType: "B",
        productType: "P001",
        periodType: "M",
        periodUnit: 1,
        overdueRate: 36,
        overdueType: "1",
        periodValue: 3,
        feeRate: 12,
        dayFeeRate: 0.05,
        monthFeeRate: null,
        depositRatio: 45,
        serviceTariff: 8.4,
        createdTime: "2020-06-18 15:29:14",
        modifiedTime: "2020-07-13 15:15:19",
        version: null,
        monthFeeRate: 0.2,
        memo: null,
        compositeInterestRate: 0.2
      },
      {
        rateTemplateNo: "3333",
        repayType: "C",
        productType: "P001",
        periodType: "M",
        periodUnit: 1,
        overdueRate: 36,
        overdueType: "1",
        periodValue: 3,
        feeRate: 12,
        dayFeeRate: 0.05,
        monthFeeRate: null,
        depositRatio: 45,
        serviceTariff: 8.4,
        createdTime: "2020-06-18 15:29:14",
        modifiedTime: "2020-07-13 15:15:19",
        version: null,
        monthFeeRate: 0.2,
        memo: null,
        compositeInterestRate: 0.2
      }
    ]
  },
  {
    "type": "P002",
    "data": [{
        rateTemplateNo: "4444",
        repayType: "C",
        productType: "P001",
        periodType: "M",
        periodUnit: 1,
        overdueRate: 36,
        overdueType: "1",
        periodValue: 3,
        feeRate: 12,
        dayFeeRate: 0.05,
        monthFeeRate: null,
        depositRatio: 45,
        serviceTariff: 8.4,
        createdTime: "2020-06-18 15:29:14",
        modifiedTime: "2020-07-13 15:15:19",
        version: null,
        monthFeeRate: 0.2,
        memo: null,
        compositeInterestRate: 0.2
      },
      {
        rateTemplateNo: "5555",
        repayType: "D",
        productType: "P001",
        periodType: "M",
        periodUnit: 1,
        overdueRate: 36,
        overdueType: "1",
        periodValue: 3,
        feeRate: 12,
        dayFeeRate: 0.05,
        monthFeeRate: null,
        depositRatio: 45,
        serviceTariff: 8.4,
        createdTime: "2020-06-18 15:29:14",
        modifiedTime: "2020-07-13 15:15:19",
        version: null,
        monthFeeRate: 0.2,
        memo: null,
        compositeInterestRate: 0.2
      }
    ]
  }
]




export default [

  // 分页获取客户列表
  {
    url: '/rate/list',
    type: 'get',
    response: config => {
      const {
        importance,
        type,
        title,
        page = 1,
        limit = 20,
        sort,
        overdueType,
        searchType
      } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (overdueType && item.overdueType !== overdueType) return false
        if (searchType && item.searchType !== searchType) return false
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
  // 模板编辑操作
  {
    url: '/rate/modify',
    type: 'put',
    response: config => {
      const {
        rateTemplateNo,
        repayType,
        periodType,
        rateTemplate,
        overdueRate,
        overdueType,
        periodVaule,
        feeRate,
        depositRatio,
        serviceTariff,
        createdTime,
      } = config.body
      let result = false
      List.map((item, index) => {
        if (item.rateTemplateNo == rateTemplateNo) {
          List[index].repayType = repayType
          List[index].periodType = periodType
          List[index].rateTemplate = rateTemplate
          List[index].overdueRate = overdueRate
          List[index].periodVaule = periodVaule
          List[index].feeRate = feeRate
          List[index].depositRatio = depositRatio
          List[index].serviceTariff = serviceTariff
          List[index].createdTime = createdTime
          List[index].overdueType = overdueType
          result = true
        }
      })
      return {
        code: 0,
        result: result,
      }
    }
  },
  // 新----------新-----------新--------------新-----------新---------
  // 获取费率模板
  {
    url: '/rate/getRateTemplateList',
    type: 'get',
    response: config => {
      return {
        code: 0,
        msg: '成功',
        data: rateList
      }
    }
  },
  // 费率模板删除操作
  {
    url: `/rate/rateTemplateDelet`,
    type: 'delete',
    response: config => {
      const {
        rateTemplateNo
      } = config.query

      rateList.map((item1) => {
        item1.data.map((item, index) => {
          if (item.rateTemplateNo == rateTemplateNo) {
            item1.data.splice(index, 1)
          }
        })
      })
      return {
        code: 0,
        msg: '删除成功'
      }
    }
  },

  // 添加费率模板  /rate/addRateTemplate
  {
    url: '/partner/addRateTemplate',
    type: 'post',
    response: config => {
      const obj = config.body
      rateList = []
      console.log(rateList);

      // rateList.push(obj)
      // this.rateList = obj

      return {
        code: 0,
        msg: "操作成功!!!!"
      }
    }
  }

]
