// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到
import Mock from 'mockjs'
const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    clientNo:i,
    id: i + 1,
    debtNo:i+2,
    creditNo: '14133331121212' + i,
    clientName: '@cname',
    'creditState|1': ['2', '3', '4'],
    creditLines: '9999',
    clientCreatedTime: '@datetime("yyyy-MM-dd")',
    cell: /^1(5|3|7|8)[0-9]{9}$/,
    memo: '法外狂徒-张三',
    // title: '客户授信详情页面',
    'name|1': ['0', '1', '2'],
    // 项目详情
    serviceFeeAmt: '2000',
    regName: '淘宝网',
    debtLimit: '36',
    debtName: '美容手术',
    operationProjectNo: /[0-9]{12}/,
    // 授信信息凭证
    clientCreditDetail: [{
      path: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      name: '支付宝'
    }, {
      path: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      name: '花呗截图'
    }, {
      path: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      name: '芝麻积分'
    }, {
      path: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      name: '支付宝'
    }, {
      path: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      name: '支付宝'
    }, {
      path: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      name: '支付宝'
    }]
  }))
}

export default [{
    url: '/client/getCreditDetailList',
    type: 'get',
    response: config => {
      const {
        importance,
        title,
        page = 1,
        limit = 20,
        sort,
        state
      } = config.query

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
  }, {
    // 客户授信详情页面基础信息-客户信息部分
    code: 0,
    url: `/information/clientCreditDialog/list`,
    type: 'get',
    response: config => {
      return {
        code: 0,
        msg: "允许通过实名认证",
        data: {
          'educationCode|1': ['0', '1', '2', '3'],
          'maritalCode|1': ['0', '1'],
          workBase: {
            workIndustryCode: 'IT行业',
            workCityCode: ' @city',
            firmName: '阿里巴巴'
          },
          liveBase: {
            liveCityName: '@city',
            addressDetail: '@province' + '@city',
            idCardAddress: '@province' + '@city' + '@county'
          },
          wechatNo: /^1(5|3|7|8)[0-9]{9}$/,
          contactsBase: {
            contactsName: '@cname',
            contactsCell: /^1(5|3|7|8)[0-9]{9}$/,
            kinship: '父母'
          },
          workAddress: '@city' + '@county',
          familyMonthlyIncome: 12000,
          email: '@email()',
          certNo: /[0-9]{15}/,
          // 身份证
          clientUrls: [{
              path: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
              name: '身份证正面'
            },
            {
              path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
              name: '身份证反面'
            }
          ],
          clientCertificateType: [{
             path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            name: '手术单照片'
          }, {
             path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            name: '告知书照片'
          }, {
             path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            name: '手持身份证照片'
          }, {
             path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            name: '芝麻实名'
          }, {
             path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            name: '芝麻分'
          }, {
             path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            name: '支付宝负面信息'
          }, {
             path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            name: '手术单照片'
          }, {
             path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            name: '手术单照片'
          }, {
             path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            name: '手术单照片'
          }]
        }
      }
    }
  },
  {
    code: 0,
    // 客户授信详情页面基础信息-授信信息部分
    url: `/information/creditDialog/creditlist`,
    type: 'get',
    response: config => {
      const {
        creditNo
      } = config.query

      let creditData
      List.map(item => {
        if (item.creditNo === creditNo) {
          creditData = item
        }
      })

      return {
        code: 0,
        data: creditData
      }
    }
  },
  {
    // 客户授信详情页面基础信息-授信信息部分
    url: `/loan/getViewLoan`,
    type: 'get',
    response: config => {
      const {
          clientNo
      } = config.query

      

      return {
        code: 0,
        data: {
          clientRealAuthInfo: [{
            path: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            name: '身份证正面'
          },
          {
            path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            name: '身份证反面'
          }
        ],
        creditAppendixInfo: [{
           path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          name: '手术单照片'
        }, {
           path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          name: '告知书照片'
        }, {
           path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          name: '手持身份证照片'
        }, {
           path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          name: '芝麻实名'
        }, {
           path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          name: '芝麻分'
        }, {
           path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          name: '支付宝负面信息'
        }, {
           path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          name: '手术单照片'
        }, {
           path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          name: '手术单照片'
        }, {
           path: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          name: '手术单照片'
        }],
        clientAppendixInfo: [{
          path: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          name: '支付宝'
        }, {
          path: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          name: '花呗截图'
        }, {
          path: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          name: '芝麻积分'
        }, {
          path: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          name: '支付宝'
        }, {
          path: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          name: '支付宝'
        }, {
          path: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          name: '支付宝'
        }]
        }
      }
    }
  }
]
