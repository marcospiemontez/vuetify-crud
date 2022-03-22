import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import userAuth from './access-user'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      userAuth
    },
    plugins: [
      createPersistedState({
        storage: window.localStorage,
        key: 'access-user-vuex',
        paths: [
          'userAuth'
        ]
      })
    ],
    strict: process.env.DEBUGGING
  })

  return Store
}
