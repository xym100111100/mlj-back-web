import Mock from 'mockjs'

import {
  asyncRoutes
} from './role/routes'



let List = [
  {
    id: 1,
    parentNo: '',
    permissionNo: '1',
    permissionName: '权限',
    permissionDescribe: '权限备注',
    path: '/system1',
    permissionValue:'parent1',
  
  }
  ,
  {
    id: 2,
    parentNo: '',
    permissionNo: '12',
    permissionName: '权限2',
    permissionDescribe: '权限备注2',
    path: '/system2',
    permissionValue:'parent2',
   
  }
  ,
  {
    id: 3,
    parentNo: '',
    permissionNo: '13',
    permissionName: '权限3',
    permissionDescribe: '权限备注3',
    path: '/system3',
    permissionValue:'parent3',
    
  }
  ,
]


export default [
  // mock get all routes form server
  {
    url: '/rbac/getAdminPermissionList',
    type: 'get',
    response: _ => {
      return {
        code: 0,
        data: List
      }
    }
  },

  // add role
  {
    url: '/rbac/addAdminPermission',
    type: 'post',
    response: config => {
      const obj = config.body
     obj.permissionNo = new Date().getTime()
     obj.id = new Date().getTime()
     if(!obj.parentNo){
      List.unshift(obj)
     }else{
      List.map(item=>{
        if(item.permissionNo === obj.parentNo){
          if(item.children){
            item.children.push(obj)
          }else{
            item.children = []
            item.children.push(obj)
          }
        }
      })
     }
      return {
        code: 0,
        data: {}
      }
    }
  },

  // update role
  {
    url: '/rbac/modifyAdminPermission',
    type: 'post',
    response: config => {
      const obj = config.body
      if(!obj.parentNo){
        List.map((item, index) => {
          if (item.permissionNo === obj.permissionNo) {
            List[index] = obj
          }
        })
      }else{
        List.map((item, index) => {
          if (item.permissionNo === obj.parentNo) {
            item.children.map((item2,index)=>{
              if (item2.permissionNo === obj.permissionNo) {
                item.children[index] = obj
                console.log(item.children[index])
              }else{
              }
            })
          }
        })
      }

      return {
        code: 0,
        msg: "修改成功"
      }
    }
  },

  // get role
  {
    url: '/rbac/deleteAdminPermission',
    type: 'get',
    response: config => { 
      const {
        permissionNo
      } = config.query
      List.map((item,index)=>{
        if(item.permissionNo == permissionNo){
          List.splice(index,1)
        }
      })
      return {
        code: 0,
        data: {
          status: 'success'
        }
      }
    }
  }
]
