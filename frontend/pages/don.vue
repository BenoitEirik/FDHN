<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherTitle :title="page1.title" />
      <!-- Content -->
      <div class="max-w-5xl">
        <div class="my-6 alert alert-warning shadow-lg">
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
        />
      </div>
    </div>
  </div>
</template>

<script>
import StepOne from '@/components/Pages/Dons/StepOne.vue'
import StepTwo from '@/components/Pages/Dons/StepTwo.vue'
import StepThree from '@/components/Pages/Dons/StepThree.vue'

export default {
  name: 'FaireUnDon',
  async asyncData ({ $content }) {
    const page1 = await $content('pages/don/page-1').fetch()
    return {
      page1
    }
  },
  data () {
    return {
      steps: [
        {
          icon: 'euro_symbol',
          name: 'first',
          title: 'Étape 1',
          subtitle: 'Montant du don',
          component: StepOne,
          completed: false
        },
        {
          icon: 'credit_card',
          name: 'second',
          title: 'Étape 2',
          subtitle: 'Moyen de paiement',
          component: StepTwo,
          completed: false
        },
        {
          icon: 'done_outline',
          name: 'third',
          title: 'Étape 3',
          subtitle: 'Finalisation',
          component: StepThree,
          completed: false
        }
      ]
    }
  },
  methods: {
    // Executed when @completed-step event is triggered
    completeStep (payload) {
      this.steps.forEach((step) => {
        if (step.name === payload.name) {
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
        }
      })
    },
    // Executed when @stepper-finished event is triggered
    alert (payload) {
      alert('Votre don est finalisé, merci de votre générosité !')
    }
  }
}
</script>
