<template>
  <div class="relative px-6 pt-12 w-full flex flex-col justify-center items-center">
    <div ref="loaderRef" class="absolute m-6 inset-0 bg-white z-40 flex justify-center items-center">
      <button class="btn btn-ghost btn-lg loading" />
    </div>
    <stripe-element-payment
      v-if="activeStripeElementPayment"
      ref="paymentRef"
      class="max-w-lg w-11/12 min-h-16"
      :test-mode="testMode"
      :pk="pk"
      :elements-options="elementsOptions"
      :confirm-params="confirmParams"
      locale="fr"
      @element-ready="removeLoader"
      @element-change="updateAmount"
    />
    <button ref="btnRef" class="m-6 btn btn-primary w-64 rounded-full btn-outline" @click="pay">
      Payer
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      testMode: false,
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
        return_url: 'https://fdhn.fr/payment-success',
        payment_method_data: {}
      }
    }
  },
  computed: {
    amount () {
      return this.$store.state.amount + '00'
    },
    reason () {
      return `Cause : ${this.$store.state.reason}`
    },
    lastname () {
      return this.$store.state.lastname
    },
    firstname () {
      return this.$store.state.firstname
    },
    email () {
      return this.$store.state.email
    }
  },
  beforeMount () {
    this.confirmParams.payment_method_data.billing_details = {
      name: `${this.lastname} ${this.firstname}`,
      email: this.email
    }
  },
  mounted () {
    console.log('check all data:', this.amount, this.reason, this.lastname, this.firstname, this.email)
    this.generatePaymentIntent()
  },
  methods: {
    removeLoader () {
      this.$refs.loaderRef.classList.add('hidden')
    },
    setStripeTestMode () {
      if (window.location.hostname === 'fdhn.fr') {
        this.testMode = false
      } else {
        this.testMode = true
      }
    },
    generatePaymentIntent () {
      this.$axios.$post('/api/create-payment-intent', {
        amount: this.amount,
        description: this.reason
      }).then((paymentIntent) => {
        this.elementsOptions.clientSecret = paymentIntent.clientSecret
        this.activeStripeElementPayment = true
      })
    },
    updateAmount () {
      // TODO
    },
    pay () {
      this.$refs.btnRef.innerHTML = ''
      this.$refs.btnRef.classList.add('loading')
      this.$refs.paymentRef.submit()
      this.$emit('can-continue', { value: true })
      this.$emit('change-next', { value: true })
    }
  }
}
</script>
