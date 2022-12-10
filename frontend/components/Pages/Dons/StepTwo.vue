<template>
  <div class="px-6 py-12 flex flex-col items-center">
    <div class="form-control w-full max-w-xs">
      <!-- Montant -->
      <label class="label">
        <span class="label-text">Montant *</span>
      </label>
      <label class="input-group">
        <input v-model="amount" type="text" placeholder="1€ minimum" class="input input-bordered focus:input-primary w-full" @keyup="validateForm()">
        <span>€</span>
      </label>
      <label class="label">
        <span class="label-text-alt">Tous les dons sont défiscalisables</span>
      </label>
      <!-- Cause -->
      <label class="label">
        <span class="label-text">Cause *</span>
      </label>
      <select v-model="reason" class="select select-bordered focus:select-primary w-full" @keyup="validateForm()">
        <option disabled value="">
          Choisissez
        </option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <label class="label">
        <span class="label-text-alt underline">
          <nuxt-link to="/autres-projets">En savoir plus sur les projets soutenus</nuxt-link>
        </span>
      </label>
      <!-- Nom -->
      <label class="label">
        <span class="label-text">Nom *</span>
      </label>
      <input v-model="lastname" type="text" placeholder="Nom" class="input input-bordered focus:input-primary w-full" @keyup="validateForm()">
      <!-- Prénom -->
      <label class="label">
        <span class="label-text">Prénom *</span>
      </label>
      <input v-model="firstname" type="text" placeholder="Prénom" class="input input-bordered focus:input-primary w-full" @keyup="validateForm()">
      <!-- Adresse e-mail -->
      <label class="label">
        <span class="label-text">Email *</span>
      </label>
      <input v-model="email" type="email" placeholder="Email" class="input input-bordered focus:input-primary w-full" @keyup="validateForm()">
      <!-- Adresse postale -->
      <label class="label">
        <span class="label-text">Adresse *</span>
      </label>
      <input v-model="address" type="text" placeholder="Adresse" class="input input-bordered focus:input-primary w-full" @keyup="validateForm()">
      <!-- Code postale -->
      <label class="label">
        <span class="label-text">Code postale *</span>
      </label>
      <input v-model="zipcode" type="number" placeholder="Code postale" class="input input-bordered focus:input-primary w-full" @keyup="validateForm()">
      <!-- Ville -->
      <label class="label">
        <span class="label-text">Ville *</span>
      </label>
      <input v-model="city" type="text" placeholder="Ville" class="input input-bordered focus:input-primary w-full" @keyup="validateForm()">
      <label class="label">
        <span class="label-text-alt">* Ces champs sont nécessaires pour bénéficier d'une réduction fiscale</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      amount: '',
      reason: '',
      lastname: '',
      firstname: '',
      email: '',
      address: '',
      zipcode: '',
      city: '',
      options: []
    }
  },
  async fetch () {
    // Retrieve list of reasons for donations (= other projects)
    const reasons = await this.$axios.$get(this.$config.COCKPIT.URL + '/api/content/items/causes')
    this.options = reasons.map(function (reason) {
      return { text: reason.title, value: reason.title }
    })
  },
  created () {
    this.$nuxt.$on('store-metadata', () => {
      this.storeMetadata()
    })
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
    validateForm () {
      if (this.isNumeric(String(this.amount))) {
        if (
          this.amount !== '' &&
          this.reason !== '' &&
          this.lastname !== '' &&
          this.firstname !== '' &&
          this.email !== '' &&
          this.address !== '' &&
          this.zipcode !== '' &&
          this.city !== ''
        ) {
          // Validate the step
          this.$emit('can-continue', { value: true })
        }
      } else {
        // Validate the step
        this.$emit('can-continue', { value: false })
        alert('Merci d\'entrer un montant valide d\'au moins 1€')
      }
    },
    storeMetadata () {
      // Store all user data
      this.$store.commit('setAmount', Number(this.amount))
      this.$store.commit('setReason', this.reason)
      this.$store.commit('setLastname', this.lastname)
      this.$store.commit('setFirstname', this.firstname)
      this.$store.commit('setEmail', this.email)
      this.$store.commit('setAddress', this.address)
      this.$store.commit('setZipcode', this.zipcode)
      this.$store.commit('setCity', this.city)
    },
    isNumeric (str) {
      if (typeof str !== 'string') {
        return false
      }
      return !isNaN(str) && !isNaN(parseFloat(str))
    }
  }
}
</script>
