export const state = () => ({
  amount: 1,
  reason: '',
  lastname: '',
  firstname: '',
  email: ''
})

export const mutations = {
  setAmount (state, amount) {
    state.amount = amount
  },
  setReason (state, reason) {
    state.reason = reason
  },
  setLastname (state, lastname) {
    state.lastname = lastname
  },
  setFirstname (state, firstname) {
    state.firstname = firstname
  },
  setEmail (state, email) {
    state.email = email
  }
}
