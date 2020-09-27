import request from '@/utils/request'

export function contractTemplatesList(params) {
  return request({
    url: '/contract/getContractTemplateByName',
    method: 'get',
    params: params
  })
}



export function getContractTemplateByNoData(params) {
  return request({
    url: '/contract/getContractTemplateByNo',
    method: 'get',
    params: params
  })
}






export function addContractTemplateData(data) {
  return request({
    url: '/contract/addContractTemplate',
    method: 'post',
    data
  })
}