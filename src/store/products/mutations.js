export const SET_MUTATION_ADD_PRODUCT = (state, val) => {
  state.product = val
}
export const SET_MUTATION_ADD_PRODUCTS = (state, val) => {
  state.products = val
}
export const SET_MUTATION_EDIT_PRODUCT = (state, val, index) => {
  state.products[index] = val
}
export const SET_MUTATION_DELETE_PRODUCT = (state, val) => {
  state.products.splice(val, 1)
}
