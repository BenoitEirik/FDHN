<template>
  <div class="px-6 pt-12 flex flex-col justify-center items-center">
    <stripe-element-payment
      v-if="activeStripeElementPayment"
      ref="paymentRef"
      class="max-w-lg w-11/12 min-h-16"
      :test-mode="true"
      :pk="pk"
      :elements-options="elementsOptions"
      locale="fr"
    />
    <button class="m-6 btn btn-primary w-64 rounded-full btn-outline" @click="pay">
      Payer
    </button>
  </div>
</template>

<script>
export default {
  asyncData ({ req }) {
    console.log(req.headers)
    const hostname = req.headers
    return {
      hostname
    }
  },
  data () {
    return {
      amount: '100',
      email: '',
      activeStripeElementPayment: false,
      pk: 'pk_test_51LnlDkGhbwlwOqG4tzagnMSU9DXDDSZkWR9mPya3FwEvDu8Ke22cc0OLX3nh7hvd4JTkPT7wsYiiZE58gTZQWs3b0096rhjREm',
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
      }
    }
  },
  mounted () {
    console.log('testestes')
    this.generatePaymentIntent()
  },
  methods: {
    generatePaymentIntent () {
      this.$axios.$post('/api/create-payment-intent', {
        amount: 100
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
