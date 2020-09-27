// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到
import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    contractTemplateNo: i ,
    // 产品类型
    'debtType|1': ['P001', 'P002'],
    // 合同类型
    'contractType|1': ['美丽金借款合同', '美丽金服务费合同', '美丽金隐私合同'],
    'contractName|1': ['合同名称1', '合同名称2', '合同名称3'],
    'version|1': ['v1', 'v2'],
    startDate: '@datetime("yyyy-MM-dd")',
    endDate: '@datetime("yyyy-MM-dd")',
    'state|1': ['可用', '不可用'],
    createdTime: '@datetime("yyyy-MM-dd")',
    modifiedTime: '@datetime("yyyy-MM-dd")',
    memo: '摸板备注'
  }))
}

export default [

  // sign 信息列表
  {
    url: '/contract/getContractTemplateByName',
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
