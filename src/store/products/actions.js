// import axios from 'src/boot/axios'

export function actionAddProducts (/* context */ { commit }, { data }) {
  return new Promise((resolve, reject) => {
    console.log(data)
    commit('SET_MUTATION_ADD_PRODUCTS', data)
  })
}

export function actionPutProducts ({ commit }, { data }) {
  return new Promise((resolve, reject) => {
    commit('SET_MUTATION_ADD_PRODUCT', data)
  })
}

// export function actionGetProducts (/* context */ { commit }, { data }) {
//   return new Promise((resolve, reject) => {
//     console.log(data)
//     commit('SET_MUTATION_ADD_PRODUCTS', data)
//   })
// }
