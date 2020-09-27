import Cookies from 'js-cookie'

const TokenKey = 'X-Auth-Token'
const AdminUserNoKey = 'AdminUserNoKey'
const UsernameKey = 'UsernameKey'

const UserRoleKey = 'UserRoleKey'


const UserRoleNoKey = 'UserRoleNoKey'

export function getToken() {
  
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}




export function getAdminUserNo() {
  return sessionStorage.getItem(AdminUserNoKey)
}

export function setAdminUserNo(AdminUserNo) {
  return sessionStorage.setItem(AdminUserNoKey, AdminUserNo)
}

export function removeAdminUserNo() {
  return sessionStorage.removeItem(AdminUserNoKey)
}


export function getUsername() {
  return sessionStorage.getItem(UsernameKey)
}

export function setUsername(username) {
  return sessionStorage.setItem(UsernameKey, username)
}

export function removeUsername() {
  return sessionStorage.removeItem(UsernameKey)
}



export function getUserRole() {
  return sessionStorage.getItem(UserRoleKey)
}

export function setUserRole(userRole) {
  return sessionStorage.setItem(UserRoleKey, userRole)
}

export function removeUserRole() {
  return sessionStorage.removeItem(UserRoleKey)
}


export function getUserRoleNos() {
  return sessionStorage.getItem(UserRoleNoKey)
}

export function setUserRoleNos(UserRoleNos) {
  return sessionStorage.setItem(UserRoleNoKey, UserRoleNos)
}

export function removeUserRoleNos() {
  return sessionStorage.removeItem(UserRoleNoKey)
}


