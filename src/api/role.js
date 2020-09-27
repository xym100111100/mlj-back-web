import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/routes',
    method: 'get'
  })
}

export function getRolesData() {
  return request({
    url: '/rbac/getAllAdminRole',
    method: 'get'
  })
}

export function addRoleData(data) {
  return request({
    url: '/rbac/addAdminRole',
    method: 'post',
    data
  })
}

export function updateRoleData( data) {
  return request({
    url: '/rbac/modifyAdminRole',
    method: 'post',
    data
  })
}

export function deleteRoleData(roleNo) {
  return request({
    url: '/rbac/delRoleByRoleNo',
    method: 'get',
    params: {roleNo }
  })
}
// 修改用户启用状态
export function enableAdminRoleData(query) {
  return request({
    url: '/rbac/enableAdminRole',
    method: 'get',
    params: query
  })
}


export function updatePermissionsData( data) {
  return request({
    url: '/role/updatePermissionsData',
    method: 'put',
    data
  })
}