<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherTitle :title="page1.title" />
      <!-- Content -->
      <nuxt-content class="max-w-5xl prose md:prose-lg sm:prose-base prose-sm text-justify" :document="page1" />
    </div>
    <div class="m-6">
      <div
        class="flex justify-center items-center flex-wrap"
      >
        <PagesTemoignagesCard :data="testaments[0]" />
        <PagesTemoignagesCard :data="testaments[1]" />
        <PagesTemoignagesCard :data="testaments[2]" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Testaments',
  async asyncData ({ $content }) {
    const page1 = await $content('pages/transmettre/testaments/page-1').fetch()
    const testaments = [
      await $content('pages/transmettre/testaments/testament-1').fetch(),
      await $content('pages/transmettre/testaments/testament-2').fetch(),
      await $content('pages/transmettre/testaments/testament-3').fetch()
    ]
    return {
      page1,
      testaments
    }
  },
  head () {
    return {
      title: 'Le testament - Fonds de dotation de l\'Homme Nouveau'
    }
  }
}
</script>
