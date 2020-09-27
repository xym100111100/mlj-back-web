import request from '@/utils/request'
// 还款列表分页条件查询
export function getRepayPageListData(data) {
  return request({
    url: '/repay/getRepayPageList',
    method: 'post',
    data
  })
}


//获取客户还款信息
export function getRepaymentData(query) {
  return request({
    url: '/repay/getRepayDetail',
    method: 'get',
    params: query
  })
}


//确认还款
export function confirmRepayData(query) {
  return request({
    url: '/repay/confirmRepay',
    method: 'get',
    params: query
  })
}
//确认还款
export function advanceCleanData(query) {
  return request({
    url: '/repay/advanceClean',
    method: 'get',
    params: query
  })
}
