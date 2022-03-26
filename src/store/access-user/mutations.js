export const SET_MUTATION_USER = (state, val) => {
  state.user = val
}
export const SET_MUTATION_REGISTER_USERS = (state, val) => {
  state.users.push(val)
}
export const SET_MUTATION_EDIT_USER = (state, val) => {
  const obj = state.users.map(element => element.cpf)
  const index = obj.indexOf(val.cpf)
  if (index >= 0) {
    state.users[index] = val
  }
}
