<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <h1 class="p-6 text-3xl text-center">
        {{ page1.title }}
      </h1>
      <nuxt-content class="max-w-5xl prose-lg text-justify" :document="page1" />
      <PagesDonsLegsCadre :cadre="cadre1" :bg-class="'bg-red-700'" :color-class="'text-white'" />
      <nuxt-content class="max-w-5xl prose-lg text-justify" :document="page2" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Legs',
  async asyncData ({ $content }) {
    const page1 = await $content('pages/Dons/Legs/page-1').fetch()
    const page2 = await $content('pages/Dons/Legs/page-2').fetch()
    const cadre1 = await $content('pages/Dons/Legs/cadre-1').fetch()
    return {
      page1,
      page2,
      cadre1
    }
  }
}
</script>
