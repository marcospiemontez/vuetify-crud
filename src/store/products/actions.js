import api from '../../functions/api'
// import axios from "axios"

export function actionAddProducts (/* context */ { commit }, { data }) {
  return new Promise((resolve, reject) => {
    console.log(data)
    commit('SET_MUTATION_ADD_PRODUCTS', data)
  })
}

export function actionGetProducts (/* context */ { commit }, { page, size }) {
  return new Promise((resolve, reject) => {
    api.get(`/products?page=${page}&size=${size}&sort=id,asc`).then((res) => {
      resolve(res.data)
      commit('SET_MUTATION_ADD_PRODUCTS', res.data)
    }).catch((err) => {
      reject(err)
      console.log(err)
    })
  })
}

export function actionPutProducts ({ commit }, { data, index }) {
  return new Promise((resolve, reject) => {
    commit('SET_MUTATION_EDIT_PRODUCT', data, index)
  })
}

export function actionDeleteProduct ({ commit }, { data }) {
  return new Promise((resolve, reject) => {
    commit('SET_MUTATION_DELETE_PRODUCT', data)
  })
}
