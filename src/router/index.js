import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: {
      title: '美丽金后台',
      icon: 'user',
    },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'user',
      } // you can set roles in root nav }
    }]
  },
]
export const asyncRoutes = [{
    path: '/system',
    component: Layout,
    redirect: '/system/permission',
    alwaysShow: true, // will always show the root menu
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'user',
      roles: ['admin', 'editor'] // yo
    },
    children: [{
        path: '/system/permission',
        component: () => import('@/views/system/permission'),
        name: 'permission',
        meta: {
          icon: 'user',
          title: '权限管理',
          roles: ['admin', 'editor']
        }
      },
      {
        path: '/system/role',
        component: () => import('@/views/system/role'),
        name: 'role',
        meta: {
          icon: 'user',
          title: '角色权限',
          roles: ['admin', 'editor'] // yo
        }
      },
      {
        path: '/system/user',
        component: () => import('@/views/system/user'),
        name: 'user',
        meta: {
          icon: 'user',
          title: '用户管理',
          roles: ['admin', 'editor'] // yo
        }
      },
    ]
  },
  {
    path: '/client',
    component: Layout,
    redirect: 'index',
    name: "客户管理",
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '客户管理',
      icon: 'user',
      roles: ['admin']
    },
    children: [{
        path: 'index',
        name: 'client',
        component: () => import('@/views/client/index'),
        meta: {
          icon: 'user',
          title: '客户列表',
          roles: ['admin']
        }
      },
      {
        path: 'clientInfoDetail',
        name: 'clientInfoDetail',
        component: () => import('@/views/client/clientInfoDetail'),
        hidden: true,
        meta: {
          title: '客户详情',
          activeMenu: '/client/index',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/bdManage',
    component: Layout,
    redirect: 'bdList',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'BD管理',
      icon: 'user',
      roles: ['admin']
    },
    children: [{
      path: 'bdList',
      name: 'BD列表',
      component: () => import('@/views/bdManage/bdManage'),
      meta: {
        title: 'BD列表',
        icon: 'user',
        roles: ['admin']
      }
    }]
  },
  // {
  //   path: '/approval',
  //   component: Layout,
  //   meta: {
  //     title: '信息认证',
  //     icon: 'user',
  //     roles: ['admin']
  //   },
  //   children: [{
  //       path: 'preliminary',
  //       name: '未通过',
  //       component: () => import('@/views/approval/preliminary'),
  //       meta: {
  //         title: '未通过',
  //         icon: 'user',
  //         roles: ['admin']
  //       }
  //     },
  //     {
  //       path: 'confirm',
  //       name: '已通过',
  //       component: () => import('@/views/approval/confirm'),
  //       meta: {
  //         title: '已通过',
  //         icon: 'user',
  //         roles: ['admin']
  //       }
  //     },
  // {
  //   path: 'infomationDialog',
  //   name: 'infomationDialog',
  //   component: () => import('@/common/infomationDialog'),
  //   hidden: true,
  //   meta: {
  //     title: '客户授信详情页面',
  //     activeMenu: '/approval/preliminary',
  //     roles: ['admin']
  //   }
  // }
  //   ]
  // },
  {
    path: '/creditManage',
    component: Layout,
    redirect: '/creditManage/generalCridit',
    alwaysShow: true, // will always show the root menu
    name: 'creditManage',
    meta: {
      title: '授信管理',
      icon: 'user',
      roles: ['admin']
    },
    children: [{
        path: '/creditManage/generalCridit',
        component: () => import('@/views/creditManage/generalCridit'),
        name: 'generalCridit',
        meta: {
          title: '美丽金普通授信',
          icon: 'user',
          roles: ['admin']
        }
      },


      // {
      //   path: '/creditManage/preApproval',
      //   component: () => import('@/views/creditManage/preApproval'),
      //   name: 'preApproval',
      //   meta: {
      //     title: '美丽金预授信',
      //     icon: 'user',
      //     roles: ['admin']
      //   }
      // },

      // {
      //   path: '/creditManage/withdrawalCredit',
      //   component: () => import('@/views/creditManage/withdrawalCredit'),
      //   name: 'withdrawalCredit',
      //   meta: {
      //     title: '美丽金提额授信',
      //     icon: 'user',
      //     roles: ['admin']
      //   }
      // },
      // {
      //   path: '/creditManage/creditList',
      //   component: () => import('@/views/creditManage/creditList'),
      //   name: 'creditList',
      //   meta: {
      //     title: '美丽金授信列表',
      //     icon: 'user',
      //     roles: ['admin']
      //   }
      // },
      // {
      //   path: '/creditManage/myApproval',
      //   component: () => import('@/views/creditManage/myApproval'),
      //   name: 'myApproval',
      //   meta: {
      //     title: '我的审批',
      //     icon: 'user',
      //     roles: ['admin']
      //   }
      // },
      // { 
      //   path: '/creditManage/clientCredit',
      //   component: () => import('@/views/creditManage/clientCredit'),
      //   name: 'clientCredit',
      //   meta: {
      //     title: '客户授信',
      //     icon: 'user',
      //     roles: ['admin']
      //   }
      // },
      // {
      //   path: 'clientCreditDialog',
      //   name: 'clientCreditDialog',
      //   component: () => import('@/common/clientCreditDialog'),
      //   hidden: true,
      //   meta: {
      //     title: '客户授信详情页面',
      //     activeMenu: '/information/clientCredit.vue',
      //     roles: ['admin']
      //   }
      // }
    ]

  },
  {
    path: '/partner',
    component: Layout,
    redirect: 'index',
    meta: {
      title: '合作商管理',
      icon: 'user',
      roles: ['admin']
    },
    children: [{
        path: 'index',
        name: 'partner',
        component: () => import('@/views/partner/index'),
        meta: {
          title: 'BD合作商列表',
          icon: 'user',
          roles: ['admin']
        }
      },
      {
        path: 'approval',
        name: 'approval',
        component: () => import('@/views/partner/approval'),
        meta: {
          title: '合作商审批列表',
          icon: 'user',
          roles: ['admin']
        }
      },
      {
        path: 'partnerDetail',
        name: 'rate',
        hidden: true,
        component: () => import('@/views/partner/partnerDetail'),
        meta: {
          title: '合作商详情',
          icon: 'user',
          roles: ['admin']
        }
      }, {
        path: 'workOrder',
        name: 'workOrder',
        component: () => import('@/views/partner/workOrder'),
        meta: {
          title: '合作商信息变更工单',
          icon: 'user',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/contract',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    redirect: 'index',
    name: 'Contract',
    meta: {
      title: '合同列表',
      icon: 'user',
      roles: ['admin']
    },
    children: [
      // {
      //   path: 'sign',
      //   name: '合同签约表',
      //   component: () => import('@/views/contract/sign/index'),
      //   meta: {
      //     title: '合同签约表',
      //     icon: 'user',
      //     roles: ['admin']
      //   }
      // },
      {
        path: 'templates',
        name: '合同模板',
        component: () => import('@/views/contract/templates/index'),
        meta: {
          title: '合同模板',
          icon: 'user',
          roles: ['admin']
        }
      },
      {
        path: 'tinymce',
        name: '模板编辑',
        hidden: true,
        component: () => import('@/views/contract/templates/tinymce'),
        meta: {
          icon: 'user',
          title: '模板编辑',
          activeMenu: '/contract/templates',
        }
      }
    ]

  },

  {
    path: '/loan',
    component: Layout,
    redirect: 'loanRecordList',
    name: 'Loan',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '借款管理',
      icon: 'user',
      roles: ['admin']
    },
    children: [{
        path: 'loanRecordList',
        name: '借款列表',
        component: () => import('@/views/loan/loanRecordList'),
        meta: {
          title: '借款列表',
          icon: 'user',
          roles: ['admin']
        }
      },
      {
        path: '/loan/getLoanDetails',
        name: 'loanInfoDetailDialog',
        component: () => import('@/views/loan/loanInfoDetailDialog'),
        hidden: true,
        meta: {
          title: '负债详情',
          activeMenu: '/loan/loanRecordList',
          roles: ['admin']
        }
      },
      {
        path: 'linkersDialog',
        name: '通讯录',
        hidden: true,
        component: () => import('@/views/loan/linkersDialog'),
        meta: {
          title: '通讯录',
          icon: 'user',
          roles: ['admin']
        }
      },
      // {
      //   path: 'overdueRecordDetail',
      //   name: 'overdueRecordDetail',
      //   component: () => import('@/views/loan/overdueRecordDetail'),
      //   hidden: true,
      //   meta: {
      //     title: '逾期详情',
      //     activeMenu: '/loan/overdueRecordList',
      //     roles: ['admin']
      //   }
      // }
    ]
  },
  {
    path: '/repayment',
    component: Layout,
    redirect: '/repayment/index',
    alwaysShow: true, // will always show the root menu
    name: 'repayment',
    meta: {
      title: '还款管理',
      icon: 'user',
      roles: ['admin']
    },
    children: [{
        path: '/repayment/index',
        component: () => import('@/views/repayment'),
        name: 'billList',
        meta: {
          title: '账单列表',
          icon: 'user',
          roles: ['admin']
        }
      },
      {
        path: '/repayment/repaymentDialog',
        hidden: true,
        component: () => import('@/views/repayment/repaymentDialog'),
        name: 'repaymentDialog',
        meta: {
          title: '账单详情',
          icon: 'user',
          roles: ['admin']
        }
      },
    ]
  },
  {
    path: '/rateTemplate',
    component: Layout,
    redirect: '/rateTemplate/index',
    alwaysShow: true, // will always show the root menu
    name: 'rateTemplate',
    meta: {
      title: '费率模板',
      icon: 'user',
      roles: ['admin']
    },
    children: [{
      path: '/rateTemplate/index',
      component: () => import('@/views/rateTemplate/index'),
      name: 'index',
      meta: {
        title: '美丽金费率模板',
        icon: 'user',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/partnerPage',
    component: Layout,
    redirect: 'clienInfo',
    name: 'partnerPage',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '商户订单管理',
      icon: 'user',
      roles: ['partner','admin']
    },
    children: [{
        path: 'orderInquiry',
        name: '订单查询',
        component: () => import('@/views/partnerPage/orderInquiry'),
        meta: {
          title: '订单查询',
          icon: 'user',
          roles: ['partner','admin']
        }
      },
      {
        path: 'orderInquiryDialog',
        name: '订单详情',
        hidden: true,
        component: () => import('@/views/partnerPage/orderInquiryDialog'),
        meta: {
          title: '订单详情',
          icon: 'user',
          roles: ['partner','admin']
        }
      },
      {
        path: 'partnerInfo',
        name: '商户信息',
        component: () => import('@/views/partnerPage/partnerInfo'),
        meta: {
          title: '商户信息',
          icon: 'user',
          roles: ['partner','admin']
        }
      },
      {
        path: 'partnerSetting',
        name: '设置',
        component: () => import('@/views/partnerPage/partnerSetting'),
        meta: {
          title: '设置',
          icon: 'user',
          roles: ['partner','admin']
        }
      }
      // {
      //   path: 'partnerInfoDetails',
      //   name: '客户借款详情',
      //   hidden: true,
      //   component: () => import('@/views/partnerPage/partnerInfoDetails'),
      //   meta: {
      //     title: '客户借款详情',
      //     icon: 'user',
      //     roles: ['partner']
      //   }
      // }
    ]
  },



  // 与下面得重定向一起存在不能删除,且必须在这个动态路由里面，否则在动态路由页面刷新会404，假如这个通配符在下面的话!!!
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
