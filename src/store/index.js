import { createStore } from 'vuex'
import ModuleUser from './user'
import ModulePk from './pk' //加到全局变量里面
import ModuleRecord from './record'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: { //用Module将全局变量进行分类
    user: ModuleUser,
    pk: ModulePk,
    record: ModuleRecord,
  }
})
