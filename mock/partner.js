// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到

import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {

  List.push(Mock.mock({
    // partnerNo: '@increment',
    // regName: '@cname', // 合作商注册名称
    // realName: '@first', // 实际营业名称
    "state|1": [0, 1, 2, 3, 4, 5], // 是否上架
    // saleCode: '@integer(1, 2)', // 归属BD
    // coopAgreementExpire: '@datetime("yyyy-MM-dd")',
    // 'regionName|1': ['南宁', '北海'],
    // createdTime: '@datetime("yyyy-MM-dd")',
    partnerNo:  i,
    regName: "完美整形01",
    realName: "完美整形",
    isShelves: "UP",
    saleCode: "12",
    grade: 2,
    latitude: '1',
    longitude: '2',
    linkerTel: '18278904219',
    linkerName: '@cname',
    'bizProperty|1': ['私营', '个体', '集体'],
    coopAgreementExpire: "2020-06-16",
    establishDateStr: "2020-05-27",
    shelvesReason: "测试",
    postCode: "505300",
    optLimit: "1",
    'companyIndustry|1': ['IT服务', '制造业', '批发/零售'],
    regAmt: "1000",
    addressSize: "122",
    'addressNature|1': ['租用', '私有'],
    openAccPermit: '开户许可证',
    employeesNumber: 20,
    monthSales: "3000",
    bizScope: "医美",
    'branchStatus|1': ['诊所及个体户', '普通医院', '集团化'],
    instLicence: null,
    instTaxNo: null,
    instOrganizationCode: null,
    medicalLicenseExpire: null,
    instLicenceExpire: null,
    managemantMode: null,
    regionCode: null,
    regionName: null,
    leaseExpire: null,
    createdTime: "2020-06-16",
    modifideTime: "2020-06-16",
    version: null,
    instTaxNo: '66666',
    instLicence: '66666',
    instOrganizationCode: '66666',
    medicalLicenseExpire: '2020-06-16',
    instLicenceExpire: '2020-06-16',
    managemantMode: '66666',
    regionCode: '666666', //区域code
    regionName: '南宁', //区域名称
    leaseExpire: '2020-06-16', //租赁场所合同到期日
    registerAddress: '广东省/深圳市/宝安区/安布雷拉科技',
    businessAddress: '广东省/深圳市/宝安区/安布雷拉科技'
  }))
}


const bankList = [{
    id: 111,
    partnerNo: '111', //商户编号
    settleType: '1', //银行卡类型
    cardNo: '6228488058052676', //银行卡卡号
    cardname: '徐亚明2', //银行账户户名
    cardCertNo: '450521199602206131', //银行账户身份证号码
    reservePhone: '18278904219', //预留手机号码
    bankName: '清秀支行', //银行卡开户行
    bankCode: '22', //银行卡开户行编号
    openSubBankCode: '2233', //银行账号开户网点编号
    openSubBankName: '平安银行', //银行账号开户网点名称
    openProvCode: '32432', //银行账号开户行所在省编码
    openProvName: '广西省', //银行账号开户行所在省
    openCityCode: '53d6122', //银行账号开户行所在市编码
    openCityName: '南宁市', //银行账号开户行所在市
    openAreaCode: '324324', //银行账号开户行所在区编码
    openAreaName: '清秀区', //银行账号开户行所在区
    openAddress: ['北京市', '市辖区', '东城区'], //自定义字段,为了显示地址
    isUsed: 1, //
    state: '1' // 
  },
  {
    id: 22,
    partnerNo: '2222', //商户编号
    settleType: '1', //银行卡类型
    cardNo: '6228488058052676', //银行卡卡号
    cardname: '徐亚明', //银行账户户名
    cardCertNo: '450521199602206131', //银行账户身份证号码
    reservePhone: '18278904219', //预留手机号码
    bankName: '清秀支行', //银行卡开户行
    bankCode: '22', //银行卡开户行编号
    openSubBankCode: '2233', //银行账号开户网点编号
    openSubBankName: '平安银行', //银行账号开户网点名称
    openProvCode: '32432', //银行账号开户行所在省编码
    openProvName: '广西省', //银行账号开户行所在省
    openCityCode: '53d6122', //银行账号开户行所在市编码
    openCityName: '南宁市', //银行账号开户行所在市
    openAreaCode: '324324', //银行账号开户行所在区编码
    openAreaName: '清秀区', //银行账号开户行所在区
    openAddress: ['北京市', '市辖区', '东城区'], //自定义字段,为了显示地址
    isUsed: 0, //
    state: '1' //
  }

]



let appendixData = {
  hospital: [{
      imgNo: 1,
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    },
    {
      imgNo: 2,
      src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    }
  ],
  renting: [
    //租房合同
    {
      imgNo: 1,
      src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    },
    {
      imgNo: 2,
      src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    }
  ],
  businessLicense: [
    //营业执照
    {
      imgNo: 1,
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    },
    {
      imgNo: 2,
      src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    }
  ],
  medicalLicense: [
    //医疗许可证
    {
      imgNo: 1,
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    },
    {
      imgNo: 2,
      src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    }
  ],
  operationList: [
    //手术单
    {
      imgNo: 1,
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    },
    {
      imgNo: 2,
      src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    }
  ],
  legalPerson: [
    //法人
    {
      imgNo: 1,
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    },
    {
      imgNo: 2,
      src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    }
  ],
  privateAccount: [
    //私人账户
    {
      imgNo: 1,
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    },
    {
      imgNo: 2,
      src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    }
  ],
  bankCard: [
    //银行卡
    {
      imgNo: 1,
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    },
    {
      imgNo: 2,
      src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    }
  ],
  contractAgreement: [
    //合同协议
    {
      imgNo: 1,
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    },
    {
      imgNo: 2,
      src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    }
  ],
  debtAgreement: [
    //债权协议
    {
      imgNo: 1,
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    },
    {
      imgNo: 2,
      src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    }
  ]
}
export default [

  // 分页获取客户列表
  {
    url: '/partner/getPartnerPage',
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
  { //添加收款银行卡
    url: '/partner/addPartnerCard',
    type: "post",
    response: config => {
      const data = config.body
      data.id = new Date().getTime()
      bankList.unshift(data)
      return {
        code: 0,
        data: {},
        msg: '添加成功'
      }

    }
  },
  { //获取合作商附件信息
    url: '/partner/getPartnerAppendix',
    type: "get",
    response: config => {
      return {
        code: 0,
        data: appendixData,
      }

    }
  },
  { //添加商户费率
    url: '/partner/partnerRate',
    type: "post",
    response: config => {
      const data = config.body
      console.log(data)
      return {
        code: 0,
        data: {},
        msg: '保存商户费率成功'
      }

    }
  },
  { //设置为默认收款卡
    url: '/partner/setToDefaultCart',
    type: "put",
    response: config => {
      const data = config.body
      bankList.map(item => {
        if (data.id === item.id) {
          item.isUsed = 0
        } else {
          item.isUsed = 1
        }
      })
      return {
        code: 0,
        data: {},
        msg: '修改默认收款卡成功'
      }

    }
  },
  { //商户审批
    url: '/partner/partnerAudit',
    type: "put",
    response: config => {
      const data = config.body
      // bankList.map(item => {
      //   if (data.id === item.id) {
      //     item.isUsed = 0
      //   } else {
      //     item.isUsed = 1
      //   }
      // })
      return {
        code: 0,
        msg: '审批商户成功'
      }

    }
  },
  { //设置为默认收款卡
    url: '/partner/modifyPartnerCard',
    type: "put",
    response: config => {
      const data = config.body
      bankList.map((item, index) => {
        if (data.id === item.id) {
          bankList[index] = data
        }
      })
      return {
        code: 0,
        data: {},
        msg: '修改收款卡成功'
      }

    }
  },
  { //设置为默认收款卡
    url: '/partner/modifyCart',
    type: "put",
    response: config => {
      const data = config.body
      bankList.map((item, index) => {
        if (data.id === item.id) {
          bankList[index] = data
        }
      })
      return {
        code: 0,
        data: {},
        msg: '修改收款卡成功'
      }

    }
  },
  { //删除收款卡
    url: '/partner/deleteCart',
    type: "delete",
    response: config => {
      const {
        id
      } = config.query
      console.log(config.query)
      bankList.map((item, index) => {
        if (id == item.id) {
          bankList.splice(index, 1)
        }
      })
      return {
        code: 0,
        data: {},
        msg: '删除收款卡成功'
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
  {
    url: '/partner/modify',
    type: 'put',
    response: config => {
      const {
        partnerNo,
        regName,
        realName,
        isShelves,
        saleCode,
        regionName,
        coopAgreementExpire
      } = config.body
      let result = false
      List.map((item, index) => {
        if (item.partnerNo == partnerNo) {
          List[index].partnerNo = partnerNo
          List[index].regName = regName
          List[index].realName = realName
          List[index].isShelves = isShelves
          List[index].saleCode = saleCode
          List[index].regionName = regionName
          List[index].coopAgreementExpire = coopAgreementExpire
          result = true
        }
      })
      return {
        code: 0,
        result: result,
      }
    }
  },
  // 添加合作商操作
  {
    url: '/partner/addPartner',
    type: 'post',
    response: config => {
      const obj = config.body
      obj.partnerNo = new Date().getTime()
      List.unshift(obj)
      return {
        code: 0,
        msg: "添加合作商成功"
      }
    }

  },
  // /partner/index/on 上架
  {
    url: '/partner/index/on',
    type: "get",
    response: config => {
      const {
        partnerNo
      } = config.query

      List.map((item, index) => {
        if (item.partnerNo == partnerNo) {
          item.isShelves = true
        }
      })
      return {
        code: 0,
        msg: "上架成功"
      }

    }
  },
  // 下架 /partner/index/under
  {
    url: '/partner/index/under',
    type: "get",
    response: config => {
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
  },
  // 查看详情里面的合作商信息详情
  {
    url: '/partner/detail',
    type: "get",
    response: config => {

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
  },
  // 银行卡信息
  {
    url: '/partner/partnerCardDataInfo',
    type: "get",
    response: config => {
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
  },

  {
    url: '/partner/getPartnerInfo',
    type: "get",
    response: config => {
      const {
        partnerNo
      } = config.query
      console.log(partnerNo)
      let result
      List.map(item => {
        if (item.partnerNo == partnerNo) {
          result = item
        }
      })
      return {
        code: 0,
        data: result
      }

    }
  },
  {
    url: '/partner/getPartnerContactsList',
    type: "get",
    response: config => {
      const {
        partnerNo
      } = config.query
      return {
        code: 0,
        data: [{
          partnerNo: partnerNo, //商户编号
          linkerNexusCode: '1', //联系人类型
          reprName: '徐亚明', //法定代表人姓名
          reprIdNo: '450521199602206131', //法定代表人身份证号码
          reprTel: '18278904219', //法人手机号码
          linkerPosition: 'ceo', //联系人职位
          linkerName: 'jack', //联系人姓名
          linkerTel: '7885192', //联系电话
          linkerRmail: '253274870@qq.com', //联系人邮箱
          isDelete: '1' //状态
        }]
      }

    }
  },
  {
    url: '/partner/getPartnerCardList',
    type: "get",
    response: config => {
      const {
        partnerNo
      } = config.query
      return {
        code: 0,
        data: bankList
      }

    }
  },
  {
    url: '/partner/getRateTemplateList',
    type: "get",
    response: config => {
      const {
        partnerNo
      } = config.query
      return {
        code: 0,
        data: [{
          type: 'p002',
          data: [{
            periodValue: 3,
            feeRate: 23.1,
            dayFeeRate: 12,
          }, {
            periodValue: 6,
            feeRate: 23.1,
            dayFeeRate: 12,
          }, ],

        }, {
          type: 'p001',
          data: [{
            periodValue: 3,
            feeRate: 23.1,
            dayFeeRate: 12,
          }, {
            periodValue: 6,
            feeRate: 23.1,
            dayFeeRate: 12,
          }, ],

        }]
      }

    }
  },
  {
    url: '/partner/getPartnerRateList',
    type: "get",
    response: config => {
      const {
        partnerNo
      } = config.query
      return {
        code: 0,
        data: [{
          type: 'p002',
          data: [{
            periodValue: 3,
            feeRate: 23.1,
            dayFeeRate: 12,
          }, {
            periodValue: 6,
            feeRate: 23.1,
            dayFeeRate: 12,
          }, ],

        }, {
          type: 'p001',
          data: [{
            periodValue: 3,
            feeRate: 23.1,
            dayFeeRate: 12,
          }, {
            periodValue: 6,
            feeRate: 23.1,
            dayFeeRate: 12,
          }, ],

        }]
      }

    }
  },
]
