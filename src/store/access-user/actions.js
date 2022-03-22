// import axios from 'src/boot/axios'

export function actionUserAuth (/* context */ { commit }, { dados }) {
  return new Promise((resolve, reject) => {
    console.log(dados)
    commit('SET_MUTATION_USER', dados)
  })
}

export function actionRegistrationUser (/* context */ { commit }, { dados }) {
  return new Promise((resolve, reject) => {
    console.log(dados)
    commit('SET_MUTATION_REGISTER_USER', dados)
  })
}
