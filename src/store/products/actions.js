// import axios from 'src/boot/axios'

export function actionAddProducts (/* context */ { commit }, { data }) {
  return new Promise((resolve, reject) => {
    console.log(data)
    commit('SET_MUTATION_ADD_PRODUCTS', data)
  })
}

// export function actionGetProducts (/* context */ { commit }, { data }) {
//   return new Promise((resolve, reject) => {
//     console.log(data)
//     commit('SET_MUTATION_ADD_PRODUCTS', data)
//   })
// }
