import request from '@/utils/request'
//授信api

/**
 * 
 * @param {普通授信列表} data 
 */
export function creditRecordData(data) {
  return request({
    url: '/credit/getNormalCreditRecordList',
    method: 'post',
    data
  })
}


/**
 * 获取用户基础信息
 * @param {*} query 
 */
export function getClinetBasicsInfoData(query) {
  return request({
    url: '/client/getClientBaseInfo',
    method: 'get',
    params: query
  })
}


/**
 * 获取项目基础信息
 * @param {*} query 
 */
export function getOperationData(query) {
  return request({
    url: '/credit/getCreditItemsInfo',
    method: 'get',
    params: query
  })
}



/**
 * 获取附件信息
 * @param {*} query 
 */
export function getAppendixData(query) {
  return request({
    url: '/loan/getViewLoan',
    method: 'get',
    params: query
  })
}




/**
 * 修改授信状态
 * @param {} data 
 */
export function modifyRecordData(data) {
  return request({
    url: '/credit/creditAudit',
    method: 'put',
    data
  })
}

