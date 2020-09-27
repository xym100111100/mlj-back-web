import request from '@/utils/request'


export function clientListData(data) {
  return request({
    url: '/client/getClientList',
    method: 'post',
     data
  })
}


export function fetchList(data) {
  return request({
    url: '/client/getClientList',
    method: 'post',
    data
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: {
      pv
    }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}


export function getInfoData(val) {
  return request({
    url: '/client/getInfo',
    method: 'get',
    params: {
      val
    }
  })
}





export function loadRecordData(val) {
  return request({
    url: '/loanRecord/getPageList',
    method: 'get',
    params: {
      val
    }
  })
}




export function isCardSignData(clientId) {
  return request({
    url: '/client/isCardSign',
    method: 'get',
    params: {
      id: clientId
    }
  })
}



export function cardCheckingData(clientId) {
  return request({
    url: '/client/getSignLog',
    method: 'get',
    params: {
      id: clientId
    }
  })
}


/**
 * 解绑银行卡
 * @param {客户id} clientId 
 */

export function unBindData(clientId) {
  return request({
    url: '/client/unBind',
    method: 'get',
    params: {
      id: clientId
    }
  })
}



/**
 * 冻结客户
 * @param {客户id} clientId 
 */
export function frozenClientData(clientId) {
  return request({
    url: '/client/frozen',
    method: 'get',
    params: {
      id: clientId
    }
  })
}

// 借款计算获取详情
export function calculateListData(data1) {
  return request({
    url: '/client/calculate/list',
    method: 'get',
    params: data1
  })
}
// calculatAmountData
export function calculatAmountData(data1) {
  return request({
    url: '/client/getAmtInfo',
    method: 'get',
    params: data1
  })
}



// 授信页面
// 详情弹框发起获取客户信息详情
export function getClientDetailData(data01) {
  return request({
    url: '/client/getCertificateInfoList',
    method: 'get',
    params: data01
  })
}


 export function  getClientMaterialData(clientNo){
  return request({
    url: '/loan/getViewLoan',
    method: 'get',
    params: clientNo
  })
 }


 
/**
 * 获取客户联系人列表
 * @param {*} clientNo 
 */
 export function  getClientContactListData(clientNo){
  return request({
    url: '/client/getClientContactList',
    method: 'get',
    params: clientNo
  })
 }

 
/**
 * 获取用户银行卡列表
 * @param {*} clientNo 
 */
 export function  getClientCardData(query){
  return request({
    url: '/client/cardList',
    method: 'get',
    params: query
  })
 }
