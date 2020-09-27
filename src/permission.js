import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 开始进度条
  // start progress bar
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否已登录
  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {

    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // 如果已登录，请重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
    
        next()
      } else {
     
        try {

          // 获取用户信息

          // note: roles must be a object array! such as
          // 注意：角色必须是对象数组！例如: ['admin'] or ,['developer','editor']
           await store.dispatch('user/getInfo')
          // 基于角色生成可访问路由图
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes')
          // 动态添加可访问路由,这里是添加到路由中，不是展示在侧边菜单
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // 确保addRoutes完整的hack方法
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          // 移除令牌并转到登录页以重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
