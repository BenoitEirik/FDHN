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
    donChoice (choice) {
      this.choice = choice
      if (choice === 0) {
        this.$refs.btn_simple_donation.classList.remove('btn-outline')
        this.$refs.btn_recurrent_donation.classList.add('btn-outline')
        this.$emit('can-continue', { value: true })
      } else {
        this.$refs.btn_simple_donation.classList.add('btn-outline')
        this.$refs.btn_recurrent_donation.classList.remove('btn-outline')
        this.$emit('can-continue', { value: false })
        window.location.href = 'https://donate.stripe.com/fZe5ncfSL2ZFfaUcMN'
      }
    }
  }
}
</script>
