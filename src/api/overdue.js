import request from '@/utils/request'

export function getOverDueListData(data) {
  return request({
    url: '/loan/getOverdueLoanList',
    method: 'post',
    data
  })
}

// 获取逾期详情,发送get请求
export function getInfoData(query) {
  return request({
    url: '/loan/getOverduInfo',
    method: 'get',
    params: query
  })
}


// 列表详情数据
export function repayDetailData(query) {
  return request({
    url: '/loan/overdueDetail',
    method: 'get',
    params: query
  })
}


// 逾期还款明细详情
export function loanRecordData(val) {
  return request({
    url: '/loanRecord/getInfo',
    method: 'get',
    params: {
      val
    }
  })
}

// 获取还款信息
export function BackedInfoData(val) {
  return request({
    url: '/loanBacked/getBackedInfo',
    method: 'get',
    params: {
      val
    }
  })
}

// 
export function loanCollectData(val) {
  return request({
    url: '/loanCollect/getInfo/loanNo',
    method: 'get',
    params: {
      val
    }
  })
}
