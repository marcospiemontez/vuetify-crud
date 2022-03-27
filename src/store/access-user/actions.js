// import axios from 'src/boot/axios'

export function actionUserAuth (/* context */ { commit }, { dados }) {
  return new Promise((resolve, reject) => {
    commit('SET_MUTATION_USER', dados)
  })
}

export function actionRegistrationUser (/* context */ { commit }, { dados }) {
  return new Promise((resolve, reject) => {
    delete (dados.checkPassword)
    commit('SET_MUTATION_REGISTER_USERS', dados)
  })
}

export function actionPutDataUser (/* context */ { commit }, { dados }) {
  return new Promise((resolve, reject) => {
    console.log('dados', dados)
    commit('SET_MUTATION_EDIT_USER', dados)
    commit('SET_MUTATION_USER', dados)
  })
}

export function actionSignOutUser (/* context */ { commit }) {
  return new Promise((resolve, reject) => {
    commit('SET_MUTATION_USER', {})
  })
}
