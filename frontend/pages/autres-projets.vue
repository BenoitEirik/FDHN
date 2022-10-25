<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherTitle :title="page1.title" />
      <!-- Content -->
      <nuxt-content class="my-6 max-w-5xl prose md:prose-lg sm:prose-base prose-sm text-justify" :document="page1" />
      <nuxt-content v-for="projet in projets" :key="projet.title" class="my-6 max-w-5xl prose md:prose-lg sm:prose-base prose-sm text-justify" :document="projet" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const page1 = await $content('pages/autres-projets/page-1').fetch()
    const projets = [
      await $content('pages/autres-projets/projets/projet-1').fetch(),
      await $content('pages/autres-projets/projets/projet-2').fetch(),
      await $content('pages/autres-projets/projets/projet-3').fetch()
    ]
    return {
      page1,
      projets
    }
  },
  head () {
    return {
      title: 'Autres projets - Fonds de dotation de l\'Homme Nouveau'
    }
  }
}
</script>
