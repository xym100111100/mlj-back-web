import Mock from 'mockjs'
import {
  param2Obj
} from '../src/utils'

import user from './user'
import table from './table'
import client from './client'
import bdmanage from './bdManage'
import partner from './partner'
import sign from './contract/sign'
import loan from './loan'
import overdue from './overdue'
import role from './role'
import realName from './information/realName'
import clientCredit from './information/clientCredit'
import primary from './primary'
import templates from './contract/templates'
import permission from './permission'
import rate from './rate'
import approval from './approval'
import workOrder from './workOrder'
import credit from './credit'
import orderInquiry from './partnerPage/orderInquiry'
import partnerInfo from './partnerPage/partnerInfo'


// '审批
import preliminary from './approval/preliminary'


const mocks = [
  ...user,
  ...table,
  ...client,
  ...bdmanage,
  ...partner,
  ...sign,
  ...templates,
  ...role,
  ...loan,
  ...overdue,
  ...realName,
  ...primary,
  ...clientCredit,
  ...permission,
  ...rate,
  ...preliminary,
  ...approval,
  ...workOrder,
  ...credit,
  ...orderInquiry,
  ...partnerInfo
]

// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const {
          body,
          type,
          url
        } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

export default mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})
