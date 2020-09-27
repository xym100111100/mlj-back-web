import request from '@/utils/request'

export function realNameListData(query) {
  return request({
    url: '/client/getClienttRealAuthList',
    method: 'get',
    params: query
  })
}


export function realNameModifyData(data) {
  return request({
    url: '/client/modifyRealAuthState',
    method: 'put',
    params: data
  })
}




export function getRealAuthInfoData(clientNo) {
  return request({
    url: '/loan/getViewLoan',
    method: 'get',
    params: {
      clientNo
    }
  })
}