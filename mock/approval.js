// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到

import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {

  List.push(Mock.mock({
    partnerNo: i + 1,
    regName: '@cname', // 合作商注册名称
    realName: '@first', // 实际营业名称,
    instOrganizationCode: '1008611',
    "bizProperty|1": ['合作运营', '自营商家'], // 是否上架
    linkerName: '@cname',
    linkerTel: /^1(5|3|7|8)[0-9]{9}$/,
    saleCode: '@integer(1, 2)', // 归属BD
    'regionName|1': ['南宁', '北海'],
    "state|1": ['1', '2', '3', '4', '5'], // 是否上架
    createdTime: '@datetime("yyyy-MM-dd")',
  }))
}

export default [

  // 分页获取客户列表
  {
    url: '/partner/getAuditPage',
    type: 'post',
    response: config => {
      const data = config.body
      const {
        state,
        limit,
        page
      } = data
      let mockList = List.filter(item => {
        if (state && item.state !== state) return false
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

  // 删除合作商
  {
    url: '/partner/del',
    type: 'delete',
    response: config => {
      const {
        id
      } = config.query
      let result = false
      List.map((item, index) => {
        if (item.id == id) {
          List.splice(index, 1)
          result = true
        }
      })
      return {
        code: 0,
        result: result,
      }
    }
  },
  // 编辑操作
  // {
  //   url: '/partner/modify',
  //   type: 'put',
  //   response: config => {
  //     const {
  //       partnerNo,
  //       regName,
  //       realName,
  //       isShelves,
  //       saleCode,
  //       regionName,
  //       coopAgreementExpire
  //     } = config.body
  //     let result = false
  //     List.map((item, index) => {
  //       if (item.partnerNo == partnerNo) {
  //         List[index].partnerNo = partnerNo
  //         List[index].regName = regName
  //         List[index].realName = realName
  //         List[index].isShelves = isShelves
  //         List[index].saleCode = saleCode
  //         List[index].regionName = regionName
  //         List[index].coopAgreementExpire = coopAgreementExpire
  //         result = true
  //       }
  //     })
  //     return {
  //       code: 0,
  //       result: result,
  //     }
  //   }
  // },
  // 添加合作商操作
  {
    url: '/partner/add',
    type: 'post',
    response: config => {
      const obj = config.body
      List.unshift(obj)
      return {
        code: 0,
        msg: "成功"
      }
    }

  },
  // /partner/index/on 上架
  {
    code: 0,
    url: '/partner/dismountPartner',
    type: "get",
    response: config => {
      {
        const {
          partnerNo,
          state
        } = config.query

        List.map((item, index) => {
          if (item.partnerNo == partnerNo) {
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
  // 下架 /partner/index/under
  {
    code: 0,
    url: '/partner/index/under',
    type: "get",
    response: config => {
      {
        const {
          partnerNo
        } = config.query

        List.map((item, index) => {
          if (item.partnerNo == partnerNo) {
            item.isShelves = false
          }
        })
        return {
          code: 0,
          msg: "下架成功"
        }
      }
    }
  },
  // 查看详情里面的合作商信息详情
  {
    code: 0,
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
    code: 0,
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
]
