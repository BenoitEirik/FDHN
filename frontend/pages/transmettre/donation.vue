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
            <nuxt-link to="/transmettre/donation">
              La donation
            </nuxt-link>
          </li>
        </ul>
      </div>
      <!-- Title -->
      <OtherTitle :title="page1.title" />
      <!-- Content -->
      <nuxt-content class="max-w-5xl prose md:prose-lg sm:prose-base prose-sm text-justify" :document="page1" />
      <PagesTransmettreDonationCadre :cadre="cadre1" :bg-class="'bg-white'" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const page1 = await $content('pages/transmettre/donation/page-1').fetch()
    const cadre1 = await $content('pages/transmettre/donation/cadre-1').fetch()
    return {
      page1,
      cadre1
    }
  },
  head () {
    return {
      title: 'La donation - Fonds de dotation de L\'Homme Nouveau'
    }
  }
}
</script>
