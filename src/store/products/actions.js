// import axios from 'src/boot/axios'

export function actionAddProducts (/* context */ { commit }, { data }) {
  return new Promise((resolve, reject) => {
    console.log(data)
    commit('SET_MUTATION_ADD_PRODUCTS', data)
  })
}

export function actionPutProducts ({ commit }, { data, index }) {
  return new Promise((resolve, reject) => {
    commit('SET_MUTATION_EDIT_PRODUCT', data, index)
  })
}

export function actionDeleteProducts ({ commit }, { data }) {
  return new Promise((resolve, reject) => {
    commit('SET_MUTATION_DELETE_PRODUCT', data)
  })
}
// export function actionGetProducts (/* context */ { commit }, { data }) {
//   return new Promise((resolve, reject) => {
//     console.log(data)
//     commit('SET_MUTATION_ADD_PRODUCTS', data)
//   })
// }
