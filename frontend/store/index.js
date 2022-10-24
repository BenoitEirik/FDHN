export const state = () => ({
  amount: 1,
  email: ''
})

export const mutations = {
  setAmount (state, amount) {
    state.amount = amount
  },
  setEmail (state, email) {
    state.email = email
  }
}
