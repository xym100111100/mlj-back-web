import request from '@/utils/request'



export function getPrimary() {
  return request({
    url: '/primary',
    method: 'get'
  })
}

export function addPrimary(data) {
  return request({
    url: '/primary',
    method: 'post',
    data
  })
}

export function updatePrimary( data) {
  return request({
    url: '/primary',
    method: 'put',
    data
  })
}

export function deletePrimary(roleNo) {
  return request({
    url: '/primary',
    method: 'delete',
    params: {roleNo }
  })
}
