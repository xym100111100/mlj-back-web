import Mock from 'mockjs'

const data = Mock.mock({
  'records|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

export default [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const records = data.records
      return {
        code: 0,
        data: {
          total: records.length,
          records: records
        }
      }
    }
  }
]
