// 客户端数据，注意需要将该文件引入到mock/index.js里面才能被mock到

import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: i,
    adminUserNo: i, // 关联的用户编号
    'associatedUserType|1': ['1', '2', '3', '4'], //关联的用户类型
    username: '@first',
    password: '@title(3, 8)',
    realName: '@first',
    avatar: image_uri,
    cell: "18278904219",
    email: '253274870@qq.com',
    'sex|1': ['1', '2', '0'],
    'state|1': ['NORMAL', 'LOCK', 'LOGOFF'],
    firstLoginTime: "2019-02-20",
    lastLoginTime: "2019-02-20",
    createTime: "2019-02-20",
    modifiedTime: "2019-02-20",
    'version|1': ['v1', 'v2'],
  }))
}

const UserRoleList = [
  "admin"
]


const tokens = {
  admin: {
    token: 'admin-token',
    adminUserNo: '1234'
  },
  editor: {
    token: 'editor-token',
    adminUserNo: '5678'
  }
}



const userInfo = {
  admin: {
    "adminUserNo": "1234",
    "username": "weibocy",
    "realName": "张三",
    "avatar": null,
    "cell": "138123456789",
    "email": "123@qq.com",
    "sex": "UNKNOWN",
    "state": "NORMAL",
    "lastLoginTime": null,
    roles: [{
      "id": 1,
      "roleNo": "111",
      "roleName": "admin",
      "roleDescription": "管理员",
      "ordersNo": null,
      "isEnabled": 1,
      "createdTime": "2020-05-27 17:09:41",
      "modifiedTime": "2020-06-06 15:40:40",
      "version": null,
      "memo": null,
      "permissions": [{
          "id": 12,
          "permissionNo": "1270614117991976960",
          "parentNo": "",
          "parentName": null,
          "permissionName": "获取所有权限列表",
          "permissionType": 2,
          "permissionDescribe": "获取所有权限列表",
          "permissionValue": "rbac-getAdminPermissionList",
          "path": "/rbac/getAdminPermissionList",
          "icon": null,
          "state": 1,
          "ordersNo": null,
          "createdTime": "2020-06-10 15:09:47",
          "modifiedTime": "2020-06-10 15:09:47",
          "version": null,
          "children": null
        },
        {
          "id": 17,
          "permissionNo": "1270614117991976961",
          "parentNo": null,
          "parentName": null,
          "permissionName": "新增后台权限",
          "permissionType": 2,
          "permissionDescribe": "新增后台权限",
          "permissionValue": "rbac-addAdminPermission",
          "path": "/rbac/addAdminPermission",
          "icon": null,
          "state": 1,
          "ordersNo": null,
          "createdTime": "2020-06-10 20:27:50",
          "modifiedTime": "2020-06-10 20:27:50",
          "version": null,
          "children": null
        }
      ]
    }]
  },
  weibocy: {
    "adminUserNo": "1234",
    "username": "weibocy",
    "realName": "张三",
    "avatar": null,
    "cell": "138123456789",
    "email": "123@qq.com",
    "sex": "UNKNOWN",
    "state": "NORMAL",
    "lastLoginTime": null,
    roles: [{
      "id": 1,
      "roleNo": "111",
      "roleName": "admin",
      "roleDescription": "管理员",
      "ordersNo": null,
      "isEnabled": 1,
      "createdTime": "2020-05-27 17:09:41",
      "modifiedTime": "2020-06-06 15:40:40",
      "version": null,
      "memo": null,
      "permissions": [{
          "id": 12,
          "permissionNo": "1270614117991976960",
          "parentNo": "",
          "parentName": null,
          "permissionName": "获取所有权限列表",
          "permissionType": 2,
          "permissionDescribe": "获取所有权限列表",
          "permissionValue": "rbac-getAdminPermissionList",
          "path": "/rbac/getAdminPermissionList",
          "icon": null,
          "state": 1,
          "ordersNo": null,
          "createdTime": "2020-06-10 15:09:47",
          "modifiedTime": "2020-06-10 15:09:47",
          "version": null,
          "children": null
        },
        {
          "id": 17,
          "permissionNo": "1270614117991976961",
          "parentNo": null,
          "parentName": null,
          "permissionName": "新增后台权限",
          "permissionType": 2,
          "permissionDescribe": "新增后台权限",
          "permissionValue": "rbac-addAdminPermission",
          "path": "/rbac/addAdminPermission",
          "icon": null,
          "state": 1,
          "ordersNo": null,
          "createdTime": "2020-06-10 20:27:50",
          "modifiedTime": "2020-06-10 20:27:50",
          "version": null,
          "children": null
        }
      ]
    }]
  },
  editor: {
    "adminUserNo": "5678",
    "username": "weibocy",
    "realName": "张三",
    "avatar": null,
    "cell": "138123456789",
    "email": "123@qq.com",
    "sex": "UNKNOWN",
    "state": "NORMAL",
    "lastLoginTime": null,
    roles: [{
      "id": 1,
      "roleNo": "111",
      "roleName": "editor",
      "roleDescription": "管理员",
      "ordersNo": null,
      "isEnabled": 1,
      "createdTime": "2020-05-27 17:09:41",
      "modifiedTime": "2020-06-06 15:40:40",
      "version": null,
      "memo": null,
      "permissions": [{
          "id": 12,
          "permissionNo": "1270614117991976960",
          "parentNo": "",
          "parentName": null,
          "permissionName": "获取所有权限列表",
          "permissionType": 2,
          "permissionDescribe": "获取所有权限列表",
          "permissionValue": "rbac-getAdminPermissionList",
          "path": "/rbac/getAdminPermissionList",
          "icon": null,
          "state": 1,
          "ordersNo": null,
          "createdTime": "2020-06-10 15:09:47",
          "modifiedTime": "2020-06-10 15:09:47",
          "version": null,
          "children": null
        },
        {
          "id": 17,
          "permissionNo": "1270614117991976961",
          "parentNo": null,
          "parentName": null,
          "permissionName": "新增后台权限",
          "permissionType": 2,
          "permissionDescribe": "新增后台权限",
          "permissionValue": "rbac-addAdminPermission",
          "path": "/rbac/addAdminPermission",
          "icon": null,
          "state": 1,
          "ordersNo": null,
          "createdTime": "2020-06-10 20:27:50",
          "modifiedTime": "2020-06-10 20:27:50",
          "version": null,
          "children": null
        }
      ]
    }]
  }

}

const users = {
  '1234': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  '5678': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const roles = {
  admin: [{
    id: 1,
    roleNo: "111",
    roleName: "admin",
    roleDescription: "管理员",
    ordersNo: null,
    isEnabled: 1,
    createdTime: "2020-05-27 17:09:41",
    modifiedTime: "2020-06-06 15:40:40",
    version: null,
    memo: null,
    permissions: [{
        permissionNo: "1",
        parentNo: null,
        path: "/system",
      },
      {
        permissionNo: "11",
        parentNo: "1",
        path: "/system/permission",
      },
      {
        permissionNo: "111",
        parentNo: "1",
        path: "/system/role",
      },
      {
        permissionNo: "1111",
        parentNo: "1",
        path: "/system/user",
      },
      {
        permissionNo: "2",
        parentNo: null,
        path: "/client",
      },
      {
        permissionNo: "22",
        parentNo: "2",
        path: "index",
      },
      {
        permissionNo: "223",
        parentNo: "2",
        path: "clientInfoDetail",
      },

    ],
  }, ],
  editor: [{
    id: 1,
    roleNo: "111",
    roleName: "editor",
    roleDescription: "编辑",
    ordersNo: null,
    isEnabled: 1,
    createdTime: "2020-05-27 17:09:41",
    modifiedTime: "2020-06-06 15:40:40",
    version: null,
    memo: null,
    permissions: [{
        permissionNo: "1",
        parentNo: null,
        path: "/system",
      },
      {
        permissionNo: "11",
        parentNo: "1",
        path: "/system/permission",
      },
      {
        permissionNo: "111",
        parentNo: "1",
        path: "/system/role",
      },
      {
        permissionNo: "1111",
        parentNo: "1",
        path: "/system/user",
      },
      {
        permissionNo: "2",
        parentNo: null,
        path: "/client",
      },
      {
        permissionNo: "22",
        parentNo: "2",
        path: "index",
      },
      {
        permissionNo: "223",
        parentNo: "2",
        path: "clientInfoDetail",
      },

    ],
  }, ],
}


const roles1 = {
  '1234': [{
    id: 1,
    roleNo: "111",
    roleName: "admin",
    roleDescription: "管理员",
    ordersNo: null,
    isEnabled: 1,
    createdTime: "2020-05-27 17:09:41",
    modifiedTime: "2020-06-06 15:40:40",
    version: null,
    memo: null,
    permissions: [{
        permissionNo: "1",
        parentNo: null,
        path: "/system",
      },
      {
        permissionNo: "11",
        parentNo: "1",
        path: "/system/permission",
      },
      {
        permissionNo: "111",
        parentNo: "1",
        path: "/system/role",
      },
      {
        permissionNo: "1111",
        parentNo: "1",
        path: "/system/user",
      },
      {
        permissionNo: "2",
        parentNo: null,
        path: "/client",
      },
      {
        permissionNo: "22",
        parentNo: "2",
        path: "index",
      },
      {
        permissionNo: "223",
        parentNo: "2",
        path: "clientInfoDetail",
      },

    ],
  }, ],
  '5678': [{
    id: 1,
    roleNo: "111",
    roleName: "editor",
    roleDescription: "编辑",
    ordersNo: null,
    isEnabled: 1,
    createdTime: "2020-05-27 17:09:41",
    modifiedTime: "2020-06-06 15:40:40",
    version: null,
    memo: null,
    permissions: [{
        permissionNo: "1",
        parentNo: null,
        path: "/system",
      },
      {
        permissionNo: "11",
        parentNo: "1",
        path: "/system/permission",
      },
      {
        permissionNo: "111",
        parentNo: "1",
        path: "/system/role",
      },
      {
        permissionNo: "1111",
        parentNo: "1",
        path: "/system/user",
      },
      {
        permissionNo: "2",
        parentNo: null,
        path: "/client",
      },
      {
        permissionNo: "22",
        parentNo: "2",
        path: "index",
      },
      {
        permissionNo: "223",
        parentNo: "2",
        path: "clientInfoDetail",
      },

    ],
  }, ],
}


export default [{
    url: '/user/role/del',
    type: 'put',
    response: config => {
      const {
        associatedUserNo,
        movedKeys
      } = config.body
      movedKeys.map((item) => {
        let index = UserRoleList.indexOf(item);
        index === -1 ? "" : UserRoleList.splice(index, 1)
      })
      return {
        code: 0,
        msg: "删除用户角色成功"
      }
    }
  },
  {
    url: '/rbac/adminUserRoles',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: UserRoleList
      }

    }
  },
  {
    url: '/rbac/setAdminUserRole',
    type: 'post',
    response: config => {
      const {
        associatedUserNo,
        movedKeys
      } = config.body
      UserRoleList.push(...movedKeys)
      return {
        code: 0,
        msg: "添加用户角色成功"
      }
    }
  },
 
  // user login
  {
    url: '/login/sign',
    type: 'post',
    response: config => {
      const {
        username
      } = config.body
      const token = tokens[username]

      return {
        code: 0,
        data: {
          ...token,
          info: {
            username,
            ...userInfo[username]
          }
        }
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const {
        associatedUserNo
      } = config.query
      const userInfo = users[associatedUserNo]
      console.log(roles1[associatedUserNo])
      // mock error
      // if (!info) {
      //   return {
      //     code: 50008,
      //     message: 'Login failed, unable to get user details.'
      //   }
      // }

      return {
        code: 0,
        data: {
          ...userInfo,
          info: roles1[associatedUserNo]
        },
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        data: 'success'
      }
    }
  },
  {
    code: 0,
    url: '/user/menu/path',
    type: "get",
    response: config => {
      {
        const {
          id
        } = config.query
        return {
          code: 0,
          data: [
            '/system',
            '/system/permission',
            '/system/role'
          ]
        }
      }
    }
  },
  {
    code: 0,
    url: '/user/lock',
    type: "get",
    response: config => {
      {
        const {
          associatedUserNo
        } = config.query
        return {
          code: 0,
          msg: "锁定成功"
        }
      }
    }
  },
  {
    code: 0,
    url: '/user/logoff',
    type: "get",
    response: config => {
      {
        const {
          associatedUserNo
        } = config.query
        return {
          code: 0,
          msg: '注销成功'
        }
      }
    }
  },
  {
    code: 0,
    url: '/user/normal',
    type: "get",
    response: config => {
      {
        const {
          associatedUserNo
        } = config.query
        return {
          code: 0,
          msg: '恢复成功'
        }
      }
    }
  },
  // 分页获取用户列表
  {
    url: '/getAdminUserList',
    type: 'get',
    response: config => {
      const {
        state,
        title,
        page = 1,
        limit = 20,
        sort
      } = config.query

      let mockList = List.filter(item => {
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
  {
    url: '/admin/addAdminUser',
    type: 'post',
    response: config => {
      const data = config.body
      data.associatedUserNo = new Date().getTime()
      data.state = 'NORMAL'
      List.unshift(data)
      return {
        code: 0,
        msg: "添加用户成功",
        data
      }
    }
  },
  {
    url: '/user',
    type: 'put',
    response: config => {
      const data = config.body
      List[List.findIndex(item => item.associatedUserNo === data.associatedUserNo)] = data
      return {
        code: 0,
        msg: "修改用户成功",
      }
    }
  },
  // /bd/getBDList 获取上级BD 的数据
  {
    url: '/bd/getBDList',
    type: 'get',
    response: config => {
      return {
        code: 0,
        msg: "获取失败哦!!",
        data: [{
            salesmanName: '小蓝',
            salesmanId: '11'
          },
          {
            salesmanName: '小黑',
            salesmanId: '22'
          },
          {
            salesmanName: '小洪',
            salesmanId: '33'
          },
          {
            salesmanName: '小白',
            salesmanId: '44'
          }
        ]
      }
    }
  },
]
