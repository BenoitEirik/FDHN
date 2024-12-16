<template>
  <div class="flex flex-col items-center px-6 py-12">
    <div class="form-control w-full max-w-sm">
      <!-- Montant -->
      <label class="label">
        <span class="label-text">Montant {{ isSubscription ? 'prélevé et périodicité ' : '' }}*</span>
      </label>
      <label class="input-group">
        <input v-model.lazy="amount" type="number" placeholder="1€ minimum" class="input-bordered input w-full border-accent focus:input-accent">
        <span class="whitespace-nowrap bg-accent text-base-100">{{ isSubscription ? '€/mois' : '€' }}</span>
      </label>

      <!-- Amount proposals -->
      <div v-if="isSubscription" class="btn-group pt-2">
        <button class="btn-outline btn-accent btn shrink grow" @click="setAmount('5')">
          5 €
        </button>
        <button class="btn-outline btn-accent btn shrink grow" @click="setAmount('10')">
          10 €
        </button>
        <button class="btn-outline btn-accent btn shrink grow" @click="setAmount('20')">
          20 €
        </button>
        <button class="btn-outline btn-accent btn shrink grow" @click="setAmount('50')">
          50 €
        </button>
        <button class="btn-outline btn-accent btn shrink grow" @click="setAmount('100')">
          100 €
        </button>
      </div>

      <!-- Datepicker -->
      <!-- <label v-if="isSubscription" class="label mt-2 cursor-pointer" style="padding-left: 0;">
        <input v-model="deadline" type="checkbox" class="checkbox-accent checkbox checkbox-sm">
        <span class="label-text grow pl-2">Ajouter une échéance (facultatif)</span>
      </label>
      <v-date-picker
        v-if="isSubscription && deadline"
        v-model="date"
        :disabled-dates="disabledDates"
        color="yellow"
      >
        <template #default="{ inputValue, togglePopover }">
          <div class="input-group" @click="togglePopover()">
            <span class="flex items-center justify-center bg-accent px-4">
              <img :src="calendarIcon">
            </span>
            <input
              :value="inputValue"
              class="input-bordered input w-full border-accent focus:input-accent"
              readonly
            >
          </div>
        </template>
      </v-date-picker> -->

      <!-- Message about donations -->
      <label class="label">
        <span class="label-text-alt">Tous les dons sont défiscalisables</span>
      </label>

      <!-- Cause -->
      <label class="label">
        <span class="label-text">Cause *</span>
      </label>
      <select v-model.lazy="reason" class="select-bordered select w-full focus:select-primary">
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
      <input v-model.lazy="lastname" type="text" placeholder="Nom" class="input-bordered input w-full focus:input-primary">

      <!-- Prénom -->
      <label class="label">
        <span class="label-text">Prénom *</span>
      </label>
      <input v-model.lazy="firstname" type="text" placeholder="Prénom" class="input-bordered input w-full focus:input-primary">

      <!-- Adresse e-mail -->
      <label class="label">
        <span class="label-text">Email *</span>
      </label>
      <input v-model.lazy="email" type="email" placeholder="Email" class="input-bordered input w-full focus:input-primary">

      <!-- Adresse postale -->
      <label class="label">
        <span class="label-text">Adresse *</span>
      </label>
      <input v-model.lazy="address" type="text" placeholder="Adresse" class="input-bordered input w-full focus:input-primary">

      <!-- Code postal -->
      <label class="label">
        <span class="label-text">Code postal *</span>
      </label>
      <input
        v-model.lazy="zipcode"
        type="text"
        pattern="[0-9]{5}"
        maxlength="5"
        placeholder="Code postal"
        class="input-bordered input w-full focus:input-primary"
      >

      <!-- Ville -->
      <label class="label">
        <span class="label-text">Ville *</span>
      </label>
      <input v-model.lazy="city" type="text" placeholder="Ville" class="input-bordered input w-full focus:input-primary">

      <!-- Votre don fait suite à la réception d’un courrier papier de l’Homme Nouveau -->
      <label class="label cursor-pointer">
        <input v-model="donationFollowingMailFromHN" type="checkbox" class="checkbox-accent checkbox checkbox-sm">
        <span class="label-text pl-2 text-justify">Votre don fait suite à la réception d’un courrier papier de l’Homme Nouveau</span>
      </label>

      <label class="label mt-2">
        <span class="label-text-alt">* Ces champs sont nécessaires pour bénéficier d'une réduction fiscale</span>
      </label>

      <!-- Message de validation -->
      <div v-if="!isFormValid" class="mt-4 text-center text-warning">
        Vérifiez bien vos informations avant d'appuyer sur suivant
      </div>
    </div>
  </div>
</template>

<script>
import StripeMoneyFormat from 'stripe-money-format'
import calendarIcon from '@/assets/images/calendar_month_black_24dp.svg'

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
      recurring_interval: 'month', // used for recurring donation
      // datepicker
      calendarIcon,
      deadline: false,
      date: new Date(),
      disabledDates: {
        start: new Date(0),
        end: new Date()
      },
      donationFollowingMailFromHN: false,
      isFormValid: false
    }
  },
  async fetch () {
    // Retrieve list of reasons for donations (= other projects)
    const reasons = await this.$axios.$get(this.$config.COCKPIT.URL + '/api/content/items/causes')
    this.options = reasons.map((reason) => {
      return { text: reason.title, value: reason.title, trackOnGTM: reason.trackOnGTM }
    })
  },
  computed: {
    isSubscription () {
      return this.$store.state.subscribe
    }
  },
  watch: {
    // Surveiller tous les champs requis pour la validation
    amount: 'validateForm',
    reason: 'validateForm',
    lastname: 'validateForm',
    firstname: 'validateForm',
    email: 'validateForm',
    address: 'validateForm',
    zipcode: 'validateForm',
    city: 'validateForm'
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

    // Valider le formulaire au montage si des données existent déjà
    this.$nextTick(() => {
      this.validateForm()
    })
  },
  mounted () {
    this.$emit('can-continue', { value: true })
  },
  beforeDestroy () {
    // Nettoyer les écouteurs d'événements
    this.$nuxt.$off('process-donation')
    this.$nuxt.$off('validate-form')
  },
  methods: {
    setAmount (value) {
      this.amount = value
      // La validation sera déclenchée par le watcher
    },
    validateForm () {
      this.isFormValid =
      this.isNumeric(this.amount) &&
      this.reason !== '' &&
      this.lastname !== '' &&
      this.firstname !== '' &&
      this.isEmail(this.email) &&
      this.address !== '' &&
      this.isValidZipcode(this.zipcode) &&
      this.city !== ''

      // Toujours émettre true pour permettre de passer à l'étape suivante
      this.$emit('can-continue', { value: true })
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
        recurring_interval: this.recurring_interval,
        deadline: {
          active: this.deadline,
          timestamp: Math.floor(Date.parse(this.date) / 1000)
        },
        donationFollowingMailFromHN: this.donationFollowingMailFromHN
      }

      // Check if reason has to be tracked by GTM
      const selectedReason = this.options.find(reason => reason.value === this.reason)
      if (selectedReason && selectedReason.trackOnGTM) {
        this.$gtm.push({
          event: 'causeSelection',
          selectedCause: selectedReason.value
        })
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
    isValidZipcode (zipcode) {
      return /^[0-9]{5}$/.test(zipcode)
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
