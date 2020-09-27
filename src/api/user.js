import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/sign',
    method: 'post',
    data
  })
}

export function getInfo(associatedUserNo) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      associatedUserNo
    }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}


export function getMenuPathData(id) {
  return request({
    url: '/user/menu/path',
    method: 'get',
    params: {
      associatedUserNo: id
    }
  })
}


export function fetchList(query) {
  return request({
    url: '/getAdminUserList',
    method: 'get',
    params: query
  })
}

// 新增用户
export function createArticle(data) {
  return request({
    url: '/admin/addAdminUser',
    method: 'post',
    data
  })
}

// 公用API 编辑 
export function updateData(data) {
  return request({
    url: '/modifyAdminUser',
    method: 'post',
    data
  })
}


export function deleteData(obj) {
  return request({
    url: '/partner/del',
    method: 'delete',
    params: obj
  })
}





export function addUserRoleData(data) {
  return request({
    url: '/rbac/setAdminUserRole',
    method: 'post',
    data
  })
}

export function delUserRoleData(data) {
  return request({
    url: '/user/role/del',
    method: 'put',
    data
  })
}

// // 锁定用户
// export function lockUser(data) {
//   return request({
//     url: '/modifyAdminUser',
//     method: 'get',
//     params: data
//   })
// }

// 锁定 恢复 注销用户
export function changeStateData(data) {
  return request({
    url: '/modifyAdminUserState',
    method: 'put',
    data
  })
}

// selectBDEnumData
export function selectBDEnumData(data) {
  return request({
    url: '/bd/getBDList',
    method: 'get',
    params: data
  })
}


export function getUserRoleData(adminUserNo) {
  return request({
    url: '/rbac/adminUserRoles',
    method: 'get',
    params: adminUserNo
      
    
  })
}