<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherTitle :title="page1.title" />
      <!-- Content -->
      <div class="max-w-5xl">
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
