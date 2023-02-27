<template>
  <div class="px-6 py-12 flex flex-col items-center">
    <div class="flex flex-col w-full border-opacity-50">
      <div class="grid h-20 card place-items-center">
        <button ref="btn_simple_donation" class="btn btn-outline btn-primary" @click="donChoice(0)">
          Don unique
        </button>
      </div>
      <div class="px-6 divider self-stretch">
        OU
      </div>
      <div class="grid h-20 card place-items-center">
        <button ref="btn_recurrent_donation" class="btn btn-outline btn-primary" @click="donChoice(1)">
          Dons récurrents
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      choice: 0
    }
  },
  created () {
    // Init step one when coming or coming back to this step
    this.$nuxt.$on('reset-step-one', () => {
      this.resetStepOne()
    })
  },
  mounted () {
    // Change buttons language of the stepper
    const nextButtons = document.getElementsByClassName('stepper-button next')
    if (nextButtons.length !== 0) {
      nextButtons[0].querySelector('span').innerHTML = 'Suivant'
      nextButtons[0].querySelector('span').style.setProperty('padding-bottom', '4px')
    }

    const backButtons = document.getElementsByClassName('stepper-button previous')
    if (backButtons.length !== 0) {
      backButtons[0].querySelector('span').innerHTML = 'Retour'
      backButtons[0].querySelector('span').style.setProperty('padding-bottom', '4px')
    }
  },
  methods: {
    resetStepOne () {
      if (this.$refs.btn_simple_donation !== undefined && this.$refs.btn_recurrent_donation !== undefined) {
        this.$refs.btn_simple_donation.classList.add('btn-outline')
        this.$refs.btn_recurrent_donation.classList.add('btn-outline')
      }
    },
    donChoice (choice) {
      this.choice = choice
      if (choice === 0) {
        // Unique donation
        this.$refs.btn_simple_donation.classList.remove('btn-outline')
        this.$refs.btn_recurrent_donation.classList.add('btn-outline')
        this.$store.commit('setSubscribe', false)
        this.$emit('can-continue', { value: true })
      } else {
        // Recurrent donation
        this.$refs.btn_simple_donation.classList.add('btn-outline')
        this.$refs.btn_recurrent_donation.classList.remove('btn-outline')
        this.$store.commit('setSubscribe', true)
        this.$emit('can-continue', { value: true })
      }
    }
  }
}
</script>
