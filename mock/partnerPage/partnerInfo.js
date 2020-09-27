// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到
import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    // bdName: "@cname",
    // cell: "17869698589",
    // clientName: "@cname",
    // clientNo: "128444300309155430" + i,
    // createdTime: "2020-07-18",
    // debtAmt: 4800000,
    // debtLimit: 18,
    // debtNo: "1284444666997116928",
    // productType: "P002",
    // state: ['0','1','2','3','4','5','6','7','8','9']

    linkerName: "@cname",
    linkerTel: "18278904219",
    partnerNo: "1282570861211160" + i,
    realName: "华美整形",
    regName: "华美整形",
    state: ['0', '1', '2', '3', '4', '5']
  }))
}

export default [{
    url: '/partnerInfo/getPartnerInfoList',
    type: 'get',
    response: config => {
      const {
        expirationDate,
        page,
        limit,
        keys,
        type,
        searchType,
        state
      } = config.query

      let mockList = List.filter(item => {
        // console.log(item);
        if (importance && item.importance !== +importance) return false
        if (certType && item.certType !== certType) return false
        if (realAuthState && item.realAuthState !== realAuthState) return false
        if (type && item.type !== type) return false
        if (expirationDate && item.expirationDate !== expirationDate) return false
        if (searchType && item.searchType !== searchType) return false
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
  // 弹框获取信息
  // 获取合作商信息--------
  {
    url: '/partnerInfo/getPartnerInfo',
    type: "get",
    response: config => {
      const {
        partnerNo
      } = config.query

      let PartnerInfoData
      List.map(item => {
        if (item.partnerNo == partnerNo) {
          PartnerInfoData = {
            addressNature: "1",
            addressSize: "333",
            auditResult: "通过",
            bizProperty: "私营",
            bizScope: "333",
            branchStatus: "0",
            businessAddress: "北京市/市辖区/东城区/333",
            companyIndustry: "制造业",
            coopAgreementExpire: "2020-07-15",
            employeesNumber: 333,
            establishDateStr: "2020-07-06",
            grade: 2,
            instLicence: "33",
            instLicenceExpire: "长期",
            instOrganizationCode: "33",
            instTaxNo: null,
            latitude: "33",
            leaseExpire: "2020-07-09",
            longitude: "33",
            managemantMode: "333",
            medicalLicenseExpire: "2020-07-24",
            monthSales: "333",
            openAccPermit: "33",
            optLimit: null,
            partnerNo: "1283240860074512384",
            postCode: null,
            realName: "333",
            regAmt: "333",
            regName: "333",
            registerAddress: "天津市/市辖区/和平区/333",
            saleCode: "1268793259442966528",
            state: 4
          }
        }
      })
      return {
        code: 0,
        data: PartnerInfoData,
        msg: '操作成功'
      }
    }
  }
]
