/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')
    .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}



/**
 * 
 * @param {动态路由} routes 
 * @param {用户拥有的路径*} paths 
 */
export function filterAsyncRoutes(routes, paths) {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(paths, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, paths)
      }
      res.push(tmp)
    }
  })

  return res
}

function hasPermission(paths, route) {
  if (route && route.path) {
    return paths.some(path => path === route.path)
  } else {
    return true
  }
}





// 整理路由成字符串数组
export function arrangementUrl(routes) {
  let tempRoutes = []
  routes.map(item => filterRouter(item, tempRoutes))
  return tempRoutes
}

function filterRouter(item, tempRoutes) {
  if (item.path && !tempRoutes.includes(item.path)) {
    tempRoutes.push(item.path)
  }
  if (item.children) {
    item.children.map(item => {
      filterRouter(item, tempRoutes)
    })
  }
}





export function arrangementPermissions(roles) {
  roles.map((role) => {
    role.parentPahts = [];
    let childrenPath = [];
    // 1：找出所有权限父节点
    role.permissions.map((permissions) => {
      if (!permissions.parentNo) {
        role.parentPahts.push({
          path: permissions.path,
          permissionNo: permissions.permissionNo,
        });
      } else {
        // 不是顶级节点则添加到临时子节点里面以便下面遍历
        childrenPath.push(permissions);
      }
    });
    // 2：找出父节点的所有子节点
    role.parentPahts.map((parent) => {
      parent.paths = [
        parent.path,
        ...filterPath(parent.permissionNo, childrenPath),
      ];
    });
  });
  // 3找出所有菜单权限
  let allPath = []
  roles.map((role) => {
    role.parentPahts.map(item => allPath.push(item))
  });
  return allPath
}

/**
 *
 * @param {父节点编号} permissionNo
 * @param {所有子节点} permissions
 */
function filterPath(permissionNo, permissions) {
  let result = []
  let tempNode = []
  permissions.map((item) => {
    if (permissionNo === item.parentNo) {
      result.push(item.path);
      // 为下面递归子节点做准备
      tempNode.push({
        permissionNo: item.permissionNo,
        permissions
      })
    }
  });
  tempNode.map(item => {
    result.push(...filterPath(item.permissionNo, permissions))

  })
  return result;
}


/**
 * 检查合作商附件照片是否为空
 * @param {*} imagesData 
 */
export function checkPartnerAppendixLength(imagesData) {
  if (imagesData.hospital.enclosureRos.length < 1) {
    return {
      result: false,
      msg: '医院照片不能为空'
    }
  }
  if (imagesData.renting.enclosureRos.length < 1) {
    return {
      result: false,
      msg: '租房合同照片不能为空'
    }

  }
  if (imagesData.businessLicense.enclosureRos.length < 1) {
    return {
      result: false,
      msg: '营业执照照片不能为空'
    }
  }
  if (imagesData.medicalLicense.enclosureRos.length < 1) {
    return {
      result: false,
      msg: '医疗许可证照片不能为空'
    }
  }
  if (imagesData.operationList.enclosureRos.length < 1) {
    return {
      result: false,
      msg: '手术单照片不能为空'
    }
  }
  if (imagesData.legalPerson.enclosureRos.length < 1) {
    return {
      result: false,
      msg: '法人照片不能为空'
    }
  }
  if (imagesData.privateAccount.enclosureRos.length < 1) {
    return {
      result: false,
      msg: '私人账户照片不能为空'
    }
  }
  if (imagesData.contractAgreement.enclosureRos.length < 1) {
    return {
      result: false,
      msg: '合同协议照片不能为空'
    }
  }
  if (imagesData.debtAgreement.enclosureRos.length < 1) {
    return {
      result: false,
      msg: '债权协议照片不能为空'
    }
  }

  return {
    result: true,
    msg: '检查通过'
  }

}


