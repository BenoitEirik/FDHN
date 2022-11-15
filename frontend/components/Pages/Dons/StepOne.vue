<template>
  <div class="px-6 py-12 flex flex-col items-center">
    <div class="flex flex-col w-full max-w-xs border-opacity-50">
      <div class="grid h-20 card place-items-center">
        <button ref="btn_simple_donation" class="btn btn-outline btn-primary" @click="donChoice(0)">
          Don unique
        </button>
      </div>
      <div class="divider">
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
        window.location.href = 'https://donate.stripe.com/aEU02SeOH8jZ7Is7ss'
      }
    }
  }
}
</script>
