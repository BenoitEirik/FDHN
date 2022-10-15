<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <h1 class="p-6 text-3xl text-center">
        {{ page1.title }}
      </h1>
      <nuxt-content class="max-w-5xl md:prose-lg sm:prose-base prose-sm text-justify" :document="page1" />
      <PagesDonsDonationsCadre :cadre="cadre1" :bg-class="'bg-white'" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Donations',
  async asyncData ({ $content }) {
    const page1 = await $content('pages/Dons/Donations/page-1').fetch()
    const cadre1 = await $content('pages/Dons/Donations/cadre-1').fetch()
    return {
      page1,
      cadre1
    }
  }
}
</script>
