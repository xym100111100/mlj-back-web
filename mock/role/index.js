import Mock from 'mockjs'
import {
  deepClone
} from '../../src/utils/index.js'
import {
  asyncRoutes,
  constantRoutes
} from './routes.js'

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [{
    key: 'admin',
    roleName: 'admin',
    roleNo: 1,
    isEnabled: true,
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes,
    permissionNos: [
      1, 2
    ]
  },
  {
    key: 'editor',
    roleNo: 2,
    isEnabled: true,
    roleName: 'editor',
    permissionNos: [
      2
    ],
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission') // just a mock

  },
  {
    key: 'visitor',
    roleNo: 3,
    isEnabled: true,
    roleName: 'visitor',
    permissionNos: [
      3
    ],
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [{
        path: 'dashboard',
        roleName: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard'
        }
      }]
    }]
  }
]

export default [
  // mock get all routes form server
  {
    url: '/rbac/getAllAdminRole',
    type: 'get',
    response: _ => {
      return {
        code: 0,
        data: roles
      }
    }
  },

  // mock get all roles form server
  {
    url: '/vue-element-admin/roles',
    type: 'get',
    response: _ => {
      return {
        code: 0,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/rbac/addAdminRole',
    type: 'post',
    response: config => {
      const data = config.body
      data.roleNo = new Date().getTime()
      roles.push(data)
      return{
        code: 0,
        msg:'添加成功'
      }
      
    }
  },

  // update role
  {
    url: '/rbac/modifyAdminRole',
    type: 'post',
    response:  config =>{
      const data = config.body
      roles.map((item, index) => {
        if (item.roleNo == data.roleNo) {
          roles[index] = data
        }
      })
      return{
        code: 0,
        msg:'编辑成功'
      }
      
    }
  },

  // get role
  {
    url: '/rbac/delRoleByRoleNo',
    type: 'get',
    response: config => {
      const {
        roleNo
      } = config.query
      console.log(roleNo)
      roles.map((item, index) => {
        if (item.roleNo == roleNo) {
          roles.splice(index, 1)
        }
      })
      return {
        code: 0,
        msg: '删除角色成功'
      }

    }
  }
]
