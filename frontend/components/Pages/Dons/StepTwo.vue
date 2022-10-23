<template>
  <div class="px-6 pt-12 flex flex-col justify-center items-center">
    <stripe-element-payment
      v-if="activeStripeElementPayment"
      ref="paymentRef"
      class="max-w-lg w-11/12 min-h-16"
      :test-mode="true"
      :pk="pk"
      :elements-options="elementsOptions"
      :confirm-params="confirmParams"
      locale="fr"
    />
    <button class="m-6 btn btn-primary w-64 rounded-full btn-outline" @click="pay">
      Payer
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      activeStripeElementPayment: false,
      pk: this.$config.stripePublicToken,
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
        return_url: 'https://fdhn.fr/payment-success'
      }
    }
  },
  computed: {
    amount () {
      return this.$store.state.amount
    }
  },
  mounted () {
    this.generatePaymentIntent()
  },
  methods: {
    generatePaymentIntent () {
      this.$axios.$post('/api/create-payment-intent', {
        amount: this.amount
      }).then((paymentIntent) => {
        this.elementsOptions.clientSecret = paymentIntent.clientSecret
        this.activeStripeElementPayment = true
      })
    },
    pay () {
      this.$refs.paymentRef.submit()
      this.$emit('can-continue', { value: true })
    }
  }
}
</script>
