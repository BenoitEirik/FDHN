<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <div class="p-6 hero">
        <div class="hero-content prose sm:prose-base prose-sm text-center">
          <div class="max-w-md">
            <h1>
              Merci
            </h1>
            <p class="pt-6">
              Le don a été effectué, merci de votre générosité !
            </p>
            <p class="pb-6">
              Vous recevrez une facture par email dans quelques instants.
            </p>
            <p v-if="isSubscription" class="pb-6">
              (Un reçu fiscal vous sera envoyé chaque début d'année)
            </p>
            <button class="btn btn-primary" @click="$router.push({ path: '/' })">
              Retourner à la page d'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isSubscription () {
      const recurrent = Boolean(this.$route.query.recurrent)
      if (recurrent) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
