import request from '@/utils/request'

export function loanReCordList(query) {
  return request({
    url: '/partner/getPartnerOrderPageList',
    method: 'get',
    params: query
  })
}


// 详情弹框
//获取客户还款信息
export function getRepaymentData(query) {
  return request({
    url: '/repay/getRepayDetail',
    method: 'get',
    params: query
  })
}
