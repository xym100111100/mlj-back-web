// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到

import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {

  List.push(Mock.mock({
    partnerNo: '@increment',
    workOrderNo: '@increment',
    'regName|1': ['医院一号', '医院二号', '医院三号', '医院四号'], // 合作商注册名称
    'workOrderType|1': [1, 2, 3, 4, 5], // 工单类型
    operatorName: '@cname', // 归属BD
    "state|1": [0, 1, 2, 3, 4], // 工单状态
    createdTime: '@datetime("yyyy-MM-dd")',
    beforeUpdateData: '@increment',
    afterUpdateData: '@increment'
  }))
}

export default [
  // 分页获取客户列表
  {
    url: '/workOrder/getPartnerInfoModifyWorkPageList',
    type: 'post',
    response: config => {
      const {
        importance,
        keys,
        title,
        page = 1,
        limit = 10,
        sort,
        state,
        searchType,
        // workOrderType
      } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (keys && item.keys !== keys) return false
        if (state && item.state != state) return false
        // if (workOrderType && item.workOrderType != workOrderType) return false
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

  // 作废
  {
    url: '/workOrder/dismountPartner',
    type: "get",
    response: config => {
      {
        const {
          workOrderNo,
          state
        } = config.query

        List.map((item) => {
          if (item.workOrderNo == workOrderNo) {
            item.state = state
          }
        })
        return {
          code: 0,
          msg: "操作成功",
          data: '修改成功'
        }
      }
    }
  },

  // 查看详情里面的合作商信息详情
  {
    url: '/partner/detail',
    type: "get",
    response: config => {
      {
        const {
          partnerNo
        } = config.query
        let detailData
        List.map((item, index) => {
          if (item.partnerNo == partnerNo) {
            detailData = item
          }
        })

        return {
          code: 0,
          data: detailData
        }
      }
    }
  },
  // 银行卡信息
  {
    url: '/partner/partnerCardDataInfo',
    type: "get",
    response: config => {
      {
        return {
          code: 0,
          data: [{
              cardNo: '6217003450009284',
              bankName: '广西南宁青秀区招商银行',
              state: 1,
              createdTime: new Date()
            },
            {
              cardNo: '6217003450009284',
              bankName: '广西南宁青秀区招商银行',
              state: 1,
              createdTime: new Date()
            }
          ]
        }
      }
    }
  },
  // 放款银行卡信息变更
  {
    url: '/workOrder/getParterBankList',
    type: "post",
    response: config => {
      {
        const {
          regName
        } = config.query
        let regNameData

        List.map((item, index) => {
          if (item.regName == regName) {
            regNameData = item
            regNameData.workOrderType = 1
          }
        })
        // 返回
        return {
          code: 0,
          data: regNameData
        }
      }
    }
  },

  // 基本信息获取
  {
    url: '/workOrder/getParterBasicData',
    type: "post",
    response: config => {
      {
        const {
          regName
        } = config.query
        let regNameData


        List.map((item, index) => {
          if (item.regName == regName) {
            regNameData = item
            regNameData.workOrderType = 2
            regNameData.realName = regName
            regNameData.regAmt = 10
            regNameData.establishDate = '2020-06-01'
            regNameData.latitude = '23°N'
            regNameData.longitude = '108°E'
            regNameData.registerAddress = ["北京市", "市辖区", "东城区"]
            regNameData.businessAddress = ["北京市", "市辖区", "东城区"]
            regNameData.addressSize = '200'
            regNameData.addressNature = 1
            regNameData.employeesNumber = '43'
            regNameData.bizScope = '餐饮酒店'
            regNameData.companyIndustry = '批发/零售'
            regNameData.monthSales = '32'
            regNameData.branchStatus = 1
            regNameData.bizProperty = 1

          }
        })
        return {
          code: 0,
          data: regNameData
        }
      }
    }
  },


  // 拦截商户联系人信息变更
  // 放款银行卡信息变更
  {
    url: '/getlinkerChange/getlinkerChangeList',
    type: "post",
    response: config => {
      {
        const {
          regName
        } = config.query
        let LinkerChangeData

        List.map((item) => {
          if (item.regName == regName) {
            LinkerChangeData = item
            LinkerChangeData.linkerName = '张三'
            LinkerChangeData.linkerPosition = '法外狂徒'
            LinkerChangeData.linkerCell = '13973607300'
            LinkerChangeData.workOrderType = 3
          }
        })

        return {
          code: 0,
          data: LinkerChangeData
        }
      }
    }
  },
  // 商户合作协议数据变更
  {
    url: '/cooperationChange/cooperationChangeList',
    type: "post",
    response: config => {
      {
        const {
          regName
        } = config.query
        let cooperationChangeData

        List.map((item) => {
          if (item.regName == regName) {
            cooperationChangeData = item
            cooperationChangeData.contractType = 'MLJ_LOAN'
            cooperationChangeData.workOrderType = 5

          }
        })

        return {
          code: 0,
          data: cooperationChangeData
        }
      }
    }
  },
  // ----------------------------查看银行卡--------------------------------
  {
    url: '/getLoanCard/getLoanCardDetails',
    type: "post",
    response: config => {
      {
        const {
          workOrderNo
        } = config.query
        let loanStatusData

        List.map((item) => {
          if (item.workOrderNo == workOrderNo) {
            loanStatusData = item
            loanStatusData.workOrderType = 1
            loanStatusData.reason = '放款卡'
          }
        })

        return {
          code: 0,
          data: loanStatusData
        }
      }
    }
  },
  // 商户基本信息查看
  {
    url: '/getbasicChange/getbasicChangeDetails',
    type: "post",
    response: config => {
      {
        const {
          workOrderNo
        } = config.query
        let basicChangeData

        List.map((item, index) => {
          if (item.workOrderNo == workOrderNo) {
            basicChangeData = item
            basicChangeData.workOrderType = 2
            basicChangeData.realName = item.regName
            basicChangeData.regAmt = 10
            basicChangeData.establishDate = '2020-06-01'
            basicChangeData.latitude = '23°N'
            basicChangeData.longitude = '108°E'
            basicChangeData.registerAddress = ["北京市", "市辖区", "东城区"]
            basicChangeData.businessAddress = ["北京市", "市辖区", "东城区"]
            basicChangeData.addressSize = '200'
            basicChangeData.addressNature = 1
            basicChangeData.employeesNumber = '43'
            basicChangeData.bizScope = '餐饮酒店'
            basicChangeData.companyIndustry = '批发/零售'
            basicChangeData.monthSales = '32'
            basicChangeData.branchStatus = 1
            basicChangeData.bizProperty = 1
            basicChangeData.reason = '商户基本信息'
            basicChangeData.managemantMode = '商业经营'
          }
        })

        return {
          code: 0,
          data: basicChangeData
        }
      }
    }
  },
  // 商户联系人信息查看 /getlinkerChange/getlinkerChangeDetails
  {
    url: '/getlinkerChange/getlinkerChangeDetails',
    type: "post",
    response: config => {
      {
        const {
          workOrderNo
        } = config.query
        let LinkerChangeData

        List.map((item) => {
          if (item.workOrderNo == workOrderNo) {
            LinkerChangeData = item
            LinkerChangeData.linkerName = '张三'
            LinkerChangeData.linkerPosition = '法外狂徒'
            LinkerChangeData.linkerCell = '13973607300'
            LinkerChangeData.workOrderType = 3
            LinkerChangeData.submission = '罗翔老师的张三小伙伴'
          }
        })

        return {
          code: 0,
          data: LinkerChangeData
        }
      }
    }
  },
  // 商户合作协议
  {
    url: '/cooperationChange/cooperationChangeDetails',
    type: "post",
    response: config => {
      {
        const {
          workOrderNo
        } = config.query
        let cooperationChangeData

        List.map((item) => {
          if (item.workOrderNo == workOrderNo) {
            cooperationChangeData = item
            cooperationChangeData.contractType = 'MLJ_LOAN'
            cooperationChangeData.workOrderType = 5
            cooperationChangeData.submission = '这里是提交原因,哈哈哈哈哈哈'
          }
        })

        return {
          code: 0,
          data: cooperationChangeData
        }
      }
    }
  },
  // /getappendixChange/getappendixChangeDetails
  {
    url: '/getappendixChange/getappendixChangeDetails',
    type: "post",
    response: config => {
      {
        const {
          workOrderNo
        } = config.query
        let appendixChangeData

        List.map((item) => {
          if (item.workOrderNo == workOrderNo) {
            appendixChangeData = item
          }
        })

        return {
          code: 0,
          data: appendixChangeData
        }
      }
    }
  },

  // 新增工单请求拦截
  {
    url: '/addWorkOrder/addWorkOrderList',
    type: 'post',
    response: config => {
      const data = config.body
      data.state = 1
      List.unshift(data)
      // console.log(List);
      return {
        code: 0,
        msg: "新增工单成功",
        data
      }
    }
  },
  // 提交工单
  {
    url: '/submitWorkOrder/submitWorkOrderOpt',
    type: "post",
    response: config => {
      {
        const {
          workOrderNo,
        } = config.query
        let state1 = 4
        List.map((item) => {
          if (item.workOrderNo == workOrderNo) {
            item.state = state1
          }
        })
        return {
          code: 0,
          data: '修改成功'
        }
      }
    }
  }
]
