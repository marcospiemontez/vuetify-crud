// import axios from 'src/boot/axios'

export function actionAddProducts (/* context */ { commit }, { dados }) {
  return new Promise((resolve, reject) => {
    console.log(dados)
    commit('SET_MUTATION_ADD_PRODUCTS', dados)
  })
}
