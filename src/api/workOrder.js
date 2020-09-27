import request from '@/utils/request'

// 获取合作商列表

export function fetchList(query) {
  return request({
    url: '/workOrder/getPartnerInfoModifyWorkPageList',
    method: 'get',
    params: query
  })
}

// 修改工单状态
export function upAndDownData(data) {
  return request({
    url: '/workOrder/dismountPartner',
    method: 'get',
    params: data
  })
}

//  查看详情请求 getPartnerDetailData
export function getPartnerDetailData(data) {
  return request({
    url: '/workOrder/getPartnerInfo',
    method: 'get',
    params: data
  })
}

// 获取对应的放款银行卡变更信息
export function getParterBankListData(data) {
  return request({
    url: '/partner/getPartnerCardList',
    method: 'get',
    params: data
  })
}

// 获取对应的商户基本变更信息 getParterBasicData
export function getParterBasicData(data) {
  return request({
    url: '/partner/getPartnerInfo',
    method: 'get',
    params: data
  })
}

// 新增基本信息
export function addBasicInfoOrderData(data) {
  return request({
    url: '/workOrder/addBasicInfoOrder',
    method: 'put',
    data
  })
}
// 新增联系人变更工单 
export function addContactInfoOrderData(data) {
  return request({
    url: '/workOrder/addContactInfoOrder',
    method: 'put',
    data
  })
}

// 新建附件信息变更工单 
export function addAppendixChangeData(data) {
  return request({
    url: '/workOrder/addPartnerEnclosureModify',
    method: 'put',
    data
  })
}

// 联系人变更 getlinkerChangeListData点击regName获取到对应的信息
export function getlinkerChangeListData(query) {
  return request({
    url: '/partner/getPartnerContactsList',
    method: 'get',
    params: query
  })
}

// 商户合作协议变更数据
export function cooperationChangeData(data) {
  return request({
    url: '/cooperationChange/cooperationChangeList',
    method: 'post',
    params: data
  })
}
// 商户附件信息变更数据
export function getAppendixChangeData(query) {
  return request({
    url: '/partner/getPartnerEnclosureList',
    method: 'get',
    params: query
  })
}

// 新增工单请求 --- 放款卡状态新增
export function addLoanCardOrderData(data) {
  return request({
    url: '/workOrder/addLoanCardOrder',
    method: 'put',
    data
  })
}
// ------------------ 查看 -- 提交--------------------------
// 放款银行卡的查看
export function getLoanCardDetailsData(query) {
  return request({
    url: '/workOrder/getLoanCardOrder',
    method: 'get',
    params: query
  })
}
// getBasicChangeData 商户基本信息
export function getBasicChangeData(query) {
  return request({
    url: '/workOrder/getBasicInfoOrder',
    method: 'get',
    params: query
  })
}
// 商户联系人信息查看
export function getLinkerChangeData(query) {
  return request({
    url: '/workOrder/getContactInfoOrder',
    method: 'get',
    params: query
  })
}

// 商户附件信息查看
export function getAppendixData(query) {
  return request({
    url: '/workOrder/getPartnerEnclosureModify',
    method: 'get',
    params: query
  })
}
// 商户合作协议查看
export function getCooperationChangeData(query) {
  return request({
    url: '/workOrder/getContractOrder',
    method: 'get',
    params: query
  })
}

// 获取商户注册名称数据
export function getRegNameOptionsData(data) {
  return request({
    url: '/partner/getHospitalList',
    method: 'get',
    params: data
  })
}

// 点击完成编辑操作
export function editLoanCardOrderData(data) {
  return request({
    url: '/workOrder/modifyLoanCardOrderByOrderNo',
    method: 'put',
    data
  })
}
// 基本信息
export function editBasicInfoOrderData(data) {
  return request({
    url: '/workOrder/modifyBasicInfoOrderByOrderNo',
    method: 'put',
    data
  })
}
// 联系人

export function editContactInfoOrderData(data) {
  return request({
    url: '/workOrder/modifyContactInfoOrderByOrderNo',
    method: 'put',
    data
  })
}


// 附件信息 editAppendixData
export function editAppendixData(data) {
  return request({
    url: '/workOrder/modifyPartnerEnclosureModifyByOrderNo',
    method: 'put',
    data
  })
}



// 点击提交按钮 触发的点击事件
export function submitLoanCardData(data) {
  return request({
    url: '/workOrder/modifyLoanCardOrderByOrderNo',
    method: 'put',
    data
  })
}
// 基本信息
export function submitBasicInfoOrderData(data) {
  return request({
    url: '/workOrder/modifyBasicInfoOrderByOrderNo',
    method: 'put',
    data
  })
}
// 联系人
export function submitContactInfoOrderData(data) {
  return request({
    url: '/workOrder/modifyContactInfoOrderByOrderNo',
    method: 'put',
    data
  })
}

// submitAppendixData 附件信息

export function submitAppendixData(data) {
  return request({
    url: '/workOrder/modifyPartnerEnclosureModifyByOrderNo',
    method: 'put',
    data
  })
}
