import defaultSettings from '@/settings'

const { serverPath ,homePath,managePath} = defaultSettings

const state = {
  serverPath: serverPath,
  homePath : homePath,
  tabbar:true,
  title:'',
  managePath:managePath,
}

const mutations = {
  CHANGE_SETTING: (state, {key,value}) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

