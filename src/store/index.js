import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import userAuth from './access-user'
import products from './products'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      userAuth,
      products
    },
    plugins: [
      createPersistedState({
        storage: window.localStorage,
        key: 'access-user-vuex',
        paths: [
          'userAuth',
          'products'
        ]
      })
    ],
    strict: process.env.DEBUGGING
  })

  return Store
}
