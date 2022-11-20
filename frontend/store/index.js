export const state = () => ({
  amount: 1,
  reason: '',
  lastname: '',
  firstname: '',
  email: '',
  address: '',
  zipcode: '',
  city: ''
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
  },
  setAddress (state, address) {
    state.address = address
  },
  setZipcode (state, zipcode) {
    state.zipcode = zipcode
  },
  setCity (state, city) {
    state.city = city
  }
}
