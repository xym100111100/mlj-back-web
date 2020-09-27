import request from '@/utils/request'

export function bdManageData(token) {
  return request({
    url: '/bd/getBDInfoList',
    method: 'get',
    params: {
      token
    }
  })
}

// 删除操作
export function bdDelete(obj) {
  return request({
    url: `/bdmanage/del`,
    method: 'delete',
    params: obj
  })
}

export function fetchList(data) {
  return request({
    url: '/bd/getBDInfoList',
    method: 'post',
    data
  })
}





export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: {
      id
    }
  })
}


export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}


// BD管理-编辑操作
export function updateData(data) {
  return request({
    url: '/bdmanage/modify',
    method: 'put',
    data
  })
}

// BD管理-编辑操作
export function addData(data) {
  return request({
    url: '/bdmanage/add',
    method: 'post',
    data
  })
}
