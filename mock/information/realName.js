// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到
import Mock from 'mockjs'
import {
  config
} from '@vue/test-utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: i + 1,
    clientNo: /[1-9]{12}/,
    'sex|1': ['1', '2'],
    clientName: '@cname',
    certNo: '450981123456789' + i,
    'certType|1': ['1'],
    race: '汉族',
    'realAuthState|1': ['0', '1', '2', '3'],
    issuedBy: Mock.Random.county(true),
    createdTime: '@datetime("yyyy-MM-dd")',
    modifiedTime: '@datetime("yyyy-MM-dd")',
    overdueDate: '2015-05-22',
    validDate: '2010-05-22至2015-05-22',
    urls: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      ' https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    ]

  }))
}

export default [{
  url: '/client/getClienttRealAuthList',
  type: 'get',
  response: config => {
    const {
      importance,
      title,
      page = 1,
      limit = 20,
      sort,
      certType,
      realAuthState
    } = config.query

    let mockList = List.filter(item => {
      // console.log(item);
      if (importance && item.importance !== +importance) return false
      if (certType && item.certType !== certType) return false
      if (realAuthState && item.realAuthState !== realAuthState) return false
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
  // 允许通过实名认证
  url: `/information/realName/allow`,
  type: 'get',
  response: config => {
    const {
      id
    } = config.query

    List.map(item => {
      if (item.clientNo == id) {
        item.realAuthState = '2'
      }
    })
    return {
      code: 0,
      msg: "允许通过实名认证"
    }
  }
}, {
  // 不通过实名认证
  url: `/information/realName/notAllow`,
  type: 'get',
  response: config => {
    const {
      clientNo
    } = config.query
    List.map(item => {
      if (item.clientNo == clientNo) {
        item.realAuthState = '3'
      }
    })
    return {
      code: 0,
      msg: "拒绝通过实名认证"
    }

  }
}]
