<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
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
  }
}
</script>
