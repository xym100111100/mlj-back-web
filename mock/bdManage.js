// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到
import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

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

    id: '@increment',
    parentId: '@increment',
    username: '@cname',
    salesmanName: '@cname',
    salesmanId: '@increment',
    cell: '10086',
    // state: 'ENABLED',
    // state: 'ENABLED',
    createdTime: '1992-02-03',
    modifiedTime: '1992-02-03',
    memo: '这是一条信息',
    'state|1': ['ENABLED', 'UNABLED']

  }))
}

export default [

  // BD 信息列表
  {
    url: '/bd/getBDInfoList',
    type: 'post',
    response: config => {
      const {
        importance,
        state,
        title,
        page = 1,
        limit = 20,
        sort
      } = config.body

      let mockList = List.filter(item => {
        // console.log(item);
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
  },

  // 删除操作
  {
    url: '/bdmanage/del',
    type: 'delete',
    response: config => {
      const {
        id
      } = config.query
      let result = false
      List.map((item, index) => {
        if (item.id == id) {
          List.splice(index, 1)
          return result = true
        }
      })
      return {
        code: 0,
        msg: result
      }
    }
  },
  // 编辑操作
  {
    url: '/bdmanage/modify',
    type: 'put',
    response: config => {
      const {
        id,
        parentId,
        username,
        salesmanId,
        mobile,
        state,
        memo
      } = config.body
      let result = false
      List.map((item, index) => {
        if (item.id == id) {
          List[index].parentId = parentId
          List[index].salesmanId = salesmanId
          List[index].username = username
          List[index].mobile = mobile
          List[index].state = state
          List[index].memo = memo
          result = true
        }
      })
      return {
        code: 0,
        msg: result,
      }
    }
  },

  // 添加操作
  {
    url: '/bdmanage/add',
    type: 'post',
    response: config => {
      const obj = config.body
      List.unshift(obj)
      return {
        code: 0,
        msg: "成功"
      }
    }
  }
]
