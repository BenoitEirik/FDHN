const initialState = {
  subscribe: false,
  showLoader: true,
  alreadyGeneratedPaymentIntent: false,
  activeStripeElementPayment: false,
  // Stripe Elements Start
  elementsOptions: {
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css2?family=Hahmlet&display=swap'
      }
    ],
    apparence: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#eab308',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#b91c1c',
        fontFamily: 'Hahmlet',
        spacingUnit: '2px',
        borderRadius: '8px'
      }
    }
  },
  confirmParams: {},
  // Stripe Elements End
  paymentId: '',
  metadata: {},
  subscription: {},
  resetStepper: false
}

export const state = () => ({
  ...initialState
})

export const mutations = {
  setSubscribe (state, data) {
    state.subscribe = data
  },
  setMetadata (state, data) {
    state.metadata = data
  },
  setShowLoader (state, data) {
    state.showLoader = data
  },
  setAlreadyGeneratedPaymentIntent (state, data) {
    state.alreadyGeneratedPaymentIntent = data
  },
  setActiveStripeElementPayment (state, data) {
    state.activeStripeElementPayment = data
  },
  setElementsOptions  (state, data) {
    state.elementsOptions = data
  },
  setConfirmParams (state, data) {
    state.confirmParams = {
      return_url: 'https://fdhn.fr/payment-success',
      payment_method_data: {
        billing_details: {
          name: `${data.lastname} ${data.firstname}`,
          email: data.email,
          address: {
            line1: data.address,
            postal_code: data.zipcode,
            city: data.city
          }
        }
      }
    }
  },
  setPaymentId (state, data) {
    state.paymentId = data
  },
  setSubscription (state, data) {
    state.subscription = data
  },
  resetStepper (state, data) {
    state.resetStepper = data
  },
  resetStore (state) {
    state = {
      ...initialState
    }
  }
}

export const actions = {
  processPaymentIntent ({ commit, state }, metadata) {
    // Set (or reset) Stripe Element Payment
    commit('setShowLoader', true)
    commit('setActiveStripeElementPayment', false)
    commit('setMetadata', metadata)

    // Store billing details
    commit('setConfirmParams', metadata)

    // Generate (or update) payment intent from the backend
    if (!state.alreadyGeneratedPaymentIntent) {
      this.$axios.$post('/api/one-time/create', {
        amount: metadata.amount,
        description: metadata.reason,
        metadata: {
          Cause: metadata.reason,
          Nom: metadata.lastname,
          Prénom: metadata.firstname,
          Email: metadata.email,
          Adresse: metadata.address,
          'Code postal': metadata.zipcode,
          Ville: metadata.city
        }
      }).then((paymentIntent) => {
        commit('setPaymentId', paymentIntent.id)
        state.elementsOptions.clientSecret = paymentIntent.clientSecret
        commit('setElementsOptions', state.elementsOptions)
        commit('setAlreadyGeneratedPaymentIntent', true)
        commit('setActiveStripeElementPayment', true)
      })
    } else {
      this.$axios.$post('/api/one-time/update', {
        id: state.paymentId,
        amount: metadata.amount,
        description: metadata.reason,
        metadata: {
          Cause: metadata.reason,
          Nom: metadata.lastname,
          Prénom: metadata.firstname,
          Email: metadata.email,
          Adresse: metadata.address,
          'Code postal': metadata.zipcode,
          Ville: metadata.city
        }
      }).then((paymentIntent) => {
        commit('setPaymentId', paymentIntent.id)
        state.elementsOptions.clientSecret = paymentIntent.clientSecret
        commit('setElementsOptions', state.elementsOptions)
        commit('setActiveStripeElementPayment', true)
      })
    }
  },
  processSubscription ({ commit, state }, metadata) {
    // Set (or reset) Stripe Element Payment
    commit('setShowLoader', true)
    commit('setActiveStripeElementPayment', false)
    commit('setMetadata', metadata)
    // Store billing details
    commit('setConfirmParams', metadata)

    if (!state.alreadyGeneratedPaymentIntent) {
      this.$axios.post('/api/subscription/create', {
        description: metadata.reason,
        metadata
      }).then(res => res.data)
        .then((data) => {
          commit('setSubscription', {
            id: data.subscription.id,
            customerId: data.subscription.customerId
          })
          commit('setPaymentId', data.paymentIntent.id)
          state.elementsOptions.clientSecret = data.paymentIntent.clientSecret
          commit('setElementsOptions', state.elementsOptions)
          commit('setAlreadyGeneratedPaymentIntent', true)
          commit('setActiveStripeElementPayment', true)
        })
    } else {
      this.$axios.post('/api/subscription/update', {
        id: state.subscription.id,
        customerId: state.subscription.customerId,
        description: metadata.reason,
        metadata
      }).then(res => res.data)
        .then((data) => {
          commit('setSubscription', {
            id: data.subscription.id,
            customerId: data.subscription.customerId
          })
          commit('setPaymentId', data.paymentIntent.id)
          state.elementsOptions.clientSecret = data.paymentIntent.clientSecret
          commit('setElementsOptions', state.elementsOptions)
          commit('setActiveStripeElementPayment', true)
        })
    }
  },
  async cancelSubscription ({ commit, state }) {
    await this.$axios.post('/api/subscription/cancel', { id: state.subscription.id })
  },
  async cancelPaymentIntent ({ commit, state }) {
    await this.$axios.post('/api/one-time/cancel', { id: state.paymentId })
  }
}
