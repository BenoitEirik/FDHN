<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Breadcrumbs -->
      <div class="lg:text-lg sm:text-base text-sm breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/transmettre">
              Transmettre
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/transmettre/assurance-vie">
              L'assurance vie
            </nuxt-link>
          </li>
        </ul>
      </div>
      <!-- Title -->
      <OtherTitle :title="page1.title" />
      <!-- Content -->
      <nuxt-content class="max-w-5xl prose md:prose-lg sm:prose-base prose-sm text-justify" :document="page1" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssuranceVie',
  async asyncData ({ $content }) {
    const page1 = await $content('pages/transmettre/assurance-vie/page-1').fetch()
    return {
      page1
    }
  },
  head () {
    return {
      title: 'L\'assurance vie - Fonds de dotation de l\'Homme Nouveau'
    }
  }
}
</script>
