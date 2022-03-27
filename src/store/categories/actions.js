// import axios from 'src/boot/axios'

export function actionAddCategories (/* context */ { commit }, { data }) {
  return new Promise((resolve, reject) => {
    console.log(data)
    commit('SET_MUTATION_ADD_CATEGORIES', data)
  })
}

export function actionPutCategories ({ commit }, { data, index }) {
  return new Promise((resolve, reject) => {
    commit('SET_MUTATION_EDIT_CATEGORY', data, index)
  })
}

export function actionDeleteCategory ({ commit }, { data }) {
  return new Promise((resolve, reject) => {
    commit('SET_MUTATION_DELETE_CATEGORY', data)
  })
}
