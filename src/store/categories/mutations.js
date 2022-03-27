export const SET_MUTATION_ADD_CATEGORIES = (state, val) => {
  state.categories.push(val)
}
export const SET_MUTATION_EDIT_CATEGORY = (state, val, index) => {
  state.categories[index] = val
}
export const SET_MUTATION_DELETE_CATEGORY = (state, val) => {
  state.categories.splice(val, 1)
}
