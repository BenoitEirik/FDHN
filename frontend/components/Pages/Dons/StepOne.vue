<template>
  <div class="px-6 pt-20 pb-12 flex flex-col items-center">
    <div class="w-full max-w-xs">
      <div class="btn-group grid grid-cols-2">
        <button ref="btn_simple_donation" class="btn btn-outline btn-accent" @click="donChoice(0)">
          Don unique
        </button>
        <button ref="btn_recurrent_donation" class="btn btn-outline btn-accent" @click="donChoice(1)">
          Don récurrent
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
