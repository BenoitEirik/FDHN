<template>
  <div class="relative sm:px-6 pt-12 w-full flex flex-col justify-center items-center">
    <div :class="((showLoader) ? '':'hidden') + ' absolute m-6 inset-0 bg-white z-40 flex justify-center items-center'">
      <button class="btn btn-ghost btn-lg loading" />
    </div>
    <stripe-element-payment
      v-if="activeStripeElementPayment"
      ref="paymentRef"
      class="mx-6 self-stretch min-h-16"
      :pk="pk"
      :elements-options="elementsOptions"
      :confirm-params="confirmParams"
      locale="fr"
      @error="() => reset()"
      @element-ready="() => { $store.commit('setShowLoader', false); $emit('can-continue', { value: true }) }"
    />
    <div class="collapse self-stretch m-6 collapse-plus border border-base-300 bg-base-100 rounded-md">
      <input type="checkbox" class="peer">
      <div class="collapse-title text-sm text-primary-content peer-checked:text-secondary-content">
        Récapitulatif
      </div>
      <div class="collapse-content text-primary-content peer-checked:text-secondary-content">
        <div class="overflow-x-auto">
          <table class="table table-compact w-full">
            <tbody>
              <tr>
                <td>Type de don</td>
                <td>{{ isSubscription ? 'Récurrent' : 'Unique' }}</td>
              </tr>
              <tr v-if="isSubscription">
                <td>Facturation</td>
                <td>{{ metadata.recurring_interval === 'month' ? 'Mensuelle' : 'Annuelle' }}</td>
              </tr>
              <tr v-if="isSubscription && metadata.deadline.active">
                <td>Échéance</td>
                <td>{{ formatFromUnixTimestamp() }}</td>
              </tr>
              <tr>
                <td>Montant</td>
                <td>{{ String(metadata.amount).slice(0, -2) + ','+ String(metadata.amount).slice(-2) }} {{ isSubscription ? '€/mois' : '€' }}</td>
              </tr>
              <tr>
                <td>Cause</td>
                <td>{{ metadata.reason }}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{{ metadata.email }}</td>
              </tr>
              <tr>
                <td>Nom</td>
                <td>{{ metadata.lastname }}</td>
              </tr>
              <tr>
                <td>Prénom</td>
                <td>{{ metadata.firstname }}</td>
              </tr>
              <tr>
                <td>Adresse</td>
                <td>{{ metadata.address }}</td>
              </tr>
              <tr>
                <td>Code postal</td>
                <td>{{ metadata.zipcode }}</td>
              </tr>
              <tr>
                <td>Ville</td>
                <td>{{ metadata.city }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <button ref="btnRef" class="m-6 btn btn-primary w-64 rounded-full btn-outline" @click="pay">
      {{ submitText }}
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
    isSubscription () {
      return this.$store.state.subscribe
    },
    submitText () {
      return this.$store.state.subscribe ? 'Valider mon don récurrent' : 'Valider mon don'
    },
    metadata () {
      return this.$store.state.metadata
    },
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
    // Mark cancel button as active
    this.$emit('can-continue', { value: true })
  },
  methods: {
    pay () {
      this.$refs.btnRef.innerHTML = ''
      this.$refs.btnRef.classList.add('loading')
      this.$emit('can-continue', { value: false }) // Disallow donation cancel
      const backButton = document.querySelector('div.stepper-button.previous')
      if (backButton !== null) {
        const [span, i] = [backButton.querySelector('span'), backButton.querySelector('i')]
        span.style.display = 'none'
        i.style.display = 'none'
      }
      this.$refs.paymentRef.submit()
    },
    reset () {
      if (process.client) {
        window.scrollTo(0, 0)
      }
      this.$refs.btnRef.innerHTML = this.submitText
      this.$refs.btnRef.classList.remove('loading')
      this.$emit('can-continue', { value: true }) // Allow donation cancel
      const backButton = document.querySelector('div.stepper-button.previous')
      if (backButton !== null) {
        const [span, i] = [backButton.querySelector('span'), backButton.querySelector('i')]
        span.style.display = 'inline'
        i.style.display = 'inline-block'
      }
    },
    formatFromUnixTimestamp () {
      // créer un objet Date à partir du timestamp en millisecondes
      const date = new Date(this.metadata.deadline.timestamp * 1000)

      // extraire les éléments de la date
      const jour = date.getDate().toString().padStart(2, '0')
      const mois = (date.getMonth() + 1).toString().padStart(2, '0')
      const annee = date.getFullYear().toString()

      // concaténer les éléments dans le format souhaité
      return jour + '/' + mois + '/' + annee
    }
  }
}
</script>
