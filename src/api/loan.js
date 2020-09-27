import request from '@/utils/request'

export function loanReCordList(query) {
  return request({
    url: '/loan/getLoanPageList',
    method: 'get',
    params: query
  })
}
// 获取详情,发送get请求
export function getInfoData(val) {
  return request({
    url: '/loan/getDebtInfo',
    method: 'get',
    params: val
  })
}

export function cardCheckingData(debtNo) {
  return request({
    url: '/loan/getSignLog',
    method: 'get',
    params: debtNo

  })
}

export function repayDetailData(val) {
  return request({
    url: '/loan/getRepaymentDetail',
    method: 'get',
    params: {
      val
    }
  })
}

export function LinkersData(clientNo) {
  return request({
    url: '/client/getClientContactList',
    method: 'get',
    params: {
      clientNo
    }
  })
}




export function getAmtInfoData(query) {
  return request({
    url: '/loanRecord/getAmtInfo/',
    method: 'get',
    params: query
  })
}

// 获取客户资料图片的请求 getAllImagesData
export function getAllImagesData(query) {
  return request({
    url: '/loan/getViewLoan',
    method: 'get',
    params: query
  })
}



//获取客户负债账户
export function getClientLoanDetailsData(query) {
  return request({
    url: '/loan/getDebtInfo',
    method: 'get',
    params: query
  })
}




//获取客户还款计划列表
export function getLoadDebtPlanData(query) {
  return request({
    url: '/loan/debtPlan',
    method: 'get',
    params: query
  })
}

//获取客户负债信息
export function getDebtInfoData(query) {
  return request({
    url: '/loan/getDebtInfo',
    method: 'get',
    params: query
  })
}

//放款
export function doLoanedData(query) {
  return request({
    url: '/loan/doLoaned',
    method: 'get',
    params: query
  })
}
//作废借款
export function debtInvalidData(query) {
  return request({
    url: '/loan/debtInvalid',
    method: 'get',
    params: query
  })
}



//修改客户借款状态(通过初审用)
export function modifyDebtStateData(data) {
  return request({
    url: '/loan/modifyDebtState',
    method: 'put',
    data
  })
}

