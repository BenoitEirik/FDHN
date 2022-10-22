<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherTitle :title="page1.title" />
      <!-- Content -->
      <div class="w-full flex flex-col justify-center items-center">
        <div class="form-control max-w-lg w-full">
          <label class="label">
            <span class="label-text">Adresse email</span>
          </label>
          <label class="input-group">
            <span>Email</span>
            <input type="text" placeholder="info@site.com" class="w-full input input-bordered" @change="(event) => { email = event.target.value }">
          </label>
          <label class="label">
            <span class="label-text">Montant du don</span>
          </label>
          <label class="input-group">
            <input ref="amountRef" type="text" placeholder="10" class="w-full input input-bordered" @change="(event) => { amount = (event.target.value + '00') }">
            <span>€</span>
          </label>
          <div class="divider">
            Ou
          </div>
          <div class="mb-6 w-full flex justify-center btn-group">
            <button class="btn btn-primary" @click="() => { $refs.amountRef.value = '50' }">
              50€
            </button>
            <button class="btn btn-primary" @click="() => { $refs.amountRef.value = '100' }">
              100€
            </button>
            <button class="btn btn-primary" @click="() => { $refs.amountRef.value = '200' }">
              200€
            </button>
            <button class="btn btn-primary" @click="() => { $refs.amountRef.value = '500' }">
              500€
            </button>
          </div>
        </div>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaireUnDon',
  async asyncData ({ $content }) {
    const page1 = await $content('pages/don/page-1').fetch()
    return {
      page1
    }
  },
  data () {
    return {
      amount: '100',
      email: '',
      activeStripeElementPayment: false,
      pk: 'pk_test_51LnlDkGhbwlwOqG4tzagnMSU9DXDDSZkWR9mPya3FwEvDu8Ke22cc0OLX3nh7hvd4JTkPT7wsYiiZE58gTZQWs3b0096rhjREm',
      confirmParams: {
        return_url: 'http://127.0.0.1:3000/payment-success',
        receipt_email: ''
      },
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
