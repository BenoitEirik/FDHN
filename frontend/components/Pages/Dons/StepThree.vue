<template>
  <div class="relative px-6 pt-12 w-full flex flex-col justify-center items-center">
    <div :class="((showLoader) ? '':'hidden') + ' absolute m-6 inset-0 bg-white z-40 flex justify-center items-center'">
      <button class="btn btn-ghost btn-lg loading" />
    </div>
    <stripe-element-payment
      v-if="activeStripeElementPayment"
      ref="paymentRef"
      class="max-w-lg w-11/12 min-h-16"
      :pk="pk"
      :elements-options="elementsOptions"
      :confirm-params="confirmParams"
      locale="fr"
      @element-ready="() => { $store.commit('setShowLoader', false) }"
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
      pk: this.$config.STRIPE_PK
    }
  },
  computed: {
    showLoader () {
      return this.$store.state.showLoader
    },
    activeStripeElementPayment () {
      return this.$store.state.activeStripeElementPayment
    },
    elementsOptions () {
      return this.$store.state.elementsOptions
    },
    confirmParams () {
      return this.$store.state.confirmParams
    }
  },
  mounted () {
    // Change buttons language of the stepper
    const nextButtons = document.getElementsByClassName('stepper-button next')
    if (nextButtons.length !== 0) {
      nextButtons[0].querySelector('span').innerHTML = 'Suivant'
    }

    const backButtons = document.getElementsByClassName('stepper-button previous')
    if (backButtons.length !== 0) {
      backButtons[0].querySelector('span').innerHTML = 'Retour'
    }
  },
  methods: {
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
