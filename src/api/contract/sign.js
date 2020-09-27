import request from '@/utils/request'

export function contractSignData(token) {
  return request({
    url: '/contract/getContractSignList',
    method: 'get',
    params: {
      token
    }
  })
}
export function contractSignList(query) {
  return request({
    url: '/contract/getContractSignList',
    method: 'get',
    params: query
  })
}

export function updateData(data) {
  return request({
    url: '/contract/sign/modify',
    method: 'put',
    params: data
  })
}
// 作废合同
export function toVoidContractData(contractNo) {
  return request({
    url: '/contract/modifyContractSignState',
    method: 'put',
    params: {
       contractNo
    }
  })
}
