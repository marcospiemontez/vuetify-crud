export const SET_MUTATION_ADD_PRODUCT = (state, val) => {
  state.product = val
}
export const SET_MUTATION_ADD_PRODUCTS = (state, val) => {
  state.products.push(val)
}
