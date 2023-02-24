<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherTitle :title="page.title" />
      <!-- Content -->
      <div class="max-w-5xl">
        <div class="hidden my-6 alert alert-warning shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
              <h3 class="font-bold">
                24/10/2022
              </h3>
              <div>
                Il n'est pas encore possible de faire un don. Merci de patienter et de revenir à partir de 17h30.
              </div>
            </div>
          </div>
        </div>
        <horizontal-stepper
          :steps="steps"
          @completed-step="completeStep"
          @active-step="isStepActive"
          @stepper-finished="alert"
          @clicking-back="isClickingBack"
        />
        <!-- Bannière indicatif -->
        <div ref="bannerRef" class="mt-6 alert shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info flex-shrink-0 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>En cas de problème, merci de <nuxt-link to="/contact" class="underline">contacter</nuxt-link> le responsable du site.</span>
          </div>
          <div class="flex-none">
            <button class="btn btn-sm btn-primary" @click="() => { $refs.bannerRef.style.display = 'none' }">
              Compris
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StepOne from '~/components/Pages/Dons/StepOne.vue'
import StepTwo from '~/components/Pages/Dons/StepTwo.vue'
import StepThree from '~/components/Pages/Dons/StepThree.vue'

export default {
  name: 'FaireUnDon',
  async asyncData ({ $axios, $config }) {
    const page = await $axios.$get($config.COCKPIT.URL + '/api/content/item/page/7dc58e313738396b360001fd')

    return {
      page
    }
  },
  data () {
    return {
      steps: [
        {
          icon: 'info',
          name: 'first',
          title: 'Étape 1',
          subtitle: 'Type de don',
          component: StepOne,
          completed: false
        },
        {
          icon: 'euro_symbol',
          name: 'second',
          title: 'Étape 2',
          subtitle: 'Montant du don',
          component: StepTwo,
          completed: false
        },
        {
          icon: 'credit_card',
          name: 'third',
          title: 'Étape 3',
          subtitle: 'Moyen de paiement',
          component: StepThree,
          completed: false
        }
      ]
    }
  },
  head () {
    return {
      title: 'Faire un don - Fonds de dotation de L\'Homme Nouveau',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Faites un don au Fonds de dotation de L\'Homme Nouveau pour aider aux financement des projets qu\'ils soutiennent. Parmis ces projets vous retrouverez en plus de L\'Homme Nouveau, la Scolafricaine, le CIELT et l\'association Amitié Charles de Foucauld. Visitez la page « Faire un don » pour en apprendre davantage.'
        }
      ]
    }
  },
  computed: {
    return_url () {
      return this.$store.state.confirmParams.return_url
    }
  },
  methods: {
    scrollToTop () {
      if (!this.$isServer) {
        this.$nextTick(() => {
          window.scrollTo(0, 0)
        })
      }
    },
    // Executed when @completed-step event is triggered
    completeStep (payload) {
      this.scrollToTop()
      this.steps.forEach((step) => {
        if (step.name === payload.name) {
          if (step.name === 'second') {
            this.$nuxt.$emit('process-payment-intent')
          }
          step.completed = true
        }
      })
    },
    // Executed when @active-step event is triggered
    isStepActive (payload) {
      this.steps.forEach((step) => {
        if (step.name === payload.name) {
          if (step.completed === true) {
            step.completed = false
          }
          if (step.name === 'second') {
            this.$nuxt.$emit('validate-form')
          }
        }
      })
    },
    isClickingBack (payload) {
      this.scrollToTop()
      this.steps.forEach((step) => {
        if (step.name === 'first') {
          this.$nuxt.$emit('reset-step-one')
        }
      })
    },
    // Executed when @stepper-finished event is triggered
    alert (payload) {
      this.$router.push(this.return_url)
    }
  }
}
</script>

<style>
.stepper-box {
  border-radius: 8px;
}
.stepper-box .top .steps-wrapper .step .circle i {
  background-color: #e0a82e !important;
}
.stepper-box .bottom .stepper-button.next {
  background-color: #e0a82e !important;
  border-radius: 8px;
}
</style>
