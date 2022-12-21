export const state = () => ({
  showLoader: true,
  alreadyGeneratedPaymentIntent: false,
  activeStripeElementPayment: false,
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
  confirmParams: {
    return_url: 'https://fdhn.fr/payment-success',
    payment_method_data: {}
  },
  paymentId: ''
})

export const mutations = {
  setShowLoader (state, showLoader) {
    state.showLoader = showLoader
  },
  setAlreadyGeneratedPaymentIntent (state, alreadyGeneratedPaymentIntent) {
    state.alreadyGeneratedPaymentIntent = alreadyGeneratedPaymentIntent
  },
  setActiveStripeElementPayment (state, activeStripeElementPayment) {
    state.activeStripeElementPayment = activeStripeElementPayment
  },
  setElementsOptions  (state, elementsOptions) {
    state.elementsOptions = elementsOptions
  },
  setConfirmParams (state, confirmParams) {
    state.confirmParams = confirmParams
  },
  setPaymentId (state, paymentId) {
    state.paymentId = paymentId
  }
}

export const actions = {
  processPaymentIntent ({ commit, state }, metadata) {
    // Set (or reset) Stripe Element Payment
    commit('setShowLoader', true)
    commit('setActiveStripeElementPayment', false)

    // Store billing details
    state.confirmParams.payment_method_data.billing_details = {
      name: `${metadata.lastname} ${metadata.firstname}`,
      email: metadata.email,
      address: {
        line1: metadata.address,
        postal_code: metadata.zipcode,
        city: metadata.city
      }
    }
    commit('setConfirmParams', state.confirmParams)

    // Generate (or update) payment intent from the backend
    if (!state.alreadyGeneratedPaymentIntent) {
      this.$axios.$post('/api/create-payment-intent', {
        amount: metadata.amount,
        description: metadata.reason,
        metadata: {
          Cause: metadata.reason,
          Nom: metadata.lastname,
          Prénom: metadata.firstname,
          Email: metadata.email,
          Adresse: metadata.address,
          'Code postale': metadata.zipcode,
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
      this.$axios.$post('/api/update-payment-intent', {
        id: state.paymentId,
        amount: metadata.amount,
        description: metadata.reason,
        metadata: {
          Cause: metadata.reason,
          Nom: metadata.lastname,
          Prénom: metadata.firstname,
          Email: metadata.email,
          Adresse: metadata.address,
          'Code postale': metadata.zipcode,
          Ville: metadata.city
        }
      }).then((paymentIntent) => {
        commit('setPaymentId', paymentIntent.id)
        state.elementsOptions.clientSecret = paymentIntent.clientSecret
        commit('setElementsOptions', state.elementsOptions)
        commit('setActiveStripeElementPayment', true)
      })
    }
  }
}
