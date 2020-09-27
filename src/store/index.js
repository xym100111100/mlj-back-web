import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import client from './modules/client'
import bdManage from './modules/bdManage'
import permission from './modules/permission'



Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    client,
    bdManage,
    permission
  },
  getters
})

export default store
