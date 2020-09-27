/**
 * Created by jin.zhouhang on 17-8-11 上午10:31.
 *
 * 权限管理
 */
const permissionUtils = {
  install: function (Vue) {
    Vue.prototype.$permissionUtils = {
      btnPermission(code) {
        if (sessionStorage.getItem('btnPermission') == null || sessionStorage.getItem('btnPermission') == '') {
          return false
        }
        var btnPerList = sessionStorage.getItem('btnPermission').split(",");
        for (var num in btnPerList) {
          if (code == btnPerList[num]) {
            return true
          }
        }
        return false
      },
      menuPermission(code) {
        if (sessionStorage.getItem('menuPermission') == null || sessionStorage.getItem('menuPermission') == '') {
          return false
        }

        var menuPerList = sessionStorage.getItem('menuPermission').split(",");
        for (var num in menuPerList) {
          if (code == menuPerList[num]) {
            return true
          }
        }
        return false


      }
    }
  }

}

export default permissionUtils
