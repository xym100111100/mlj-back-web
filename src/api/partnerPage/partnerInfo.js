import request from '@/utils/request'
// 获取合作商列表
export function fetchList(data) {
  return request({
    url: '/partner/getPartnerInfoList',
    method: 'post',
    data
  })
}


// 弹框内的请求
//  查看详情请求 getPartnerDetailData
// 获取合作商信息------------------------------------
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

// 获取合作商费率表
export function getPartnerRateData(partnerNo) {
  return request({
    url: '/partner/getPartnerRateList',
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

// 获取合作商附件信息
export function getPartnerAppendixData(partnerNo) {
  return request({
    url: '/partner/getPartnerEnclosureList',
    method: 'get',
    params: partnerNo
  })
}
// 获取支持的银行卡列表
export function getBankCodeListData() {
  return request({
    url: '/partner/getBankCodeList',
    method: 'get',
  })
}
