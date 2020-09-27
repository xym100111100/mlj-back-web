import request from '@/utils/request'
export function clientListData(token) {
  return request({
    url: '/contract/getContractTemplateByName',
    method: 'get',
    params: {
      token
    }
  })
}
// 获取合作商列表

export function fetchList(data) {
  return request({
    url: '/partner/getAuditPage',
    method: 'post',
    data
  })
}

export function deleteData(obj) {
  return request({
    url: '/partner/del',
    method: 'delete',
    params: obj
  })
}

export function addPartnerData(data) {
  return request({
    url: '/partner/addPartner',
    method: 'post',
    data
  })
}

// 编辑操作
export function updateData(data) {
  return request({
    url: '/partner/modifyPartner',
    method: 'put',
    data
  })
}

// 修改上架和下架 undercarriageOptData
export function upAndDownData(data) {
  return request({
    url: '/partner/dismountPartner',
    method: 'get',
    params: data
  })
}

//  查看详情请求 getPartnerDetailData
export function getPartnerDetailData(partnerNo) {
  return request({
    url: '/partner/getPartnerInfo',
    method: 'get',
    params: partnerNo
  })
}
// 获取银行卡信息
export function partnerCardData(partnerNo) {
  return request({
    url: '/client/getBankCodeList',
    method: 'get',
    params: partnerNo
  })
}
