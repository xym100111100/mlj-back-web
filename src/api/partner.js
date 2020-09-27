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
    url: '/partner/getPartnerPage',
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

// 编辑是商户基本信息操作
export function modifyPartnerData(data) {
  return request({
    url: '/partner/modifyPartner',
    method: 'put',
    data
  })
}
// 编辑商户联系人操作
export function modifyPartnerContactsData(data) {
  return request({
    url: '/partner/modifyPartnerContacts',
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
export function getPartnerCardData(partnerNo) {
  return request({
    url: '/partner/getPartnerCardList',
    method: 'get',
    params: partnerNo
  })
}


// 获取合作商联系人信息
export function getPartnerContactsData(partnerNo) {
  return request({
    url: '/partner/getPartnerContactsList',
    method: 'get',
    params: partnerNo
  })
}
// 获取合作商费率表
export function getPartnerRateData(partnerNo) {
  return request({
    url: '/partner/getPartnerRateList',
    method: 'get',
    params: partnerNo
  })
}


// 获取费率表
export function getRateTemplateListData() {
  return request({
    url: '/partner/getRateTemplateList',
    method: 'get',
  })
}



// 获取支持的银行卡列表
export function getBankCodeListData() {
  return request({
    url: '/partner/getBankCodeList',
    method: 'get',
  })
}
// 获取合作商附件信息
export function getPartnerAppendixData(partnerNo) {
  return request({
    url: '/partner/getPartnerEnclosureList',
    method: 'get',
    params: partnerNo
  })
}
// 获取费率模板
export function getRateTemplateData(partnerNo) {
  return request({
    url: '/partner/getRateTemplateList',
    method: 'get',
    params: partnerNo
  })
}




// 添加合作商银行卡信息
export function addBankData(data) {
  return request({
    url: '/partner/addPartnerCard',
    method: 'post',
    data
  })
}
// 添加合作商联系人
export function addPartnerContactsData(data) {
  return request({
    url: '/partner/addPartnerContacts',
    method: 'post',
    data
  })
}




// 修改收款卡
export function modifyCartData(data) {
  return request({
    url: '/partner/modifyPartnerCard',
    method: 'put',
    data
  })
}

// 商户审批
export function partnerAuditData(data) {
  return request({
    url: '/partner/partnerAudit',
    method: 'post',
    data
  })
}

// 删除收款卡
export function deleteCartData(obj) {
  return request({
    url: '/partner/deletePartnerCard',
    method: 'get',
    params: obj
  })
}


// 添加合作商费率
export function addPartnerRateData(data) {
  console.log(data)
  return request({
    url: '/partner/addPartnerRate',
    method: 'post',
    data
  })
}

// 添加合作商费率
export function modifyPartnerRateData(data) {
  console.log(data)
  return request({
    url: '/partner/modifyPartnerRate',
    method: 'put',
    data
  })
}
// 添加费率模板
export function addRateTemplateData(data) {
  return request({
    url: '/rate/addRateTemplate',
    method: 'post',
    data
  })
}
// 添加商户附件
export function addPartnerEnclosureData(data) {
  return request({
    url: '/partner/addPartnerEnclosure',
    method: 'post',
    data
  })
}
