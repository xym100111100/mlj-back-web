import request from '@/utils/request'

export function listPermissionData(query) {
  return request({
    url: '/rbac/getAdminPermissionList',
    method: 'get',
    params: query
  })
}



export function createPermissionData(data) {
  return request({
    url: '/rbac/addAdminPermission',
    method: 'post',
    data
  })
}

export function updatePermissionData(data) {
  return request({
    url: '/rbac/modifyAdminPermission',
    method: 'post',
    data
  })
}


export function deletePermissionData(permissionNo) {
    return request({
      url: '/rbac/deleteAdminPermission',
      method: 'get',
      params: {permissionNo}
    })
  }