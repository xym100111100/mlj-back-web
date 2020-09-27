import request from '@/utils/request'
//  获取费率模板
// export function fetchList(data) {
//   return request({
//     url: '/rate/list',
//     method: 'get',
//     data
//   })
// }
// addRateData 添加
export function addRateData(data) {
  return request({
    url: '/partner/addPartnerRate',
    method: 'post',
    data
  })
}
// 发送编辑请求 updateData
export function updateData(data) {
  return request({
    url: '/partner/modifyPartnerRate',
    method: 'put',
    data
  })
}

// 发起删除请求
export function rateDelete(obj) {
  return request({
    url: `/partner/deletePartnerRate`,
    method: 'delete',
    params: obj
  })
}



// 新---------------新---------------新---------------新--------------新----------
//  获取费率模板
export function getRateTemplateListData(query) {
  return request({
    url: '/partner/getRateTemplateList',
    method: 'get',
    params: query
  })
}
// 费率模板删除
export function rateDeleteData(query) {
  return request({
    url: '/partner/addRateTemplate',
    method: 'post',
    params: query
  })
}

// 添加费率
export function addRateTemplateData(data) {
  console.log(data);
  return request({
    url: '/partner/addRateTemplate',
    method: 'post',
    data
  })
}

// 删除费率模板 
export function deleteRateTemplateData(query) {
  return request({
    url: '/partner/deleteRateTemplate',
    method: 'get',
    params: query
  })
}
