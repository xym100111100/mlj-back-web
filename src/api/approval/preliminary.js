import request from '@/utils/request'

export function PreliminaryListData(query) {
  return request({
    url: '/loan/getClientDebtList',
    method: 'get',
    params: query
  })
}






// 修改审核状态
export function modifyDebtStateData(data) {
  return request({
    url: '/loan/modifyDebtState',
    method: 'put',
    params: data
  })
}
