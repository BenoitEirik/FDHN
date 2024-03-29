<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherTitle :title="page.title" />
      <!-- Content -->
      <div class="max-w-5xl">
        <horizontal-stepper
          :steps="steps"
          :reset="resetStepper"
          @completed-step="completeStep"
          @active-step="isStepActive"
          @stepper-finished="cancelDonation"
          @clicking-back="isClickingBack"
          @reset="isResettingStepper"
          @hook:mounted="() => { stepperMounted = true }"
        />
        <!-- Bannière indicatif -->
        <div class="m-6 flex justify-center text-sm">
          <button class="signal-error" @click="$router.push('/contact')">
            Signaler une erreur
          </button>
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
      stepperMounted: false,
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
    resetStepper () {
      return this.$store.state.resetStepper
    }
  },
  mounted () {
    const stepperTop = document.querySelector('div.stepper-box div.top')
    stepperTop.style.setProperty('padding-top', '20px')
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
            this.$nuxt.$emit('process-donation')
          }
          step.completed = true
        }
      })
    },
    // Executed when @active-step event is triggered
    isStepActive (payload) {
      this.steps.forEach((step) => {
        if (step.name === payload.name) {
          // Mark current step as completed
          if (step.completed === true) {
            step.completed = false
          }

          if (step.name === 'second') {
            this.$nuxt.$emit('validate-form')
          }

          // Button design
          if (!this.$isServer) {
            this.$nextTick(() => {
              const nextButton = document.querySelector('div.stepper-button.next')
              const backButton = document.querySelector('div.stepper-button.previous')
              if (nextButton !== null) {
                const [span, i] = [nextButton.querySelector('span'), nextButton.querySelector('i')]
                if (step.name === 'third') {
                  span.innerHTML = 'Annuler'
                  i.innerHTML = 'close'
                } else {
                  span.innerHTML = 'Suivant'
                  i.innerHTML = 'keyboard_arrow_right'
                }
                span.style.setProperty('padding-bottom', '4px')
              }
              if (backButton !== null) {
                const span = backButton.querySelector('span')
                span.innerHTML = 'Retour'
                span.style.setProperty('padding-bottom', '4px')
              }
            })
          }
        }
      })
    },
    isClickingBack () {
      this.scrollToTop()
      this.steps.forEach((step) => {
        if (step.name === 'first') {
          this.$nuxt.$emit('reset-step-one')
        }
      })
    },
    isResettingStepper () {
      this.$store.commit('resetStore')
    },
    // Executed when @stepper-finished event is triggered
    async cancelDonation () {
      if (this.$store.state.subscribe) {
        await this.$store.dispatch('cancelSubscription')
      } else {
        await this.$store.dispatch('cancelPaymentIntent')
      }

      // Reset stepper
      this.$store.commit('resetStepper', true)
      this.$nextTick(() => {
        this.$store.commit('resetStepper', false)
      })
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
.signal-error {
  text-decoration: underline;
}
</style>
