import axios from 'axios'

const api = axios.create({
  baseURL: 'https://shelf-system.herokuapp.com'
})

export default api
