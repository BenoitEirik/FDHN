<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherTitle :title="page1.title" />
      <!-- Content -->
      <nuxt-content class="max-w-5xl prose md:prose-lg sm:prose-base prose-sm text-justify" :document="page1" />
      <PagesDonsDonationsCadre :cadre="cadre1" :bg-class="'bg-white'" />
      <div class="mt-6 max-w-5xl flex justify-center">
        <nuxt-img
          class="rounded"
          format="webp"
          src="brochure/image-038.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonSuccession',
  async asyncData ({ $content }) {
    const page1 = await $content('pages/transmettre/don-succession/page-1').fetch()
    const cadre1 = await $content('pages/transmettre/don-succession/cadre-1').fetch()
    return {
      page1,
      cadre1
    }
  }
}
</script>
