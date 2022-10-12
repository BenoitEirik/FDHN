<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <h1 class="p-6 text-3xl text-center">
        {{ page1.title }}
      </h1>
      <div class="mt-10 p-6 w-full flex flex-col justify-center items-center">
        <input type="number" value="1" @change="(event) => { amount = event.target.value }">
        <stripe-element-payment
          v-if="activeStripeElementPayment"
          ref="paymentRef"
          class="m-6 max-w-lg w-11/12"
          :test-mode="true"
          :pk="pk"
          :elements-options="elementsOptions"
          :confirm-params="confirmParams"
          locale="fr"
        />
        <button
          @click="pay"
        >
          Payer
        </button>
      </div>
      <div class="mt-10 p-6 max-w-5xl flex justify-center flex-wrap items-center bg-orange-50 rounded">
        <DonsCard name="Legs" to="/dons/legs" />
        <DonsCard name="Testaments" to="/dons/testaments" />
        <DonsCard name="Donations" to="/dons/donations" />
        <DonsCard name="Assurance vie" to="/dons/assurance-vie" />
        <DonsCard name="Don succession" to="/dons/don-succession" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaireUnDon',
  async asyncData ({ $content }) {
    const page1 = await $content('pages/Dons/page-1').fetch()
    return {
      page1
    }
  },
  data () {
    return {
      activeStripeElementPayment: false,
      amount: 1,
      pk: 'pk_test_51LnlDkGhbwlwOqG4tzagnMSU9DXDDSZkWR9mPya3FwEvDu8Ke22cc0OLX3nh7hvd4JTkPT7wsYiiZE58gTZQWs3b0096rhjREm',
      confirmParams: {
        return_url: 'http://127.0.0.1:3000/payment-success',
        receipt_email: ''
      },
      elementsOptions: {
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
    }
  }
}
</script>
