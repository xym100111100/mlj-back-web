import {
  bdManageData
} from '@/api/bdManage'

// 客户端状态管理，需要将其引入到store/index.js中才能在页面获取到数据
const getBdManageData = () => {
  return {
    bdManageData: []
  }
}

const state = getBdManageData()

const mutations = {
  SET_BDMANAGE_DATA: (state, payload) => {
    state.bdManageData = payload.bdManageData
  }

}

/**
 * 发出请求
 */
const actions = {
  bdManageList({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      bdManageData(state.token).then(response => {
        const {
          data
        } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        //设置异步数据流，对应上面的mutations
        commit('SET_BDMANAGE_DATA', {
          bdManageData: data
        })
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
