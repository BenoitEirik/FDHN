<template>
  <div class="flex flex-col items-center px-6 pt-20 pb-12">
    <div class="flex justify-center w-full">
      <div class="flex flex-col items-center gap-4 sm:gap-0 sm:flex-row sm:inline-flex sm:btn-group">
        <button ref="btn_simple_donation" class="btn btn-outline btn-accent" @click="donChoice(0)">
          Don unique
        </button>
        <button ref="btn_recurrent_donation" class="btn btn-outline btn-accent" @click="donChoice(1)">
          Don récurrent
        </button>
        <button ref="btn_recurrent_donation_2" class="btn btn-outline btn-accent" @click="donChoice(2)">
          Le Club des mille
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
  methods: {
    resetStepOne () {
      if (this.$refs.btn_simple_donation !== undefined && this.$refs.btn_recurrent_donation !== undefined) {
        this.$refs.btn_simple_donation.classList.add('btn-outline')
        this.$refs.btn_recurrent_donation.classList.add('btn-outline')
        this.$refs.btn_recurrent_donation_2.classList.add('btn-outline')
      }
    },
    donChoice (choice) {
      this.choice = choice
      switch (choice) {
        case 0:
          // Unique donation
          this.$refs.btn_simple_donation.classList.remove('btn-outline')
          this.$refs.btn_recurrent_donation.classList.add('btn-outline')
          this.$refs.btn_recurrent_donation_2.classList.add('btn-outline')
          this.$store.commit('setSubscribe', false)
          this.$emit('can-continue', { value: true })
          break
        case 1:
          // Recurrent donation
          this.$refs.btn_simple_donation.classList.add('btn-outline')
          this.$refs.btn_recurrent_donation.classList.remove('btn-outline')
          this.$refs.btn_recurrent_donation_2.classList.add('btn-outline')
          this.$store.commit('setSubscribe', true)
          this.$emit('can-continue', { value: true })
          break
        case 2:
          // Recurrent donation 2
          this.$refs.btn_simple_donation.classList.add('btn-outline')
          this.$refs.btn_recurrent_donation.classList.add('btn-outline')
          this.$refs.btn_recurrent_donation_2.classList.remove('btn-outline')
          this.$store.commit('setSubscribe', true)
          this.$emit('can-continue', { value: true })
          break
      }
    }
  }
}
</script>
