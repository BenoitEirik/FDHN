<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <h1 class="p-6 text-3xl text-center">
        {{ page1.title }}
      </h1>
      <nuxt-content class="max-w-5xl prose-lg text-justify" :document="page1" />
      <DonsDonationsCadre :cadre="cadre1" :bg-class="'bg-white'" />
      <div class="mt-6 w-full flex justify-center">
        <img
          class="max-w-4xl rounded"
          src="@/assets/images/brochure/image-038.png"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonSuccession',
  async asyncData ({ $content }) {
    const page1 = await $content('pages/Dons/Don succession/page-1').fetch()
    const cadre1 = await $content('pages/Dons/Don succession/cadre-1').fetch()
    return {
      page1,
      cadre1
    }
  }
}
</script>
