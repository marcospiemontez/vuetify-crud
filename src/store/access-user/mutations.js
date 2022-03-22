export const SET_MUTATION_USER = (state, val) => {
  state.user = val
}
export const SET_MUTATION_REGISTER_USER = (state, val) => {
  state.users.push(val)
}
