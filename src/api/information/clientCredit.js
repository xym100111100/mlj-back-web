import request from '@/utils/request'

export function clientCreditListData(query) {
  return request({
    url: '/client/getCreditDetailList',
    method: 'get',
    params: query
  })
}


