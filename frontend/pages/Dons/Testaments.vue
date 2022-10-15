<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <h1 class="p-6 text-3xl text-center">
        {{ page1.title }}
      </h1>
      <nuxt-content class="max-w-5xl md:prose-lg sm:prose-base prose-sm text-justify" :document="page1" />
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
    const page1 = await $content('pages/Dons/Testaments/page-1').fetch()
    const testaments = [
      await $content('pages/Dons/Testaments/testament-1').fetch(),
      await $content('pages/Dons/Testaments/testament-2').fetch(),
      await $content('pages/Dons/Testaments/testament-3').fetch()
    ]
    return {
      page1,
      testaments
    }
  }
}
</script>
