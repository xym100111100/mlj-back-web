import { clientListData } from '@/api/client'

// 客户端状态管理，需要将其引入到store/index.js中才能在页面获取到数据
const getDefaultState = () => {
  return {
      clientData:[]
  }
}

const state = getDefaultState()

const mutations = {
  SET_CLIENT_DATA: (state, payload) => {
    state.clientData = payload.clientData
  }

}

/**
 * 发出请求
 */
const actions = {
  clientList({ commit, state }) {
    return new Promise((resolve, reject) => {
      clientListData(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        //设置异步数据流，对应上面的mutations
        commit('SET_CLIENT_DATA', {clientData:data})
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

