// import axios from 'axios'
// import api from '../../functions/api'
// const oauth = require('axios-oauth-client')
// import qs from 'qs'

export function actionUserAuth (/* context */ { commit }, { dados }) {
  return new Promise((resolve, reject) => {
    commit('SET_MUTATION_USER', dados)
    // const clientId = 'shelfsystem'
    // const clientSecret = 'metsysflehs'
    // const basicAuth = Buffer.from(`${clientId}:${clientSecret}`, 'utf8').toString('base64')
    // // eslint-disable-next-line quote-props
    // const headers = { 'Authorization': basicAuth, 'Content-Type': 'application/x-www-form-urlencoded' }

    // axios.post('https://shelf-system.herokuapp.com/oauth/token',
    //   qs.stringify({
    //     username: dados.email,
    //     password: dados.password,
    //     grant_type: 'password'
    //   }), {
    //     headers: headers
    //   }).then((res) => {
    //   console.log(res)
    //   const objFormat = {
    //     token: res.data.access_token,
    //     data: res.data.user
    //   }
    //   console.log(res)
    //   commit('SET_MUTATION_USER', objFormat)
    // }).catch((err) => {
    //   console.log(err)
    // })

    // axios.request({
    //   url: '/oauth/token',
    //   method: 'post',
    //   baseURL: api,
    //   // auth: {
    //   //   username: 'shelfsystem',
    //   //   password: 'metsysflehs'
    //   // },
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   data: {
    //     username: dados.email,
    //     password: dados.password,
    //     grant_type: 'password',
    //     scope: 'public'
    //   }
    // }).then((res) => {
    //   console.log(res)
    //   const objFormat = {
    //     token: res.data.access_token,
    //     data: res.data.user
    //   }
    //   console.log(res)
    //   commit('SET_MUTATION_USER', objFormat)
    // }).catch((err) => {
    //   console.log(err)
    // })
    // const getAuthorization = oauth.client(axios.create(), {
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   url: 'https://shelf-system.herokuapp.com/oauth/token',
    //   grant_type: 'password',
    //   username: 'shelfsystem',
    //   password: 'metsysflehs'
    // })

    // const auth = getAuthorization()
    // console.log(auth)
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
