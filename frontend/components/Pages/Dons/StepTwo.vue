<template>
  <div class="px-6 py-12 flex flex-col items-center">
    <div class="form-control w-full max-w-xs">
      <!-- Montant -->
      <label class="label">
        <span class="label-text">Montant {{ isSubscription ? '& périodicité ' : '' }}*</span>
      </label>
      <label class="input-group">
        <input v-model="amount" type="number" placeholder="1€ minimum" class="input input-bordered border-accent focus:input-accent w-full" @keyup="validateForm()">
        <select v-if="isSubscription" v-model="recurring_interval" class="select select-accent bg-accent text-base-100">
          <option value="month" selected>
            €/mois
          </option>
          <option value="year">
            €/an
          </option>
        </select>
        <span v-else class="bg-accent text-base-100">€</span>
      </label>

      <!-- Amount proposals -->
      <div v-if="isSubscription" class="pt-2 btn-group">
        <button class="btn btn-outline btn-accent grow shrink" @click="setAmount('10')">
          10 €
        </button>
        <button class="btn btn-outline btn-accent grow shrink" @click="setAmount('20')">
          20 €
        </button>
        <button class="btn btn-outline btn-accent grow shrink" @click="setAmount('50')">
          50 €
        </button>
        <button class="btn btn-outline btn-accent grow shrink" @click="setAmount('100')">
          100 €
        </button>
      </div>

      <!-- Message about donations -->
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

      <!-- Code postal -->
      <label class="label">
        <span class="label-text">Code postal *</span>
      </label>
      <input v-model="zipcode" type="number" placeholder="Code postal" class="input input-bordered focus:input-primary w-full" @keyup="validateForm()">

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
import StripeMoneyFormat from 'stripe-money-format'

export default {
  data () {
    return {
      amount: null,
      reason: '',
      lastname: '',
      firstname: '',
      email: '',
      address: '',
      zipcode: '',
      city: '',
      options: [],
      recurring_interval: 'month' // used for recurring donation
    }
  },
  async fetch () {
    // Retrieve list of reasons for donations (= other projects)
    const reasons = await this.$axios.$get(this.$config.COCKPIT.URL + '/api/content/items/causes')
    this.options = reasons.map(function (reason) {
      return { text: reason.title, value: reason.title }
    })
  },
  computed: {
    isSubscription () {
      return this.$store.state.subscribe
    }
  },
  created () {
    // Create event to store metadata from don page
    this.$nuxt.$on('process-donation', () => {
      this.processDonation()
    })

    // Validate form when coming or coming back to this step
    this.$nuxt.$on('validate-form', () => {
      this.validateForm()
    })
  },
  methods: {
    setAmount (value) {
      this.amount = value
      this.validateForm()
    },
    validateForm () {
      // Enable the Next step button if all fields are valid
      if (
        this.isNumeric(this.amount) &&
        this.reason !== '' &&
        this.lastname !== '' &&
        this.firstname !== '' &&
        this.isEmail(this.email) &&
        this.address !== '' &&
        this.isNumeric(this.zipcode) &&
        this.city !== ''
      ) {
        this.$emit('can-continue', { value: true })
      } else {
        this.$emit('can-continue', { value: false })
      }
    },
    processDonation () {
      const metadata = {
        amount: StripeMoneyFormat.toStripeCustomCurrency('EUR', 'fr-FR', Number(this.amount)),
        reason: this.reason,
        lastname: this.lastname,
        firstname: this.firstname,
        email: this.email,
        address: this.address,
        zipcode: this.zipcode,
        city: this.city,
        recurring_interval: this.recurring_interval
      }

      if (this.$store.state.subscribe) {
        this.$store.dispatch('processSubscription', metadata)
      } else {
        this.$store.dispatch('processPaymentIntent', metadata)
      }
    },
    isNumeric (str) {
      if (typeof str !== 'string') {
        return false
      }
      return !isNaN(str) && !isNaN(parseFloat(str))
    },
    isEmail (email) {
      return String(email).match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    }
  }
}
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
