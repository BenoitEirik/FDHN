<template>
  <div class="px-6 py-12 flex flex-col items-center">
    <div class="form-control w-full max-w-xs">
      <!-- Montant -->
      <label class="label">
        <span class="label-text">Montant</span>
      </label>
      <label class="input-group">
        <input v-model="amount" type="text" placeholder="1€ minimum" class="input input-bordered focus:input-primary w-full max-w-xs" @change="validateAmount">
        <span>€</span>
      </label>
      <label class="label">
        <span class="label-text-alt">Tous les dons sont défiscalisables</span>
      </label>
      <!-- Cause -->
      <label class="label">
        <span class="label-text">Cause</span>
      </label>
      <select v-model="reason" class="select select-bordered focus:select-primary ">
        <option disabled value="">
          Choisissez
        </option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <label class="label">
        <span class="label-text-alt underline">
          <nuxt-link to="/autres-projets">En savoir plus sur les causes</nuxt-link>
        </span>
      </label>
      <!-- Nom -->
      <label class="label">
        <span class="label-text">Nom</span>
      </label>
      <input v-model="lastname" type="text" placeholder="Nom" class="input input-bordered focus:input-primary w-full max-w-xs">
      <!-- Prénom -->
      <label class="label">
        <span class="label-text">Prénom</span>
      </label>
      <input v-model="firstname" type="text" placeholder="Prénom" class="input input-bordered focus:input-primary w-full max-w-xs">
      <!-- Adresse e-mail -->
      <label class="label">
        <span class="label-text">Adresse e-mail</span>
      </label>
      <input v-model="email" type="email" placeholder="adresse@email.com" class="input input-bordered focus:input-primary w-full max-w-xs">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      amount: '',
      reason: '',
      options: [
        { text: 'L\'Homme Nouveau', value: 'L\'Homme Nouveau' },
        { text: 'La Scolafricaine', value: 'La Scolafricaine' },
        { text: 'Le CIELT', value: 'Le CIELT' },
        { text: 'L\'association Amitié Charles de Foucauld', value: 'L\'association Amitié Charles de Foucauld' }
      ],
      lastname: '',
      firstname: '',
      email: ''
    }
  },
  created () {
    this.$nuxt.$on('store-metadata', () => {
      this.storeMetadata()
    })
  },
  methods: {
    validateAmount () {
      if (this.isNumeric(String(this.amount))) {
        // Validate the step
        this.$emit('can-continue', { value: true })
      } else {
        alert('Merci d\'entrer un montant valide d\'au moins 1€')
      }
    },
    storeMetadata () {
      // Store all user data
      this.$store.commit('setAmount', Number(this.amount))
      this.$store.commit('setReason', this.reason)
      this.$store.commit('setReason', this.reason)
      this.$store.commit('setLastname', this.lastname)
      this.$store.commit('setFirstname', this.firstname)
      this.$store.commit('setEmail', this.email)
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
